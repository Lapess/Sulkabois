import { Button, HStack, Link } from "@chakra-ui/react";

const MainMenu = () => {
  return (
    <HStack gap={2} m={2}>
      <Button p={5} colorPalette={"black"} variant={"outline"}>
        <Link href="/">Etusivu</Link>
      </Button>
    </HStack>
  );
};

export default MainMenu;
