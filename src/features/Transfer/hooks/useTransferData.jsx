import { useQuery } from '@tanstack/react-query';
import { transferDummy } from '../../../utils/DummyData'

export const useTransferData = () => {
  return useQuery({
    queryKey: ['transfer'],
    queryFn: async () => {
      // Simulasi delay
      await new Promise((r) => setTimeout(r, 1000));
      return transferDummy;
    },
  });
};
