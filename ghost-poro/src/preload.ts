import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld("electron", {
  getLockfileData: async () => {
    return await ipcRenderer.invoke("get-lockfile-data")
  },
  leagueApiRequest: async (endpoint: string, method = "GET", body: any = null) => {
    return await ipcRenderer.invoke("league-api-request", endpoint, method, body)
  },
})

