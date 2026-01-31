export const authApi = {
  login: (data) => window.api.auth.login(data),
  register: (data) => window.api.auth.register(data),
};
