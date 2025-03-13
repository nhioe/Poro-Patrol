import type React from "react"
import type { Summoner } from "../../types/Summoner";

interface SummonerDisplayProps {
  summoner: Summoner
}

const SummonerDisplay: React.FC<SummonerDisplayProps> = ({ summoner }) => {
    return(
        <div style={{ fontFamily: 'Spiegel' }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi sed unde eaque perferendis doloremque deserunt possimus voluptatum officia dolor, mollitia, explicabo voluptas sapiente odio nisi corporis corrupti velit ut architecto. Illo ab nobis minus. Voluptatibus corrupti dolorum fugiat iusto officiis.
        </div>
    )
}

export default SummonerDisplay;