import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { b2f } from "@/hooks/usePresale";
import { UserLevelDetail } from "@/lib/types";
import { useState } from "react";

// Type for a single user level
interface Level {
  level: BigInt;
  userCount: BigInt;
  totalAmount: BigInt;
}


// Type for the cache object
interface LevelDetailsCache {
  [key: string]: UserLevelDetail[] | undefined;
}
export function LevelDetailsAccordion({
  userLevels,
  showLevels,
  getLevelDetails,
  userId,
}: {
  userId: number;
  userLevels: Level[];
  showLevels: boolean;
  getLevelDetails: (
    userId: number,
    level: number
  ) => Promise<UserLevelDetail[]>;
}) {
  const [levelDetailsCache, setLevelDetailsCache] = useState<LevelDetailsCache>(
    {}
  );
  // Track loading states for each level
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );
  const handleLevelClick = async (levelId: string, level: Level) => {
    if (Number(level.userCount) === 0) return;
    if (levelDetailsCache[levelId]) return;

    setLoadingStates((prev) => ({ ...prev, [levelId]: true }));

    try {
      const details = await getLevelDetails(userId, Number(level.level));
      setLevelDetailsCache((prev) => ({
        ...prev,
        [levelId]: details,
      }));
    } catch (error) {
      console.error("Error fetching level details:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [levelId]: false }));
    }
  };

  if (!showLevels) return null;
  return (
    <Accordion type="single" collapsible>
      {userLevels.map((level, index) => {
        const levelId = `level-${index}`;
        return (
          <AccordionItem
            value={levelId}
            key={index}
            onClick={() => handleLevelClick(levelId, level)}
          >
            <AccordionTrigger>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                <span className="text-sm font-medium">
                  Level {Number(level.level)}
                </span>
              </div>
              <div className="text-sm font-medium">
                {level.userCount.toString()} users
              </div>
              <div className="text-sm font-medium">
                {b2f(level.totalAmount)} USDT
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {Number(level.userCount) === 0 ? (
                <div className="text-sm text-gray-500">
                  No users in this level
                </div>
              ) : loadingStates[levelId] ? (
                <div className="text-sm">Loading...</div>
              ) : levelDetailsCache[levelId] ? (
                <div className="space-y-2">
                  {levelDetailsCache[levelId].map((detail, detailIndex) => (
                    <div key={detailIndex} className="text-sm">
                      {/* Render your detail data here */}
                      {JSON.stringify(detail)}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm">Click to load details</div>
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
