const alertBox = () => document.getElementById("alertContainer");

export function showAlert(message, type = "success") {
  const el = alertBox();
  if (!el) return;

  el.textContent = message;
  el.className = `alert alert-${type}`;
  el.classList.remove("hidden");

  setTimeout(() => {
    el.classList.add("hidden");
  }, 3000);
}
