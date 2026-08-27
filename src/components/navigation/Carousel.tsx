import { SessionGroupsByPlayerGroup } from "@/types/SessionGroup";
import {
  Carousel as ChakraCarousel,
  Box,
  Heading,
  VStack,
} from "@chakra-ui/react";
import SessionGroupBlock from "../sessiongroups/SessionGroupBlock";
import NewSessionGroupForm from "../forms/NewSessionGroupForm";

interface Props {
  sessionGroupsByPlayerGroup: SessionGroupsByPlayerGroup[];
}
const Carousel = ({ sessionGroupsByPlayerGroup }: Props) => {
  return (
    <ChakraCarousel.Root
      slideCount={sessionGroupsByPlayerGroup.length}
      maxW="md"
      mx="auto"
      gap="4"
    >
      <ChakraCarousel.ItemGroup>
        {sessionGroupsByPlayerGroup.map((item, index) => (
          <ChakraCarousel.Item key={index} index={index}>
            <VStack w="100%" h="350px" rounded="lg" fontSize="2.5rem" gap={3}>
              <Heading fontSize={"lg"}>
                {item.playerGroup?.name ?? "Omat peliryhmät"}
              </Heading>
              {item.sessionGroups.map((sessionGroup, index) => (
                <SessionGroupBlock
                  key={sessionGroup.id}
                  playerGroup={item.playerGroup}
                  sessionGroup={sessionGroup}
                  firstItem={index === 0}
                />
              ))}
              <NewSessionGroupForm playerGroup={item.playerGroup} />
            </VStack>
          </ChakraCarousel.Item>
        ))}
      </ChakraCarousel.ItemGroup>
      {sessionGroupsByPlayerGroup.length > 1 && (
        <ChakraCarousel.Control justifyContent="center" gap="4">
          <ChakraCarousel.Indicators />
        </ChakraCarousel.Control>
      )}
    </ChakraCarousel.Root>
  );
};

export default Carousel;
