"use client";

import { b2f, b2i } from "@/hooks/usePresale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { formatDate, shortenAddress } from "@/lib/utils";
import { useEffect, useState } from "react";
import { usePresale } from "@/providers/provider";
import { useQuery } from "@tanstack/react-query";

export interface Activity {
  id: any;
  refId: any;
  tokenAmt: any;
  usdtAmt: any;
  bnbAmt: any;
  mode: any;
  activityLevel: BigInt;
}

interface ActivitiesTableProps {
  activities: Activity[];
  length: number;
}

export function ActivitiesTable({ activities, length }: ActivitiesTableProps) {
  // const { isPending, error, data } = useQuery({
  //   queryKey: ['user-activities'],
  //   queryFn: () =>
  //     getRecentActivities(),
  //     enabled: userId != 0
  // })
  const rowsPerPage = 10; // Number of rows per page
  const { curPage, setCurPage } = usePresale();
  const [page, setPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.max(Math.ceil(length / rowsPerPage), 1);

  // Paginate activities
  const paginatedActivities = activities.slice(
    (curPage - 1) * rowsPerPage,
    curPage * rowsPerPage
  );

  // Pagination handlers
  const handlePreviousPage = () => setCurPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="rounded-xl border border-[#F0B90B]/20 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-[#F0B90B]/20">
            <TableHead className="text-gray-400">User ID</TableHead>
            <TableHead className="text-gray-400">Type</TableHead>
            <TableHead className="text-right text-gray-400">Reward</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity, id) => (
            <TableRow
              key={id}
              className="border-b text-left border-[#F0B90B]/20 bg-black/20 hover:bg-[#F0B90B]/5"
            >
              <TableCell>
                {activity.mode == 1
                  ? parseInt(activity.refId?.toString()) || 0
                  : parseInt(activity.id?.toString())}
              </TableCell>
              <TableCell>
                <span className="capitalize">
                  {activity.mode == 0
                    ? "Investment"
                    : activity.mode == 1
                    ? `Referral (Level - ${Number(activity.activityLevel)})`
                    : "Dividend"}
                </span>
              </TableCell>
              <TableCell className="text-right font-medium text-[#F0B90B]">
                {activity.mode == 1
                  ? b2f(activity.bnbAmt) == 0
                    ? `${b2f(activity.usdtAmt).toFixed(2)} USDT`
                    : `${b2f(activity.bnbAmt).toFixed(4)} BNB`
                  : `${b2f(activity.tokenAmt, 9).toFixed(2)} DERBY`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 px-4 py-2">
        <button
          onClick={handlePreviousPage}
          disabled={curPage === 1}
          className="px-4 py-2 bg-[#F0B90B] text-black rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-400">
          Page {curPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={curPage === totalPages}
          className="px-4 py-2 bg-[#F0B90B] text-black rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
