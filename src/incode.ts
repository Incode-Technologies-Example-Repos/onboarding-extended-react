import { create } from "@incodetech/welcome";

const apiURL = import.meta.env.VITE_API_URL as string;

export type SessionType = { token: string };

export const incode = create({
  apiURL,
  lang: "en-US",
});
