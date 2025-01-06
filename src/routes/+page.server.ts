import type { PageServerLoad } from "./$types"
import {db} from "$lib/server/db"
import {farms, butchers} from "$lib/server/db/schema"
 
export const load: PageServerLoad = async (events) => {
  const session = await events.locals.auth()

  const farmList = await db.select().from(farms).all();
  const butcherList = await db.select().from(butchers).all();
 
  return {
    session, 
    farmList,
    butcherList
  }
}