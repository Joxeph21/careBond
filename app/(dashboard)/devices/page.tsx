"use client";
import Button from "@/components/common/Button";
import DashTitle from "@/components/common/DashTitle";
import AddCameraForm from "@/components/forms/Add-camera-form";
import useTabs from "@/hooks/useTabs";
import { Modal } from "@/ui/Modal";
import { ICON } from "@/utils/icon-exports";
import React from "react";

const tabs = ["camera", "others"];

export default function DevicesPage() {
  const { tab, setTab, tabRef, tabWidth, containerRef } = useTabs(tabs[0]);

  return (
    <Modal>
      <section className="w-full pb-5 bg-white section-container col-start gap-5 px-4">
        <DashTitle title="Devices">
          <Modal.Trigger name="add-camera">
            <Button icon={ICON.PLUS}>Add Camera</Button>
          </Modal.Trigger>
        </DashTitle>

        <header className="w-full flex flex-col gap-1">
          <div className="w-full flex items-center gap-3">
            {tabs.map((el, i) => (
              <button
                ref={tab === el ? tabRef : null}
                onClick={() => setTab(el)}
                key={i}
                className={`px-5 py-2 cursor-pointer capitalize transition-colors ${
                  tab === el ? "text-primary font-medium" : "text-gray-500"
                }`}
              >
                {el}
              </button>
            ))}
          </div>
          <div
            ref={containerRef}
            className="relative w-full bg-[#E5E5E5] h-[2px]"
          >
            <span
              style={{
                width: tabWidth.width,
                left: tabWidth.left,
              }}
              className="absolute bg-primary rounded-full h-full transition-all duration-300 ease-out"
            />
          </div>
        </header>

        <section className="w-full">
          {tab === "camera" && <div>Camera Content</div>}
          {tab === "others" && <div>Others Content</div>}
        </section>
      </section>

      <Modal.Window
        hasClose
        className="max-w-2xl w-full!"
        title="Add Camera"
        name="add-camera"
      >
        <AddCameraForm />
      </Modal.Window>
    </Modal>
  );
}
