import { ICategory } from '@/utils/data';
import fetcher from '@/utils/swr';
import useSWR from 'swr';

const useGetCategory = () => {
    const { data, isLoading, error } = useSWR<ICategory[]>('/posts?_start=0&_limit=5', fetcher, {
        dedupingInterval: 60000,
        shouldRetryOnError: false,
    });

    return {
        posts: data,
        isLoading,
        errors: error,
    };
};

export default useGetCategory;
