export type Friend = {
    summonerId: number
    id: string
    name: string
    pid: string
    puuid: string
    gameName: string
    gameTag: string
    icon: number
    availability: string
    platformId: string
    patchline: string
    product: string
    productName: string
    summary: string
    time: number
    statusMessage: string
    note: string
    lastSeenOnlineTimestamp: string
    isP2PConversationMuted: boolean
    groupId: number
    displayGroupId: number
    groupName: string
    displayGroupName: string
    lol: Lol
}

type Lol = {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
}