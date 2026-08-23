import { renderKRS } from "../pages/rencanaPage.js";
import { renderKHS } from "../pages/raporPage.js";
import { renderJadwal } from "../pages/jadwalPage.js";
import { renderIPK } from "../pages/p5Page.js";
import { renderAsesmen } from "../pages/asesmenPage.js";
import { renderTKA } from "../pages/tkaPage.js";
import { renderKeuangan } from "../pages/keuanganPage.js";
import { renderAkun } from "../pages/akunPage.js";

export function loadPage(page, container) {
  container.innerHTML = "";

  switch (page) {
    case "krs":
      renderKRS(container);
      break;

    case "nilai":
      renderKHS(container);
      break;

    case "jadwal":
      renderJadwal(container);
      break;

    case "ipk":
      renderIPK(container);
      break;
      
    case "asesmen":
      renderAsesmen(container);
      break;

    case "tka":
      renderTKA(container);
      break;

    case "keuangan":
      renderKeuangan(container);
      break;

    case "akun":
      renderAkun(container);
      break;

    default:
      container.innerHTML = `
        <h3>Dashboard</h3>
        <p>Pilih menu di samping.</p>
      `;
  }

  // Anime.js Page Transition
  if (typeof window.anime !== 'undefined') {
    window.anime({
      targets: container,
      opacity: [0, 1],
      translateY: [25, 0],
      duration: 600,
      easing: 'easeOutQuart'
    });
  }
}
