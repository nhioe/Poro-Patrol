import type React from "react"
import type { Friend } from "../../types/Friend"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Box, Checkbox, Stack, Typography } from "@mui/material"

interface FriendListProps {
  friends: Friend[]
  handleFriendSelection: (id: string, selected: boolean) => void
  groupDisplayMap: Record<string, string>
  selectedFriends: Record<string, boolean>
}

const FriendList: React.FC<FriendListProps> = ({
  friends,
  handleFriendSelection,
  groupDisplayMap,
  selectedFriends,
}) => {
  // Group friends by groupId, using "Ungrouped" as fallback.
  const groupedFriends = friends ? friends.reduce<Record<string, Friend[]>>((acc, friend) => {
    const groupId = friend.groupId || "General"
    if (!acc[groupId]) {
      acc[groupId] = []
    }
    acc[groupId].push(friend)
    return acc
  }, {}) : null;

  return (
    <Box sx={{
      backgroundColor: "greyV2.black", height: "100%", overflow: "auto", maxHeight: "100vh"
    }}>
      {Object.entries(groupedFriends).map(([groupId, groupFriends]) => (
        <Accordion key={groupId} disableGutters
          sx={{ backgroundColor: "greyV2.black" }}
        >
          <AccordionSummary expandIcon={<ArrowRightIcon sx={{ color: (theme) => theme.palette.gold[2] }} />}
            sx={{
              flexDirection: "row-reverse",
              gap: 1,
              '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                transform: "rotate(90deg)"
              },
              "&:hover": {
                backgroundColor: "greyV2.cool"
              }
            }}
          >
            <Typography variant="h5">{groupDisplayMap[groupId] || groupId}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <Stack>
              {groupFriends.map((friend) => (
                <Box
                  key={friend.id}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    p: 1,
                    "&:hover": {
                        backgroundColor: "greyV2.cool"
                    }
                  }}
                >
                  <Checkbox
                    checked={selectedFriends[friend.id] || false}
                    onChange={(e) => handleFriendSelection(friend.id, e.target.checked)}
                    sx={{
                        color: (theme) => theme.palette.gold[2], 
                        '&.Mui-checked': {
                          color: (theme) => theme.palette.gold[4],
                        },
                      }}
                  />
                  <Box>
                    <Typography variant="h6">{friend.gameName}</Typography>
                    <Typography variant="subtitle1">{friend.availability}</Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}

export default FriendList

