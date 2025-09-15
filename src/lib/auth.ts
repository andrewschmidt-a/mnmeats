import { SvelteKitAuth } from "@auth/sveltekit"
import Auth0Provider from '@auth/core/providers/auth0';
import type { Provider } from '@auth/core/providers';
import Auth0 from "@auth/sveltekit/providers/auth0";
import { env } from '$env/dynamic/private';
 
export const { handle, signIn, signOut } = SvelteKitAuth({
    trustHost: true,
    secret: env.AUTH_SECRET || 'development-secret-please-change-in-production',
    providers: [Auth0],
  }) 