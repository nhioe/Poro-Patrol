import { createTheme } from "@mui/material/styles";
import "@fontsource/open-sans";
import Beaufort from '../assets/fonts/BeaufortforLOL-Regular.ttf';
import Spiegel from '../assets/fonts/SpiegelSans-5Regular_TRIAL.woff2';

declare module '@mui/material/styles' {
    interface Palette {
      blue: {
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
      };
      gold: {
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
      };
      greyV2: {
        1: string;
        1.5: string;
        2: string;
        3: string;
        cool: string;
        black: string;
      };
      status: {
        online: string;
        offline: string;
        ingame: string;
      };
    }
  
    interface PaletteOptions {
      blue?: {
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
      };
      gold?: {
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
      };
      greyV2?: {
        1: string;
        1.5: string;
        2: string;
        3: string;
        cool: string;
        black: string;
      };
      status?: {
        online: string;
        offline: string;
        ingame: string;
      };
    }
  }


const theme = createTheme({
  palette: {
    blue: {
        1: "#CDFAFA",   // Blue 1
        2: "#0AC8B9",   // Blue 2
        3: "#0397AB",   // Blue 3
        4: "#005A82",   // Blue 4
        5: "#0A323C",   // Blue 5
        6: "#091428",   // Blue 6
        7: "#0A1428",   // Blue 7
      },
      gold: {
        1: "#F0E6D2",   // Gold 1
        2: "#C8AA6E",   // Gold 2
        3: "#C8AA6E",   // Gold 3
        4: "#C89B3C",   // Gold 4
        5: "#785A28",   // Gold 5
        6: "#463714",   // Gold 6
        7: "#32281E",   // Gold 7
      },
      greyV2: {
        1: "#A09B8C",   // Grey 1
        1.5: "#5B5A56",  // Grey 1.5
        2: "#3C3C41",   // Grey 2
        3: "#1E2328",   // Grey 3
        cool: "#1E282D", // Grey Cool
        black: "#010A13",// Hextech Black
      },
      status: {
        online: "#4caf50",
        offline: "#9e9e9e",  
        ingame: "#0AC8B9",   // Blue 2
      },
  },
  typography: (palette) => ({
    fontFamily: "Beaufort",
    h1: {
        color: palette.gold[2],
    },
    h2: {
        color: palette.gold[2],
    },
    h3: {
        color: palette.gold[2],
    },
    h4: {
        color: palette.gold[2],
    },
    h5: {
        color: palette.gold[2],
    },
    h6: {
        color: palette.gold[2],
    },
    subtitle1: {
        color: palette.gold[2],
    },
    subtitle2: {
        color: palette.gold[2],
    },
    body1: {
        color: palette.gold[2],
    },
    body2: {
        color: palette.gold[2],
    },
    button: {
        color: palette.gold[2],
    },
    caption: {
        color: palette.gold[2],
    },
  }),
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Beaufort';
          src: url(${Beaufort}), format('truetype');
          font-weight: normal;
          font-style: normal;
        }

        @font-face {
          font-family: 'Spiegel';
          src: url(${Spiegel}), format('woff2');
          font-weight: normal;
          font-style: normal;
        }
      `,
    },
  },
});

export default theme;