import { createListCollection, Portal, Select, VStack } from "@chakra-ui/react";

interface Props {}
const Score = ({}: Props) => {
  return (
    <>
      <VStack>
        <Select.Root size={"sm"} collection={options}>
          <Select.HiddenSelect />
          <Select.Label>Pisteet</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Pisteet" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {options.items.map((value) => (
                  <Select.Item item={value} key={value.value}>
                    {value.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </VStack>
    </>
  );
};

const options = createListCollection({
  items: [
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
    { label: 4, value: 4 },
    { label: 5, value: 5 },
    { label: 6, value: 6 },
    { label: 7, value: 7 },
    { label: 8, value: 8 },
    { label: 9, value: 9 },
    { label: 10, value: 10 },
    { label: 11, value: 11 },
    { label: 12, value: 12 },
    { label: 13, value: 13 },
    { label: 14, value: 14 },
    { label: 15, value: 15 },
    { label: 16, value: 16 },
    { label: 17, value: 17 },
    { label: 18, value: 18 },
    { label: 19, value: 19 },
    { label: 20, value: 20 },
    { label: 21, value: 21 },
  ],
});
export default Score;
