import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Box, Typography, Button, CircularProgress, useTheme } from "@mui/material"
import LeagueClient from "../../api/LeagueClient"
import logo from "../../assets/images/poro_patrol.webp"
import * as styles from "./homeScreen.styles"
import poroBackground from "../../assets/images/poro_background.jpg"

interface HomeScreenProps {
  onLockfileFound: () => void
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onLockfileFound }) => {
  const theme = useTheme();
  const MIN_LOADING_TIME = 1000

  const [loading, setLoading] = useState(true)
  const [lockfileExists, setLockfileExists] = useState(false)

  const checkLockfile = useCallback(async () => {
    setLoading(true)
    const startTime = Date.now()

    try {
      const leagueClient = LeagueClient.getInstance()
      const isValid = await leagueClient.isLockfileValid()
      setLockfileExists(isValid)

      if (isValid) {
        onLockfileFound()
      }
    } catch (error) {
      console.error("Error checking lockfile:", error)
      setLockfileExists(false)
    }

    const elapsedTime = Date.now() - startTime
    const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime)
    setTimeout(() => {
      setLoading(false)
    }, remainingTime)
  }, [onLockfileFound])

  useEffect(() => {
    checkLockfile()
  }, [checkLockfile, lockfileExists])

  if (loading) {
    return (
      <Box sx={styles.container(theme, poroBackground)}>
        <Box component="img" src={logo} alt="Poro Patrol" style={styles.logo} />
        <CircularProgress sx={styles.loadingIndicator} />
        <Typography variant="subtitle1" sx={styles.loadingText}>
          {lockfileExists ? "League client found!" : "Checking for League client..."}
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={styles.container(theme, poroBackground)}>
      <Box component="img" src={logo} alt="Poro Patrol" style={styles.logo} />
      <Typography variant="h4" sx={styles.errorTitle}>
        League Client Not Running
      </Typography>
      <Typography variant="subtitle1" sx={styles.errorMessage}>
        Please start the League of Legends client first.
      </Typography>
      <Button variant="outlined" onClick={checkLockfile} sx={styles.retryButton}>
        Check Again
      </Button>
    </Box>
  )
}

export default HomeScreen
