/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { Button, Form, Select } from "antd";
import { useSearchParams } from "react-router-dom";
import { useGetCompaniesQuery } from "../../store/api/Endpoints";
import { removeUndefinedFromObj } from "../../static/FnUtils";
import useScreenModel from "../../hooks/useScreenModel";

export interface IUnitsListForm {
  companySelected?: string;
}

interface UnitsListFormProps {
  handleSearchUnits(filters: IUnitsListForm): void;
  isFetching: boolean;
}

function UnitsListForm({ handleSearchUnits, isFetching }: UnitsListFormProps) {
  const [unitsListForm] = Form.useForm<IUnitsListForm>();

  const [searchParams, setQueryParams] = useSearchParams();

  const params: IUnitsListForm = useMemo(() => {
    let newParams: any = {};

    searchParams.forEach((value, key) => {
      newParams[key] = value;
    });

    return newParams as IUnitsListForm;
  }, []);

  const { companies, isFetching: isFetchingCompanies } = useGetCompaniesQuery(
    undefined,
    {
      selectFromResult: ({ data, isFetching }) => {
        return { isFetching, companies: data };
      },
    }
  );

  const isMobile = useScreenModel("mobile");

  useEffect(() => {
    const filters = getFilters();

    if (filters) {
      handleSearchUnits(filters);
    }
  }, []);

  function getFilters() {
    const filters = removeUndefinedFromObj<IUnitsListForm>(
      unitsListForm.getFieldsValue()
    );

    return filters;
  }

  function handleSubmitUnitsListForm() {
    const filters = getFilters();

    if (filters) {
      handleSearchUnits(filters);
      setQueryParams({ ...filters }, { replace: true });
    }
  }

  return (
    <Form
      layout={isMobile ? "vertical" : "inline"}
      form={unitsListForm}
      onFinish={handleSubmitUnitsListForm}
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

export default UnitsListForm;
