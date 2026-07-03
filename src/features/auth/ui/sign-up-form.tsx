import { ROUTES } from "@/shared/constants/routes";
import { UiButton } from "@/shared/ui/ui-button";
import { UiLink } from "@/shared/ui/ui-link";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { useSignUp } from "../model/use-sign-up";
import { useTranslation } from "react-i18next";

export function SingUpForm() {
  // const { register, handleSubmit } = useForm<{
  //   email: string;
  //   password: string;
  // }>();

  // const dispatch = useAppDispatch();

  // const isLoading = useSignUpLoading();
  // const signUpError = useSignUpError();

  const { t: tAuth } = useTranslation("auth");
  const { t: tProfile } = useTranslation("profile");

  const { register, handleSubmit, isLoading, errors, signUpError } =
    useSignUp();

  return (
    <>
      <h1 className="text-2xl mb-6">{tAuth("Sign Up")}</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <UiTextField
          label={tProfile("email")}
          error={errors.email?.message && tAuth(errors.email?.message)}
          inputProps={{
            type: "email",
            ...register("email"),
          }}
        />
        <UiTextField
          label={tProfile("password")}
          error={errors.password?.message && tAuth(errors.password?.message)}
          inputProps={{
            type: "password",
            ...register("password"),
          }}
        />

        <UiTextField
          label={tProfile("confirmPassword")}
          error={
            errors.confirmPassword?.message &&
            tAuth(errors.confirmPassword?.message)
          }
          inputProps={{
            type: "password",
            ...register("confirmPassword"),
          }}
        />

        {signUpError && (
          <div className="bg-rose-500 text-white p-3 rounded">
            {signUpError}
          </div>
        )}

        <UiButton disabled={isLoading} variant="primary">
          {tAuth("Sign Up")}
        </UiButton>
        <UiLink className="text-center" to={ROUTES.SIGN_IN}>
          {tAuth("Sign In")}
        </UiLink>
      </form>
    </>
  );
}
