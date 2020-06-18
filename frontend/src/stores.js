import { writable } from 'svelte/store';

export const username = writable('');
export const notifications = writable();
export const messages = writable();
// If the username is initialized
export const hasUsername = writable(false);
