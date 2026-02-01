import { login, logout, isAuthenticated } from "./core/auth.js";
import { loadPage } from "./core/router.js";

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  // LOGIN PAGE
  if (path.includes("login.html")) {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", e => {
      e.preventDefault();

      const user = {
        nim: document.getElementById("nim").value,
        name: document.getElementById("name").value,
        semester: document.getElementById("semester").value
      };

      login(user);
      window.location.href = "dashboard.html";
    });
  }

  // DASHBOARD
  if (path.includes("dashboard.html")) {
    if (!isAuthenticated()) {
      window.location.href = "login.html";
      return;
    }

    const content = document.getElementById("content");

    document.querySelectorAll("aside button").forEach(btn => {
      btn.addEventListener("click", () => {
        loadPage(btn.dataset.page, content);
      });
    });

    document.getElementById("logoutBtn").addEventListener("click", () => {
      logout();
      window.location.href = "login.html";
    });
  }
});

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");

menuBtn?.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});
