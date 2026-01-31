export function isConflict(a, b) {
  return (
    a.day === b.day &&
    a.start < b.end &&
    a.end > b.start
  );
}
