import { headers, request } from "./api";

export function registerUser(name, avatar, email, password) {
  return request("/signup", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, avatar, email, password }),
  });
}

export function authorizeUser(email, password) {
  return request("/signin", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password }),
  });
}

export function checkToken(token) {
  return request("/users/me", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  });
}
