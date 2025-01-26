import { Copy, Loader } from "lucide-react"; // Add Loader icon
import { Button } from "./button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { usePresale, PurchaseStatus, b2f } from "@/hooks/usePresale";
import { UserIncomes } from "@/lib/types";

interface ReferralStatsProps {
  referralLink: string;
  totalEarningsUSDT: string;
  totalEarningsucc: string;
  userVirtualToken: string;
  totalEarningsBNB: string;
  totalDepositBNB: string;
  totalDepositUSDT: string;
  usdtprice: string;
  userTeamStats: any;
  userInfo: any;
  userIncomes: UserIncomes;
}

export function ReferralStats({
  referralLink,
  totalEarningsUSDT,
  usdtprice,
  totalEarningsucc,
  userVirtualToken,
  totalDepositBNB,
  totalDepositUSDT,
  totalEarningsBNB,
  userTeamStats,
  userIncomes,
  userInfo = [],
}: ReferralStatsProps) {
  const { toast } = useToast();
  const [copiedMessage, setCopiedMessage] = useState(false);
  const { claimAvailableIcome, status } = usePresale();

  const handleClaim = async () => {
    try {
      await claimAvailableIcome(userIncomes);
      userIncomes.currentRefIncomeUSDT = 0;
      userIncomes.currentRefIncomeBNB = 0;
    } catch (e) {
      console.log(e);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        setCopiedMessage(true);
        setTimeout(() => setCopiedMessage(false), 3000); // Hide after 3 seconds
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to copy. Please try again.",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="space-y-4">
      {/* Deposit & Earnings Stats */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 bg-black/50 rounded-xl p-4 border border-[#F0B90B]/20">
          <div className="text-sm text-gray-400 mb-1">Total Deposit (USDT)</div>
          <div className="text-2xl font-bold text-[#F0B90B]">
            {totalDepositUSDT}
          </div>
        </div>
        <div className="flex-1 bg-black/50 rounded-xl p-4 border border-[#F0B90B]/20">
          <div className="text-sm text-gray-400 mb-1">Total Team Business</div>
          <div className="text-2xl font-bold text-[#F0B90B]">
            {userTeamStats.totalTeamBusiness}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 bg-black/50 rounded-xl p-4 border border-[#F0B90B]/20">
          <div className="text-sm text-gray-400 mb-1">
            Total Earnings (USDT)
          </div>
          <div className="text-2xl font-bold text-[#F0B90B]">
            {totalEarningsUSDT}
          </div>
        </div>
        <div className="flex-1 bg-black/50 rounded-xl p-4 border border-[#F0B90B]/20">
          <div className="text-sm text-gray-400 mb-1">Total Team</div>
          <div className="text-2xl font-bold text-[#F0B90B]">
            {userTeamStats.totalTeamCount}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 bg-black/50 rounded-xl p-4 border border-[#F0B90B]/20">
          <div className="text-sm text-gray-400 mb-1">Ceiling Limit</div>
          <div className="text-2xl font-bold text-[#F0B90B]">
            {/* {totalEarningsucc}({userIncomes.ceilingLimit}) */}
            {userIncomes.ceilingLimit} USDT
          </div>
        </div>
        <div className="flex-1 bg-black/50 rounded-xl p-4 border border-[#F0B90B]/20">
          <div className="text-sm text-gray-400 mb-1">Derby Tokens</div>
          <div className="text-2xl font-bold text-[#F0B90B]">
            {totalEarningsucc}
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 bg-black/50 rounded-xl p-4 border border-[#F0B90B]/20">
          <div className="text-sm text-gray-400 mb-1">Available Income</div>
          <div className="text-2xl font-bold text-[#F0B90B]">{totalEarningsucc}</div>
        </div>
      </div> */}

      {/* Referral Link */}
      <div className="relative">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="w-full bg-black/50 border border-[#F0B90B]/20 rounded-xl px-4 py-3 pr-24 text-sm"
        />
        <Button
          size="sm"
          onClick={copyToClipboard}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black"
        >
          <Copy className="w-4 h-4 mr-1" />
          Copy
        </Button>

        {/* Success Message */}
        <div
          className={`absolute right-2 top-0 transform ${
            copiedMessage
              ? "translate-y-[-120%] opacity-100"
              : "translate-y-[-150%] opacity-0"
          } bg-[#F0B90B] text-black text-xs font-bold px-2 py-1 rounded-md shadow-md transition-all duration-300`}
        >
          Copied!
        </div>
      </div>

      {/* Claim Section */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-black/50 rounded-xl p-4 border border-[#F0B90B]/20">
            <div className="text-sm text-gray-50 font-bold mb-1">
              Available Income
            </div>
            <div className="text-2xl font-bold text-primary">
              {userIncomes.currentRefIncomeUSDT} USDT
            </div>
          </div>
        </div>
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/90 text-black flex items-center justify-center"
          onClick={handleClaim}
          disabled={
            status === PurchaseStatus.PURCHASING ||
            userIncomes.currentRefIncomeUSDT === 0
          }
        >
          {status === PurchaseStatus.PURCHASING ? (
            <Loader className="w-4 h-4 animate-spin mr-2" />
          ) : null}
          {status === PurchaseStatus.PURCHASING ? "Claiming..." : "Claim"}
        </Button>
      </div>
    </div>
  );
}
