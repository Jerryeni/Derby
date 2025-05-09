"use client";

import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SUPPORTED_TOKENS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { AmountInput } from "./amount-input";
import { PurchaseButton } from "./purchase-button";
import { ReferralStats } from "./referral-stats";
import { ActivitiesTable, Activity } from "@/components/ui/activities-table";
import { b2f, b2i, usePresale } from "@/hooks/usePresale";
import { toast } from "@/components/ui/use-toast";
import { LevelDetailsAccordion } from "./level-details";
import { UserIncomes, UserLevelDetail } from "@/lib/types";
interface TokenProgressProps {
  tokenUSDTPrice: number;
  tokenBNBPrice: number;
  tokensSold: number;
  totalTokens: number;
  userInfo: any;
  userId: number;
  userDepositsUSDT: number;
  userDepositsBNB: number;
  userEarningsBNB: number;
  userEarningsUSDT: number;
  userVirtualToken: number;
  userTokens: number;
  activities: Activity[];
  activitiesLength: number;
  progress: number;
  userTeamStats: any;
  userLevels: {
    level: BigInt;
    userCount: BigInt;
    totalAmount: BigInt;
  }[];
  getLevelDetails: (
    userId: number,
    level: number
  ) => Promise<UserLevelDetail[]>;
  userIncomes: UserIncomes;
}

