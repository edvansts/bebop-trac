import { useGetAssetsQuery } from "../store/api/Endpoints";

const useAssetsInfo = () => {
  const {
    isFetching,
    isLoading,
    data: assets,
  } = useGetAssetsQuery(undefined, { pollingInterval: 60000 });

  const inAlert = assets?.filter((asset) => asset.status === "inAlert");
  const inDowntime = assets?.filter((asset) => asset.status === "inDowntime");
  const inOperation = assets?.filter((asset) => asset.status === "inOperation");

  return {
    isFetching,
    isLoading,
    assets,
    inAlert,
    inDowntime,
    inOperation,
  };
};

export default useAssetsInfo;
