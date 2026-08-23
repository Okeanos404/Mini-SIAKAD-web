import { getUser } from "../core/auth.js";
import { showAlert } from "../core/alert.js";

export function renderAsesmen(container) {
  const user = getUser();

  if (!user.kelas.startsWith("10")) {
    container.innerHTML = `
      <h3>Penentuan Jurusan</h3>
      <div class="card">
        <p>Anda sudah berada di <strong>Kelas ${user.kelas}</strong> dengan jurusan <strong>${user.jurusan}</strong>.</p>
        <p>Asesmen bakat dan minat hanya diperuntukkan bagi siswa Kelas 10 (Fase E).</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <h3>Asesmen Bakat dan Minat (Penentuan Jurusan)</h3>
    <p>Silakan isi kuesioner berikut untuk mengetahui kecocokan minat jurusan di Kelas 11.</p>

    <div class="card">
      <form id="asesmenForm">
        <div class="form-group" style="margin-bottom: 1rem;">
          <label>1. Mata pelajaran apa yang paling Anda sukai?</label>
          <select id="q1" required style="width: 100%; padding: 0.5rem; margin-top: 0.5rem;">
            <option value="" disabled selected>Pilih...</option>
            <option value="IPA">Matematika / IPA</option>
            <option value="IPS">IPS / Sejarah / Ekonomi</option>
            <option value="BAHASA">Bahasa / Sastra</option>
          </select>
        </div>
        
        <div class="form-group" style="margin-bottom: 1rem;">
          <label>2. Apa hobi Anda?</label>
          <select id="q2" required style="width: 100%; padding: 0.5rem; margin-top: 0.5rem;">
            <option value="" disabled selected>Pilih...</option>
            <option value="IPA">Eksperimen, Merakit sesuatu, Coding</option>
            <option value="IPS">Membaca berita, Berorganisasi, Diskusi</option>
            <option value="BAHASA">Menulis, Membaca buku fiksi, Public speaking</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary">Lihat Hasil Rekomendasi</button>
      </form>

      <div id="asesmenResult" style="margin-top: 1.5rem; display: none;" class="alert alert-success">
        <strong>Rekomendasi Jurusan:</strong> <span id="rekomendasiText"></span>
      </div>
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

  const form = document.getElementById("asesmenForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q1 = document.getElementById("q1").value;
    const q2 = document.getElementById("q2").value;

    let rekomendasi = "MIPA (Matematika dan Ilmu Pengetahuan Alam)";
    if (q1 === "IPS" || q2 === "IPS") {
      rekomendasi = "IPS (Ilmu Pengetahuan Sosial)";
    }
    if (q1 === "BAHASA" && q2 === "BAHASA") {
      rekomendasi = "Ilmu Bahasa dan Budaya";
    }

    const resultDiv = document.getElementById("asesmenResult");
    const textSpan = document.getElementById("rekomendasiText");
    textSpan.innerText = rekomendasi;
    resultDiv.style.display = "block";
    showAlert("Asesmen berhasil diselesaikan", "success");
  });
}
