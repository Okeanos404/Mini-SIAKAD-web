import { save, load, clear } from "./storage.js";

const USER_KEY = "siakad_user";

export function login(user) {
  save(USER_KEY, user);
}

export function logout() {
  clear(USER_KEY);
}

export function getUser() {
  return load(USER_KEY);
}

export function isAuthenticated() {
  return !!getUser();
}
