// src/types.ts

export interface LoginResponse {
  token: string;
  email: string;
  _id: string;
}

export interface UiItem {
  name: string;
  url: string;
  image?: string;
}
