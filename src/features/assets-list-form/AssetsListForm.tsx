/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from "react";
import { Button, Form, Select } from "antd";
import { useSearchParams } from "react-router-dom";
import {
  useGetCompaniesQuery,
  useGetUnitsQuery,
} from "../../store/api/Endpoints";
import { keys } from "lodash";
import { removeUndefinedFromObj } from "../../static/FnUtils";
import { ASSET_STATUS } from "../../static/constants";
import { AssetStatus } from "../../types";
import useScreenModel from "../../hooks/useScreenModel";

export interface IAssetsListForm {
  companySelected?: string;
  unitSelected?: string;
  statusSelected?: string[];
}

interface AssetsListFormProps {
  handleSearchAssets(filters: IAssetsListForm): void;
  isFetching: boolean;
}

function AssetsListForm({
  handleSearchAssets,
  isFetching,
}: AssetsListFormProps) {
  const [assetsListForm] = Form.useForm<IAssetsListForm>();

  const [searchParams, setQueryParams] = useSearchParams();

  const params: IAssetsListForm = useMemo(() => {
    let newParams: any = {};

    searchParams.forEach((value, key) => {
      if (key === "statusSelected") {
        return (newParams[key] = [value]);
      }

      newParams[key] = value;
    });

    return newParams as IAssetsListForm;
  }, []);

  const { companies, isFetching: isFetchingCompanies } = useGetCompaniesQuery(
    undefined,
    {
      selectFromResult: ({ data, isFetching }) => {
        return { isFetching, companies: data };
      },
    }
  );

  const { units, isFetching: isFetchingUnits } = useGetUnitsQuery(undefined, {
    selectFromResult: ({ data, isFetching }) => {
      return { isFetching, units: data };
    },
  });

  const isMobile = useScreenModel("mobile");

  function handleSubmitAssetsListForm() {
    const filters = removeUndefinedFromObj<IAssetsListForm>(
      assetsListForm.getFieldsValue()
    );

    if (filters) {
      handleSearchAssets(filters);
      setQueryParams({ ...filters }, { replace: true });
    }
  }

  return (
    <Form
      layout={isMobile ? "vertical" : "inline"}
      form={assetsListForm}
      onFinish={handleSubmitAssetsListForm}
      initialValues={params}
      style={{ gap: "0.75rem" }}
    >
      <Form.Item name="companySelected">
        <Select
          showSearch
          placeholder="Selecione uma empresa"
          loading={isFetchingCompanies}
          allowClear
        >
          {companies
            ? companies.map((company) => (
                <Select.Option key={company.id} value={`${company.id}`}>
                  {company.name}
                </Select.Option>
              ))
            : null}
        </Select>
      </Form.Item>

      <Form.Item name="unitSelected">
        <Select
          showSearch
          placeholder="Selecione uma unidade"
          loading={isFetchingUnits}
          allowClear
        >
          {units
            ? units.map((unit) => (
                <Select.Option key={unit.id} value={`${unit.id}`}>
                  {unit.name}
                </Select.Option>
              ))
            : null}
        </Select>
      </Form.Item>

      <Form.Item name="statusSelected">
        <Select
          showSearch
          placeholder="Selecione um status"
          allowClear
          mode="multiple"
          style={{ minWidth: isMobile ? "" : "12.5rem" }}
        >
          {keys(ASSET_STATUS).map((key) => (
            <Select.Option key={key} value={key}>
              {ASSET_STATUS[key as AssetStatus].text}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item style={{ marginLeft: "auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <Button type="primary" htmlType="submit" loading={isFetching}>
            Buscar
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

export default AssetsListForm;
