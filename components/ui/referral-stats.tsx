import { Copy, Loader } from "lucide-react"; // Add Loader icon
import { Button } from "./button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { usePresale, PurchaseStatus } from "@/hooks/usePresale";

interface ReferralStatsProps {
  referralLink: string;
  totalEarningsUSDT: string;
  totalEarningsucc: string;
  userVirtualToken: string;
  totalEarningsBNB: string;
  totalDepositBNB: string;
  totalDepositUSDT: string;
  usdtprice: string;
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
}: ReferralStatsProps) {
  const { toast } = useToast();
  const [copiedMessage, setCopiedMessage] = useState(false);
  const { claimVirtualTokens, status } = usePresale();

  const handleClaim = async () => {
    await claimVirtualTokens();
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
          <div className="text-2xl font-bold text-[#F0B90B]">{totalDepositUSDT}</div>
        </div>
        <div className="flex-1 bg-black/50 rounded-xl p-4 border border-[#F0B90B]/20">
          <div className="text-sm text-gray-400 mb-1">Total Deposit (BNB)</div>
          <div className="text-2xl font-bold text-[#F0B90B]">{totalDepositBNB}</div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 bg-black/50 rounded-xl p-4 border border-[#F0B90B]/20">
          <div className="text-sm text-gray-400 mb-1">Total Earnings (USDT)</div>
          <div className="text-2xl font-bold text-[#F0B90B]">{totalEarningsUSDT}</div>
        </div>
        <div className="flex-1 bg-black/50 rounded-xl p-4 border border-[#F0B90B]/20">
          <div className="text-sm text-gray-400 mb-1">Total Earnings (BNB)</div>
          <div className="text-2xl font-bold text-[#F0B90B]">{totalEarningsBNB}</div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 bg-black/50 rounded-xl p-4 border border-[#F0B90B]/20">
          <div className="text-sm text-gray-400 mb-1">Total Earnings (UCC)</div>
          <div className="text-2xl font-bold text-[#F0B90B]">{totalEarningsucc} (${usdtprice})</div>
        </div>
      </div>

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
            <div className="text-sm text-gray-400 mb-1">Coins allocated (XEE)</div>
            <div className="text-2xl font-bold text-primary">{userVirtualToken}</div>
          </div>
        </div>
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/90 text-black flex items-center justify-center"
          onClick={handleClaim}
          disabled={status === PurchaseStatus.PURCHASING}
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
