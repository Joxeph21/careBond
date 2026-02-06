"use client";
import Button from "@/components/common/Button";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";

type PopupProps = {
  type: "delete" | "suspend";
  onCancel?: () => void;
  onConfirm?: () => void;
  title?: string;
  name: string;
  description?: string;
};

export default function ActionPopup({
  name,
  type,
  description,
  onCancel,
  onCloseModal,
  onConfirm,
  title,
}: onCloseModal & PopupProps) {
  return (
    
        <div className="px-4 py-3 pb-4 relative col-between gap-5 rounded-2xl bg-white w-full h-full">
          <button
            onClick={() => {
              onCancel?.();
              onCloseModal?.();
            }}
            type="button"
            className="absolute top-2 right-2"
          >
            <Icon icon={ICON.CANCEL} fontSize={28} />
          </button>

          <h4 className="capitalize text-center text-2xl">
            {title ?? `${type} ${name}`}
          </h4>

          <div className="col-center gap-2">
            {type === "delete" ? (
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M61.1299 30.3242C61.7943 30.3243 62.3976 30.6146 62.874 31.1045C63.3179 31.6277 63.5413 32.2775 63.4766 32.9639C63.4766 33.1905 61.7002 55.6577 60.6855 65.1143C60.05 70.9173 56.3088 74.4404 50.6973 74.5371C46.3824 74.6338 42.1645 74.667 38.0117 74.667C33.603 74.667 29.2915 74.6338 25.1064 74.5371C19.683 74.4071 15.9381 70.8207 15.335 65.1143C14.2911 55.6244 12.5471 33.1905 12.5146 32.9639C12.4823 32.2774 12.7031 31.6277 13.1504 31.1045C13.5913 30.6145 14.2267 30.3242 14.8945 30.3242H61.1299ZM44.8828 8C47.8295 8.00018 50.4618 10.0571 51.2236 12.9902L51.7686 15.4229C52.2094 17.406 53.9269 18.8094 55.9043 18.8096H65.624C66.9206 18.8097 68 19.887 68 21.2568V22.5234C67.9999 23.8599 66.9205 24.9696 65.624 24.9697H10.3799C9.07999 24.9697 8.00013 23.86 8 22.5234V21.2568C8 19.8868 9.0799 18.8096 10.3799 18.8096H20.0986C22.0728 18.8095 23.7912 17.4067 24.2354 15.4268L24.7441 13.1533C25.5351 10.0568 28.1381 8.00018 31.1172 8H44.8828Z"
                  fill="#E71D36"
                  fillOpacity="0.55"
                />
              </svg>
            ) : (
              <svg
                width="60"
                height="67"
                viewBox="0 0 60 67"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M53.1299 22.3242C53.7943 22.3243 54.3976 22.6146 54.874 23.1045C55.3179 23.6277 55.5413 24.2775 55.4766 24.9639C55.4766 25.1905 53.7002 47.6577 52.6855 57.1143C52.05 62.9173 48.3088 66.4404 42.6973 66.5371C38.3824 66.6338 34.1645 66.667 30.0117 66.667C25.603 66.667 21.2915 66.6338 17.1064 66.5371C11.683 66.4071 7.93806 62.8207 7.33496 57.1143C6.29109 47.6244 4.54707 25.1905 4.51465 24.9639C4.48232 24.2774 4.70314 23.6277 5.15039 23.1045C5.59128 22.6145 6.22671 22.3242 6.89453 22.3242H53.1299ZM36.8828 0C39.8295 0.000178778 42.4618 2.05706 43.2236 4.99023L43.7686 7.42285C44.2094 9.40603 45.9269 10.8094 47.9043 10.8096H57.624C58.9206 10.8097 60 11.887 60 13.2568V14.5234C59.9999 15.8599 58.9205 16.9696 57.624 16.9697H2.37988C1.07999 16.9697 0.000134366 15.86 0 14.5234V13.2568C0 11.8868 1.0799 10.8096 2.37988 10.8096H12.0986C14.0728 10.8095 15.7912 9.40665 16.2354 7.42676L16.7441 5.15332C17.5351 2.05682 20.1381 0.000176174 23.1172 0H36.8828Z"
                  fill="#E71D36"
                  fillOpacity="0.55"
                />
              </svg>
            )}

            <p>
              {description ?? `Are you sure you want to ${type} this ${name}?`}
            </p>
          </div>

          <div className="flex-center w-fit  gap-3 self-end">
            <Button
              config={{
                onClick: () => {
                  onCancel?.();
                  onCloseModal?.();
                },
                className: "capitalize",
              }}
              variants="outlined"
            >
              Cancel
            </Button>
            <Button
              config={{
                onClick: () => {
                  onConfirm?.();
                  onCloseModal?.();
                },
                className: "capitalize",
              }}
              variants="danger"
            >
              Confirm {type}
            </Button>
          </div>
        </div>
 
  );
}
