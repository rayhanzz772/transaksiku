import { useQuery } from '@tanstack/react-query';
import { dashboardDummy } from '../../../utils/DummyData'

export const useDashboardData = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      // Simulasi delay
      await new Promise((r) => setTimeout(r, 1000));
      return dashboardDummy;
    },
  });
};
