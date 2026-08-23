import { getKRS } from "../akademik/rencana.js";

export function renderJadwal(container) {
  const krs = getKRS();

  if (krs.length === 0) {
    container.innerHTML = `
      <h3>Jadwal Pelajaran</h3>
      <p>Belum ada mata pelajaran diambil.</p>
    `;
    return;
  }

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
  const timeslots = [
    { start: "08:00", end: "09:00", type: "course" },
    { start: "09:00", end: "10:00", type: "course" },
    { start: "10:00", end: "10:45", type: "break", label: "ISTIRAHAT 1" },
    { start: "10:45", end: "11:45", type: "course" },
    { start: "11:45", end: "12:30", type: "break", label: "ISTIRAHAT 2" },
    { start: "12:30", end: "13:30", type: "course" },
    { start: "13:30", end: "14:30", type: "course" }
  ];
  
  let tableHtml = `<div class="table-wrapper"><table class="table" style="text-align: center;">
    <thead>
      <tr>
        <th style="width: 15%">Waktu</th>
        ${days.map(d => `<th>${d}</th>`).join("")}
      </tr>
    </thead>
    <tbody>`;
    
  timeslots.forEach(slot => {
    if (slot.type === "break") {
      tableHtml += `
        <tr class="break-row">
          <td data-label="Istirahat" colspan="6">${slot.start} - ${slot.end} : ${slot.label}</td>
        </tr>
      `;
    } else {
      tableHtml += `<tr><td data-label="Waktu">${slot.start} - ${slot.end}</td>`;
      days.forEach(day => {
        const course = krs.find(c => c.day === day && c.start === slot.start);
        tableHtml += `<td data-label="${day}">${course ? course.name : '-'}</td>`;
      });
      tableHtml += `</tr>`;
    }
  });

  tableHtml += `</tbody></table></div>`;

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <h3>Jadwal Pelajaran</h3>
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
      <h4 style="margin-bottom: 1rem; text-align: center;">Jadwal Pelajaran</h4>
      ${tableHtml}
    </div>
  `;

  if (typeof window.anime !== 'undefined') {
    window.anime.timeline({ easing: 'easeOutQuart' })
    .add({
      targets: container.querySelectorAll('h3, p, .btn'),
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      delay: window.anime.stagger(150)
    })
    .add({
      targets: container.querySelectorAll('.card'),
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      delay: window.anime.stagger(150)
    }, '-=500');
  }

  const btn = document.getElementById("downloadPdfBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      const element = document.getElementById("printArea");
      html2pdf().set({
        margin: 10,
        filename: 'Jadwal_Pelajaran.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
      }).from(element).save();
    });
  }
}
