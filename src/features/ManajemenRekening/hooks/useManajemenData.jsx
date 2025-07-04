import { useQuery } from '@tanstack/react-query';
import { manajemenDummy } from '../../../utils/DummyData'

export const useManajemenData = () => {
  return useQuery({
    queryKey: ['manajemen'],
    queryFn: async () => {
      // Simulasi delay
      await new Promise((r) => setTimeout(r, 1000));
      return manajemenDummy;
    },
  });
};
