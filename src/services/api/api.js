const API_BASE =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export const getToken = () => {
  return localStorage.getItem("access_token");
};

export const authHeaders = () => {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const api = {
  get: async (url) => {
    const response = await fetch(`${API_BASE}${url}`, {
      method: "GET",
      headers: authHeaders(),
    });

    if (response.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  },

  post: async (url, body) => {
    const response = await fetch(`${API_BASE}${url}`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(body),
    });

    if (response.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  },

  put: async (url, body) => {
    const response = await fetch(`${API_BASE}${url}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(body),
    });

    if (response.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  },

  delete: async (url) => {
    const response = await fetch(`${API_BASE}${url}`, {
      method: "DELETE",
      headers: authHeaders(),
    });

    if (response.status ===401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  },
};