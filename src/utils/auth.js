import { headers, request } from "./api";

function registerUser({ name, avatar, email, password }) {
  return request("/signup", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, avatar, email, password }),
  });
}

function authorizeUser({ email, password }) {
  return request("/signin", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password }),
  });
}

export { registerUser, authorizeUser };
