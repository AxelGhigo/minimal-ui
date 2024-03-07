export const callUserAPI = {
  getAll: async (jwt) =>
    fetch('https://api-parent-pay.vercel.app/api/v1/auth/AllUser', {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    }),
  update: async (jwt, id, obj) =>
    fetch(`https://api-parent-pay.vercel.app/api/v1/auth/${id}`, {
      method: 'PUT',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(obj),
    }),
  delete: async (jwt, id) =>
    fetch(`https://api-parent-pay.vercel.app/api/v1/auth/${id}`, {
      method: 'DELETE',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    }),
};
