"use client";
import {
  getPlayerGames,
  getPlayerWinPercentage,
  getPlayerWinsCount,
} from "@/leaderboard/calcHelpers";
import { GameWithTeams } from "@/types/Game";
import { Player } from "@/types/Player";
import { getGamesWithTeamsFull } from "@/utils/supabase/browser/games";
import { getPlayers } from "@/utils/supabase/browser/players";
import { Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface TableItem {
  playerId: number;
  playerName: string | null;
  winsCount: number;
  winsPercent: number;
}

const LeaderTable = () => {
  const [tableItems, setTableItems] = useState<TableItem[]>([]);
  const [games, setGames] = useState<GameWithTeams[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  useEffect(() => {
    getPlayers().then((players) => setPlayers(players));
    getGamesWithTeamsFull().then((games) => {
      if (games) setGames(games);
    });
  }, []);

  useEffect(() => {
    let items: TableItem[] = players.map((x) => ({
      playerId: x.id,
      playerName: x.name,
      winsCount: getPlayerWinsCount(x.id, games),
      winsPercent: getPlayerWinPercentage(x.id, games),
    }));
    setTableItems(items);
  }, [games, players]);
  return (
    <Table.Root size="sm" striped>
      <Table.Caption captionSide="top">Voitot kaikissa peleissä</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Pelaaja</Table.ColumnHeader>
          <Table.ColumnHeader>lkm</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">%</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tableItems
          .sort((a, b) => b.winsPercent - a.winsPercent)
          .map((item) => (
            <Table.Row key={item.playerId}>
              <Table.Cell>{item.playerName}</Table.Cell>
              <Table.Cell>{item.winsCount}</Table.Cell>
              <Table.Cell textAlign="end">{item.winsPercent}</Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table.Root>
  );
};
export default LeaderTable;
