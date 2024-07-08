import { usePathname, useSearchParams } from 'next/navigation';

const useAsPath = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return {
    asPath: `${pathname}?${searchParams?.toString()}`,
  };
};

export default useAsPath;
