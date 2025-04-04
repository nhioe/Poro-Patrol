import type React from "react"
import { Box, Typography, Paper, CircularProgress, Tooltip } from "@mui/material"
import type { RankedData, RankedQueueEntry } from "src/types/RankedData"
import * as styles from "./rankedDisplay.styles"
import RanksTooltip from "../Tooltips/RanksTooltip/RanksTooltip"
import { tierImageMap, tierRanking, divisionRanking } from "../rankUtils"

interface RankedDisplayProps {
  rankedData: RankedData | null
  isLoading: boolean
  standardQueues: string[]
}

const RankedDisplay: React.FC<RankedDisplayProps> = ({ rankedData, isLoading, standardQueues }) => {
  if (isLoading) {
    return (
      <Box sx={styles.rankedLoadingContainer}>
        <CircularProgress sx={styles.spinner} />
        <Typography variant="body2" sx={styles.loadingText} mt={1}>
          Loading ranked data...
        </Typography>
      </Box>
    )
  }

  if (!rankedData) {
    return (
      <Typography variant="body1" sx={styles.noRankedData}>
        No ranked data available for this season.
      </Typography>
    )
  }

  const getQueueName = (queueType: string) => {
    switch (queueType) {
      case "RANKED_SOLO_5x5":
        return "Ranked Solo/Duo"
      case "RANKED_FLEX_SR":
        return "Ranked Flex"
      case "RANKED_TFT":
        return "TFT"
      case "RANKED_TFT_DOUBLE_UP":
        return "Double Up (Workshop)"
      case "RANKED_TFT_TURBO":
        return "TFT Hyper Roll"
      default:
        return queueType
    }
  }

  const getRankImage = (tier: string | undefined | null) => {
    if (!tier || tier === "NONE" || tier === "NA") {
      return tierImageMap["unranked"]
    }

    const key = tier.toLowerCase()
    return tierImageMap[key] || tierImageMap["unranked"]
  }

  const getWinRate = (wins: number, losses: number) => {
    const total = wins + losses
    if (total === 0) return 0
    return Math.round((wins / total) * 100)
  }

  const getHighestRankedQueue = (): RankedQueueEntry | null => {
    if (!rankedData.queues || rankedData.queues.length === 0) {
      return null
    }

    const rankedQueues = rankedData.queues.filter(
      (queue) => queue.tier && queue.tier !== "" && queue.tier !== "NONE" && queue.division !== "NA",
    )

    if (rankedQueues.length === 0) {
      return null
    }

    return rankedQueues.sort((a, b) => {
      const tierDiff = tierRanking.indexOf(a.tier) - tierRanking.indexOf(b.tier)
      if (tierDiff !== 0) return tierDiff

      const divDiff = divisionRanking.indexOf(a.division) - divisionRanking.indexOf(b.division)
      if (divDiff !== 0) return divDiff

      return b.leaguePoints - a.leaguePoints
    })[0]
  }

  const highestRankedQueue = getHighestRankedQueue()

  if (!highestRankedQueue) {
    return (
      <Paper sx={styles.rankCard}>
        <Typography variant="subtitle1" sx={styles.queueTitle}>
          Ranked
        </Typography>
        <Box sx={styles.rankInfo}>
          <Tooltip
            title={<RanksTooltip rankedData={rankedData} standardQueues={standardQueues} />}
            arrow
            placement="right"
            slotProps={{
              tooltip: {
                sx: styles.rankTooltip,
              },
            }}
          >
            <Box sx={styles.rankEmblemContainer}>
              <Box component="img" src={getRankImage("unranked")} alt="Unranked" style={styles.rankEmblem} />
            </Box>
          </Tooltip>
          <Box sx={styles.rankDetails}>
            <Typography variant="h6" sx={styles.rankTier}>
              Unranked
            </Typography>
            <Typography variant="body2">No ranked data for current season.</Typography>
          </Box>
        </Box>
      </Paper>
    )
  }

  return (
    <Paper sx={styles.rankCard}>
      <Typography variant="subtitle1" sx={styles.queueTitle}>
        {getQueueName(highestRankedQueue.queueType)}
      </Typography>
      <Box sx={styles.rankInfo}>
        <Tooltip
          title={<RanksTooltip rankedData={rankedData} standardQueues={standardQueues} />}
          arrow
          placement="right"
          slotProps={{
            tooltip: {
              sx: styles.rankTooltip,
            },
          }}
        >
          <Box sx={styles.rankEmblemContainer}>
            <Box
              component="img"
              src={getRankImage(highestRankedQueue.tier)}
              alt={highestRankedQueue.tier}
              style={styles.rankEmblem}
            />
          </Box>
        </Tooltip>
        <Box sx={styles.rankDetails}>
          <Typography variant="h6" sx={styles.rankTier}>
            {highestRankedQueue.tier} {highestRankedQueue.division}
          </Typography>
          <Typography variant="body2">{highestRankedQueue.leaguePoints} LP</Typography>
          <Typography variant="body2">
            {highestRankedQueue.wins}W {highestRankedQueue.losses}L (
            {getWinRate(highestRankedQueue.wins, highestRankedQueue.losses)}% WR)
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}

export default RankedDisplay
