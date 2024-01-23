import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const domain = request.nextUrl.pathname;
  
  const publicPath = domain==="/signup" || domain==="/login" || domain == "/verifyemail";


  //If left side of OR gives empty string value, null, undefined then right one empty string is considered.
  // ? is for it might be there i.e "value" attribute
  const token = request.cookies.get("token")?.value || '';
  if(publicPath && token){
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if(!publicPath && !token){
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/signup",
    "/profile",
    "/login",
    "/verifyemail"
  ],
}