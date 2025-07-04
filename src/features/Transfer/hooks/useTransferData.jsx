import { useQuery } from '@tanstack/react-query';
import { transferDummy } from '../data/transferDummy';

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
