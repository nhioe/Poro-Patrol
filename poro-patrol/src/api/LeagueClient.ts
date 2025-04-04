class LeagueClient {
  private lockfile: { port: string; password: string; protocol: string } | null = null
  private static instance: LeagueClient | null = null

  async loadLockfileData() {
    this.lockfile = await (window as any).electron.getLockfileData()
    console.log(this.lockfile)
    if (!this.lockfile || !this.lockfile.port || !this.lockfile.password || !this.lockfile.protocol) {
      console.error("Failed to read lockfile! Make sure the LoL client is running.")
      this.lockfile = null
    }
    return this.lockfile
  }

  public static getInstance(): LeagueClient {
    if (!LeagueClient.instance) {
      LeagueClient.instance = new LeagueClient()
    }
    return LeagueClient.instance
  }

  public async isLockfileValid(): Promise<boolean> {
    try {
      if (!this.lockfile) {
        return !!(await this.loadLockfileData())
      }

      // Validate lockfile with simple request
      const response = await this.request("/lol-summoner/v1/current-summoner", "GET", null, false)
      return !!response
    } catch (error) {
      console.error("Lockfile validation failed:", error)
      this.lockfile = null
      return false
    }
  }

  async request(endpoint: string, method = "GET", body: any = null, validateLockfile = true) {
    try {
      // Validate lockfile if requested
      if (validateLockfile && !(await this.isLockfileValid())) {
        throw new Error("Lockfile is no longer valid")
      }

      console.log(`Requesting data from ${endpoint}...`)
      const response = await (window as any).electron.leagueApiRequest(endpoint, method, body)

      if (response.error) {
        throw new Error(response.error)
      }

      return response
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error)
      return null
    }
  }

  async getSummonerData() {
    return await this.request("/lol-summoner/v1/current-summoner")
  }

  async getFriendList() {
    return await this.request("/lol-chat/v1/friends")
  }

  async getFriendGroups() {
    return await this.request("/lol-chat/v1/friend-groups")
  }

  async getFriend(friendId: string) {
    return await this.request(`/lol-chat/v1/friends/${friendId}`)
  }

  async getRankedData(puuid: string) {
    return await this.request(`/lol-ranked/v1/ranked-stats/${puuid}`)
  }

  async getChampionMasteries(puuid: string) {
    return await this.request(`/lol-champion-mastery/v1/${puuid}/champion-mastery`);
  }
}

export default LeagueClient
