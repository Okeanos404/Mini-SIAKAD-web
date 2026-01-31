import { courses } from "../data/dummyData.js";
import { getKRS, addCourse, removeCourse, totalSKS } from "../akademik/krs.js";
import { showAlert } from "../core/alert.js";

/* =====================
RENDER PAGE
===================== */
export function renderKRS(container) {
  const krs = getKRS();

  container.innerHTML = `
    <h3>Kartu Rencana Studi (KRS)</h3>

    <div class="card">
      <strong>Total SKS:</strong> ${totalSKS(krs)}
    </div>

    <div class="card">
      <h4>Daftar Mata Kuliah</h4>
      ${renderCourseTable()}
    </div>

    <div class="card">
      <h4>KRS Diambil</h4>
      ${renderKRSList(krs)}
    </div>
  `;

  bindKRSActions(container);
}

/* =====================
RENDER TABLE AVAILABLE
===================== */
function renderCourseTable() {
  return `
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th>Kode</th>
            <th>Nama</th>
            <th>SKS</th>
            <th>Hari</th>
            <th>Jam</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${courses.map(course => `
            <tr>
              <td>${course.code}</td>
              <td>${course.name}</td>
              <td>${course.sks}</td>
              <td>${course.day}</td>
              <td>${course.start} - ${course.end}</td>
              <td>
                <button class="btn btn-primary" data-code="${course.code}">
                  Ambil
                </button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

/* =====================
RENDER KRS DIAMBIL
===================== */
function renderKRSList(krs) {
  if (krs.length === 0) {
    return `<p>Belum ada mata kuliah diambil.</p>`;
  }

  return `
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th>Kode</th>
            <th>Nama</th>
            <th>SKS</th>
            <th>Hari</th>
            <th>Jam</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${krs.map(course => `
            <tr>
              <td>${course.code}</td>
              <td>${course.name}</td>
              <td>${course.sks}</td>
              <td>${course.day}</td>
              <td>${course.start} - ${course.end}</td>
              <td>
                <button class="btn btn-danger" data-remove="${course.code}">
                  Hapus
                </button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

/* =====================
BIND EVENT
===================== */
function bindKRSActions(container) {
  container.querySelectorAll("[data-code]").forEach(btn => {
    btn.addEventListener("click", () => {
      const course = courses.find(c => c.code === btn.dataset.code);
      const result = addCourse(course);

      if (!result.success) {
        showAlert(result.message, "error");
    } else {
        showAlert("Mata kuliah berhasil ditambahkan", "success");
    }


      renderKRS(container);
    });
  });

  container.querySelectorAll("[data-remove]").forEach(btn => {
    btn.addEventListener("click", () => {
      removeCourse(btn.dataset.remove);
      renderKRS(container);
    });
  });
}
