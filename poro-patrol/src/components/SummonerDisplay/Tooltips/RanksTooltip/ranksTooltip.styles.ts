import { Theme } from "@mui/material/styles"

export const allRanksTooltip = {
  minWidth: 400,
  p: 1,
}

export const ranksRow = {
  display: "flex",
  flexDirection: "row",
  gap: 1,
  justifyContent: "center",
}

export const rankEntryContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 140,
}

export const miniRankEmblemContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

export const miniRankEmblem = {
  width: "100%",
  height: "auto",
  maxHeight: 120,
}

export const miniRankDetails = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
}

export const miniQueueName = (theme: Theme) => ({
  color: theme.palette.greyV2[1],
  fontWeight: "bold",
  textAlign: "center",
})

export const miniRankTier = (theme: Theme) => ({
  color: theme.palette.gold[1],
  fontWeight: "bold",
  textAlign: "center",
})

export const rankStatsText = (theme: Theme) => ({
  fontWeight: 600,
  color: theme.palette.greyV2[1],
  textAlign: "center",
})

export const divider = (theme: Theme) => ({
  backgroundColor: theme.palette.greyV2[2],
  mx: 1,
  height: 150,
  width: "1px",
})
