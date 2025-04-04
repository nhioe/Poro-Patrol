import type { Theme } from "@mui/material"
import { WINDOW_HEIGHT } from "../../theme/constants"

export const container = {
  backgroundColor: "greyV2.black",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  maxHeight: WINDOW_HEIGHT,
}

export const searchBar = {
  p: 2,
  display: "flex",
  alignItems: "center",
  gap: 1,
  borderBottom: 1,
  borderColor: "greyV2.cool",
}

export const textField = (theme: Theme) => ({
  backgroundColor: "greyV2.cool",
  borderRadius: 1,
  color: "white",
})

export const refreshButton = (theme: Theme) => ({
  color: theme.palette.gold[3],
  "&:hover": {
    backgroundColor: "greyV2.cool",
    color: theme.palette.gold[4],
  },
})

export const searchIcon = (theme: Theme) => ({
  color: theme.palette.gold[2],
})

export const listContainer = {
  overflowY: "auto",
  flexGrow: 1,
  pb: 4,
}

export const searchResultsHeader = {
  p: 2,
}

export const searchResultsTitle = (theme: Theme) => ({
  color: theme.palette.gold[3],
})

export const divider = {
  backgroundColor: "greyV2.cool",
}

export const noResultsMessage = {
  p: 3,
  textAlign: "center",
}

export const accordion = {
  backgroundColor: "greyV2.black",
}

export const accordionSummary = {
  flexDirection: "row-reverse",
  gap: 1,
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "&:hover": {
    backgroundColor: "greyV2.cool",
  },
}

export const accordionDetails = {
  p: 0,
}

export const expandIcon = (theme: Theme) => ({
  color: theme.palette.gold[2],
})

export const loadingContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
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
