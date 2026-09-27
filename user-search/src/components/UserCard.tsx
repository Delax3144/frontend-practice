import type { User } from "../types/userList";

type UserCardProps = {
  user: User
};

const UserCard = ({user}: UserCardProps) => {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button>View details</button>
    </div>
  );
};

export default UserCard;