import { load, save } from "../core/storage.js";

const NILAI_KEY = "siakad_nilai";

export function getNilai() {
  return load(NILAI_KEY, []);
}

export function setNilai(code, grade) {
  const nilai = getNilai();
  const idx = nilai.findIndex(n => n.code === code);

  if (idx >= 0) {
    nilai[idx].grade = grade;
  } else {
    nilai.push({ code, grade });
  }

  save(NILAI_KEY, nilai);
}
