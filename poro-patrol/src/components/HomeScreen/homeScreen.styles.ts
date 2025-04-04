import { Theme } from "@mui/material";

export const container = (theme: Theme, image: string) => ({
  height: "100vh",
  width: "100vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: 2,
  backgroundImage: `linear-gradient(rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)), url(${image})`,
  backgroundSize: "cover",
});

export const logo = {
  width: 400,
};

export const loadingIndicator = (theme: Theme) => ({
  color: theme.palette.gold[2],
});

export const loadingText = (theme: Theme) => ({
  color: theme.palette.gold[2],
  fontWeight: 500,
});

export const errorTitle = (theme: Theme) => ({
  color: theme.palette.gold[1],
  fontWeight: 500,
});

export const errorMessage = (theme: Theme) => ({
  color: theme.palette.greyV2[1],
  textAlign: "center",
});

export const retryButton = (theme: Theme) => ({
  color: theme.palette.gold[2],
  borderColor: theme.palette.gold[2],
  "&:hover": {
    borderColor: theme.palette.gold[3],
    color: theme.palette.gold[3],
  },
});
