import { getKRS, totalJP } from "../akademik/rencana.js";
import { getUser } from "../core/auth.js";

/* =====================
RENDER PAGE
===================== */
export function renderKRS(container) {
  const krs = getKRS();
  const user = getUser();

  container.innerHTML = `
    <h3>Mata Pelajaran Saya</h3>
    <p>Paket mata pelajaran untuk: <strong>${user.name}</strong> (Kelas ${user.kelas} ${user.jurusan ? user.jurusan : ''})</p>

    <div class="card">
      <strong>Total JP:</strong> ${totalJP(krs)}
    </div>

    <div class="card">
      <h4>Daftar Mata Pelajaran</h4>
      ${renderKRSList(krs)}
    </div>
  `;

  if (typeof window.anime !== 'undefined') {
    window.anime.timeline({ easing: 'easeOutExpo' })
    .add({
      targets: container.querySelectorAll('h3, p'),
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
}

/* =====================
RENDER KRS DIAMBIL
===================== */
function renderKRSList(krs) {
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
            <th>Hari</th>
            <th>Jam</th>
          </tr>
        </thead>
        <tbody>
          ${krs.map(course => `
            <tr>
              <td data-label="Kode">${course.code}</td>
              <td data-label="Mata Pelajaran">${course.name}</td>
              <td data-label="JP">${course.jp}</td>
              <td data-label="Hari">${course.day}</td>
              <td data-label="Jam">${course.start} - ${course.end}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}
