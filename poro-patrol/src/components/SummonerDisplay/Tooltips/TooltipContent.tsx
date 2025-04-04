import type React from "react"
import { Box } from "@mui/material"
import * as styles from "./tooltipContent.styles"

interface TooltipContentProps {
  children: React.ReactNode
}

const TooltipContent: React.FC<TooltipContentProps> = ({ children }) => {
  return (
    <Box sx={styles.tooltipContainer}>
      <Box sx={styles.itemsRow}>{children}</Box>
    </Box>
  )
}

export default TooltipContent
