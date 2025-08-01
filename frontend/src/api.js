const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';


// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:5000";

// export async function login(email, password) {
//   const res = await fetch(`${API_BASE_URL}/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });
//   return res.json();
// }

// export async function signup(full_name, email, password) {
//   const res = await fetch(`${API_BASE_URL}/signup`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ full_name, email, password }),
//   });
//   return res.json();
// }

// export async function getInventory(token) {
//   const res = await fetch(`${API_BASE_URL}/inventory`, {
//     headers: {
//       "Authorization": `Bearer ${token}`
//     }
//   });
//   return res.json();
// }

// export async function submitMoveRequest(data, token) {
//   const res = await fetch(`${API_BASE_URL}/move-request`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`
//     },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// }

// export async function getUserQuotes(token) {
//   const res = await fetch(`${API_BASE_URL}/quotes`, {
//     headers: {
//       "Authorization": `Bearer ${token}`
//     }
//   });
//   return res.json();
// }

// export async function approveQuote(quoteId, token) {
//   const res = await fetch(`${API_BASE_URL}/quotes/${quoteId}/approve`, {
//     method: "POST",
//     headers: {
//       "Authorization": `Bearer ${token}`
//     }
//   });
//   return res.json();
// }

// export async function getBookings(token) {
//   const res = await fetch(`${API_BASE_URL}/bookings`, {
//     headers: {
//       "Authorization": `Bearer ${token}`
//     }
//   });
//   return res.json();
// }

// export async function saveInventory(itemsText, token) {
//   const res = await fetch(`${API_BASE_URL}/inventory`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`
//     },
//     body: JSON.stringify({ items: itemsText })
//   });
//   return res.json();
// }




// export async function getNotifications(token) {
//   const res = await fetch(`${API_BASE_URL}/notifications`, {
//     headers: {
//       "Authorization": `Bearer ${token}`
//     }
//   });
//   return res.json();
// }

// export async function getQuoteByUser(userId, token) {
//   const res = await fetch(`${API_BASE_URL}/quotes/${userId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) throw new Error("Quote fetch failed");
//   return res.json();
// }

// export async function getAllAdminQuotes(token) {
//   const res = await fetch(`${API_BASE_URL}/admin/quotes`, {
//     headers: {
//       "Authorization": `Bearer ${token}`
//     }
//   });

//   if (!res.ok) throw new Error("Failed to fetch admin quotes");
//   return res.json();
// }

// export async function getMyBooking(token) {
//   const res = await fetch(`${API_BASE_URL}/my-booking`, {
//     headers: {
//       "Authorization": `Bearer ${token}`
//     }
//   });

//   if (!res.ok) {
//     throw new Error("No booking found");
//   }

//   return res.json();
// }

// export async function getProfile(token) {
//   const res = await fetch(`${API_BASE_URL}/profile`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   if (!res.ok) throw new Error("Failed to fetch profile");
//   return res.json();
// }

// export async function updateProfile(data, token) {
//   const res = await fetch(`${API_BASE_URL}/profile`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(data),
//   });
//   if (!res.ok) throw new Error("Failed to update profile");
//   return res.json();
// }


// export async function getAllMoveRequests(token) {
//   const res = await fetch(`${API_BASE_URL}/admin/move-requests`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   if (!res.ok) throw new Error("Failed to fetch move requests");
//   return res.json();
// }

// export async function getAllBookings(token) {
//   const res = await fetch(`${API_BASE_URL}/admin/bookings`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   if (!res.ok) throw new Error("Failed to fetch bookings");
//   return res.json();
// }

// export async function approveQuoteById(quoteId, token) {
//   const res = await fetch(`${API_BASE_URL}/admin/quotes/${quoteId}/approve`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   if (!res.ok) throw new Error("Failed to approve quote");
//   return res.json();
// }

// export async function getInventory(token) {
//   const res = await fetch("/inventory", {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.json();
// }

// export async function addInventoryItem(item, token) {
//   const res = await fetch("/inventory", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(item),
//   });
//   return res.json();
// }

// export async function toggleInventoryItem(id, token) {
//   const res = await fetch(`/inventory/${id}/toggle`, {
//     method: "PATCH",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return res.json();
// }

// export async function calculateQuote(locations, token) {
//   const res = await fetch("/quotes/calculate", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(locations),
//   });
//   return res.json();
// }

// export async function getApprovedQuote(token) {
//   const res = await fetch("/quotes/approved", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return res.json();
// }

// export async function bookMove(data, token) {
//   const res = await fetch("/bookings", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// }

// export const getUserProfile = async (token) => {
//   const res = await fetch("/api/user/profile", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   if (!res.ok) throw new Error("Profile fetch failed");
//   return res.json();
// };

// export const getAdminUsers = (token) =>
//   fetch("/api/admin/users", {
//     headers: { Authorization: `Bearer ${token}` },
//   }).then((res) => res.json());

// export const getAdminMoveRequests = (token) =>
//   fetch("/api/admin/move-requests", {
//     headers: { Authorization: `Bearer ${token}` },
//   }).then((res) => res.json());

// export const getAdminQuotes = (token) =>
//   fetch("/api/admin/quotes", {
//     headers: { Authorization: `Bearer ${token}` },
//   }).then((res) => res.json());

// export const getAdminBookings = (token) =>
//   fetch("/api/admin/bookings", {
//     headers: { Authorization: `Bearer ${token}` },
//   }).then((res) => res.json());

//   export const submitMoveRequest = (data, token) =>
//   fetch("/api/move-requests", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(data),
//   }).then((res) => {
//     if (!res.ok) throw new Error("Failed to submit move request");
//     return res.json();
//   });

// File: src/api/index.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const authHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});


export async function loginUser(credentials) {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function signupUser(data) {
  const res = await fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Signup failed");
  return res.json();
}

// ==================== INVENTORY ====================

export async function getInventory(token) {
  const res = await fetch(`${API_BASE_URL}/inventory`, {
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to get inventory");
  return res.json();
}



export async function submitMoveRequest(data, token) {
  const res = await fetch(`${API_BASE_URL}/move-request`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit move request");
  return res.json();
}

export async function getMoveRequests(token) {
  const res = await fetch(`${API_BASE_URL}/move-request`, {
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to fetch move requests");
  return res.json();
}



export async function getUserQuotes(token) {
  const res = await fetch(`${API_BASE_URL}/quotes/user`, {
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to get user quotes");
  return res.json();
}

export async function approveQuote(id, token) {
  const res = await fetch(`${API_BASE_URL}/quotes/${id}/approve`, {
    method: "PATCH",
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to approve quote");
  return res.json();
}



export async function bookMove(data, token) {
  const res = await fetch(`${API_BASE_URL}/bookings`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Booking failed");
  return res.json();
}

export async function getBookings(token) {
  const res = await fetch(`${API_BASE_URL}/bookings`, {
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
}



export async function getAdminQuotes(token) {
  const res = await fetch(`${API_BASE_URL}/admin/quotes`, {
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to fetch admin quotes");
  return res.json();
}

export async function getAdminUsers(token) {
  const res = await fetch(`${API_BASE_URL}/admin/users`, {
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}



export async function getNotifications(token) {
  const res = await fetch(`${API_BASE_URL}/notifications`, {
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to fetch notifications");
  return res.json();
}




