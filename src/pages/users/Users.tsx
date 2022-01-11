/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Divider, Layout, Row, Spin } from "antd";
import { useGetUsersQuery } from "../../store/api/Endpoints";
import { User } from "../../types";
import useScreenModel from "../../hooks/useScreenModel";
import { useDispatch } from "react-redux";
import { openUserModal } from "../../store/modules/layout/actions";
import UsersListForm, {
  IUsersListForm,
} from "../../features/users-list-form/UsersListForm";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";

type UserFilters = IUsersListForm;

function Users() {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState<UserFilters>();

  const {
    isFetching,
    isLoading,
    data: users,
    refetch,
  } = useGetUsersQuery(undefined, {
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

        if (filters.unitSelected) {
          if (String(user.companyId) !== filters.unitSelected) {
            return false;
          }
        }

        return true;
      });

      return { isFetching, isLoading, data: filteredUsers };
    },
  });

  const isTablet = useScreenModel("tablet");

  useEffect(() => {
    if (filters) {
      refetch();
    }
  }, [filters]);

  function handleClickCard(user: User) {
    dispatch(openUserModal(user));
  }

  function handleSearchUsers(filters: UserFilters) {
    setFilters(filters);
  }

  return (
    <Layout.Content
      style={{
        margin: isTablet ? "1.25rem 1.25rem 0" : "1.25rem 2.5rem 0",
      }}
    >
      <UsersListForm
        handleSearchUsers={handleSearchUsers}
        isFetching={isFetching}
      />

      <Divider orientation="left">Usuários</Divider>

      <Spin size="large" spinning={isLoading || isFetching}>
        {users && !isEmpty(users) ? (
          <Row gutter={[20, 20]}>
            {users.map((user) => (
              <Col
                key={user.id}
                xs={24}
                sm={12}
                md={8}
                xl={6}
                xxl={4}
                onClick={() => handleClickCard(user)}
              >
                <Card bordered hoverable>
                  <Card.Meta
                    title={user.name}
                    description={
                      <div>
                        <p>{user.email}</p>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <h3>Nenhum usuário encontrado.</h3>
        )}
      </Spin>
    </Layout.Content>
  );
}

export default Users;
