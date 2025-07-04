import { useQuery } from '@tanstack/react-query';
import { transaksiDummy } from '../../../utils/DummyData'

export const useTransaksiData = () => {
  return useQuery({
    queryKey: ['transaksi'],
    queryFn: async () => {
      // Simulasi delay
      await new Promise((r) => setTimeout(r, 1000));
      return transaksiDummy;
    },
  });
};
