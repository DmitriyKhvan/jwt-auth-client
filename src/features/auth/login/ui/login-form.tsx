import { useAppDispatch } from "@/shared/redux";
import {
  loginThunk,
  useLoginError,
  useLoginLoading
} from "@/features/auth/login/model/login-thunk";

export function LoginForm() {
  const dispatch = useAppDispatch();

  const isLoading = useLoginLoading();
  const loginError = useLoginError();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    dispatch(
      loginThunk(
        formData.get("login")?.toString() ?? "",
        formData.get("password")?.toString() ?? ""
        // location.state?.from
      )
    );
  };

  return (
    <div className="p-5 border border-slate-500 rounded-lg container mx-auto mt-10">
      <form className="flex flex-col gap-5 " onSubmit={handleSubmit}>
        <h1 className="text-bold text-xl">Login</h1>
        <input
          className="p-5 rounded border border-slate-500"
          name="login"
        ></input>
        <input
          className="p-5 rounded border border-slate-500"
          name="password"
        ></input>

        {loginError && (
          <div className="bg-rose-500 text-white p-3 rounded">{loginError}</div>
        )}

        <button
          disabled={isLoading}
          className="p-5 rounded bg-teal-500 text-white disabled:bg-slate-300"
        >
          Логин
        </button>
        <button
          // disabled={isLoading}
          className="p-5 rounded bg-teal-500 text-white disabled:bg-slate-300"
        >
          Регистрация
        </button>
      </form>
    </div>
  );
}
