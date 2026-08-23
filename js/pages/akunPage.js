import { getUser, login } from "../core/auth.js";
import { showAlert } from "../core/alert.js";

export function renderAkun(container) {
  const user = getUser();
  
  // Ensure default values exist if old dummy data is loaded
  const gender = user.gender || "Laki-laki";
  const tglLahir = user.tglLahir || "";
  const umur = user.umur || "";
  const alamat = user.alamat || "";
  const avatar = user.avatar || null;
  
  const avatarHtml = avatar 
    ? `<img src="${avatar}" id="avatarPreview" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 10px; border: 2px solid var(--primary);">`
    : `<div id="avatarPreview" style="width: 100px; height: 100px; border-radius: 50%; background: var(--accent); color: white; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin-bottom: 10px; font-weight: bold;">${user.name.charAt(0)}</div>`;

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <h3>Pengaturan Akun Lengkap</h3>
    </div>
    <div class="card akun-card" style="width: 100%; max-width: 850px; margin: 0 auto;">
      <form id="akunForm">
        
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 2.5rem;">
          ${avatarHtml}
          <label for="akunAvatar" class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.5rem 1rem; cursor: pointer; border-radius: 20px;">
            📸 Ganti Foto Profil
          </label>
          <input type="file" id="akunAvatar" accept="image/*" style="display: none;" />
        </div>

        <div class="form-group" style="margin-bottom: 1.5rem;">
          <label for="akunNama">Nama Lengkap</label>
          <input type="text" id="akunNama" value="${user.name}" required style="padding: 0.8rem;" />
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
          <div class="form-group" style="margin-bottom: 0;">
            <label for="akunGender">Jenis Kelamin</label>
            <select id="akunGender" style="padding: 0.8rem; width: 100%;">
              <option value="Laki-laki" ${gender === 'Laki-laki' ? 'selected' : ''}>Laki-laki</option>
              <option value="Perempuan" ${gender === 'Perempuan' ? 'selected' : ''}>Perempuan</option>
            </select>
          </div>
          <div class="form-group" style="margin-bottom: 0;">
            <label for="akunTglLahir">Tanggal Lahir</label>
            <input type="date" id="akunTglLahir" value="${tglLahir}" style="padding: 0.8rem; width: 100%;" />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
          <div class="form-group" style="margin-bottom: 0;">
            <label for="akunUmur">Umur</label>
            <input type="number" id="akunUmur" value="${umur}" placeholder="Misal: 16" style="padding: 0.8rem; width: 100%;" />
          </div>
          <div class="form-group" style="margin-bottom: 0;">
            <label for="akunAlamat">Alamat Tempat Tinggal</label>
            <input type="text" id="akunAlamat" value="${alamat}" placeholder="Misal: Jl. Merdeka No 1" style="padding: 0.8rem; width: 100%;" />
          </div>
        </div>

        <hr style="margin: 2rem 0; border: 0; border-top: 1px dashed var(--border);">

        <div class="form-group" style="margin-bottom: 1.5rem;">
          <label for="akunPassword">Password Baru (Opsional)</label>
          <input type="password" id="akunPassword" placeholder="Kosongkan jika tidak ingin diubah" style="padding: 0.8rem;" />
        </div>
        
        <div style="margin-top: 2rem;">
          <button type="submit" class="btn btn-primary btn-block" style="padding: 0.9rem; font-size: 1rem; border-radius: 8px;">💾 Simpan Perubahan Data</button>
        </div>
      </form>
    </div>
  `;
  
  if (typeof window.anime !== 'undefined') {
    window.anime.timeline({ easing: 'easeOutExpo' })
    .add({
      targets: container.querySelectorAll('h3'),
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600
    })
    .add({
      targets: container.querySelectorAll('.akun-card'),
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600
    }, '-=400')
    .add({
      targets: container.querySelectorAll('.form-group, #avatarPreview, label'),
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 400,
      delay: window.anime.stagger(50)
    }, '-=400');
  }

  let currentAvatarBase64 = avatar;

  // Handle avatar file selection
  const avatarInput = document.getElementById("akunAvatar");
  avatarInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        currentAvatarBase64 = event.target.result;
        const preview = document.getElementById("avatarPreview");
        // Replace div with img if it was a div
        if (preview.tagName.toLowerCase() === 'div') {
          preview.outerHTML = `<img src="${currentAvatarBase64}" id="avatarPreview" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 10px; border: 2px solid var(--primary);">`;
        } else {
          preview.src = currentAvatarBase64;
        }
      };
      reader.readAsDataURL(file);
    }
  });

  document.getElementById("akunForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const newName = document.getElementById("akunNama").value;
    const newPassword = document.getElementById("akunPassword").value;
    
    const updatedUser = { 
      ...user, 
      name: newName,
      gender: document.getElementById("akunGender").value,
      tglLahir: document.getElementById("akunTglLahir").value,
      umur: document.getElementById("akunUmur").value,
      alamat: document.getElementById("akunAlamat").value,
      avatar: currentAvatarBase64
    };
    
    if (newPassword.trim() !== "") {
      updatedUser.password = newPassword;
    }
    
    // Save updated user to local storage
    login(updatedUser); 
    
    // Update Header UI instantly
    const headerName = document.getElementById("userName");
    const headerAvatar = document.getElementById("userAvatar");
    if(headerName) headerName.textContent = updatedUser.name;
    if(headerAvatar) {
      if (updatedUser.avatar) {
        headerAvatar.innerHTML = `<img src="${updatedUser.avatar}" alt="Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
      } else {
        headerAvatar.innerHTML = '';
        headerAvatar.textContent = updatedUser.name.charAt(0).toUpperCase();
      }
    }
    
    showAlert("Profil berhasil diperbarui secara lengkap!", "success");
    
    // Clear password field after save
    document.getElementById("akunPassword").value = "";
  });
}
