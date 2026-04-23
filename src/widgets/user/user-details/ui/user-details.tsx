import type { AxiosError } from "axios";
import { useUser } from "../model/use-user";

export const UserDetails = ({id}: { id: string }) => {
  const { user, isLoading, error } = useUser(id);

  if (isLoading) return <div>Loading user...</div>;
  if (error as AxiosError) throw new Response(error?.message);

  return <ul>
    <li>{user?._id}</li>
    <li>{user?.email}</li>
    <li>{user?.roles.join(", ")}</li>
  </ul>;
};
