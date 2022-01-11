/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { Button, Form, Select } from "antd";
import { useSearchParams } from "react-router-dom";
import {
  useGetCompaniesQuery,
  useGetUnitsQuery,
} from "../../store/api/Endpoints";
import { removeUndefinedFromObj } from "../../static/FnUtils";
import useScreenModel from "../../hooks/useScreenModel";

export interface IUsersListForm {
  companySelected?: string;
  unitSelected?: string;
}

interface UsersListFormProps {
  handleSearchUsers(filters: IUsersListForm): void;
  isFetching: boolean;
}

function UsersListForm({ handleSearchUsers, isFetching }: UsersListFormProps) {
  const [usersListForm] = Form.useForm<IUsersListForm>();

  const [searchParams, setQueryParams] = useSearchParams();

  const params: IUsersListForm = useMemo(() => {
    let newParams: any = {};

    searchParams.forEach((value, key) => {
      newParams[key] = value;
    });

    return newParams as IUsersListForm;
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

  useEffect(() => {
    const filters = getFilters();

    if (filters) {
      handleSearchUsers(filters);
    }
  }, []);

  function getFilters() {
    const filters = removeUndefinedFromObj<IUsersListForm>(
      usersListForm.getFieldsValue()
    );

    return filters;
  }

  function handleSubmitUsersListForm() {
    const filters = getFilters();

    if (filters) {
      handleSearchUsers(filters);
      setQueryParams({ ...filters }, { replace: true });
    }
  }

  return (
    <Form
      layout={isMobile ? "vertical" : "inline"}
      form={usersListForm}
      onFinish={handleSubmitUsersListForm}
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

export default UsersListForm;
