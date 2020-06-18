import { writable } from "svelte/store";

export const username = writable("");
export const notifications = writable();
export const messages = writable();
export const isInitialized = writable(false);
