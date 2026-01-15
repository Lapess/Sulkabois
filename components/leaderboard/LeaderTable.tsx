"use client";
import { LeaderBoardType } from "@/enums/LeaderBoardType";
import {
  getPlayerGames,
  getPlayerWinPercentage,
  getPlayerWinsCount,
} from "@/leaderboard/calcHelpers";
import { getTableHeader } from "@/leaderboard/tableHeader";
import { getGamesWithTeamsFull } from "@/services/supabase/games";
import { getPlayers } from "@/services/supabase/players";
import { Box, BoxProps, Spinner, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface TableItem {
  playerId: number;
  playerName: string | null;
  winsCount: number;
  gamesCount: number;
  winsPercent: number;
}
interface Props extends BoxProps {
  type: LeaderBoardType;
}

const LeaderTable = ({ type, ...rest }: Props) => {
  const [tableItems, setTableItems] = useState<TableItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const [players, games] = await Promise.all([
        getPlayers(),
        getGamesWithTeamsFull(),
      ]);
      let items: TableItem[] = players.map((x) => ({
        playerId: x.id,
        playerName: x.name,
        winsCount: getPlayerWinsCount(x.id, games ?? [], type),
        gamesCount: getPlayerGames(x.id, games ?? [], type).length,
        winsPercent: getPlayerWinPercentage(x.id, games ?? [], type),
      }));
      setTableItems(items);
      setIsLoading(false);
    }
    load();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <Box {...rest}>
      <Table.Root size="sm" striped>
        <Table.Caption captionSide="top">{getTableHeader(type)}</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Pelaaja</Table.ColumnHeader>
            <Table.ColumnHeader>Voitot</Table.ColumnHeader>
            <Table.ColumnHeader>Pelattu</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Voitto-%</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tableItems
            .sort((a, b) => b.winsPercent - a.winsPercent)
            .map((item) => (
              <Table.Row key={item.playerId}>
                <Table.Cell>{item.playerName}</Table.Cell>
                <Table.Cell>{item.winsCount}</Table.Cell>
                <Table.Cell>{item.gamesCount}</Table.Cell>
                <Table.Cell textAlign="end">{item.winsPercent}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};
export default LeaderTable;
