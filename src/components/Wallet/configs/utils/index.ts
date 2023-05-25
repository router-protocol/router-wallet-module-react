export * from "./injected";
export * from "./near";

export function shortenAddress(address: string, chars = 8): string {
  return `${address.substring(0, chars + 2)}...${address.substring(
    address.length - chars
  )}`;
}
