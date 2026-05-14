// import { useAppDispatch } from "@/shared/redux";
// import {
//   signInThunk,
//   useSignInError,
//   useSignInLoading,
// } from "../model/sign-in-thunk";
// import { useForm } from "react-hook-form";

import { UiTextField } from "@/shared/ui/ui-text-field";
import { UiButton } from "@/shared/ui/ui-button";
import { UiLink } from "@/shared/ui/ui-link";
import { ROUTES } from "@/shared/constants/routes";
import { useTranslation } from "react-i18next";
import { useSignIn } from "../model/use-sign-in";

export function SignInForm() {
  const { register, handleSubmit, isLoading, errors, signInError } =
    useSignIn();
  const { t: tAuth } = useTranslation("auth");
  const { t: tProfile } = useTranslation("profile");
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<{
  //   email: string;
  //   password: string;
  // }>();
  // const dispatch = useAppDispatch();

  // const isLoading = useSignInLoading();
  // const signInError = useSignInError();

  return (
    <>
      <h1 className="text-2xl mb-6">{tAuth("Sign In")}</h1>

      <form
        className="flex flex-col gap-5"
        // onSubmit={handleSubmit((data) => dispatch(signInThunk(data)))}
        onSubmit={handleSubmit}
      >
        <UiTextField
          label={tProfile("email")}
          error={errors.email?.message && tAuth(errors.email?.message)}
          inputProps={{
            type: "email",
            ...register("email", { required: "Email is required" }),
          }}
        />

        <UiTextField
          label={tProfile("password")}
          error={errors.password?.message && tAuth(errors.password?.message)}
          inputProps={{
            type: "password",
            ...register("password", { required: "Password is required" }),
          }}
        />

        <UiButton disabled={isLoading} variant="primary">
          {tAuth("Sign In")}
        </UiButton>
        <UiLink className="text-center text-lime-500!" to={ROUTES.SIGN_UP}>
          {tAuth("Sign Up")}
        </UiLink>

        {signInError && (
          <div className="bg-rose-500 text-white p-3 rounded">
            {signInError}
          </div>
        )}
      </form>
    </>
  );
}
