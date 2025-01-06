import { redirect } from "@sveltejs/kit";

// define the routes of we want to be possible to access without auth
const public_paths = [
  '/signin',
  '/',
  '/logout'
];

// function to verify if the request path is inside the public_paths array
function isPathAllowed(path:string) {
  return public_paths.some(allowedPath =>
    path === allowedPath || path.startsWith(allowedPath + '/')
  );
}

export const handle = async ({ event, resolve} : {event: any, resolve: any}) => {
  const session = await event.locals.auth()
  let user = null
  // check if the cookie exist, and if exists, parse it to the user variable
  if(session?.user != undefined){
    user = session.user
  }
  const url = new URL(event.request.url);
  
  // validate the user existence and if the path is acceesible
  if (!user && !isPathAllowed(url.pathname)) {
    throw redirect(302, '/');
  }

  const response = await resolve(event)

  return response
}