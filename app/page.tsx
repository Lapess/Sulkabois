import RestrictedRender from "@/components/common/auth/RestrictedRender";
import SessionGroupPageContainer from "@/components/sessiongroups/SessionGroupPageContainer";
import { Heading, VStack } from "@chakra-ui/react";

export default async function Home() {
  return (
    <RestrictedRender>
      <VStack>
        <Heading fontSize={"2xl"}>Sulkabois</Heading>
        <SessionGroupPageContainer />
      </VStack>
    </RestrictedRender>
  );
}
