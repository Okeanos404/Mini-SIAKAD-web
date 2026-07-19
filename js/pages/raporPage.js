import { getKRS } from "../akademik/rencana.js";
import { getNilai, setNilai } from "../akademik/nilai.js";
import { calculateIPK } from "../akademik/rapor.js";
import { showAlert } from "../core/alert.js";

export function renderKHS(container) {
  const krs = getKRS();
  const nilai = getNilai();
  const ipk = calculateIPK(krs, nilai);

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <h3>Rapor Akademik</h3>
      <button id="downloadPdfBtn" class="btn btn-danger" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">Download PDF</button>
    </div>

    <div id="printArea">
      <div style="display: flex; align-items: center; border-bottom: 2px solid var(--primary); padding-bottom: 1rem; margin-bottom: 1.5rem; background: #fff; padding: 1.5rem;">
        <img src="assets/img/logo-new.png" alt="Logo" style="width: 60px; height: auto; margin-right: 15px;">
        <div>
          <h3 style="margin: 0; color: var(--primary);">SIAP Merdeka</h3>
          <p style="margin: 0; font-size: 0.85rem; color: #555;">Sistem Informasi Akademik Pelajar SMA</p>
        </div>
      </div>
      
      <div class="card" style="margin-bottom: 1.5rem;">
        <h3 style="text-align: center; margin-bottom: 1.5rem;">Rapor Akademik Siswa</h3>
      <div class="dashboard-grid">
        <div class="stat-card">
          <h4>Rata-rata Nilai</h4>
          <span>${ipk}</span>
        </div>
        <div class="stat-card">
          <h4>Total JP</h4>
          <span>${krs.reduce((s, c) => s + c.jp, 0)}</span>
        </div>
      </div>

      <div class="card">
        <h4>Daftar Nilai</h4>
        ${renderNilaiTable(krs, nilai)}
      </div>
    </div>
  `;

  bindNilaiActions(container);

  const btn = document.getElementById("downloadPdfBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      const element = document.getElementById("printArea");
      
      // html2pdf sometimes doesn't capture input values perfectly,
      // but html2canvas usually clones the element with the current value.
      html2pdf().set({
        margin: 10,
        filename: 'Rapor_Akademik.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).from(element).save();
    });
  }
}

function renderNilaiTable(krs, nilai) {
  if (krs.length === 0) {
    return `<p>Belum ada mata pelajaran diambil.</p>`;
  }

  return `
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th>Kode</th>
            <th>Mata Pelajaran</th>
            <th>JP</th>
            <th>Nilai</th>
          </tr>
        </thead>
        <tbody>
          ${krs.map(course => {
            const n = nilai.find(v => v.code === course.code);
            return `
              <tr>
                <td data-label="Kode">${course.code}</td>
                <td data-label="Mata Pelajaran">${course.name}</td>
                <td data-label="JP">${course.jp}</td>
                <td data-label="Nilai">
                  <input type="number" min="0" max="100" data-grade="${course.code}" value="${n?.grade || 0}" style="width: 70px; padding: 4px;" />
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
  const inputs = container.querySelectorAll("input[data-grade]");

  inputs.forEach(input => {
    input.addEventListener("change", () => {
      let val = parseInt(input.value);
      if(val < 0) val = 0;
      if(val > 100) val = 100;
      input.value = val;
      
      setNilai(input.dataset.grade, val);
      showAlert("Nilai berhasil disimpan", "success");
      renderKHS(container);
    });
  });
}
