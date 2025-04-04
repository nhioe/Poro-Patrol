"use client"

import type React from "react"
import type { Friend } from "../../types/Friend"
import {
  Box,
  Stack,
  Typography,
  useTheme,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import RefreshIcon from "@mui/icons-material/Refresh"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import { useState } from "react"
import FriendItem from "./FriendItem/FriendItem"
import * as styles from "./friendList.styles"

interface FriendListProps {
  friends: Friend[]
  handleFriendSelection: (id: string, selected: boolean) => void
  groupDisplayMap: Record<string, string>
  selectedFriends: Record<string, boolean>
  refreshFriends: () => void
  isLoading?: boolean
}

const FriendList: React.FC<FriendListProps> = ({
  friends,
  handleFriendSelection,
  groupDisplayMap,
  selectedFriends,
  refreshFriends,
  isLoading = false,
}) => {
  const theme = useTheme()
  const [searchQuery, setSearchQuery] = useState("")

  // Filter friends based on search query
  const filteredFriends = friends.filter((friend) => friend.gameName.toLowerCase().includes(searchQuery.toLowerCase()))
  const groupedFriends = friends.reduce<Record<string, Friend[]>>((acc, friend) => {
    const groupId = friend.groupId || "General"
    if (!acc[groupId]) {
      acc[groupId] = []
    }
    acc[groupId].push(friend)
    return acc
  }, {})

  const isSearching = searchQuery.trim() !== ""

  if (isLoading) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress sx={styles.spinner} />
        <Typography variant="subtitle1" sx={styles.loadingText} mt={2}>
          Loading friends list...
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.searchBar}>
        <TextField
          placeholder="Search friends..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={styles.searchIcon} />
                </InputAdornment>
              ),
              sx: styles.textField(theme),
            },
          }}
        />
        <Tooltip title="Refresh Friends List">
          <IconButton onClick={refreshFriends} sx={styles.refreshButton(theme)}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={styles.listContainer}>
        {isSearching ? (
          // Display search results, hide groupings
          <Box>
            {filteredFriends.length > 0 ? (
              <>
                <Box sx={styles.searchResultsHeader}>
                  <Typography variant="subtitle2" sx={styles.searchResultsTitle}>
                    Search Results ({filteredFriends.length})
                  </Typography>
                </Box>
                <Divider sx={styles.divider} />
                <Stack>
                  {filteredFriends.map((friend) => (
                    <FriendItem
                      key={friend.id}
                      friend={friend}
                      isSelected={selectedFriends[friend.id] || false}
                      onSelectionChange={handleFriendSelection}
                    />
                  ))}
                </Stack>
              </>
            ) : (
              <Box sx={styles.noResultsMessage}>
                <Typography variant="body1">No friends match your search.</Typography>
              </Box>
            )}
          </Box>
        ) : // Display grouped friends or individual friends
        Object.keys(groupedFriends).length > 0 ? (
          Object.entries(groupedFriends).map(([groupId, groupFriends]) => (
            <Accordion key={groupId} disableGutters sx={styles.accordion}>
              <AccordionSummary
                expandIcon={<ArrowRightIcon sx={styles.expandIcon(theme)} />}
                sx={styles.accordionSummary}
              >
                <Typography variant="subtitle1">{groupDisplayMap[groupId] || groupId}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={styles.accordionDetails}>
                <Stack>
                  {groupFriends.map((friend) => (
                    <FriendItem
                      key={friend.id}
                      friend={friend}
                      isSelected={selectedFriends[friend.id] || false}
                      onSelectionChange={handleFriendSelection}
                    />
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Box sx={styles.noResultsMessage}>
            <Typography variant="body1">No friends found.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default FriendList
