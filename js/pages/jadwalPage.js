import { getKRS } from "../akademik/krs.js";

export function renderJadwal(container) {
  const krs = getKRS();

  if (krs.length === 0) {
    container.innerHTML = `
      <h3>Jadwal</h3>
      <p>Belum ada mata kuliah diambil.</p>
    `;
    return;
  }

  container.innerHTML = `
    <h3>Jadwal Kuliah</h3>

    <div class="card">
      <ul>
        ${krs.map(c => `
          <li>
            <strong>${c.name}</strong><br>
            ${c.day}, ${c.start} - ${c.end}
          </li>
        `).join("")}
      </ul>
    </div>
  `;
}
