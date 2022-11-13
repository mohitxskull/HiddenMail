import { useMediaQuery } from '@mantine/hooks';

const useOwnMedia = () => {
  const BigThan540 = useMediaQuery('(min-width: 540px)', true, {
    getInitialValueInEffect: false,
  });

  return { BigThan540 };
};

export default useOwnMedia;
