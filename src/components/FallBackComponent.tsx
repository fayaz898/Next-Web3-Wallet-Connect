import { FallbackProps } from "react-error-boundary";

export const FallbackComponent = ({ error }: FallbackProps) => {
  return (
    <div>
      <h1>An error occurred: {error.message}</h1>
      <p>Please reload the application</p>
    </div>
  );
};
