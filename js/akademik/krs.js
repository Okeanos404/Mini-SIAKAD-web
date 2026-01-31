import { load, save } from "../core/storage.js";
import { isConflict } from "./jadwal.js";

const KRS_KEY = "siakad_krs";
const MAX_SKS = 24;

export function getKRS() {
  return load(KRS_KEY, []);
}

export function totalSKS(krs) {
  return krs.reduce((sum, c) => sum + c.sks, 0);
}

export function canAddCourse(krs, course) {
  if (totalSKS(krs) + course.sks > MAX_SKS) return false;
  return !krs.some(c => isConflict(c, course));
}

export function addCourse(course) {
  const krs = getKRS();

  if (!canAddCourse(krs, course)) {
    return { success: false, message: "SKS penuh atau jadwal bentrok" };
  }

  krs.push(course);
  save(KRS_KEY, krs);

  return { success: true };
}

export function removeCourse(code) {
  const krs = getKRS().filter(c => c.code !== code);
  save(KRS_KEY, krs);
}
