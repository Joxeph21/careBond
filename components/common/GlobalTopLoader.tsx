import { useEffect } from "react";
import NProgress from "nprogress";
import { useIsFetching } from "@tanstack/react-query";



export default function GlobalTopLoader() {
  const isFetching = useIsFetching() > 0;
  useEffect(() => {
    if (isFetching) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isFetching]);

  return null;
}
