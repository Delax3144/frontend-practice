import type { User } from "../types/userList";

type UserDetailsProps = {
  user: User
  onClose: () => void
}

const UserDetails = ({user, onClose}: UserDetailsProps) => {
    return (
        <div>
          <h1>Selected user:</h1>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.username}</p>
          <p>{user.phone}</p>
          <p>{user.website}</p>
          <p>{user.address.city}</p>
          <p>{user.address.street}</p>
          <p>{user.address.suite}</p>
          <p>{user.address.zipcode}</p>

          <button onClick={onClose}>Close</button>
        </div>
    )
}

export default UserDetails;