import { useQuery } from 'react-query';
// import { useAtom } from 'jotai';
// import globalSearchEngineAtom from './atoms/searchEngine';

const getRecords = async () => {
  const res = await fetch(`/api/gateway`);
  const { result } = await res.json();
    return result;
};

const useGateway = () => {
  return useQuery('GATEWAYS', getRecords, {
    staleTime: 1000 * 60 * 60,
  });
};

export default useGateway;
