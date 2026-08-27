import { createListCollection } from "@chakra-ui/react";

export const scoreOptions = createListCollection({
  items: Array.from({ length: 30 }, (_, index) => ({
    label: index,
    value: index,
  })),
});
