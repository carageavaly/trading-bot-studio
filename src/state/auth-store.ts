import { makeAutoObservable } from "mobx";

class AuthStore {
  user = null;

  constructor() {
    makeAutoObservable(this);
    this.loadUser();
  }

  setUser(user) {
    this.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  }

  loadUser() {
    const saved = localStorage.getItem("user");
    if (saved) this.user = JSON.parse(saved);
  }

  logout() {
    this.user = null;
    localStorage.removeItem("user");
  }
}

export const authStore = new AuthStore();
