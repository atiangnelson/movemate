const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:5000";

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

export async function getBookings(token) {
  const res = await fetch(`${API_BASE_URL}/bookings`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  return res.json();
}

export async function saveInventory(itemsText, token) {
  const res = await fetch(`${API_BASE_URL}/inventory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ items: itemsText })
  });
  return res.json();
}




export async function getNotifications(token) {
  const res = await fetch(`${API_BASE_URL}/notifications`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  return res.json();
}

export async function getQuoteByUser(userId, token) {
  const res = await fetch(`${API_BASE_URL}/quotes/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Quote fetch failed");
  return res.json();
}

export async function getAllAdminQuotes(token) {
  const res = await fetch(`${API_BASE_URL}/admin/quotes`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error("Failed to fetch admin quotes");
  return res.json();
}

export async function getMyBooking(token) {
  const res = await fetch(`${API_BASE_URL}/my-booking`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error("No booking found");
  }

  return res.json();
}

export async function getProfile(token) {
  const res = await fetch(`${API_BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

export async function updateProfile(data, token) {
  const res = await fetch(`${API_BASE_URL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update profile");
  return res.json();
}


export async function getAllMoveRequests(token) {
  const res = await fetch(`${API_BASE_URL}/admin/move-requests`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch move requests");
  return res.json();
}

export async function getAllBookings(token) {
  const res = await fetch(`${API_BASE_URL}/admin/bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
}

export async function approveQuoteById(quoteId, token) {
  const res = await fetch(`${API_BASE_URL}/admin/quotes/${quoteId}/approve`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to approve quote");
  return res.json();
}

