import { load, save } from "../core/storage.js";
import { getUser } from "../core/auth.js";
import { studentGrades } from "../data/dummyData.js";

const NILAI_KEY = "siakad_nilai";

export function getNilai() {
  const user = getUser();
  if (!user) return [];
  
  // Try local storage for this specific user
  const allNilai = load(NILAI_KEY, {});
  if (allNilai[user.nisn]) return allNilai[user.nisn];
  
  // Fallback to dummy data
  return studentGrades[user.nisn] || [];
}

export function setNilai(code, grade) {
  const user = getUser();
  if (!user) return;
  
  const allNilai = load(NILAI_KEY, {});
  const userNilai = allNilai[user.nisn] || (studentGrades[user.nisn] ? [...studentGrades[user.nisn]] : []);
  
  const idx = userNilai.findIndex(n => n.code === code);

  if (idx >= 0) {
    userNilai[idx].grade = grade;
  } else {
    userNilai.push({ code, grade });
  }

  allNilai[user.nisn] = userNilai;
  save(NILAI_KEY, allNilai);
}
