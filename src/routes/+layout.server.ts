import { redirect } from "@sveltejs/kit"
import type { LayoutServerLoad } from "./$types"
import { getBaseUrl } from "$lib/utils/urls";
 
export const load: LayoutServerLoad = async (events) => {
  const session = await events.locals.auth()
 
  return {
    session,
    baseUrl: getBaseUrl(events.request.url)
  }
}