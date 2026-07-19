export function calculateIPK(krs, nilai) {
  // We keep the function name to minimize changes in other places, 
  // but it now calculates average numeric score.
  let totalScore = 0;
  let totalJP = 0;

  krs.forEach(course => {
    const n = nilai.find(v => v.code === course.code);
    if (!n) return;

    // nilai.grade is now a numeric string like "85"
    totalScore += parseFloat(n.grade) * course.jp;
    totalJP += course.jp;
  });

  return totalJP === 0 ? 0 : (totalScore / totalJP).toFixed(2);
}
