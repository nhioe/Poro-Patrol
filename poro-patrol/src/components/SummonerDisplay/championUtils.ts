const championData: Record<string, { name: string; image: string }> = {}

export async function fetchChampionData(): Promise<void> {
  try {
    const response = await fetch("https://ddragon.leagueoflegends.com/cdn/15.6.1/data/en_US/champion.json")
    const data = await response.json()

    Object.values(data.data).forEach((champion: any) => {
      championData[champion.key] = {
        name: champion.name,
        image: `https://ddragon.leagueoflegends.com/cdn/15.6.1/img/champion/${champion.image.full}`,
      }
    })
  } catch (error) {
    console.error("Error fetching champion data:", error)
  }
}

export function getChampionName(championId: number): string {
  return championData[championId]?.name || `Champion ${championId}`
}

export function getChampionImage(championId: number): string {
  return championData[championId]?.image || `https://ddragon.leagueoflegends.com/cdn/15.6.1/img/champion/default.png`
}
