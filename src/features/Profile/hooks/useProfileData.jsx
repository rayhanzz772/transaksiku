import { useQuery } from '@tanstack/react-query';
import { profileDummy } from '../../../utils/DummyData'

export const useProfileData = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      // Simulasi delay
      await new Promise((r) => setTimeout(r, 1000));
      return profileDummy;
    },
  });
};
