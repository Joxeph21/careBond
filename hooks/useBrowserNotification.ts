// "use client";

// import { useCallback, useState } from "react";

// export function useBrowserNotification() {
//   const [permission, setPermission] = useState<NotificationPermission>(() => {
//     if (typeof window !== "undefined" && "Notification" in window) {
//       return Notification.permission;
//     }
//     return "default";
//   });

//   const requestPermission = useCallback(async () => {
//     if (typeof window === "undefined" || !("Notification" in window)) {
//       return "denied";
//     }

//     const result = await Notification.requestPermission();
//     setPermission(result);
//     return result;
//   }, []);

//   const sendNotification = useCallback(
//     (title: string, options?: NotificationOptions) => {
//       if (
//         typeof window !== "undefined" &&
//         "Notification" in window &&
//         permission === "granted"
//       ) {
//         return new Notification(title, options);
//       }
//       return null;
//     },
//     [permission],
//   );

//   return { permission, requestPermission, sendNotification };
// }

"use client";

import { useCallback, useSyncExternalStore } from "react";
const getServerSnapshot = () => "default" as NotificationPermission;
const getSnapshot = () => {
  if (typeof window !== "undefined" && "Notification" in window) {
    return Notification.permission;
  }
  return "default" as NotificationPermission;
};

const subscribe = () => {
  return () => {}; // Cleanup
};

export function useBrowserNotification() {
  const permission = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const requestPermission = useCallback(async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return "denied";
    }

    const result = await Notification.requestPermission();

    return result;
  }, []);

  const sendNotification = useCallback(
    (title: string, options?: NotificationOptions) => {
      // Always check the LIVE value, not just the state variable
      if (
        typeof window !== "undefined" &&
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        return new Notification(title, options);
      }
      return null;
    },
    [],
  );

  return { permission, requestPermission, sendNotification };
}
