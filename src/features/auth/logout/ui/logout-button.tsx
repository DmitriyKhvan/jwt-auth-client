import { useAppDispatch } from "@/shared/redux";
import { logoutThunk } from "../model/logout-thunk";

export const LogoutButton = () => {
  const dispatch = useAppDispatch();
  return (
    <button
      onClick={() => dispatch(logoutThunk())}
      className="text-white cursor-pointer hover:underline"
    >
      Выход
    </button>
  );
};
