import { getSessionGroupById } from "@/services/supabase/sessiongroups";
import { Heading, VStack } from "@chakra-ui/react";

interface Props {
  params: Promise<{ sessionGroupId: number }>;
}
async function SessionGroupSettingsPage({ params }: Props) {
  const { sessionGroupId } = await params;
  const sessionGroup = await getSessionGroupById(sessionGroupId);
  return (
    <VStack>
      <Heading size={"3xl"}>{sessionGroup?.name}</Heading>
      <Heading size={"lg"}>Asetukset</Heading>
    </VStack>
  );
}

export default SessionGroupSettingsPage;