export function TokenProgress({
  tokenUSDTPrice,
  tokenBNBPrice,
  tokensSold,
  totalTokens,
  userVirtualToken,
  userId,
  userInfo,
  userDepositsUSDT,
  userDepositsBNB,
  progress,
  userEarningsBNB,
  userEarningsUSDT,
  userTokens,
  activities,
  activitiesLength,
  userTeamStats,
  userLevels,
  getLevelDetails,
  userIncomes,
}: TokenProgressProps) {
  // const progress = (tokensSold / totalTokens) * 100;
  const [selectedToken, setSelectedToken] = useState("USDT");
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const { status, buyWithUSDT, buyWithBNB } = usePresale();
  const [showActivities, setShowActivities] = useState(false);
  const [showLevels, setShowLevels] = useState(false);
  // console.log(status);
  const handleAmountChange = (value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };
  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo[12]);
    }
  }, [userInfo]);
  const strictEmailRegex =
    /^[a-zA-Z0-9](?:[a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/;
  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!strictEmailRegex.test(value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };
  // console.log({userInfo});
  // console.log(  `{tokenUSDTPrice}: ${tokenUSDTPrice},
  //   {tokenBNBPrice}: ${tokenBNBPrice},
  //   {tokensSold}: ${tokensSold},
  //   {totalTokens}: ${totalTokens},
  //   {userId}: ${userId},kenUSDTPrice}: 0,
  //   {userDepositsUSDT}: ${userDepositsUSDT},
  //   {userDepositsBNB}: ${userDepositsBNB},
  //   {progress}: ${progress},
  //   {userEarningsBNB}: ${userEarningsBNB},
  //   {userEarningsUSDT}: ${userEarningsUSDT},
  //   {userTokens}: ${userTokens},
  //   {activities}: ${activities},
  //   {activitiesLength}: ${activitiesLength}`);
  const calculateTokenAmount = useCallback(
    (inputAmount: string) => {
      const numAmount = parseFloat(inputAmount) || 0;
      return formatCurrency(
        numAmount / (selectedToken === "USDT" ? tokenUSDTPrice : tokenBNBPrice)
      );
    },
    [selectedToken, tokenUSDTPrice, tokenBNBPrice]
  );

  const handlePurchase = async () => {
    // check amount
    if (!amount) {
      toast.error("Please enter an amount", {
        duration: 3000,
        position: "top-right",
      });
      return;
    }

    // check email
    if (!strictEmailRegex.test(email)) {
      toast.error("Please enter a valid email address", {
        duration: 3000,
        position: "top-right",
      });
      return;
    }

    if (selectedToken === "USDT") {
      await buyWithUSDT(amount, email);
    } else if (selectedToken === "BNB") {
      await buyWithBNB(amount);
    }
  };

  return (
    <div className="space-y-6 backdrop-blur-xl bg-input rounded-3xl p-6 md:p-8 overflow-x-auto">
      <div className="flex md:flex-row justify-between md:justify-between items-centers md:items-center gap-4">
        <div className="flex items-start gap-2 flex-col">
          <span className="py-1 px-3 text-[8px] md:text-sm glass-card">
            Current price
          </span>
          <div className="flex items-center justify-center gap-1">
            <Image
              src="/images/icon.png"
              alt="derby-logo"
              width={12}
              height={12}
              className="md:w-5 md:h-5 w-3 h-3"
            />
            <span className="text-gray-200 md:text-sm text-[8px]">
              1 DERBY =
            </span>
            <div className="flex items-center gap-2">
              <img src="/images/tether.svg" alt="USDT" className="w-5 h-5" />
              <span className="text-[#F0B90B] md:text-sm text-[8px] font-semibold">
                {formatCurrency(tokenUSDTPrice, 3)} USDT
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-end gap-2 flex-col">
          <span className="py-1 px-3 glass-card text-[8px] md:text-sm">
            Next price
          </span>
          <div className="flex items-center justify-center gap-1">
            <Image
              src="/images/icon.png"
              alt="derby-logo"
              width={12}
              height={12}
              className="md:w-5 md:h-5 w-3 h-3"
            />
            <span className="text-gray-200 md:text-sm text-[8px]">
              1 DERBY =
            </span>
            <div className="flex items-center gap-2">
              <img
                src="/images/tether.svg"
                alt="USDT"
                className="w-3 h-3 md:w-5 md:h-5"
              />
              <span className="text-[#F0B90B] md:text-sm text-[8px] font-semibold ">
                0.01 USDT
              </span>
            </div>
          </div>
        </div>
      </div>

      <Progress
        value={progress}
        tokensSold={tokensSold}
        totalTokens={totalTokens}
        className="h-4 rounded-xl bg-secondary"
        indicatorClassName="bg-gradient-to-r from-[#F0B90B] to-[#FCD435]"
      />

      <div className="pt-10 p-1 md:p-8">
        <h2 className="text-sm md:text-xl mb-8 text-white ">
          Step 1 -{" "}
          <span className=" text-gray-400">Enter your email address</span>{" "}
        </h2>

        {/* <div className="flex w-full md:w-[40%] mx-auto items-center justify-center p-1 bg-card glass-card gap-4 mb-8">
          {Object.entries(SUPPORTED_TOKENS).map(([symbol, details]) => (
            <Button
              key={symbol}
              // disabled
              variant={selectedToken === symbol ? "secondary" : "ghost"}
              onClick={() => setSelectedToken(symbol)}
              className="flex items-center gap-1 w-full"
            >
              <img src={details.icon} alt={symbol} className="w-6 h-6" />
              {symbol}
            </Button>
          ))}
        </div> */}
        <div className="mb-8 ">
          <div className="flex w-full md:w-[40%] mx-auto items-center justify-center p-1 bg-card glass-card gap-4  py-4">
            <input
              className="bg-transparent text-center w-full focus:outline-none"
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              readOnly={userInfo && userInfo[12] !== ""}
            />
          </div>
          {emailError && (
            <span className="text-red-500 text-xs">
              Please enter a valid email address
            </span>
          )}
        </div>

        <h2 className="text-sm md:text-xl mb-8 text-white ">
          Step 2 -{" "}
          <span className=" text-gray-400">
            Enter the Amount of Token You Would Like to Purchase
          </span>{" "}
        </h2>
          <p className="text-primary text-sm md:text-base mb-4">Minimum Investment is $5 </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4">
          <AmountInput
            value={amount}
            onChange={handleAmountChange}
            token={selectedToken}
            tokenIcon={SUPPORTED_TOKENS[selectedToken].icon}
          />
          <AmountInput
            value={amount ? calculateTokenAmount(amount) : ""}
            onChange={() => { }}
            token="DERB"
            tokenIcon="/images/icon.png"
            readOnly
          />
        </div>

        <PurchaseButton
          status={status}
          onClick={handlePurchase}
          disabled={
            !amount ||
            parseFloat(amount) <= 0 ||
            status == "APPROVING" ||
            status == "APPROVED" ||
            status == "PURCHASING"
          }
        />
      </div>

      <p className="mt-6 text-[#F0B90B] text-sm font-medium max-w-xl mx-auto"> <span className="text-blue-400">REFER & EARN</span>  <br />

        Earn up to 70% through our affiliate program, distributed across 21 levels to maximize your rewards and grow your income as your network expands.
      </p>

      <div className="border-t border-[#F0B90B]/20 pt-6">
        <Button
          variant="secondary"
          onClick={() => setShowActivities(!showActivities)}
          className="w-full flex items-center justify-between text-left hover:bg-[#F0B90B]/50 hover:text-white"
        >
          <span className="text-lg font-medium">
            Recent Activities & Referrals
          </span>
          {showActivities ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </Button>

        {showActivities && (
          <div className="mt-6 space-y-6">
            <ReferralStats
              // referralLink={"https://derby.org/?ref=" + userId}
              referralLink={`${window.location.origin}?ref=${userId}`}
              usdtprice={(tokenUSDTPrice * b2f(userTokens)).toFixed(2)}
              totalEarningsUSDT={b2f(userEarningsUSDT).toFixed(2)}
              totalEarningsucc={b2f(userTokens, 9).toFixed(4)}
              userVirtualToken={b2f(userVirtualToken).toFixed(2)}
              totalEarningsBNB={b2f(userEarningsBNB).toFixed(2)}
              totalDepositBNB={b2f(userDepositsBNB).toFixed(2)}
              totalDepositUSDT={b2f(userDepositsUSDT).toFixed(2)}
              userTeamStats={userTeamStats}
              userInfo={userInfo}
              userIncomes={userIncomes}
            />

            <div>
              <h3 className="text-lg font-medium mb-4">Recent Activities</h3>
              <ActivitiesTable
                activities={activities}
                length={activitiesLength}
              />
            </div>
          </div>
        )}

        <Button
          variant="secondary"
          onClick={() => setShowLevels(!showLevels)}
          className="w-full flex items-center justify-between hover:bg-[#F0B90B]/50 hover:text-white text-center"
        >
          <span className="text-lg font-medium">
            {showLevels ? "Level Details" : "View Level"}
          </span>
          {showLevels ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </Button>
        {showLevels && (
          <LevelDetailsAccordion
            userLevels={userLevels}
            showLevels={showLevels}
            getLevelDetails={getLevelDetails}
            userId={userId}
          />
        )}
      </div>
    </div>
  );
}
