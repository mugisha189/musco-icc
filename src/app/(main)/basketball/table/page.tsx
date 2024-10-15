'use client';
import GenderSwitcher from '@/components/shared/GenderSwitcher';
import useGender from '@/hooks/useGender';
import { useApp } from '../../../../contexts/AppProvider';
import MainLayout from '../../../../layouts/MainLayout';
import BasketTable from '@/components/constants/BasketTable';

const BacoTableIndex = () => {
  const { teams } = useApp();
  const [genderTeams, setGenderTeams] = useGender(teams?.basketball!);

  return (
    <MainLayout title="Football - Table">
      <div className="p-3 gap-y-3 flex w-full flex-col">
        <GenderSwitcher onChange={setGenderTeams} className=" max-w-md mx-auto w-full" />
        <div className="float-left font-bold text-lg px-3">
          <h3>Standings</h3>
        </div>
        <BasketTable teams={genderTeams} />
      </div>
    </MainLayout>
  );
};

export default BacoTableIndex;
