import { useState, useCallback } from 'react';
import { ethers, formatUnits } from 'ethers';
import { ADDRESSES } from '@/lib/contracts/addresses';
import { PRESALE_ABI, ERC20_ABI } from '@/lib/contracts/abis';
import { getWeb3Provider } from '@/lib/web3/provider';
import { toast } from '@/components/ui/use-toast';
import { UCCInfo, UserIncomes, UserLevelDetail, UserUCCInfo } from '@/lib/types';
import { connect, getAccount, readContract, waitForTransactionReceipt, writeContract } from '@wagmi/core';
import { injected } from '@wagmi/connectors';
import { config } from '@/lib/config';
import { parseEther } from 'viem';

export enum PurchaseStatus {
  IDLE = 'IDLE',
  APPROVING = 'APPROVING',
  APPROVED = 'APPROVED',
  PURCHASING = 'PURCHASING',
  CONFIRMED = 'CONFIRMED',
  ERROR = 'ERROR'
}

export function usePresale() {
  const [status, setStatus] = useState<PurchaseStatus>(PurchaseStatus.IDLE);
  const [userAddress, setUserAddress] = useState<string>("");
  const [curPage, setCurPage] = useState<number>(1);
  const [totalTokens, setTotalToken] = useState<number>(0);
  const [uccInfo, setUCCInfo] = useState<UCCInfo>({
    totalInvestmentsUSDT: 0, totalInvestmentsBNB: 0, totalUsers: 0, priceUSDT: 0, priceBNB: 0, totalTokensToBEDistributed: 0
  });
  const [userId, setUserId] = useState<number>(0);
  const defaultUserUccInfo: UserUCCInfo = {
    userId: 0, usersInfo: null, recentActivities: [], activityLength: 0, usersVirtualToken: 0, incomes: { currentRefIncomeUSDT: 0, currentRefIncomeBNB: 0, raw: [], ceilingLimit: 0 }, userTeamStats: {
      totalTeamBusiness: 0, totalTeamCount: 0
    }, userLevels: []
  };
  const [userUCCInfo, setUserUCCInfo] = useState<UserUCCInfo>({ ...defaultUserUccInfo });

  async function initWallet() {
    try {
      const account = getAccount(config);
      setUserAddress(account?.address || "");
      const ucci = await getUCCInfo();
      const useri = await getUserInfo(account?.address || "", curPage);
      setUCCInfo(ucci);
      setUserUCCInfo(useri);
    } catch (error) {
      console.error("Error initializing wallet:", error);
    }
  }
  async function getLevelDetails(userId: number, level: number): Promise<UserLevelDetail[]> {
    try {
      const details = await readContract(config, {
        abi: PRESALE_ABI,
        address: ADDRESSES.PRESALE,
        functionName: 'getLevelDetails',
        args: [userId, level],
      });
      return details as UserLevelDetail[];
    } catch (error) {
      console.error("Error fetching level details:", error);
      return [];
    }
  }
  // async function initWallet() {
  //   try {
  //     // const result = await connect(config, { connector: injected() })
  //     const account = getAccount(config)

  //     // Presale Contract
  //     // const ps = new ethers.Contract(
  //     //   ADDRESSES.PRESALE,
  //     //   PRESALE_ABI,
  //     //   _signer
  //     // );
  //     setUserAddress(account?.address || "");
  //     // console.log(account?.address || "");
  //     // console.log(_userAddress);
  //     const ucci = await getUCCInfo();
  //     const useri = await getUserInfo(account?.address || "", curPage);
  //     setUCCInfo(ucci);
  //     setUserUCCInfo(useri);
  //   } catch (error) {
  //     console.error(error);
  //   }

  // };

  const buyWithUSDT = async (amount: string, email: string) => {
    try {
      // Approve USDT
      const account = getAccount(config)
      const _userAddress = account.address || "";


      setStatus(PurchaseStatus.APPROVING);
      const parsedAmount = parseEther(amount);
      const urlParams = new URLSearchParams(window.location.search);
      const ref = parseInt(urlParams.get('ref') || '0') || 0;
      const approveTx = await writeContract(config, {
        abi: ERC20_ABI,
        address: ADDRESSES.USDT,
        functionName: 'approve',
        args: [
          ADDRESSES.PRESALE,
          parsedAmount,
        ],
      })

      const approveTxTransactionReceipt = waitForTransactionReceipt(config, {
        hash: approveTx,
      })
      approveTxTransactionReceipt.then(() => {
        setStatus(PurchaseStatus.APPROVED);
      })
      setStatus(PurchaseStatus.PURCHASING);

      // Buy tokens

      // const buyTx = await ps.buy(
      //   _userAddress,
      //   ref, // ref
      //   parsedAmount
      // );
      const buyTx = await writeContract(config, {
        abi: PRESALE_ABI,
        address: ADDRESSES.PRESALE,
        functionName: 'buy',
        args: [
          _userAddress,
          ref, // ref
          parsedAmount,
          email
        ],
        // value: parsedAmount
      })

      const buyTxTransactionReceipt = waitForTransactionReceipt(config, {
        hash: buyTx,
      })

      // Fetch and update only the necessary data
      const ucci = await getUCCInfo();
      const useri = await getUserInfo(_userAddress, 1);
      console.log(useri);

      buyTxTransactionReceipt.then(() => {
        setUCCInfo(ucci);
        setUserUCCInfo(useri);

        setStatus(PurchaseStatus.CONFIRMED);
        toast.success(
          "Purchase completed successfully!",
          {
            duration: 3000,
            position: "top-right",
          }
        );
        setStatus(PurchaseStatus.IDLE);
        window.location.reload();
      })


    } catch (error: any) {
      console.log(error.reason);
      setStatus(PurchaseStatus.ERROR);
      toast.error(
        error.reason,
        {
          duration: 3000,
          position: "top-right",
        }
      );
    }
  };

  const buyWithBNB = async (amount: string) => {
    try {

      const account = getAccount(config)
      const _userAddress = account.address || "";


      setStatus(PurchaseStatus.PURCHASING);
      const parsedAmount = parseEther(amount);
      console.log(parsedAmount);
      const urlParams = new URLSearchParams(window.location.search);
      const ref = parseInt(urlParams.get('ref') || '0') || 0;
      const buyTx = await writeContract(config, {
        abi: PRESALE_ABI,
        address: ADDRESSES.PRESALE,
        functionName: 'buy',
        args: [
          _userAddress,
          ref, // ref
          0,
        ],
        // value: parsedAmount
      })

      // Fetch and update only the necessary data
      const ucci = await getUCCInfo();
      const useri = await getUserInfo(_userAddress, 1);

      const buyTxTransactionReceipt = waitForTransactionReceipt(config, {
        hash: buyTx,
      })
      buyTxTransactionReceipt.then(() => {
        setUCCInfo(ucci);
        setUserUCCInfo(useri);
        setStatus(PurchaseStatus.CONFIRMED);
        toast.success(
          "Purchase completed successfully!",
          {
            duration: 3000,
            position: "top-right",
          }
        );
        setStatus(PurchaseStatus.IDLE);
        window.location.reload();
      })


    } catch (error: any) {
      console.log(error.reason);
      setStatus(PurchaseStatus.ERROR);
      toast.error(
        error.reason,
        {
          duration: 3000,
          position: "top-right",
        }
      );
    }
  };

  // const claimAvailableIcome = async () => {
  //   try {

  //     // Call the contract function
  //     await writeContract(config, {
  //       abi: PRESALE_ABI,
  //       address: ADDRESSES.PRESALE,
  //       functionName: 'claimAvailableIcome',
  //     });

  //     toast.success("Virtual tokens claimed successfully!", {
  //       duration: 3000,
  //       position: "top-right",
  //     });

  //     console.log("Claimed");

  //   } catch (error: any) {
  //     console.error(error);
  //     toast.error(error.reason || "An error occurred while claiming tokens.", {
  //       duration: 3000,
  //       position: "top-right",
  //     });
  //     console.log("Error claiming");
  //   }
  // };

  const claimAvailableIcome = async (userIncomes: UserIncomes) => {
    try {
      setStatus(PurchaseStatus.PURCHASING);
      // console.log(userIncomes.raw, userUCCInfo);
      const claimTx = await writeContract(config, {
        abi: PRESALE_ABI,
        address: ADDRESSES.PRESALE,
        functionName: 'claimAllAvailableIncome',
        // args: [userIncomes.raw[0]],
      });
      const claimTxTransactionReceipt = waitForTransactionReceipt(config, {
        hash: claimTx,
      })
      await claimTxTransactionReceipt;
      toast.success("Virtual tokens claimed successfully!", {
        duration: 3000,
        position: "top-right",
      });
      const updatedUCCInfo = await getUCCInfo();
      setUCCInfo(updatedUCCInfo);
      setStatus(PurchaseStatus.CONFIRMED);

    } catch (error: any) {
      console.error("Error claiming virtual tokens:", error);
      toast.error(error.reason || "An error occurred while claiming tokens.", {
        duration: 3000,
        position: "top-right",
      });
      setStatus(PurchaseStatus.ERROR);
    }
  };

  async function getUCCInfo(): Promise<UCCInfo> {
    try {
      const totalInvestmentsUSDT = await readContract(config, {
        abi: PRESALE_ABI,
        address: ADDRESSES.PRESALE,
        functionName: 'totalInvestmentsUSDT',
      });
      const totalInvestmentsBNB = await readContract(config, {
        abi: PRESALE_ABI,
        address: ADDRESSES.PRESALE,
        functionName: 'totalInvestmentsBNB',
      });
      const totalUsers: any = await readContract(config, {
        abi: PRESALE_ABI,
        address: ADDRESSES.PRESALE,
        functionName: 'totalUsers',
      });
      const priceUSDT = await readContract(config, {
        abi: PRESALE_ABI,
        address: ADDRESSES.PRESALE,
        functionName: 'price',
      });
      const priceBNB = await readContract(config, {
        abi: PRESALE_ABI,
        address: ADDRESSES.PRESALE,
        functionName: 'priceBNB',
      });
      const totalTokensToBEDistributed = await readContract(config, {
        abi: PRESALE_ABI,
        address: ADDRESSES.PRESALE,
        functionName: 'totalTokensToBEDistributed',
      });
      setTotalToken(b2i(totalTokensToBEDistributed));
      return {
        totalInvestmentsUSDT: b2i(totalInvestmentsUSDT),
        totalInvestmentsBNB: b2f(totalInvestmentsBNB),
        totalUsers,
        priceUSDT: b2f(priceUSDT),
        priceBNB: b2f(priceBNB),
        totalTokensToBEDistributed: b2i(totalTokensToBEDistributed, 9),
      };
    } catch (error: any) {
      console.error("Error fetching DERBY info:", error);
      return {
        totalInvestmentsUSDT: 0, totalInvestmentsBNB: 0, totalUsers: 0, priceUSDT: 0, priceBNB: 0, totalTokensToBEDistributed: 0
      };
    }
  }

  async function getUserInfo(ua: string, cpage: number): Promise<UserUCCInfo> {
    try {
      const userId: any = await readContract(config, {
        abi: PRESALE_ABI,
        address: ADDRESSES.PRESALE,
        functionName: 'id',
        args: [ua]
      });
      console.log({ userId });
      const usersInfo = await readContract(config, {
        abi: PRESALE_ABI,
        address: ADDRESSES.PRESALE,
        functionName: 'usersInfo',
        args: [userId]
      });
      console.log({ usersInfo });

      let activityLength: any = 0;
      let recentActivities: any = [];
      let usersVirtualToken: any = 0;
      let userLevels: any = [];
      let userTeamStats: any = {
        totalTeamBusiness: 0, totalTeamCount: 0, ceilingLimit: 0
      };
      let userIncomes: UserIncomes = {
        currentRefIncomeUSDT: 0, currentRefIncomeBNB: 0, ceilingLimit: 0, raw: []
      }
      if (parseInt(userId?.toString()) !== 0) {
        activityLength = await readContract(config, {
          abi: PRESALE_ABI,
          address: ADDRESSES.PRESALE,
          functionName: 'getUserActivitiesLength',
          args: [userId]
        });
        recentActivities = await readContract(config, {
          abi: PRESALE_ABI,
          address: ADDRESSES.PRESALE,
          functionName: 'getRecentActivities',
          args: [userId, cpage]
        });
        // console.log({ recentActivities })
        usersVirtualToken = await readContract(config, {
          abi: PRESALE_ABI,
          address: ADDRESSES.PRESALE,
          functionName: 'usersVirtualToken',
          args: [userId],
        }) || 0;
        userTeamStats = await readContract(config, {
          abi: PRESALE_ABI,
          address: ADDRESSES.PRESALE,
          functionName: 'getUserTeamStats',
          args: [userId],
        });
        // console.log({ usersVirtualToken, userTeamStats });
        userLevels = await readContract(config, {
          abi: PRESALE_ABI,
          address: ADDRESSES.PRESALE,
          functionName: 'getAllLevelDetails',
          args: [userId],
        });
        // console.log({ userLevels });
        const userIncomeRaw: any = await readContract(config, {
          abi: PRESALE_ABI,
          address: ADDRESSES.PRESALE,
          functionName: 'usersIncome',
          args: [userId],
        });
        // console.log({ userIncomeRaw });
        userIncomes = {
          currentRefIncomeUSDT: b2f(userIncomeRaw[0]),
          currentRefIncomeBNB: b2f(userIncomeRaw[1]),
          ceilingLimit: b2f(userIncomeRaw[2]),
          raw: userIncomeRaw
        }
      }
      return {
        userId: userId,
        usersInfo: userId === 0 ? null : usersInfo,
        recentActivities,
        activityLength: parseInt(activityLength.toString()),
        usersVirtualToken: usersVirtualToken,
        userLevels,
        incomes: userIncomes,
        userTeamStats: {
          totalTeamBusiness: b2i(userTeamStats[0] ?? 0),
          totalTeamCount: Number(userTeamStats[1] ?? 0),
        }
      };
    } catch (error: any) {
      console.error("Error fetching user info:", error);
      return { ...defaultUserUccInfo };
    }
  }

  const resetStatus = () => setStatus(PurchaseStatus.IDLE);

  return {
    status,
    uccInfo,
    userUCCInfo,
    userAddress,
    totalTokens,
    curPage,
    buyWithBNB,
    buyWithUSDT,
    claimAvailableIcome,
    setCurPage,
    resetStatus,
    initWallet,
    getLevelDetails
  };
}

export function b2i(amt: any, decimals: number = 18): number {
  return parseInt(formatUnits(amt, decimals));
}

export function b2f(amt: any, decimals: number = 18): number {
  return parseFloat(formatUnits(amt, decimals));
}
