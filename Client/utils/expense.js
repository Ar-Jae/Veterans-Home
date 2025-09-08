// Client-side API utility for Expense
const API_BASE = "/api/expenses";

export const Expense = {
  async list(sort = "") {
    let url = API_BASE;
    if (sort) url += `?sort=${encodeURIComponent(sort)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch expenses");
    return await res.json();
  },

  async create(expenseData) {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expenseData)
    });
    if (!res.ok) throw new Error("Failed to create expense");
    return await res.json();
  }
};
