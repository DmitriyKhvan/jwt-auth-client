import type { UserDto } from "@/features/auth/api";
import { Link } from "react-router";

export const UserCard = ({ user }: { user: UserDto }) => {
  return <ul>
    <li><Link to={`/users/${user._id}`}>{user.email}</Link></li>
    <li>{user.email}</li>
    <li>{user.roles.join(", ")}</li>
  </ul>;
};
