export const baseUrl = "http://localhost:3001";
export const headers = { "Content-Type": "application/json" };

function checkResponses(res) {
  if (res.ok) {
    return res.json();
  }

  Promise.reject(`Error: ${res.status}`);
}

function request(route, options = { headers: headers }) {
  return fetch(`${baseUrl}${route}`, options).then(checkResponses);
}

function getItems() {
  return request("/items");
}

function postItem({ name, imageUrl, weather }, token) {
  return request("/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  });
}

function deleteItem(cardId, token) {
  return request(`/items/${cardId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

function editProfile({ name, avatar }, token) {
  return request("/users/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
}

function addCardLike(id, token) {
  return request(`/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

function removeCardLike(id, token) {
  return request(`/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

export {
  checkResponses,
  request,
  getItems,
  postItem,
  deleteItem,
  editProfile,
  addCardLike,
  removeCardLike,
};
