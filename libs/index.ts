// lib/agent.ts
import https from "https";

// Self-signed sertifikaları kabul eden HTTPS agent
export const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // DİKKAT: sadece development için uygundur
});
