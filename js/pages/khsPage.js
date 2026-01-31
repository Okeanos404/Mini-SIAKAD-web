import { getKRS } from "../akademik/krs.js";
import { getNilai, setNilai } from "../akademik/nilai.js";
import { calculateIPK } from "../akademik/ipk.js";
import { showAlert } from "../core/alert.js";

export function renderKHS(container) {
  const krs = getKRS();
  const nilai = getNilai();
  const ipk = calculateIPK(krs, nilai);

  container.innerHTML = `
    <h3>Kartu Hasil Studi (KHS)</h3>

    <div class="dashboard-grid">
      <div class="stat-card">
        <h4>IPK</h4>
        <span>${ipk}</span>
      </div>
      <div class="stat-card">
        <h4>Total SKS</h4>
        <span>${krs.reduce((s, c) => s + c.sks, 0)}</span>
      </div>
    </div>

    <div class="card">
      <h4>Daftar Nilai</h4>
      ${renderNilaiTable(krs, nilai)}
    </div>
  `;

  bindNilaiActions(container);
}

function renderNilaiTable(krs, nilai) {
  if (krs.length === 0) {
    return `<p>Belum ada mata kuliah diambil.</p>`;
  }

  return `
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th>Kode</th>
            <th>Mata Kuliah</th>
            <th>SKS</th>
            <th>Nilai</th>
          </tr>
        </thead>
        <tbody>
          ${krs.map(course => {
            const n = nilai.find(v => v.code === course.code);
            return `
              <tr>
                <td>${course.code}</td>
                <td>${course.name}</td>
                <td>${course.sks}</td>
                <td>
                  <select data-grade="${course.code}">
                    ${["A","B","C","D","E"].map(g => `
                      <option value="${g}" ${n?.grade === g ? "selected" : ""}>
                        ${g}
                      </option>
                    `).join("")}
                  </select>
                </td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function bindNilaiActions(container) {
  const selects = container.querySelectorAll("select[data-grade]");

  selects.forEach(select => {
    select.addEventListener("change", () => {
      setNilai(select.dataset.grade, select.value);
      showAlert("Nilai berhasil disimpan", "success");
      renderKHS(container);
    });
  });
}
