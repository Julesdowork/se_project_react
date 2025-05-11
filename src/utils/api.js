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

function postItem({ name, imageUrl, weather }) {
  return request("/items", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, imageUrl, weather }),
  });
}

function deleteItem(cardId) {
  return request(`/items/${cardId}`, {
    method: "DELETE",
    headers: headers,
  });
}

export { checkResponses, request, getItems, postItem, deleteItem };
