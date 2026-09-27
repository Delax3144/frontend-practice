import { useEffect, useState } from "react";
import type { User, SortOrder } from "../types/userList";
import UserCard from "../components/UserCard";
import UserDetails from "../components/UserDetails";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>('default');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data: User[] = await response.json();

        setUsers(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (selectedUser) {
    return (
      <UserDetails
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    );
  }

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );
  
  const sortedUsers = [...filteredUsers];
  
  if (sortOrder === 'asc') {
    sortedUsers.sort((a, b) => {
      return a.name.localeCompare(b.name)
    });
  } else if (sortOrder === 'desc') {
    sortedUsers.sort((a, b) => {
      return b.name.localeCompare(a.name)
    });
  }

  return (
    <div>
      <input
        type="search"
        placeholder="Search users..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />

      <select 
        value={sortOrder}
        onChange={(e) => {
          const value = e.target.value;

          if (
            value === "default" ||
            value === "asc" ||
            value === "desc"
          ) {
            setSortOrder(value);
          }
        }
      }>
        <option value="default">Default</option>
        <option value="asc">Name A-Z</option>
        <option value="desc">Name Z-A</option>
      </select>

      {sortedUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        sortedUsers.map((user) => (
        <div
          key={user.id}
          onClick={() => setSelectedUser(user)}
        >
          <UserCard user={user} />
        </div>
      ))
      )}
    </div>
);
}

export default UserList;