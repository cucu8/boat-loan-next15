// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;
    console.log("Middleware çalışıyor, token:", token, "pathname:", pathname);

    if (token && (pathname === "/login" || pathname === "/register")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Senaryo 2: Kullanıcı oturum açmamışsa ve /add-boat sayfasına gitmeye çalışıyorsa
    if (!token && pathname === "/add-boat") {
      console.log(
        "Oturum kapalı, /add-boat'a erişim engellendi. Ana sayfaya yönlendiriliyor."
      );
      // İstek ana sayfaya yönlendiriliyor, login sayfasına değil.
      return NextResponse.redirect(new URL("/login", req.url));
    }
    // Diğer tüm durumlar için normal akışı devam ettir
    return NextResponse.next();
  },
  {
    callbacks: {
      // Bu callback, middleware'in çalıştırılıp çalıştırılmayacağını belirler.
      // Her zaman çalışmasını istiyorsanız true döndürebilirsiniz,
      // ancak belirli rotaları korumak için daha spesifik mantık ekleyebilirsiniz.
      authorized: ({ token, req }) => {
        // Eğer kullanıcı login veya register sayfasına gidiyorsa
        // ve token varsa (yani oturum açmışsa), middleware'in çalışması gerekir.
        // Bu, yukarıdaki redirect mantığının tetiklenmesini sağlar.
        if (
          (req.nextUrl.pathname === "/login" ||
            req.nextUrl.pathname === "/register") &&
          token
        ) {
          return true;
        }
        // Diğer durumlar için, token varsa veya korunması gereken bir rotada değilse
        // middleware'in çalışmasına gerek kalmaz (veya yetkilendirme mantığına göre karar verir).
        // Genellikle, protected route'lar için buraya 'token' kontrolü eklenir.
        // Bu senaryoda sadece login/register için yönlendirme istediğimizden
        // bu callback'i basit tutabiliriz.
        return true;
      },
    },
  }
);

// Middleware'in hangi yollarda çalışacağını belirtin
export const config = {
  matcher: ["/login", "/register", "/add-boat"], // Sadece login ve register sayfalarında çalışsın
};
