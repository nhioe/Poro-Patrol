import type { Theme } from "@mui/material"

export const masteryCard = {
  p: 2,
  backgroundColor: "greyV2.black",
  borderRadius: 1,
  border: (theme: Theme) => `1px solid ${theme.palette.greyV2[3]}`,
}

export const masteryTitle = (theme: Theme) => ({
  color: theme.palette.gold[2],
  fontWeight: 500,
  mb: 1,
})

export const masteryInfo = {
  display: "flex",
  alignItems: "center",
  mt: 1,
}

export const championImageContainer = {
  width: 60,
  height: 60,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  mr: 2,
  cursor: "pointer",
}

export const championImage = {
  width: "100%",
  height: "auto",
  maxHeight: 60,
  borderRadius: "50%",
}

export const masteryDetails = {
  flex: 1,
}

export const championName = (theme: Theme) => ({
  color: theme.palette.gold[3],
  fontWeight: 500,
})

export const noMasteryData = {
  textAlign: "center",
  py: 3,
  color: "greyV2.1",
}

export const masteryLoadingContainer = {
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

export const masteryTooltip = {
  backgroundColor: "greyV2.black",
  border: (theme: Theme) => `1px solid ${theme.palette.gold[3]}`,
  maxWidth: "none",
  p: 2,
}
