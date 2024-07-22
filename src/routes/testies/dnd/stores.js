import { writable } from 'svelte/store';

export const elements = writable([
  { id: 1, type: 'button', icon: 'https://picsum.photos/50', content: 'Button' },
  // Add more elements here
]);

export const pageElements = writable([]);
