import type { Theme } from "@mui/material"

export const container = {
  height: "100%",
  backgroundColor: "greyV2.black",
  p: 3,
}

export const loadingContainer = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "greyV2.black",
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

export const profileCard = {
  p: 3,
  backgroundColor: "greyV2.cool",
  mb: 3,
  borderRadius: 2,
  border: (theme: Theme) => `1px solid ${theme.palette.gold[2]}`,
}

export const profileHeader = {
  display: "flex",
  alignItems: "center",
  mb: 3,
}

export const avatar = (theme: Theme) => ({
  width: 80,
  height: 80,
  mr: 2,
  border: `2px solid ${theme.palette.gold[3]}`,
})

export const summonerName = (theme: Theme) => ({
  color: theme.palette.gold[4],
  fontWeight: "bold",
})

export const dividerStyle = {
  mb: 2,
  backgroundColor: "greyV2.cool",
}

export const rankedContainer = {
  mt: 2,
}

export const sectionTitle = (theme: Theme) => ({
  color: theme.palette.gold[3],
  mb: 1,
})

export const buttonContainer = {
  display: "flex",
  gap: 2,
  mt: 2,
}

export const notifyButton = (theme: Theme) => ({
  backgroundColor: theme.palette.gold[3],
  color: "greyV2.black",
  "&:hover": {
    backgroundColor: theme.palette.gold[4],
  },
  "&.Mui-disabled": {
    backgroundColor: theme.palette.greyV2[3],
    color: theme.palette.greyV2[1.5],
  },
})

export const testButton = (theme: Theme) => ({
  backgroundColor: theme.palette.status.online,
  color: "white",
  "&:hover": {
    backgroundColor: theme.palette.status.ingame,
  },
})

