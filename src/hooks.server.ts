import { i18n } from '$lib/i18n';
import type { Handle } from '@sveltejs/kit';
export const handleLocalization: Handle = i18n.handle();
import { sequence } from '@sveltejs/kit/hooks';
import * as svelteAuth from '$lib/auth' 
import * as authGuard from '$lib/authguard'


// file -> src/hooks.server.ts

 

const handleAuth: Handle = svelteAuth.handle;

// Use the sequence helper to combine multiple handles
export const handle: Handle = sequence(handleAuth, authGuard.handle, handleLocalization);