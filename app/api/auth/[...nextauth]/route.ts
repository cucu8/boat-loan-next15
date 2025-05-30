import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// ✅ Tip genişletmeleri
declare module "next-auth" {
  interface User {
    id?: string;
    email?: string;
    userType?: string;
    token?: string;
    name?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      userType: string;
      name: string;
    };
    accessToken: string;
  }
}

// ✅ NextAuth yapılandırması ayrı değişken olarak tanımlandı ve export edildi
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:3000/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const data = await res.json();

        if (res.ok && data?.token && data?.user) {
          return {
            id: data.user.id,
            email: data.user.email,
            userType: data.user.userType,
            token: data.token,
            name: data.user.name,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.userType = user.userType;
        token.accessToken = user.token;
        token.name = user.name;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        userType: token.userType as string,
        name: token.name as string,
      };
      session.accessToken = token.accessToken as string;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// ✅ handler ile NextAuth başlatılıyor
const handler = NextAuth(authOptions);

// ✅ route için export'lar
export { handler as GET, handler as POST };
