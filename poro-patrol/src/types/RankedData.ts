export interface RankedWarnings {
    daysUntilDecay?: number
    demotionWarning?: number
    displayDecayWarning?: boolean
    timeUntilInactivityStatusChanges?: number
  }
  
  export interface RankedQueueEntry {
    division: string
    highestDivision: string
    highestTier: string
    isProvisional: boolean
    leaguePoints: number
    losses: number
    miniSeriesProgress: string
    previousSeasonEndDivision: string
    previousSeasonEndTier: string
    previousSeasonHighestDivision: string
    previousSeasonHighestTier: string
    provisionalGameThreshold: number
    provisionalGamesRemaining: number
    queueType: string
    ratedRating: number
    ratedTier: string
    tier: string
    warnings: RankedWarnings | null
    wins: number
  }
  
  export interface SeasonInfo {
    currentSeasonEnd: number
    currentSeasonId: number
    nextSeasonStart: number
  }
  
  export interface RankedData {
    currentSeasonSplitPoints: number
    earnedRegaliaRewardIds: string[]
    highestCurrentSeasonReachedTierSR: string
    highestPreviousSeasonEndDivision: string
    highestPreviousSeasonEndTier: string
    highestRankedEntry: RankedQueueEntry
    highestRankedEntrySR: RankedQueueEntry
    previousSeasonSplitPoints: number
    queueMap: Record<string, RankedQueueEntry>
    queues: RankedQueueEntry[]
    rankedRegaliaLevel: number
    seasons: Record<string, SeasonInfo>
    splitsProgress: Record<string, any>
  }
    