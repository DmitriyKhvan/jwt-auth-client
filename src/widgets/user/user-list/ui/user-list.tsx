import type { AxiosError } from "axios";
import { useUsers } from "../model/use-users";
import { UserCard } from "@/entities/user/ui/user-card";

export const UserList = () => {
  const {users, isLoading, error} = useUsers();

  if (isLoading) return <div>Loading users...</div>;

  if (error as AxiosError) throw new Response(error?.message);
  
  return (
    <ul className="grid grid-cols-3">
      {users?.map(user => {
        return (
          <li key={user._id}>
            <UserCard user={user} />
          </li>
        );
      })}
    </ul>
  );
};
