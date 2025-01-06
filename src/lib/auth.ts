import { SvelteKitAuth } from "@auth/sveltekit"
import Auth0Provider from '@auth/core/providers/auth0';
import type { Provider } from '@auth/core/providers';
import Auth0 from "@auth/sveltekit/providers/auth0";
 
export const { handle, signIn, signOut } = SvelteKitAuth({
    trustHost: true,
    providers: [Auth0],
  })

// export const logout = () => 