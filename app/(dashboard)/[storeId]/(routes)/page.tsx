import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  //   const { storeId } = useParams<{ storeId: string }>();
  //   const { data: store } = useStore(storeId);
  const store = await prismadb.store.findFirst({
    where: { id: params.storeId },
  });

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>{store?.name}</h2>
    </div>
  );
};

export default DashboardPage;
