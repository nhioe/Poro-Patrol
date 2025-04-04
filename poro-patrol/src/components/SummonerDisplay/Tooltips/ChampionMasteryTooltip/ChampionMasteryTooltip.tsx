import type React from "react"
import { Box, Divider, Typography } from "@mui/material"
import type { ChampionMastery } from "../../../../types/ChampionMastery"
import * as styles from "./championMasteryTooltip.styles"

interface ChampionMasteryTooltipProps {
  masteries: ChampionMastery[]
}

const ChampionMasteryTooltip: React.FC<ChampionMasteryTooltipProps> = ({ masteries }) => {
  const formatPoints = (points: number): string => {
    if (points >= 1000000) {
      return `${(points / 1000000).toFixed(1)}M`
    } else if (points >= 1000) {
      return `${(points / 1000).toFixed(1)}K`
    }
    return points.toString()
  }

  const renderMasteryEntry = (mastery: ChampionMastery, index: number) => {
    
    return (
      <Box sx={styles.masteryEntryContainer} key={mastery.championId}>
        <Box sx={styles.championImageContainer}>
          <Box component="img" src={mastery.championImage} alt={mastery.championName} sx={styles.championImage} />
        </Box>
        <Box sx={styles.masteryDetails}>
          <Typography variant="subtitle2" sx={styles.championName}>
            {mastery.championName.toUpperCase()}
          </Typography>
          <Divider
            orientation="horizontal"
            flexItem
            sx={styles.divider}
          />
          <Typography variant="caption" sx={styles.masteryLevel}>
            Mastery {mastery.championLevel}
          </Typography>
          <Typography variant="caption" sx={styles.masteryPoints}>
            {formatPoints(mastery.championPoints)} points
          </Typography>
        </Box>
      </Box>
    )
  }

  // reorder masteries to put the highest one in the middle
  const reorderedMasteries = [...masteries]
  if (reorderedMasteries.length === 3) {
    [reorderedMasteries[0], reorderedMasteries[1]] = [reorderedMasteries[1], reorderedMasteries[0]]
  }

  return (
    <Box sx={styles.masteriesRow}>
      {reorderedMasteries.map((mastery, index) => renderMasteryEntry(mastery, index))}
    </Box>
  )
}

export default ChampionMasteryTooltip

