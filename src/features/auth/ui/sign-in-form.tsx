import { useAppDispatch } from "@/shared/redux";

import { UiTextField } from "@/shared/ui/ui-text-field";
import { UiButton } from "@/shared/ui/ui-button";
import {
  signInThunk,
  useSignInError,
  useSignInLoading,
} from "../model/sign-in-thunk";
import { useForm } from "react-hook-form";
import { UiLink } from "@/shared/ui/ui-link";
import { ROUTES } from "@/shared/constants/routes";

export function SignInForm() {
  const { register, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>();
  const dispatch = useAppDispatch();

  const isLoading = useSignInLoading();
  const signInError = useSignInError();

  return (
    <>
      <h1 className="text-2xl mb-6">Sign In</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit((data) => dispatch(signInThunk(data)))}
      >
        <UiTextField
          label="Email"
          inputProps={{
            type: "email",
            ...register("email", { required: true }),
          }}
        />
        <UiTextField
          label="Password"
          inputProps={{
            type: "password",
            ...register("password", { required: true }),
          }}
        />

        {signInError && (
          <div className="bg-rose-500 text-white p-3 rounded">
            {signInError}
          </div>
        )}

        <UiButton disabled={isLoading} variant="primary">
          Sign In
        </UiButton>
        <UiLink className="text-center text-lime-500!" to={ROUTES.SIGN_UP}>
          Sign Up
        </UiLink>
      </form>
    </>
  );
}
