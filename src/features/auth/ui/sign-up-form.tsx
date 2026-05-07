import { ROUTES } from "@/shared/constants/routes";
import { useAppDispatch } from "@/shared/redux";
import { UiButton } from "@/shared/ui/ui-button";
import { UiLink } from "@/shared/ui/ui-link";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { useForm } from "react-hook-form";
import {
  signUpThunk,
  useSignUpError,
  useSignUpLoading,
} from "../model/sign-up-thunk";

export function SingUpForm() {
  const { register, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>();

  const dispatch = useAppDispatch();

  const isLoading = useSignUpLoading();
  const signUpError = useSignUpError();

  return (
    <>
      <h1 className="text-2xl mb-6">Sign Up</h1>
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit((data) => dispatch(signUpThunk(data)))}
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

        {signUpError && (
          <div className="bg-rose-500 text-white p-3 rounded">
            {signUpError}
          </div>
        )}

        <UiButton disabled={isLoading} variant="primary">
          Sign Up
        </UiButton>
        <UiLink className="text-center" to={ROUTES.SIGN_IN}>
          Sign In
        </UiLink>
      </form>
    </>
  );
}
