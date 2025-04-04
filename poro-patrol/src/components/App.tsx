"use client"

import type React from "react"
import { useCallback, useEffect, useState } from "react"
import LeagueClient from "../api/LeagueClient"
import FriendList from "./FriendList/FriendList"
import type { Friend } from "../types/Friend"
import type { FriendGroup } from "../types/FriendGroup"
import { CssBaseline, ThemeProvider } from "@mui/material"
import Grid from "@mui/material/Grid2"
import theme from "../theme/theme"
import type { Summoner } from "../types/Summoner"
import SummonerDisplay from "./SummonerDisplay/SummonerDisplay"
import NotificationOverlay from "./NotificationOverlay/NotificationOverlay"
import HomeScreen from "./HomeScreen/HomeScreen"
import poro from "../assets/images/ghost_poro.png"
import summonerReconnect from "../assets/audio/summoner_reconnect.mp3"

const App: React.FC = () => {
  const [lockfileFound, setLockfileFound] = useState(false)
  const [summoner, setSummoner] = useState<Summoner>()
  const [friendList, setFriendList] = useState<Friend[]>([])
  const [selectedFriends, setSelectedFriends] = useState<Record<string, boolean>>({})
  const [friendGroups, setFriendGroups] = useState<FriendGroup[]>([])
  const [isNotifying, setIsNotifying] = useState<boolean>(false)
  const [notificationInterval, setNotificationInterval] = useState<NodeJS.Timeout | null>(null)
  const [isLoadingSummoner, setIsLoadingSummoner] = useState<boolean>(false)
  const [isLoadingFriends, setIsLoadingFriends] = useState<boolean>(false)

  const leagueClient = LeagueClient.getInstance()

  const fetchFriendList = useCallback(async () => {
    try {
      setIsLoadingFriends(true)
      const friends = await leagueClient.getFriendList()
      if (friends) {
        setFriendList(friends)
        console.log(friends)
      } else if (lockfileFound) {
        const isValid = await leagueClient.isLockfileValid()
        if (!isValid) {
          setLockfileFound(false)
        }
      }
    } catch (error) {
      console.error("Error fetching friend list:", error)
      const isValid = await leagueClient.isLockfileValid()
      if (!isValid && lockfileFound) {
        setLockfileFound(false)
      }
    } finally {
      setIsLoadingFriends(false)
    }
  }, [leagueClient, lockfileFound])

  useEffect(() => {
    if (lockfileFound) {
      const fetchSummonerData = async () => {
        try {
          setIsLoadingSummoner(true)
          const summoner = await leagueClient.getSummonerData()
          if (summoner) {
            setSummoner(summoner)
            console.log(summoner)
          }
        } catch (error) {
          console.error("Error fetching summoner data:", error)
        } finally {
          setIsLoadingSummoner(false)
        }
      }

      const fetchFriendGroups = async () => {
        try {
          const groups = await leagueClient.getFriendGroups()
          if (groups) {
            setFriendGroups(groups)
            console.log(groups)
          }
        } catch (error) {
          console.error("Error fetching friend groups:", error)
        }
      }

      fetchSummonerData()
      fetchFriendGroups()
      fetchFriendList()
    }
  }, [lockfileFound, fetchFriendList])

  useEffect(() => {
    return () => {
      if (notificationInterval) {
        clearInterval(notificationInterval)
      }
    }
  }, [notificationInterval])

  useEffect(() => {
    if (lockfileFound) {
      const validityCheckInterval = setInterval(async () => {
        const isValid = await leagueClient.isLockfileValid()
        if (!isValid && lockfileFound) {
          console.log("League client disconnected.")
          setLockfileFound(false)

          if (notificationInterval) {
            clearInterval(notificationInterval)
            setNotificationInterval(null)
            setIsNotifying(false)
          }
        }
      }, 6000)

      return () => {
        clearInterval(validityCheckInterval)
      }
    }
  }, [lockfileFound, leagueClient, notificationInterval])

  const handleFriendSelection = useCallback((id: string, selected: boolean) => {
    setSelectedFriends((prev) => ({ ...prev, [id]: selected }))
  }, [])

  const friendGroupDisplayMap = friendGroups.reduce<Record<string, string>>((acc, group) => {
    acc[group.id] = group.name
    return acc
  }, {})

  const handleNotifyClick = useCallback(() => {
    const selectedFriendIds = Object.entries(selectedFriends)
      .filter(([_, isSelected]) => isSelected)
      .map(([id]) => id)

    if (selectedFriendIds.length === 0) return

    setIsNotifying(true)

    const statusTracker: Record<string, string> = {}

    const interval = setInterval(async () => {
      try {
        for (const friendId of selectedFriendIds) {
          const data: Friend = await leagueClient.getFriend(friendId)

          const previousStatus = statusTracker[friendId] || "offline"
          const currentStatus = data.availability || "offline"

          console.log("prev", previousStatus)
          console.log("curr", currentStatus)

          if (previousStatus.toLowerCase() !== "chat" && currentStatus.toLowerCase() === "chat") {
            console.log(`Friend ${data.gameName || friendId} is now online! Sending notification.`)

            try {
              const audio = new Audio(summonerReconnect)
              audio.play().catch((e) => console.error("Could not play notification sound", e))
            } catch (e) {
              console.error("Could not play notification sound", e)
            }

            if ("Notification" in window && Notification.permission === "granted") {
              new Notification(`${data.gameName || "Friend"} is now online!`, {
                icon: poro,
              })
            }
          }

          if (previousStatus !== currentStatus) {
            statusTracker[friendId] = currentStatus
          }
        }
      } catch (error) {
        console.error("Error checking friend statuses:", error)
      }
    }, 5000)

    setNotificationInterval(interval)
  }, [selectedFriends, leagueClient])

  const handleCancelNotify = useCallback(() => {
    if (notificationInterval) {
      clearInterval(notificationInterval)
      setNotificationInterval(null)
    }
    setIsNotifying(false)
  }, [notificationInterval])

  const requestNotificationPermission = useCallback(async () => {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications")
      return
    }

    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
      await Notification.requestPermission()
    }
  }, [])

  useEffect(() => {
    requestNotificationPermission()
  }, [requestNotificationPermission])

  const handleLockfileFound = useCallback(() => {
    setLockfileFound(true)
  }, [])

  if (!lockfileFound) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HomeScreen onLockfileFound={handleLockfileFound} />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container sx={{ height: "100vh", overflow: "hidden" }}>
        <Grid size={8}>
          <SummonerDisplay
            summoner={summoner}
            selectedFriends={selectedFriends}
            onNotifyClick={handleNotifyClick}
            isLoading={isLoadingSummoner}
          />
        </Grid>
        <Grid size={4}>
          <FriendList
            friends={friendList}
            groupDisplayMap={friendGroupDisplayMap}
            handleFriendSelection={handleFriendSelection}
            selectedFriends={selectedFriends}
            refreshFriends={fetchFriendList}
            isLoading={isLoadingFriends}
          />
        </Grid>
      </Grid>

      {isNotifying && (
        <NotificationOverlay
          onCancel={handleCancelNotify}
          selectedFriendsCount={Object.values(selectedFriends).filter(Boolean).length}
        />
      )}
    </ThemeProvider>
  )
}

export default App
