const gradePoint = {
  A: 4,
  B: 3,
  C: 2,
  D: 1,
  E: 0
};

export function calculateIPK(krs, nilai) {
  let totalBobot = 0;
  let totalSKS = 0;

  krs.forEach(course => {
    const n = nilai.find(v => v.code === course.code);
    if (!n) return;

    totalBobot += gradePoint[n.grade] * course.sks;
    totalSKS += course.sks;
  });

  return totalSKS === 0 ? 0 : (totalBobot / totalSKS).toFixed(2);
}
