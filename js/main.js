import { login, logout, isAuthenticated, getUser } from "./core/auth.js";
import { loadPage } from "./core/router.js";
import { users } from "./data/dummyData.js";

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  // LOGIN PAGE
  if (path.includes("login.html") || path.endsWith("/") || path === "") {
    // Anime.js Entry Animations
    if (typeof anime !== 'undefined') {
      anime.timeline({
        easing: 'easeOutQuart',
      })
      .add({
        targets: '.login-container',
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 1000
      })
      .add({
        targets: '.login-header img, .login-header h2, .login-header p',
        opacity: [0, 1],
        translateY: [25, 0],
        duration: 800,
        delay: anime.stagger(150)
      }, '-=600')
      .add({
        targets: '.form-group',
        opacity: [0, 1],
        translateX: [-30, 0],
        duration: 800,
        delay: anime.stagger(150)
      }, '-=600')
      .add({
        targets: '.btn-primary',
        opacity: [0, 1],
        scale: [0.95, 1],
        duration: 700
      }, '-=600')
      .add({
        targets: '#loginForm > div:last-child',
        opacity: [0, 1],
        duration: 800
      }, '-=600');
    }

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

    // Anime.js Dashboard Entry Animations
    if (typeof anime !== 'undefined') {
      anime.timeline({
        easing: 'easeOutQuart',
      })
      .add({
        targets: '.app-header',
        opacity: [0, 1],
        translateY: [-50, 0],
        duration: 1000
      })
      .add({
        targets: '#sidebar',
        opacity: [0, 1],
        translateX: [-50, 0],
        duration: 1000
      }, '-=800')
      .add({
        targets: '#sidebar ul li',
        opacity: [0, 1],
        translateX: [-30, 0],
        duration: 700,
        delay: anime.stagger(100)
      }, '-=800')
      .add({
        targets: '#content',
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 1000
      }, '-=800');
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
