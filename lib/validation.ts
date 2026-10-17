export function isValidCryptoAddress(address: string, network: string): boolean {
  const cleaned = address.trim();
  if (!cleaned) return false;

  const normalized = network.toLowerCase();

  if (normalized.includes("bnb") || normalized.includes("bsc") || normalized.includes("ethereum")) {
    return /^0x[a-fA-F0-9]{40}$/i.test(cleaned);
  }

  return cleaned.length >= 10;
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function sanitizeAmount(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "0";
  return trimmed.replace(/[^\d.]/g, "").replace(/(\.\d*)\./g, "$1");
}
