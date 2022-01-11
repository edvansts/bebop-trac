/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Divider, Layout, Row, Spin } from "antd";
import { useGetUnitsQuery } from "../../store/api/Endpoints";
import { Unit } from "../../types";
import { useDispatch } from "react-redux";
import useScreenModel from "../../hooks/useScreenModel";
import { openUnitModal } from "../../store/modules/layout/actions";
import UnitsListForm, {
  IUnitsListForm,
} from "../../features/units-list-form/UnitsListForm";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";

type UnitFilters = IUnitsListForm;

function Units() {
  const dispatch = useDispatch();

  const isTablet = useScreenModel("tablet");

  const [filters, setFilters] = useState<UnitFilters>();

  const {
    isFetching,
    isLoading,
    data: units,
    refetch,
  } = useGetUnitsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ isFetching, isLoading, data }) => {
      if (!filters || isEmpty(filters)) {
        return { isFetching, isLoading, data: data };
      }

      const filteredUsers = data?.filter((user) => {
        if (filters.companySelected) {
          if (String(user.companyId) !== filters.companySelected) {
            return false;
          }
        }

        return true;
      });

      return { isFetching, isLoading, data: filteredUsers };
    },
  });

  useEffect(() => {
    if (filters) {
      refetch();
    }
  }, [filters]);

  function handleClickCard(unit: Unit) {
    dispatch(openUnitModal(unit));
  }

  function handleSearchUnits(filters: UnitFilters) {
    setFilters(filters);
  }

  return (
    <Layout.Content
      style={{
        margin: isTablet ? "1.25rem 1.25rem 0" : "1.25rem 2.5rem 0",
      }}
    >
      <UnitsListForm
        handleSearchUnits={handleSearchUnits}
        isFetching={isFetching}
      />

      <Divider orientation="left">Unidades</Divider>

      <Spin size="large" spinning={isLoading || isFetching}>
        {units && !isEmpty(units) ? (
          <Row gutter={[20, 20]}>
            {units.map((unit) => (
              <Col
                key={unit.id}
                xs={24}
                sm={12}
                md={8}
                xl={6}
                xxl={4}
                onClick={() => handleClickCard(unit)}
              >
                <Card bordered hoverable>
                  <Card.Meta title={unit.name} />
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <h3>Nenhuma unidade encontrada.</h3>
        )}
      </Spin>
    </Layout.Content>
  );
}

export default Units;
