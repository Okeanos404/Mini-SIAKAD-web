import { renderKRS } from "../pages/krsPage.js";
import { renderKHS } from "../pages/khsPage.js";
import { renderJadwal } from "../pages/jadwalPage.js";
import { renderIPK } from "../pages/ipkPage.js";

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

    default:
      container.innerHTML = `
        <h3>Dashboard</h3>
        <p>Pilih menu di samping.</p>
      `;
  }
}
