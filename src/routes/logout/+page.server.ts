import type { PageServerLoad } from "./$types"
import { AUTH_AUTH0_ID, AUTH_AUTH0_SECRET, AUTH_AUTH0_ISSUER } from '$env/static/private';
import { getBaseUrl } from "$lib/utils/urls";
 
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (events) => {
	redirect(307, `${AUTH_AUTH0_ISSUER}/oidc/logout?client_id=${AUTH_AUTH0_ID}&post_logout_redirect_uri=${getBaseUrl(events.request.url)}`);
}