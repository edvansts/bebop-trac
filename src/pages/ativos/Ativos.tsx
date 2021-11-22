import { LoadingOutlined } from "@ant-design/icons";
import { isArray, isObject, map } from "lodash";

import { useGetAssetsQuery } from "../../store/api/Endpoints";

function Ativos() {
  const { isFetching, isLoading, data } = useGetAssetsQuery();

  if (isLoading || isFetching) return <LoadingOutlined size={100} />;

  function renderJson(jsonValue: any) {
    if (isArray(jsonValue)) {
      return jsonValue.map((value, key) => (
        <p key={key}>
          {key}: {renderJson(value)}
        </p>
      ));
    }

    if (isObject(jsonValue)) {
      return map(jsonValue, (value, key) => {
        return (
          <p key={key}>
            {key}: {renderJson(value)}
          </p>
        );
      });
    }

    return <strong>{jsonValue}</strong>;
  }

  return <div>{renderJson(data)}</div>;
}

export default Ativos;
