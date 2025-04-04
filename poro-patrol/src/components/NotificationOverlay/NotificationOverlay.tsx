import type React from "react"
import { Box, Button, Typography } from "@mui/material"
import * as styles from "./notificationOverlay.styles"
import cait from "../../assets/images/cait.gif"

interface NotificationOverlayProps {
  onCancel: () => void
  selectedFriendsCount: number
  statusUpdates?: { friendName: string; status: string; timestamp: number }[]
}

const NotificationOverlay: React.FC<NotificationOverlayProps> = ({ 
  onCancel, 
  selectedFriendsCount,
  statusUpdates = []
}) => {
  const formatTime = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <Box sx={styles.overlay}>
      <Box sx={styles.modal}>
        <Box component="img" src={cait} sx={styles.loadingVisual}/>
        <Typography variant="h5" sx={styles.title}>
          Monitoring {selectedFriendsCount} Friend{selectedFriendsCount !== 1 ? "s" : ""}
        </Typography>
        <Typography variant="body1" sx={styles.description}>
          Watching for status changes. You'll be notified when friends come online.
        </Typography>

        {statusUpdates.length > 0 && (
          <Box sx={styles.updatesContainer}>
            <Typography variant="subtitle1" sx={styles.updatesTitle}>
              Recent Updates:
            </Typography>
            <Box sx={styles.updatesList}>
              {statusUpdates.map((update, index) => (
                <Typography key={index} variant="body2" sx={styles.updateItem}>
                  {formatTime(update.timestamp)} - {update.friendName}: {update.status}
                </Typography>
              ))}
            </Box>
          </Box>
        )}

        <Button variant="contained" onClick={onCancel} sx={styles.cancelButton}>
          Stop Monitoring
        </Button>
      </Box>
    </Box>
  )
}

export default NotificationOverlay
