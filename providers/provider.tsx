"use client";

import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { usePresale as usePresaleHook } from "@/hooks/usePresale";

const PresaleContext = createContext<ReturnType<typeof usePresaleHook> | null>(
  null
);

export const PresaleProvider = ({ children }: { children: ReactNode }) => {
  const {
    status,
    uccInfo,
    userUCCInfo,
    userAddress,
    totalTokens,
    curPage,
    claimAvailableIcome,
    setCurPage,
    buyWithUSDT,
    buyWithBNB,
    resetStatus,
    initWallet,
    getLevelDetails,
    getRecentActivities
  } = usePresaleHook();

  useEffect(() => {
    initWallet().then(() => {
      console.log("done");
    });
  }, [curPage, userAddress, totalTokens]);

  return (
    <PresaleContext.Provider
      value={{
        status,
        uccInfo,
        userUCCInfo,
        userAddress,
        totalTokens,
        curPage,
        setCurPage,
        claimAvailableIcome,
        buyWithUSDT,
        buyWithBNB,
        resetStatus,
        initWallet,
        getLevelDetails,
        getRecentActivities
      }}
    >
      {children}
    </PresaleContext.Provider>
  );
};

export const usePresale = () => {
  const context = useContext(PresaleContext);
  if (!context) {
    throw new Error("usePresale must be used within a PresaleProvider");
  }
  return context;
};
