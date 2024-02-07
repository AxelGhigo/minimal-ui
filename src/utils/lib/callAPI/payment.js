export const callPaymentAPI = {
  getAll: async (query = '') =>
    fetch(`https://api-parent-pay.vercel.app/api/v1/posts${query}`, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
      },
    }),

  create: async (obj) =>
    fetch('https://api-parent-pay.vercel.app/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    }),

  delete: async (id) =>
    fetch(`https://api-parent-pay.vercel.app/api/v1/posts/${id}`, {
      method: 'DELETE',
    }),
};
