import HomePage from "@/components/Homepage";
import WalletContextProvider from "@/components/Wallet/context/wallet/ContextProvider";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <WalletContextProvider>
        <HomePage />
      </WalletContextProvider>
    </div>
  );
}
