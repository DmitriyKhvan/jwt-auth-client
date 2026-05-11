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
import { useTranslation } from "react-i18next";

export function SignInForm() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
  }>();
  const dispatch = useAppDispatch();

  const isLoading = useSignInLoading();
  const signInError = useSignInError();

  return (
    <>
      <h1 className="text-2xl mb-6">{t("Sing In", { ns: "auth" })}</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit((data) => dispatch(signInThunk(data)))}
      >
        <UiTextField
          label="Email"
          error={t(errors.email?.message || "")}
          inputProps={{
            type: "email",
            ...register("email", { required: "Email is required" }),
          }}
        />

        <UiTextField
          label="Password"
          error={t(errors.password?.message || "")}
          inputProps={{
            type: "password",
            ...register("password", { required: "Password is required" }),
          }}
        />

        <UiButton disabled={isLoading} variant="primary">
          {t("Sign In", { ns: "auth" })}
        </UiButton>
        <UiLink className="text-center text-lime-500!" to={ROUTES.SIGN_UP}>
          {t("Sign Up", { ns: "auth" })}
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
