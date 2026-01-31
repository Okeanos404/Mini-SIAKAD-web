import { getKRS } from "../akademik/krs.js";
import { getNilai } from "../akademik/nilai.js";
import { calculateIPK } from "../akademik/ipk.js";

export function renderIPK(container) {
  const krs = getKRS();
  const nilai = getNilai();
  const ipk = calculateIPK(krs, nilai);

  container.innerHTML = `
    <h3>IPK</h3>

    <div class="stat-card">
      <h4>Indeks Prestasi Kumulatif</h4>
      <span>${ipk}</span>
    </div>
  `;
}
