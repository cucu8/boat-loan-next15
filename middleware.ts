// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;

    // If the user has a token and tries to access login or register, redirect to home
    if (token && (pathname === "/login" || pathname === "/register")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // This block is now primarily for logging or specific custom redirects
    // if next-auth's default unauthorized redirect isn't sufficient for these paths.
    // However, the 'authorized' callback will handle the primary protection.
    if (
      !token &&
      (pathname === "/add-boat" ||
        pathname === "/my-boats" ||
        pathname.startsWith("/profile")) // Use startsWith for '/profile/:path*'
    ) {
      console.log(
        "Oturum kapalı, korunan bir sayfaya erişim engellendi. Giriş sayfasına yönlendiriliyor."
      );
      // next-auth's default redirect will usually handle this,
      // but this custom redirect ensures it.
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Continue normal flow for all other cases
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow access to login/register pages regardless of token presence for the initial load.
        // If a token exists AND user tries to access login/register, the `middleware` function
        // above will handle the redirect to '/'.
        if (pathname === "/login" || pathname === "/register") {
          return true;
        }

        // For all other routes specified in matcher, require a token.
        // If no token, next-auth will redirect to the configured signIn page.
        // If there is a token, the middleware function runs.
        return !!token; // Returns true if token exists, false otherwise.
      },
    },
    // Specify your default sign-in page if it's not the default '/api/auth/signin'
    // pages: {
    //   signIn: '/login', // Example, adjust if your login page is different
    // },
  }
);

// Middleware will run for these paths
export const config = {
  matcher: ["/login", "/register", "/add-boat", "/my-boats", "/profile/:path*"],
};
