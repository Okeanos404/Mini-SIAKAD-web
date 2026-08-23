import { getUser } from "../core/auth.js";
import { showAlert } from "../core/alert.js";

export function renderTKA(container) {
  const user = getUser();

  container.innerHTML = `
    <h3>Ujian TKA (Tes Kemampuan Akademik)</h3>
    <p>TKA dirancang untuk mengukur kemampuan akademik siswa secara terstandar berdasarkan rumpun keilmuan untuk evaluasi kelulusan dan seleksi PT.</p>
    
    <div class="card">
      <h4>Mata Pelajaran Wajib (Semua Jurusan)</h4>
      <ul>
        <li>Bahasa Indonesia</li>
        <li>Matematika</li>
        <li>Bahasa Inggris</li>
      </ul>
      
      ${user.jurusan ? `
        <h4 style="margin-top: 1rem;">Mata Pelajaran Rumpun Keilmuan (${user.jurusan})</h4>
        <ul>
          ${user.jurusan === "IPA" ? "<li>Fisika, Kimia, Biologi</li>" : "<li>Sosiologi, Ekonomi, Geografi</li>"}
        </ul>
      ` : ""}
    </div>

    <div class="card">
      <h4>Simulasi Ujian TKA</h4>
      <p>Mulai ujian simulasi TKA sekarang.</p>
      <button id="startTkaBtn" class="btn btn-primary">Mulai Simulasi TKA</button>
      
      <div id="tkaResult" style="display: none; margin-top: 1.5rem;" class="card">
        <h4>Hasil Evaluasi Kelulusan / Seleksi PT</h4>
        <div class="table-wrapper">
          <table class="table">
            <thead>
              <tr>
                <th>Mata Pelajaran</th>
                <th>Nilai (Skala 1000)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td data-label="Mata Pelajaran">Bahasa Indonesia</td><td data-label="Nilai (Skala 1000)" id="scoreIndo">-</td></tr>
              <tr><td data-label="Mata Pelajaran">Matematika</td><td data-label="Nilai (Skala 1000)" id="scoreMath">-</td></tr>
              <tr><td data-label="Mata Pelajaran">Bahasa Inggris</td><td data-label="Nilai (Skala 1000)" id="scoreInggris">-</td></tr>
              ${user.jurusan ? `<tr><td data-label="Mata Pelajaran">Tes Rumpun Ilmu (${user.jurusan})</td><td data-label="Nilai (Skala 1000)" id="scoreRumpun">-</td></tr>` : ""}
            </tbody>
          </table>
        </div>
        <p style="margin-top: 1rem; color: #0056b3;"><strong>Status:</strong> <span id="statusTka">Memenuhi Syarat Kelulusan Dasar</span></p>
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

  const startBtn = document.getElementById("startTkaBtn");
  startBtn.addEventListener("click", () => {
    // Generate random scores between 400 and 800
    const randomScore = () => Math.floor(Math.random() * (800 - 400 + 1)) + 400;
    
    document.getElementById("scoreIndo").innerText = randomScore();
    document.getElementById("scoreMath").innerText = randomScore();
    document.getElementById("scoreInggris").innerText = randomScore();
    
    if (user.jurusan) {
      document.getElementById("scoreRumpun").innerText = randomScore();
    }
    
    document.getElementById("tkaResult").style.display = "block";
    startBtn.style.display = "none";
    showAlert("Simulasi TKA Selesai", "success");
  });
}
