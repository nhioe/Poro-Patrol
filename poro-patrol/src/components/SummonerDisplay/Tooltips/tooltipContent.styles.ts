import type { Theme } from "@mui/material"

export const tooltipContainer = {
  backgroundColor: "greyV2.black",
  border: (theme: Theme) => `1px solid ${theme.palette.gold[3]}`,
  maxWidth: "none",
  p: 2,
  minWidth: 400,
}

export const itemsRow = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 2,
  justifyContent: "center",
}

export const itemContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 100,
}

export const itemImageContainer = {
  width: 70,
  height: 70,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  mb: 1,
}

export const itemImage = {
  width: "100%",
  height: "auto",
  maxHeight: 70,
}

export const itemDetails = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
}

export const itemTitle = (theme: Theme) => ({
  color: theme.palette.gold[2],
  textAlign: "center",
  marginBottom: 0.5,
})

export const itemSubtitle = {
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: 0.5,
}

export const itemStats = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  mt: 0.5,
}

export const statText = {
  textAlign: "center",
}

export const divider = (theme: Theme) => ({
  backgroundColor: theme.palette.greyV2[2],
  mx: 1,
  my: 1,
})
