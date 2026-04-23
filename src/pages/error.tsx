import {
  Link,
  isRouteErrorResponse,
  useLocation,
  useRouteError
} from "react-router";

export const ErrorPage = () => {
  const error = useRouteError();
  console.log("error", error);
  const location = useLocation();

  console.log("location", location);

  if (isRouteErrorResponse(error)) {
    console.log("error", error);

    if (error.status === 404) {
      return <div>This page doesn't exist!</div>;
    }

    if (error.status === 401) {
      return (
        <>
          <div>You aren't authorized to see this</div>
          <Link to="/login" state={{ from: location.pathname }}>
            Login
          </Link>
        </>
      );
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>;
    }

    if (error.status === 418) {
      return <div>🫖</div>;
    }
  } else if (error instanceof Error) {
    return (
      <>
        <div>{error.message}</div>
        <Link to="/login" state={{ from: location.pathname }}>
          Login
        </Link>
      </>
    );
  }

  return <div>Something went wrong</div>;
};
