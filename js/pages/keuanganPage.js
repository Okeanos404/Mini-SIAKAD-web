import { showAlert } from "../core/alert.js";

// Dummy data tagihan (bisa dipindah ke storage jika ingin stateful)
let tagihan = [
  { id: "INV-1001", nama: "SPP Bulan Juli", nominal: 500000, status: "Belum Lunas" },
  { id: "INV-1002", nama: "Uang Gedung & Seragam", nominal: 1500000, status: "Lunas" }
];

export function renderKeuangan(container) {
  container.innerHTML = `
    <h3>Pembayaran & Keuangan</h3>
    <p>Lihat invoice dan lakukan pembayaran secara mandiri.</p>
    
    <div class="card">
      <h4>Daftar Tagihan</h4>
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>ID Invoice</th>
              <th>Nama Tagihan</th>
              <th>Nominal</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody id="tagihanBody">
            ${renderTagihanRows()}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modul Pembayaran (Hidden secara default) -->
    <div id="paymentModule" class="card" style="display: none;">
      <h4>Bayar Tagihan: <span id="payInvoiceName"></span></h4>
      <p>Nominal: <strong>Rp <span id="payNominal"></span></strong></p>
      
      <div class="form-group">
        <label>Pilih Metode Pembayaran:</label>
        <select id="paymentMethod" style="width: 100%; padding: 0.5rem;">
          <optgroup label="Bank Virtual Account">
            <option value="BCA">BCA Virtual Account</option>
            <option value="MANDIRI">Mandiri Virtual Account</option>
          </optgroup>
          <optgroup label="E-Wallet">
            <option value="GOPAY">GoPay</option>
            <option value="OVO">OVO</option>
          </optgroup>
        </select>
      </div>

      <button id="confirmPayBtn" class="btn btn-primary" style="margin-top: 1rem;">Bayar Sekarang</button>
      <button id="cancelPayBtn" class="btn btn-secondary" style="margin-top: 1rem;">Batal</button>
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

  bindKeuanganActions(container);
}

function renderTagihanRows() {
  return tagihan.map(t => `
    <tr>
      <td data-label="ID Invoice">${t.id}</td>
      <td data-label="Nama Tagihan">${t.nama}</td>
      <td data-label="Nominal">Rp ${t.nominal.toLocaleString("id-ID")}</td>
      <td data-label="Status">
        <span style="color: ${t.status === "Lunas" ? "green" : "red"}; font-weight: bold;">
          ${t.status}
        </span>
      </td>
      <td data-label="Aksi">
        ${t.status === "Belum Lunas" 
          ? `<button class="btn btn-primary btn-pay" data-id="${t.id}">Bayar</button>` 
          : `-`
        }
      </td>
    </tr>
  `).join("");
}

function bindKeuanganActions(container) {
  const payButtons = container.querySelectorAll(".btn-pay");
  const paymentModule = document.getElementById("paymentModule");
  let currentPayId = null;

  payButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      currentPayId = btn.dataset.id;
      const t = tagihan.find(x => x.id === currentPayId);
      
      document.getElementById("payInvoiceName").innerText = t.nama;
      document.getElementById("payNominal").innerText = t.nominal.toLocaleString("id-ID");
      paymentModule.style.display = "block";
    });
  });

  document.getElementById("cancelPayBtn").addEventListener("click", () => {
    paymentModule.style.display = "none";
    currentPayId = null;
  });

  document.getElementById("confirmPayBtn").addEventListener("click", () => {
    if (!currentPayId) return;

    // Ubah status menjadi lunas
    const index = tagihan.findIndex(x => x.id === currentPayId);
    if (index !== -1) {
      tagihan[index].status = "Lunas";
    }

    showAlert("Pembayaran berhasil diproses!", "success");
    paymentModule.style.display = "none";
    currentPayId = null;
    
    // Re-render
    renderKeuangan(container);
  });
}
