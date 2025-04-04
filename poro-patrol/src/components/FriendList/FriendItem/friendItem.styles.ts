import { Theme } from "@mui/material/styles"

export const friendItem = {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    p: 1,
    "&:hover": {
      backgroundColor: "greyV2.cool",
    },
  }
  
  export const iconContainer = {
    position: "relative",
    width: 40,
    height: 40,
  }
  
  export const friendIcon = {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
  }
  
  export const statusIcon = {
    position: "absolute",
    bottom: 2.5,
    right: -3.5,
    width: 12,
    height: 12,
    borderRadius: "50%",
    border: "2px solid black",
  }
  
  export const checkbox = (theme: Theme) => ({
    color: theme.palette.gold[2],
    "&.Mui-checked": {
      color: theme.palette.gold[4],
    },
  })
  
  export const getAvailabilityDisplay = (availability: string, theme: Theme) => {
    switch (availability) {
      case "chat":
        return { displayAvailability: "Online", color: theme.palette.status.online }
      case "dnd":
        return { displayAvailability: "In-Game", color: theme.palette.status.ingame }
      case "mobile":
        return { displayAvailability: "Riot Mobile", color: theme.palette.status.offline }
      case "away":
        return { displayAvailability: "Away", color: theme.palette.status.away }
      case "offline":
        return { displayAvailability: "Offline", color: theme.palette.status.offline }
      default:
        return { displayAvailability: "Unknown", color: theme.palette.status.offline }
    }
}