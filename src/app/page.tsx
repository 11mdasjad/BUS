import AppLayout from '@/components/layout/AppLayout';
import DashboardPage from '@/app/(dashboard)/page';

export default function Home() {
  return (
    <AppLayout>
      <DashboardPage />
    </AppLayout>
  );
}
