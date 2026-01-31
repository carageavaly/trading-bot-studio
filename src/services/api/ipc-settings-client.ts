export const settingsApi = {
  get: () => window.api.settings.get(),
  set: (data) => window.api.settings.set(data),
};
