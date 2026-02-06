import { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

type ChartType = "donut" | "pie" | "bar" | "line";
type ChartInstance = am5percent.PieChart | am5xy.XYChart | null;

export function useAmChart<T extends Record<string, unknown>>(
  id: string,
  type: ChartType,
  data: T[]
) {
  const chartRef = useRef<ChartInstance>(null);

  useLayoutEffect(() => {
    const existingRoot = am5.array.find(am5.registry.rootElements, (r) => {
      return r.dom.id === id;
    });
    if (existingRoot) {
      existingRoot.dispose();
    }

    const root = am5.Root.new(id);
    root.setThemes([am5themes_Animated.new(root)]);

    if (root._logo) root._logo.dispose();

    let chart: ChartInstance = null;

    if (type === "pie" || type === "donut") {
      const pieChart = root.container.children.push(
        am5percent.PieChart.new(root, {
          innerRadius: type === "donut" ? am5.percent(75) : 0,
          layout: root.verticalLayout,
        })
      );
      chart = pieChart;

      const series = pieChart.series.push(
        am5percent.PieSeries.new(root, {
          valueField: "value",
          categoryField: "name",
          alignLabels: false,
        })
      );

      series.slices.template.setAll({
        cornerRadius: 4,
        stroke: am5.color(0xffffff),
      });
      series.slices.template.adapters.add("fill", (_fill, target) => {
        const dataItem = target.dataItem?.dataContext as { fill?: string };
        return dataItem?.fill ? am5.color(dataItem.fill) : _fill;
      });

      series.labels.template.set("forceHidden", true);
      series.ticks.template.set("forceHidden", true);
      series.data.setAll(data);
    }

    // --- SPLINE / LINE LOGIC ---
    else if (type === "line") {
      const lineChart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: true,
          panY: false,
          wheelX: "panX",
          layout: root.verticalLayout,
        })
      );
      chart = lineChart;

      // Create Axes
      const xAxis = lineChart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: "name",
          renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 30 }),
        })
      );
      xAxis.data.setAll(data);

      const yAxis = lineChart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {}),
        })
      );

      // Create Series
      const series = lineChart.series.push(
        am5xy.SmoothedXLineSeries.new(root, {
          name: "Series",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          categoryXField: "name",
          tooltip: am5.Tooltip.new(root, { labelText: "{valueY}" }),
        })
      );

      // Styling the line (Blue from your Figma)
      series.strokes.template.setAll({
        strokeWidth: 3,
        stroke: am5.color("#3F8EF3"),
      });

      // Creating the Area Fill (Gradient under the line)
      series.fills.template.setAll({
        visible: true,
        fillOpacity: 0.2,
        fill: am5.color("#3F8EF3"),
      });

      series.data.setAll(data);
      series.appear(1000);
    }

    // Bar Chart
    else if (type === "bar") {
      const barChart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          wheelX: "none",
          wheelY: "none",
          layout: root.verticalLayout,
        })
      );
      chart = barChart;

      // Define the Date Axis (X)
      const xAxis = barChart.xAxes.push(
        am5xy.DateAxis.new(root, {
          baseInterval: { timeUnit: "month", count: 1 },
          renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 30,
            cellStartLocation: 0.1, // This creates the clustering gap
            cellEndLocation: 0.9,
          }),
        })
      );

      // Define the Value Axis (Y)
      const yAxis = barChart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {}),
        })
      );

      // Function to dynamically add series for clustering
      // We look at the first data item to find keys that aren't 'date'
      const fields = Object.keys(data[0] || {}).filter(
        (key) => key !== "date" && key !== "fill"
      );

      // Custom colors to match your image
      const colors = ["#3F8EF3", "#00C4DF", "#FFBB28"];

      fields.forEach((field, index) => {
        const series = barChart.series.push(
          am5xy.ColumnSeries.new(root, {
            name: field.charAt(0).toUpperCase() + field.slice(1),
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: field,
            valueXField: "date",
            tooltip: am5.Tooltip.new(root, { labelText: "{name}: {valueY}" }),
          })
        );

        series.columns.template.setAll({
          width: am5.percent(90),
          tooltipY: 0,
          cornerRadiusTL: 4,
          cornerRadiusTR: 4,
          fill: am5.color(colors[index] || "#ccc"),
          strokeOpacity: 0,
        });

        series.data.setAll(data);
        series.appear(1000);
      });

      // Add Legend
      const legend = barChart.children.push(
        am5.Legend.new(root, {
          centerX: am5.p50,
          x: am5.p50,
        })
      );
      legend.data.setAll(barChart.series.values);
    }

    chartRef.current = chart;
    return () => root.dispose();
  }, [id, type, data]);

  return chartRef;
}
