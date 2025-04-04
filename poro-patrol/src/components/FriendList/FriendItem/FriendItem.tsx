import type React from "react"
import { Avatar, Box, Checkbox, Typography } from "@mui/material"
import { Friend } from "src/types/Friend"
import * as styles from "./friendItem.styles"
import { useTheme } from "@mui/material/styles"

interface FriendItemProps {
  friend: Friend
  isSelected: boolean
  onSelectionChange: (id: string, selected: boolean) => void
}

const FriendItem: React.FC<FriendItemProps> = ({ friend, isSelected, onSelectionChange }) => {
  const theme = useTheme()
  const { id, gameName, availability, icon } = friend
  const { displayAvailability, color } = styles.getAvailabilityDisplay(availability, theme)

  return (
    <Box sx={styles.friendItem}>
      <Checkbox
        checked={isSelected}
        onChange={(e) => onSelectionChange(id, e.target.checked)}
        sx={styles.checkbox(theme)}
      />
      <Box sx={styles.iconContainer}>
        <Avatar src={`https://ddragon.leagueoflegends.com/cdn/15.6.1/img/profileicon/${icon}.png`} alt={`${gameName} icon`} sx={styles.friendIcon} />
        <Box sx={{ ...styles.statusIcon, backgroundColor: color }}></Box>
      </Box>
      <Box>
        <Typography variant="subtitle1">{gameName}</Typography>
        <Typography variant="subtitle2" sx={{ color }}>
          {displayAvailability}
        </Typography>
      </Box>
    </Box>
  )
}

export default FriendItem
