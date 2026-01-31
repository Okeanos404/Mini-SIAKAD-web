export function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function load(key, fallback = null) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : fallback;
}

export function clear(key) {
  localStorage.removeItem(key);
}
