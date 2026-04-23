import { UserDetails } from "@/widgets/user/user-details/ui/user-details";
import { useParams } from "react-router";

export const UserPage = () => {
  const { id } = useParams() as { id: string };
  return <UserDetails id={id} />;
};
