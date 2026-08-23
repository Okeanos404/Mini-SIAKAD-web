import { load, save } from "../core/storage.js";
import { showAlert } from "../core/alert.js";
import { getUser } from "../core/auth.js";
import { studentP5 } from "../data/dummyData.js";

const P5_KEY = "siakad_p5";
const p5Dimensions = [
  { id: "p5_1", name: "Beriman, Bertakwa kpd Tuhan YME, dan Berakhlak Mulia" },
  { id: "p5_2", name: "Berkebinekaan Global" },
  { id: "p5_3", name: "Bergotong Royong" },
  { id: "p5_4", name: "Mandiri" },
  { id: "p5_5", name: "Bernalar Kritis" },
  { id: "p5_6", name: "Kreatif" }
];

export function renderIPK(container) {
  const user = getUser();
  const allP5Data = load(P5_KEY, {});
  const p5Data = allP5Data[user.nisn] || studentP5[user.nisn] || {};

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <h3>Rapor Projek Penguatan Profil Pelajar Pancasila (P5)</h3>
      <button id="downloadPdfBtn" class="btn btn-danger" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">Download PDF</button>
    </div>

    <div id="printArea" class="card">
      <div style="display: flex; align-items: center; border-bottom: 2px solid var(--primary); padding-bottom: 1rem; margin-bottom: 1.5rem;">
        <img src="assets/img/logo-new.png" alt="Logo" style="width: 60px; height: auto; margin-right: 15px;">
        <div>
          <h3 style="margin: 0; color: var(--primary);">SIAP Merdeka</h3>
          <p style="margin: 0; font-size: 0.85rem; color: #555;">Sistem Informasi Akademik Pelajar SMA</p>
        </div>
      </div>

      <div style="margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border);">
        <h3 style="text-align: center; margin-bottom: 1.5rem;">Capaian Rapor P5</h3>
      <h4>Capaian Dimensi</h4>
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Dimensi</th>
              <th>Predikat Capaian</th>
            </tr>
          </thead>
          <tbody>
            ${p5Dimensions.map(dim => `
              <tr>
                <td data-label="Dimensi">${dim.name}</td>
                <td data-label="Predikat Capaian">
                  <select data-p5="${dim.id}">
                    <option value="" disabled ${!p5Data[dim.id] ? "selected" : ""}>Pilih Predikat...</option>
                    ${["BB", "MB", "BSH", "SB"].map(p => `
                      <option value="${p}" ${p5Data[dim.id] === p ? "selected" : ""}>${p}</option>
                    `).join("")}
                  </select>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
      <div style="margin-top: 1rem; font-size: 0.9em; color: #666;">
        <strong>Keterangan:</strong><br>
        BB: Belum Berkembang<br>
        MB: Mulai Berkembang<br>
        BSH: Berkembang Sesuai Harapan<br>
        SB: Sangat Berkembang
      </div>
    </div>
  `;

  if (typeof window.anime !== 'undefined') {
    window.anime.timeline({ easing: 'easeOutExpo' })
    .add({
      targets: container.querySelectorAll('h3, .btn'),
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      delay: window.anime.stagger(100)
    })
    .add({
      targets: container.querySelectorAll('.card'),
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      delay: window.anime.stagger(100)
    }, '-=400');
  }

  const selects = container.querySelectorAll("select[data-p5]");
  selects.forEach(select => {
    select.addEventListener("change", () => {
      const user = getUser();
      const allP5Data = load(P5_KEY, {});
      const p5Data = allP5Data[user.nisn] || studentP5[user.nisn] || {};
      p5Data[select.dataset.p5] = select.value;
      allP5Data[user.nisn] = p5Data;
      save(P5_KEY, allP5Data);
      showAlert("Predikat P5 berhasil disimpan", "success");
    });
  });

  const btn = document.getElementById("downloadPdfBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      const element = document.getElementById("printArea");
      html2pdf().set({
        margin: 10,
        filename: 'Rapor_P5.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).from(element).save();
    });
  }
}
