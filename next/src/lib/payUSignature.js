import crypto from "crypto";

export function generatePayUSignature({ apiKey, merchantId, referenceCode, amount, currency }) {
  const plain = `${apiKey}~${merchantId}~${referenceCode}~${amount}~${currency}`;
  return crypto.createHash("md5").update(plain).digest("hex");
}
