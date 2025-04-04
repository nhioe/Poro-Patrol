import type { Theme } from "@mui/material"

export const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
}

export const modal = {
  backgroundColor: "greyV2.black",
  p: 4,
  borderRadius: 2,
  maxWidth: "400px",
  width: "100%",
  textAlign: "center",
  border: (theme: Theme) => `1px solid ${theme.palette.gold[3]}`,
}

export const title = {
  mb: 2,
}

export const description = {
  mb: 3,
}

export const cancelButton = (theme: Theme) => ({
  backgroundColor: theme.palette.gold[3],
  color: "greyV2.black",
  "&:hover": {
    backgroundColor: theme.palette.gold[4],
  },
})

export const loadingVisual = {
  width: 100,
  height: 100,
}

export const updatesContainer = {
  width: "100%",
  mb: 3,
  mt: 2,
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  borderRadius: 1,
  p: 2,
  maxHeight: 150,
  overflowY: "auto",
  textAlign: "left",
}

export const updatesTitle = (theme: Theme) => ({
  color: theme.palette.gold[3],
  mb: 1,
  fontSize: "0.95rem",
})

export const updatesList = {
  display: "flex",
  flexDirection: "column",
  gap: 0.5,
}

export const updateItem = {
  fontSize: "0.875rem",
}
