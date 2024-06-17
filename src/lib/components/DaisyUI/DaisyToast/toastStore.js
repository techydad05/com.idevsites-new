import { writable } from 'svelte/store';

export const toasts = writable([]);

export function addToast({ title = "", type = "info", content = "", timer = 5000, isClose = true }) {
  const id = Date.now();
  toasts.update((all) => [...all, { id, title, type, content, timer, isClose }]);
  
  if (timer) {
    setTimeout(() => {
      removeToast(id);
    }, timer);
  }
}

export function removeToast(id) {
  toasts.update((all) => all.filter((toast) => toast.id !== id));
}
