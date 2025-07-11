import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL || "https://vagyatrisha.com";
}
