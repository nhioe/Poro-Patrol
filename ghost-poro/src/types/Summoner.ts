export type Summoner = {
    summonerId: number
    accountId: number
    displayName: string
    internalName: string
    profileIconId: number
    summonerLevel: number
    xpSinceLastLevel: number
    xpUntilNextLevel: number
    percentCompleteForNextLevel: number
    rerollPoints: RerollPoints
    puuid: string
    nameChangeFlag: boolean
    unnamed: boolean
    privacy: string
    gameName: string
    tagLine: string
}

type RerollPoints = {
    pointsToReroll: number
    currentPoints: number
    numberOfRolls: number
    maxRolls: number
    pointsCostToRoll: number
}