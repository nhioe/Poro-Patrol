import type React from "react"
import { useState, useEffect } from "react"
import type { Summoner } from "../../types/Summoner"
import type { RankedData } from "../../types/RankedData"
import type { ChampionMastery } from "../../types/ChampionMastery"
import { Box, Button, Typography, Avatar, Paper, Divider, CircularProgress } from "@mui/material"
import Grid from "@mui/material/Grid2"
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive"
import BugReportIcon from "@mui/icons-material/BugReport"
import * as styles from "./summonerDisplay.styles"
import poro from "../../assets/images/ghost_poro.png"
import summonerReconnect from "../../assets/audio/summoner_reconnect.mp3"
import LeagueClient from "../../api/LeagueClient"
import RankedDisplay from "./RankedDisplay/RankedDisplay"
import ChampionMasteryDisplay from "./ChampionMasteryDisplay/ChampionMasteryDisplay"
import { fetchChampionData, getChampionName, getChampionImage } from "./championUtils"

interface SummonerDisplayProps {
  summoner: Summoner
  selectedFriends: Record<string, boolean>
  onNotifyClick: () => void
  isLoading?: boolean
}

const SummonerDisplay: React.FC<SummonerDisplayProps> = ({
  summoner,
  selectedFriends,
  onNotifyClick,
  isLoading = false,
}) => {
  const [rankedData, setRankedData] = useState<RankedData | null>(null)
  const [isLoadingRanked, setIsLoadingRanked] = useState(false)
  const [championMasteries, setChampionMasteries] = useState<ChampionMastery[]>([])
  const [isLoadingMasteries, setIsLoadingMasteries] = useState(false)
  const selectedCount = Object.values(selectedFriends).filter(Boolean).length
  const leagueClient = LeagueClient.getInstance()

  const standardQueues = ["RANKED_SOLO_5x5", "RANKED_FLEX_SR", "RANKED_TFT", "RANKED_TFT_DOUBLE_UP", "RANKED_TFT_TURBO"]

  useEffect(() => {
    fetchChampionData()
  }, [])

  useEffect(() => {
    const fetchRankedData = async () => {
      if (summoner?.puuid) {
        try {
          setIsLoadingRanked(true)
          const data = await leagueClient.getRankedData(summoner.puuid)
          if (data) {
            setRankedData(data)
          }
        } catch (error) {
          console.error("Error fetching ranked data:", error)
        } finally {
          setIsLoadingRanked(false)
        }
      }
    }

    const fetchChampionMasteries = async () => {
      if (summoner?.puuid) {
        try {
          setIsLoadingMasteries(true)
          const data = await leagueClient.getChampionMasteries(summoner.puuid)
          if (data) {
            const enhancedMasteries = data.map((mastery: any) => ({
              ...mastery,
              championName: getChampionName(mastery.championId),
              championImage: getChampionImage(mastery.championId),
            }))
            setChampionMasteries(enhancedMasteries)
          }
        } catch (error) {
          console.error("Error fetching champion masteries:", error)
        } finally {
          setIsLoadingMasteries(false)
        }
      }
    }

    if (summoner) {
      fetchRankedData()
      fetchChampionMasteries()
    }
  }, [summoner, leagueClient])

  if (isLoading || !summoner) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress sx={styles.spinner} />
        <Typography variant="subtitle1" sx={styles.loadingText} mt={2}>
          Loading summoner data...
        </Typography>
      </Box>
    )
  }

  const handleTestButtonClick = () => {
    try {
      const audio = new Audio(summonerReconnect)
      audio.play().catch((e) => console.error("Could not play notification sound", e))
    } catch (e) {
      console.error("Could not play notification sound", e)
    }
    new Notification("Hi", {
      body: "Test",
      icon: poro,
    })
  }

  return (
    <Box sx={styles.container}>
      <Paper elevation={3} sx={styles.profileCard}>
        <Box sx={styles.profileHeader}>
          {summoner.profileIconId && (
            <Avatar
              src={`https://ddragon.leagueoflegends.com/cdn/15.6.1/img/profileicon/${summoner.profileIconId}.png`}
              alt="Summoner Icon"
              sx={styles.avatar}
            />
          )}
          <Box>
            <Typography variant="h4" sx={styles.summonerName}>
              {summoner.gameName || summoner.displayName}
              {summoner.tagLine && <span>#{summoner.tagLine}</span>}
            </Typography>
            <Typography variant="subtitle1">Level {summoner.summonerLevel}</Typography>
          </Box>
        </Box>

        <Divider sx={styles.dividerStyle} />

        <Grid container spacing={2}>
          <Grid size={6}>
            <Box sx={styles.rankedContainer}>
              <RankedDisplay rankedData={rankedData} isLoading={isLoadingRanked} standardQueues={standardQueues} />
            </Box>
          </Grid>
          <Grid size={6}>
            <Box sx={styles.rankedContainer}>
              <ChampionMasteryDisplay championMasteries={championMasteries} isLoading={isLoadingMasteries} />
            </Box>
          </Grid>
        </Grid>

        <Box sx={styles.buttonContainer}>
          <Button
            variant="contained"
            startIcon={<NotificationsActiveIcon />}
            onClick={onNotifyClick}
            disabled={selectedCount === 0}
            sx={styles.notifyButton}
          >
            Get Notified ({selectedCount})
          </Button>

          <Button
            variant="contained"
            startIcon={<BugReportIcon />}
            onClick={handleTestButtonClick}
            sx={styles.testButton}
          >
            Test Function
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default SummonerDisplay
