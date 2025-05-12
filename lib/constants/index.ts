export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Prostore";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_NAME ||
  "A modern ecom store built with the latest next js";
export const SERVERL_URL =
  process.env.NEXT_PUBLIC_SErVER_URL || "http://localhost:300";

export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

export const signInDefaultValues = {
  email: "",
  password: "",
};
