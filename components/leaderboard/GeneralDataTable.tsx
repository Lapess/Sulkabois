"use client";
import { GeneralDataTableItem } from "@/interfaces/GeneralDataTableItem";
import { getGeneralDataTableItems } from "@/leaderboard/generalData";
import { getGamesWithTeamsFull } from "@/utils/supabase/games";
import { getSessions } from "@/utils/supabase/sessions";
import { Spinner, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const GeneralDataTable = () => {
  const [tableItems, setTableItems] = useState<GeneralDataTableItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const [sessions, games] = await Promise.all([
        getSessions(),
        getGamesWithTeamsFull(),
      ]);

      setTableItems(getGeneralDataTableItems(games ?? [], sessions ?? []));
      setIsLoading(false);
    }
    load();
  }, []);
  return isLoading ? (
    <Spinner />
  ) : (
    <Table.Root size="sm" my={5}>
      <Table.Caption captionSide="top">Yleistä</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader></Table.ColumnHeader>
          <Table.ColumnHeader></Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tableItems.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.title}</Table.Cell>
            <Table.Cell>{item.value}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default GeneralDataTable;
