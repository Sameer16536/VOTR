"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import axios from "axios";
import { BACKEND_URL } from "../utils";
import { useEffect } from "react";

export const AppBar = () => {
  const { publicKey, signMessage } = useWallet();

  const signAndSend = async () => {
    if (!publicKey) {
      return;
    }

    //Check the text here later
    const message = new TextEncoder().encode("Hello World");
    const signature = await signMessage?.(message);
    console.log(signature);
    console.log(publicKey);
    const response = await axios.post(`${BACKEND_URL}/v1/user/signin`, {
      signature: signature,
      publicKey: publicKey.toString(),
    });
    console.log(response);
    localStorage.setItem("token", response.data.token);
  };

  useEffect(() => {
    signAndSend();
  }, [publicKey]);
  return <div className="flex justify-between border-b pb-2 pt-2">
  <div className="text-2xl pl-4 flex justify-center pt-3">
      VOTR
  </div>
  <div className="text-xl pr-4 pb-2">
      {publicKey  ? <WalletDisconnectButton  /> : <WalletMultiButton />}
  </div>
</div>
};
