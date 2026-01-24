import CallBackContainer from "@/components/common/auth/CallBackContainer";

interface Props {
  searchParams: Promise<{ code?: string }>;
}
async function MagicCallBack({ searchParams }: Props) {
  const { code } = await searchParams;
  return <CallBackContainer code={code} />;
}

export default MagicCallBack;
