const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export async function login(email, password) {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function signup(full_name, email, password) {
  const res = await fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ full_name, email, password }),
  });
  return res.json();
}

export async function getInventory(token) {
  const res = await fetch(`${API_BASE_URL}/inventory`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  return res.json();
}

export async function submitMoveRequest(data, token) {
  const res = await fetch(`${API_BASE_URL}/move-request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getUserQuotes(token) {
  const res = await fetch(`${API_BASE_URL}/quotes`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  return res.json();
}

export async function approveQuote(quoteId, token) {
  const res = await fetch(`${API_BASE_URL}/quotes/${quoteId}/approve`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  return res.json();
}
