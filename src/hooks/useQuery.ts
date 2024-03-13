import { useLocation } from 'react-router-dom';

function useQuery(): string {
  const location = useLocation();

  return location.search;
}

export default useQuery;
