import axios from "axios";

export const getErrorMessage = (err: unknown, fallback: string) => {
  if (axios.isAxiosError(err)) {
    const details = err.response?.data?.detail;

    if (Array.isArray(details)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return details.map((d: any) => d.msg).join(", ");
    }

    if (typeof details === "string") {
      return details;
    }
  }

  if (err instanceof Error) {
    return err.message;
  }

  return fallback;
};
