import React from "react";
import { Card } from "antd";
import { useGetUserByIdQuery } from "../../store/api/Endpoints";
import { openUserModal } from "../../store/modules/layout/actions";
import { useDispatch } from "react-redux";

interface UserCardProps {
  id: string;
  onCloseCallback?(): void;
}

function UserCard({ id, onCloseCallback }: UserCardProps) {
  const dispatch = useDispatch();

  const { isFetching, isError, data: user } = useGetUserByIdQuery(id);

  if (isError) {
    return <div>Erro ao carregar empresa.</div>;
  }

  function handleOpenUserModal() {
    if (onCloseCallback) {
      onCloseCallback();
    }

    if (user) {
      dispatch(openUserModal(user));
    }
  }

  return (
    <Card
      loading={isFetching}
      size="small"
      hoverable
      onClick={handleOpenUserModal}
    >
      <h4>{user?.name}</h4>
      <p>
        <b>Id:</b> <span>{user?.id}</span>
      </p>
      <p>
        <b>Email:</b> <span>{user?.email}</span>
      </p>
    </Card>
  );
}

export default UserCard;
