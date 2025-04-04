import React from "react"
import { Box, Divider, Typography } from "@mui/material"
import type { RankedQueueEntry, RankedData } from "../../../../types/RankedData"
import * as styles from "./ranksTooltip.styles"
import { tierImageMap } from "../../rankUtils"

interface RanksTooltipProps {
  rankedData: RankedData
  standardQueues: string[]
}

const RanksTooltip: React.FC<RanksTooltipProps> = ({ rankedData, standardQueues }) => {
  const getRankImage = (tier: string | undefined | null) => {
    if (!tier || tier === "NONE" || tier === "NA") {
      return tierImageMap["unranked"]
    }

    const key = tier.toLowerCase()
    return tierImageMap[key] || tierImageMap["unranked"]
  }

  const getQueueName = (queueType: string) => {
    switch (queueType) {
      case "RANKED_SOLO_5x5":
        return "Solo/Duo"
      case "RANKED_FLEX_SR":
        return "Flex 5v5"
      case "RANKED_TFT":
        return "TFT"
      case "RANKED_TFT_DOUBLE_UP":
        return "Double Up (Workshop)"
      case "RANKED_TFT_TURBO":
        return "Hyper Roll"
      case "PREVIOUS_SEASON":
        return "Last Season"
      default:
        return queueType
    }
  }

  const getQueueMap = () => {
    if (!rankedData) return {}

    const queueMap: Record<string, RankedQueueEntry> = {}

    rankedData.queues.forEach((queue) => {
      queueMap[queue.queueType] = queue
    })

    standardQueues.forEach((queueType) => {
      if (!queueMap[queueType]) {
        queueMap[queueType] = {
          division: "NA",
          highestDivision: "NA",
          highestTier: "",
          isProvisional: false,
          leaguePoints: 0,
          losses: 0,
          miniSeriesProgress: "",
          previousSeasonEndDivision: "NA",
          previousSeasonEndTier: "",
          previousSeasonHighestDivision: "NA",
          previousSeasonHighestTier: "",
          provisionalGameThreshold: 0,
          provisionalGamesRemaining: 0,
          queueType: queueType,
          ratedRating: 0,
          ratedTier: "NONE",
          tier: "",
          warnings: null,
          wins: 0,
        }
      }
    })

    if (rankedData.highestPreviousSeasonEndTier) {
      queueMap["PREVIOUS_SEASON"] = {
        division: rankedData.highestPreviousSeasonEndDivision,
        highestDivision: rankedData.highestPreviousSeasonEndDivision,
        highestTier: rankedData.highestPreviousSeasonEndTier,
        isProvisional: false,
        leaguePoints: 0,
        losses: 0,
        miniSeriesProgress: "",
        previousSeasonEndDivision: rankedData.highestPreviousSeasonEndDivision,
        previousSeasonEndTier: rankedData.highestPreviousSeasonEndTier,
        previousSeasonHighestDivision: rankedData.highestPreviousSeasonEndDivision,
        previousSeasonHighestTier: rankedData.highestPreviousSeasonEndTier,
        provisionalGameThreshold: 0,
        provisionalGamesRemaining: 0,
        queueType: "PREVIOUS_SEASON",
        ratedRating: 0,
        ratedTier: "NONE",
        tier: rankedData.highestPreviousSeasonEndTier,
        warnings: null,
        wins: 0,
      }
    }

    return queueMap
  }

  const renderRankEntry = (queue: RankedQueueEntry) => {
    const isRanked = queue.tier && queue.tier !== "" && queue.tier !== "NONE"
    const formattedRank = isRanked
      ? `${queue.tier}${queue.division && queue.division !== "NA" ? ` ${queue.division}` : ""}`
      : "Unranked"

    return (
      <Box sx={styles.rankEntryContainer} key={queue.queueType}>
        <Box sx={styles.miniRankEmblemContainer}>
          <Box component="img" src={getRankImage(queue.tier)} alt={queue.tier} style={styles.miniRankEmblem} />
        </Box>
        <Box sx={styles.miniRankDetails}>
          <Typography variant="caption" sx={styles.miniQueueName}>
            {getQueueName(queue.queueType).toUpperCase()}
          </Typography>
          <Typography variant="subtitle2" sx={styles.miniRankTier}>
            {formattedRank}
          </Typography>
        {
        isRanked && queue.queueType !== "PREVIOUS_SEASON" && (
            <Typography variant="caption" sx={styles.rankStatsText}>
              {queue.wins} Wins | {queue.leaguePoints} LP
            </Typography>
        )}
        </Box>
      </Box>
    )
  }

  const queueMap = getQueueMap()
  const allQueues = [...standardQueues, "PREVIOUS_SEASON"]

  return (
    <Box sx={styles.allRanksTooltip}>
      <Box sx={styles.ranksRow}>
        {allQueues.map((queueType) => {
          const queue = queueMap[queueType]
          if (!queue || queue.queueType === "RANKED_TFT_TURBO") return null

          const showDivider = queue.queueType === "PREVIOUS_SEASON"

          return (
            <React.Fragment key={queueType}>
              {showDivider && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={styles.divider}
                />
              )}
              {renderRankEntry(queue)}
            </React.Fragment>
          )
        })}
      </Box>
    </Box>
  )
}

export default RanksTooltip
