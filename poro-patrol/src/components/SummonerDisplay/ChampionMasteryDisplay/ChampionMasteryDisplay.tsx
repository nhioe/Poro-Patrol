import type React from "react"
import { Box, Typography, Paper, CircularProgress, Tooltip } from "@mui/material"
import type { ChampionMastery } from "src/types/ChampionMastery"
import * as styles from "./championMasteryDisplay.styles"
import ChampionMasteryTooltip from "../Tooltips/ChampionMasteryTooltip/ChampionMasteryTooltip"
import poro from "../../../assets/images/ghost_poro.png"

interface ChampionMasteryDisplayProps {
  championMasteries: ChampionMastery[]
  isLoading: boolean
}

const ChampionMasteryDisplay: React.FC<ChampionMasteryDisplayProps> = ({ championMasteries, isLoading }) => {
  if (isLoading) {
    return (
      <Box sx={styles.masteryLoadingContainer}>
        <CircularProgress sx={styles.spinner} />
        <Typography variant="body2" sx={styles.loadingText} mt={1}>
          Loading champion masteries...
        </Typography>
      </Box>
    )
  }

  const getTopChampionMasteries = (): ChampionMastery[] => {
    return championMasteries.sort((a, b) => b.championPoints - a.championPoints).slice(0, 3)
  }

  const getHighestMasteryChampion = (): ChampionMastery | null => {
    if (championMasteries.length === 0) return null
    return championMasteries.sort((a, b) => b.championPoints - a.championPoints)[0]
  }

  const formatMasteryPoints = (points: number): string => {
    if (points >= 1000000) {
      return `${(points / 1000000).toFixed(1)}M`
    } else if (points >= 1000) {
      return `${(points / 1000).toFixed(1)}K`
    }
    return points.toString()
  }

  const highestMastery = getHighestMasteryChampion()
  const topMasteries = getTopChampionMasteries()

  if (!highestMastery) {
    return (
      <Paper sx={styles.masteryCard}>
        <Typography variant="subtitle1" sx={styles.masteryTitle}>
          Champion Mastery
        </Typography>
        <Box sx={styles.masteryInfo}>
          <Box sx={styles.championImageContainer}>
            <Box component="img" src={poro} alt="No Mastery" style={styles.championImage} />
          </Box>
          <Box sx={styles.masteryDetails}>
            <Typography variant="h6" sx={styles.championName}>
              No Mastery Data
            </Typography>
            <Typography variant="body2">No champion mastery data available.</Typography>
          </Box>
        </Box>
      </Paper>
    )
  }

  return (
    <Paper sx={styles.masteryCard}>
      <Typography variant="subtitle1" sx={styles.masteryTitle}>
        Champion Mastery
      </Typography>
      <Box sx={styles.masteryInfo}>
        <Tooltip
          title={<ChampionMasteryTooltip masteries={topMasteries} />}
          arrow
          placement="right"
          slotProps={{
            tooltip: {
              sx: styles.masteryTooltip,
            },
          }}
        >
          <Box sx={styles.championImageContainer}>
            <Box
              component="img"
              src={highestMastery.championImage}
              alt={highestMastery.championName}
              style={styles.championImage}
            />
          </Box>
        </Tooltip>
        <Box sx={styles.masteryDetails}>
          <Typography variant="h6" sx={styles.championName}>
            {highestMastery.championName}
          </Typography>
          <Typography variant="body2">Level {highestMastery.championLevel}</Typography>
          <Typography variant="body2">{formatMasteryPoints(highestMastery.championPoints)} points</Typography>
        </Box>
      </Box>
    </Paper>
  )
}

export default ChampionMasteryDisplay
