import { useAppDispatch } from "@/shared/redux";
import { UiButton } from "@/shared/ui/ui-button";
import { signOutThunk } from "../model/sign-out-thunk";
import { useSignOut } from "../model/use-sign-out";

export function SignOutButton() {
  // const dispatch = useAppDispatch();
  const { isLoading, signOut } = useSignOut();

  return (
    <UiButton
      className="bg-white"
      variant="outlined"
      disabled={isLoading}
      // onClick={() => dispatch(signOutThunk())}
      onClick={() => signOut()}
    >
      Sign Out
    </UiButton>
  );
}
