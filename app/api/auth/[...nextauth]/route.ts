import { authOptions } from "@/libs/auth";
import NextAuth from "next-auth";
// authOptions'ı yeni konumundan import edin
// <-- Yolunuzu doğru ayarlayın (örn: "@/utils/auth")

// Tip genişletmelerini buradan kaldırın, çünkü lib/auth.ts'de tanımladık.
// declare module "next-auth" { ... } KODU BURADA OLMAMALI

// ✅ authOptions değişkeni burada tanımlanmış, ancak export EDİLMİYOR.
// const authOptions: NextAuthOptions = { ... NextAuth yapılandırmanız ... }; // Bu kod bloğu buraya taşındıysa, 'export'u kaldırın.

// ✅ handler ile NextAuth başlatılıyor
const handler = NextAuth(authOptions);

// ✅ route için export'lar (SADECE GET ve POST handler'ları)
export { handler as GET, handler as POST };
