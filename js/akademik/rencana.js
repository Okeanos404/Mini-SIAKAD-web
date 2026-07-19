import { getUser } from "../core/auth.js";
import { courses } from "../data/dummyData.js";

export function getKRS() {
  const user = getUser();
  if (!user) return [];

  if (user.kelas.startsWith("10")) {
    return courses["10"] || [];
  } else if (user.jurusan === "IPA") {
    return courses["IPA"] || [];
  } else if (user.jurusan === "IPS") {
    return courses["IPS"] || [];
  }
  return [];
}

export function totalJP(krs) {
  return krs.reduce((sum, c) => sum + c.jp, 0);
}
