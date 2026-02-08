import RestrictedRender from "@/components/common/auth/RestrictedRender";
import SessionGroupPageContainer from "@/components/sessiongroups/SessionGroupPageContainer";
import { VStack } from "@chakra-ui/react";

export default async function Home() {
  return (
    <RestrictedRender>
      <VStack>
        <SessionGroupPageContainer />
      </VStack>
    </RestrictedRender>
  );
}
