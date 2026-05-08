import { UserDetails } from "@/widgets/user";
import { useParams } from "react-router";

export const UserPage = () => {
  const { id } = useParams() as { id: string };
  return <UserDetails id={id} />;
};
