import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import LeagueClient from "../api/LeagueClient";
import FriendList from "./FriendList/FriendList";
import { Friend } from "../types/Friend";
import { FriendGroup } from "../types/FriendGroup";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Grid from "@mui/material/Grid2";
import theme from "../theme/theme";
import { Summoner } from "../types/Summoner";
import SummonerDisplay from "./SummonerDisplay/SummonerDisplay";

const App: React.FC = () => {
  const [summoner, setSummoner] = useState<Summoner>();
  const [friendList, setFriendList] = useState<Friend[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<Record<string, boolean>>({});
  const [friendGroups, setFriendGroups] = useState<FriendGroup[]>([]);

  const leagueClient = new LeagueClient();

  useEffect(() => {
    const fetchSummonerData = async () => {
      const summoner = await leagueClient.getSummonerData();
      setSummoner(summoner);
      console.log(summoner);
    }
    const fetchFriendGroups = async () => {
      const groups = await leagueClient.getFriendGroups();
      setFriendGroups(groups);
      console.log(groups);
    }
    const fetchFriendList = async () => {
      const friends = await leagueClient.getFriendList();
      setFriendList(friends);
      console.log(friends);
    };
    fetchSummonerData();
    fetchFriendGroups();
    fetchFriendList();
  }, []);

  const handleFriendSelection = useCallback((id: string, selected: boolean) => {
    setSelectedFriends(prev => ({ ...prev, [id]: selected }));
  }, []);

  const friendGroupDisplayMap = friendGroups.reduce<Record<string, string>>((acc, group) => {
    acc[group.id] = group.name;
    return acc;
  }, {});

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container sx={{ height: "100vh", width: "100vw" }}>
        <Grid size={8}>
          <SummonerDisplay summoner={summoner}/>
        </Grid>
        <Grid size={4}>
          <FriendList 
            friends={friendList} 
            groupDisplayMap={friendGroupDisplayMap}
            handleFriendSelection={handleFriendSelection}
            selectedFriends={selectedFriends}
          />
        </Grid>

      </Grid>
    </ThemeProvider>
  );
};

export default App;
