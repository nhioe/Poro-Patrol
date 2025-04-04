import type { Theme } from "@mui/material"

export const rankCard = {
  p: 2,
  backgroundColor: "greyV2.black",
  borderRadius: 1,
  border: (theme: Theme) => `1px solid ${theme.palette.greyV2[3]}`,
}

export const queueTitle = (theme: Theme) => ({
  color: theme.palette.gold[2],
  fontWeight: 500,
  mb: 1,
})

export const rankInfo = {
  display: "flex",
  alignItems: "center",
  mt: 1,
}

export const rankEmblemContainer = {
  width: 60,
  height: 60,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  mr: 2,
  cursor: "pointer",
}

export const rankEmblem = {
  width: "100%",
  height: "auto",
  maxHeight: 60,
}

export const rankDetails = {
  flex: 1,
}

export const rankTier = (theme: Theme) => ({
  color: theme.palette.gold[3],
  fontWeight: 500,
})

export const noRankedData = {
  textAlign: "center",
  py: 3,
  color: "greyV2.1",
}

export const rankedLoadingContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  py: 4,
}

export const spinner = (theme: Theme) => ({
  color: theme.palette.gold[3],
  width: 30,
  height: 30,
})

export const loadingText = (theme: Theme) => ({
  color: theme.palette.gold[2],
  fontWeight: 500,
})

export const rankTooltip = {
  backgroundColor: "greyV2.black",
  border: (theme: Theme) => `1px solid ${theme.palette.gold[3]}`,
  maxWidth: "none",
  p: 2,
}
