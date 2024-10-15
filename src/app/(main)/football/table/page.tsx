'use client';
import Table from '@/components/constants/Table';
import GenderSwitcher from '@/components/shared/GenderSwitcher';
import { useApp } from '@/contexts/AppProvider';
import useGender from '@/hooks/useGender';
import MainLayout from '@/layouts/MainLayout';

const FootTableIndex = () => {
  const { teams } = useApp();
  const [genderTeams, setGenderTeams] = useGender(teams?.football!);

  return (
    <MainLayout title="Football - Table">
      <div className="p-3 gap-y-3 flex w-full flex-col">
        <GenderSwitcher onChange={setGenderTeams} className=" max-w-md mx-auto w-full" />
        <div className="float-left font-bold text-lg px-3">
          <h3>Standings</h3>
        </div>
        <Table teams={genderTeams} />
      </div>
    </MainLayout>
  );
};

export default FootTableIndex;
