const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

function checkResponses(res) {
  if (res.ok) {
    return res.json();
  }

  Promise.reject(`Error: ${res.status}`);
}

function request(route, options = { headers: headers }) {
  return fetch(`${baseUrl}${route}`, options);
}

function getItems() {
  return request("/items").then(checkResponses);
}

function postItem({ name, imageUrl, weather }) {
  return request("/items", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponses);
}

function deleteItem(cardId) {
  return request(`/items/${cardId}`, {
    method: "DELETE",
    headers: headers,
  }).then(checkResponses);
}

export { getItems, postItem, deleteItem };
