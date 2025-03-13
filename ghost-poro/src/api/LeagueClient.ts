class LeagueClient {
    private lockfile: { port: string; password: string; protocol: string } | null = null
  
    // Load lockfile data once and store it
    async loadLockfileData() {
      this.lockfile = await (window as any).electron.getLockfileData()
      console.log(this.lockfile)
      if (!this.lockfile || !this.lockfile.port || !this.lockfile.password || !this.lockfile.protocol) {
        console.error("Failed to read lockfile! Make sure the LoL client is running.")
        this.lockfile = null
      }
      return this.lockfile
    }
  
    async request(endpoint: string, method = "GET", body: any = null) {
      try {
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
  }
  
  export default LeagueClient
    