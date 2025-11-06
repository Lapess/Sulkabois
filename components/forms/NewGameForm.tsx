import { Button, Heading, VStack } from "@chakra-ui/react";
import TeamPlayers from "../players/TeamPlayers";

const NewGameForm = () => {
  return (
    <>
      <VStack pt={8} gap={6}>
        <Heading fontSize={"2xl"}>Uusi peli</Heading>
        <Heading>Pelityyli:</Heading>
        <TeamPlayers heading="Vapaat pelaajat" playerIds={[7]} />
        <TeamPlayers heading="Joukkue 1" playerIds={[3, 4]} />
        <TeamPlayers heading="Joukkue 2" playerIds={[5, 6]} />
        <Button>Tallenna</Button>
      </VStack>
    </>
  );
};

export default NewGameForm;
