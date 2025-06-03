import CryptoJS from "crypto-js";
import https from "https";
const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPT_SECRET;

// Self-signed sertifikaları kabul eden HTTPS agent
export const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // DİKKAT: sadece development için uygundur
});

export const encrypt = (text: string) => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY!).toString();
};

export const decrypt = (cipherText: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY!);
  return bytes.toString(CryptoJS.enc.Utf8);
};
