import { login, logout, isAuthenticated, getUser } from "./core/auth.js";
import { loadPage } from "./core/router.js";
import { users } from "./data/dummyData.js";

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  // LOGIN PAGE
  if (path.includes("login.html") || path.endsWith("/") || path === "") {
    const form = document.getElementById("loginForm");
    
    if(form) {
      form.addEventListener("submit", e => {
        e.preventDefault();

        const nisnInput = document.getElementById("nisn").value;
        const passwordInput = document.getElementById("password").value;
        const user = users.find(u => u.nisn === nisnInput);

        if (!user) {
          alert("NISN tidak ditemukan! Silakan gunakan akun dummy yang tersedia.");
          return;
        }

        if (user.password !== passwordInput) {
          alert("Password salah!");
          return;
        }

        login(user);
        window.location.href = "dashboard.html";
      });
    }
  }

  // DASHBOARD
  if (path.includes("dashboard.html")) {
    if (!isAuthenticated()) {
      window.location.href = "login.html";
      return;
    }

    const content = document.getElementById("content");
    const user = getUser();
    if (user) {
      document.getElementById("userName").innerText = user.name;
      const avatarEl = document.getElementById("userAvatar");
      if (user.avatar) {
        avatarEl.innerHTML = `<img src="${user.avatar}" alt="Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
      } else {
        avatarEl.innerText = user.name.charAt(0);
      }
    }

    document.querySelectorAll("aside button").forEach(btn => {
      btn.addEventListener("click", () => {
        // Handle active state
        document.querySelectorAll("aside button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        loadPage(btn.dataset.page, content);
        
        // Close sidebar on mobile
        document.getElementById("sidebar").classList.remove("active");
        document.getElementById("sidebarOverlay").classList.remove("active");
      });
    });

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById("mobileMenuBtn");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    
    if (mobileBtn && sidebar && overlay) {
      mobileBtn.addEventListener("click", () => {
        sidebar.classList.add("active");
        overlay.classList.add("active");
      });
      
      overlay.addEventListener("click", () => {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
      });
    }

    document.getElementById("logoutBtn").addEventListener("click", () => {
      logout();
      window.location.href = "login.html";
    });
  }
});
