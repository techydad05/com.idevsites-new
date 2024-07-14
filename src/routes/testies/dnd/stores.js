import { writable } from 'svelte/store';
import { IceCream } from 'lucide-svelte';

export const elements = writable([
  { type: 'button', icon: '/logo.svg', class: 'btn btn-primary', content: 'Button' },
  // Add more elements here
]);

export const pageElements = writable([]);
