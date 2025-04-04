export interface ChampionMastery {
    puuid: string
    championId: number
    championLevel: number
    championPoints: number
    lastPlayTime: number
    championPointsSinceLastLevel: number
    championPointsUntilNextLevel: number
    markRequiredForNextLevel: number
    tokensEarned: number
    championSeasonMilestone: number
    milestoneGrades: string[]
    nextSeasonMilestone?: {
      requireGradeCounts: Record<string, number>
      rewardMarks: number
      bonus: boolean
      rewardConfig: {
        rewardValue: string
        maximumReward: number
      }
    }
    highestGrade?: string
    // add fields for display
    championName?: string
    championImage?: string
}
  
  