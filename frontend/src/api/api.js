const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("token");

  let response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,

      headers: {
        "Content-Type": "application/json",

        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),

        ...(options.headers || {}),
      },
    });
  } catch (error) {
    console.error("API request failed:", error);

    throw new Error(
      "Unable to connect to the server. Please check your connection and try again."
    );
  }

  const data = await response.json().catch(() => ({}));

  /* =========================
     AUTHENTICATION ERROR
  ========================= */

  if (response.status === 401) {
    localStorage.removeItem("token");

    throw new Error(
      data.message ||
        "Your session has expired. Please log in again."
    );
  }

  /* =========================
     OTHER API ERRORS
  ========================= */

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Something went wrong. Please try again."
    );
  }

  return data;
}


/* =========================
   PRODUCTS
========================= */

export function getProducts() {
  return request("/products");
}

export function createProduct(product) {
  return request("/products", {
    method: "POST",
    body: JSON.stringify(product),
  });
}

export function updateProduct(id, product) {
  return request(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });
}

export function deleteProduct(id) {
  return request(`/products/${id}`, {
    method: "DELETE",
  });
}


/* =========================
   SALES
========================= */

export function getSales() {
  return request("/sales");
}

export function createSale(sale) {
  return request("/sales", {
    method: "POST",
    body: JSON.stringify(sale),
  });
}

export function updateSale(id, sale) {
  return request(`/sales/${id}`, {
    method: "PUT",
    body: JSON.stringify(sale),
  });
}

export function deleteSale(id) {
  return request(`/sales/${id}`, {
    method: "DELETE",
  });
}


/* =========================
   EXPENSES
========================= */

export function getExpenses() {
  return request("/expenses");
}

export function createExpense(expense) {
  return request("/expenses", {
    method: "POST",
    body: JSON.stringify(expense),
  });
}

export function updateExpense(id, expense) {
  return request(`/expenses/${id}`, {
    method: "PUT",
    body: JSON.stringify(expense),
  });
}

export function deleteExpense(id) {
  return request(`/expenses/${id}`, {
    method: "DELETE",
  });
}


/* =========================
   CUSTOMERS
========================= */

export function getCustomers() {
  return request("/customers");
}

export function createCustomer(customer) {
  return request("/customers", {
    method: "POST",
    body: JSON.stringify(customer),
  });
}

export function updateCustomer(id, customer) {
  return request(`/customers/${id}`, {
    method: "PUT",
    body: JSON.stringify(customer),
  });
}

export function deleteCustomer(id) {
  return request(`/customers/${id}`, {
    method: "DELETE",
  });
}


/* =========================
   AUTHENTICATION
========================= */

export function loginUser(credentials) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function signupUser(user) {
  return request("/auth/signup", {
    method: "POST",
    body: JSON.stringify(user),
  });
}

export function getCurrentUser() {
  return request("/auth/me");
}

export function updateCurrentUser(user) {
  return request("/auth/me", {
    method: "PUT",
    body: JSON.stringify(user),
  });
}