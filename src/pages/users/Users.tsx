import { useState } from "react";
import { Card, Col, Divider, Layout, Row, Spin } from "antd";
import InfoModal from "../../features/infoModal/InfoModal";
import { useGetUsersQuery } from "../../store/api/Endpoints";
import { User } from "../../types";

function Users() {
  const {
    isFetching,
    isLoading,
    data: users,
  } = useGetUsersQuery(undefined, { refetchOnMountOrArgChange: true });

  const [userActive, setUserActive] = useState<User>();

  function handleClickCard(user: User) {
    setUserActive(user);
  }

  function handleCloseUserModal() {
    setUserActive(undefined);
  }

  return (
    <Layout.Content style={{ margin: 40 }}>
      <Divider orientation="left">Usuários</Divider>

      <Spin size="large" spinning={isLoading || isFetching}>
        <Row gutter={[20, 20]}>
          {users?.map((user) => (
            <Col key={user.id} span={8} onClick={() => handleClickCard(user)}>
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

      {userActive ? (
        <InfoModal onClose={handleCloseUserModal} object={userActive} />
      ) : null}
    </Layout.Content>
  );
}

export default Users;
