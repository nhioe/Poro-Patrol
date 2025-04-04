import type { Theme } from "@mui/material/styles"

export const allMasteriesContainer = {
  minWidth: 400,
  p: 1,
}

export const masteriesRow = {
  display: "flex",
  flexDirection: "row",
  gap: 1,
  justifyContent: "center",
}

export const masteryEntryContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 140,
}

export const championImageContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

export const championImage = {
  width: "100%",
  height: "auto",
  maxHeight: 80,
  borderRadius: "50%",
}

export const masteryDetails = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}

export const championName = (theme: Theme) => ({
  color: theme.palette.gold[1],
  fontWeight: "bold",
  textAlign: "center",
})

export const masteryLevel = (theme: Theme) => ({
  color: theme.palette.greyV2[1],
  fontWeight: "bold",
  textAlign: "center",
})

export const masteryPoints = (theme: Theme) => ({
  fontWeight: 600,
  color: theme.palette.greyV2[1],
  textAlign: "center",
})

export const divider = (theme: Theme) => ({
  backgroundColor: theme.palette.gold[1],
  width: "100%",
  height: "1px",
})

