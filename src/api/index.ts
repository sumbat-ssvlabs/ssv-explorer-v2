// import { getSSVNetworkDetails } from "@/hooks/use-ssv-network-details";
import urlJoin from "url-join";

export const endpoint = (...paths: (string | number)[]) => {
  const ssvNetwork = {
    api: "https://api.stage.ops.ssvlabsinternal.com/api",
    apiVersion: "v4",
    apiNetwork: "holesky",
  };
  return urlJoin(
    ssvNetwork.api,
    ssvNetwork.apiVersion,
    ssvNetwork.apiNetwork,
    ...paths.map(String)
  );
};
