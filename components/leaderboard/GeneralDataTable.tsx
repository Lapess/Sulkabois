"use client";
import { getGamesWithTeamsFull } from "@/utils/supabase/browser/games";
import { getSessions } from "@/utils/supabase/browser/sessions";
import { Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
interface TableItem {
  id: number;
  title: string;
  value: number;
}
const GeneralDataTable = () => {
  const [tableItems, setTableItems] = useState<TableItem[]>([]);

  useEffect(() => {
    async function load() {
      const [sessions, games] = await Promise.all([
        getSessions(),
        getGamesWithTeamsFull(),
      ]);

      setTableItems([
        { id: 0, title: "Sessioiden lukumäärä", value: sessions?.length ?? 0 },
        { id: 1, title: "Pelien lukumäärä", value: games?.length ?? 0 },
      ]);
    }
    load();
  }, []);
  return (
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
