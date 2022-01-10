import { Card, Col, Divider, Layout, Row, Spin } from "antd";
import { useGetUsersQuery } from "../../store/api/Endpoints";
import { User } from "../../types";
import useScreenModel from "../../hooks/useScreenModel";
import { useDispatch } from "react-redux";
import { openUserModal } from "../../store/modules/layout/actions";

function Users() {
  const dispatch = useDispatch();

  const {
    isFetching,
    isLoading,
    data: users,
  } = useGetUsersQuery(undefined, { refetchOnMountOrArgChange: true });

  const isTablet = useScreenModel("tablet");

  function handleClickCard(user: User) {
    dispatch(openUserModal(user));
  }

  return (
    <Layout.Content
      style={{
        margin: isTablet ? "1.25rem 1.25rem 0" : "1.25rem 2.5rem 0",
      }}
    >
      <Divider orientation="left">Usuários</Divider>

      <Spin size="large" spinning={isLoading || isFetching}>
        <Row gutter={[20, 20]}>
          {users?.map((user) => (
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
      </Spin>
    </Layout.Content>
  );
}

export default Users;
