import type { UserDto } from "@/features/auth/api";
import { Link } from "react-router";

export const UserCard = ({ user }: { user: UserDto }) => {
  const { email, roles } = user;
  const rolesFormat = roles.join(", ");

  return (
    <ul>
      <li>
        <Link to={`/users/${user._id}`}>{email}</Link>
      </li>
      <li>{email}</li>
      <li>{rolesFormat}</li>
    </ul>
  );
};
