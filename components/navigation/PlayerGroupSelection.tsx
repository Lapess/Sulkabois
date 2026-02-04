"use client";
import { getPlayerGroupListCollection } from "@/data/playergroup/listCollection";
import { getSessionUser } from "@/services/supabase/auth/client";
import { createListCollection, ListCollection, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { usePlayerGroup } from "../context/PlayerGroupContext";

const PlayerGroupSelection = () => {
  const { setSelectedPlayerGroup } = usePlayerGroup();

  const [playerGroupCollection, setPlayerGroupCollection] = useState<
    ListCollection<{ label: string; value: string }>
  >(createListCollection({ items: [{ label: "", value: "" }] }));
  useEffect(() => {
    getSessionUser().then((user) => {
      getPlayerGroupListCollection(user?.id!).then((collection) => {
        setPlayerGroupCollection(collection);
      });
    });
  }, []);

  return (
    <Select.Root
      key={playerGroupCollection.items.length} // enforces the component rerender when the collection is updated
      collection={playerGroupCollection}
      size={"md"}
      minW={"200px"}
      defaultValue={[playerGroupCollection?.items[0]?.value.toString()]} // TODO get latest from localstorage?
      onValueChange={(e) => {
        console.log(e.value[0]);
        setSelectedPlayerGroup(parseInt(e.value[0]));
      }}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={"Valitse peliporukka"} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>

      <Select.Positioner>
        <Select.Content>
          {playerGroupCollection?.items?.map((group) => (
            <Select.Item key={group.value} item={group}>
              {group.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
};
export default PlayerGroupSelection;
