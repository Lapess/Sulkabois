import RestrictedRender from "@/components/common/auth/RestrictedRender";
import SessionGroupPageContainer from "@/components/sessiongroups/SessionGroupPageContainer";

export default async function Home() {
  return (
    <RestrictedRender>
      <SessionGroupPageContainer />
    </RestrictedRender>
  );
}
