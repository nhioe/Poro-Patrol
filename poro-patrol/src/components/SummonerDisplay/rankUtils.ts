import unranked from "../../assets/images/ranked-emblems/unranked.png"
import iron from "../../assets/images/ranked-emblems/iron.png"
import bronze from "../../assets/images/ranked-emblems/bronze.png"
import silver from "../../assets/images/ranked-emblems/silver.png"
import gold from "../../assets/images/ranked-emblems/gold.png"
import platinum from "../../assets/images/ranked-emblems/platinum.png"
import emerald from "../../assets/images/ranked-emblems/emerald.png"
import diamond from "../../assets/images/ranked-emblems/diamond.png"
import master from "../../assets/images/ranked-emblems/master.png"
import grandmaster from "../../assets/images/ranked-emblems/grandmaster.png"
import challenger from "../../assets/images/ranked-emblems/challenger.png"

export const tierImageMap: Record<string, string> = {
  iron,
  bronze,
  silver,
  gold,
  platinum,
  emerald,
  diamond,
  master,
  grandmaster,
  challenger,
  unranked,
}
export const tierRanking = [
  "CHALLENGER",
  "GRANDMASTER",
  "MASTER",
  "DIAMOND",
  "EMERALD",
  "PLATINUM",
  "GOLD",
  "SILVER",
  "BRONZE",
  "IRON",
]

export const divisionRanking = ["I", "II", "III", "IV"]