import { ICategory } from '@/utils/data';
import { supabase } from '@/utils/supabase';
import { PostgrestError } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const useGetCategory = () => {
    const [datas, setDatas] = useState<ICategory[]>([])
    const [fetchState, setFetchState] = useState<{isLoading: boolean; error: PostgrestError | null}>({
        isLoading: false,
        error: null
    })

    const getCategories = async () => {
        setFetchState({isLoading: true, error: null})
        let { data: categories, error } = await supabase.from('categories').select('*')
        setFetchState({isLoading: false, error})
        
        setDatas(categories as ICategory[])
    }

    useEffect(() => {
        getCategories()
    }, [])

    return {
        data: datas,
        isLoading: fetchState.isLoading,
        errors: fetchState.error,
    };
};

export default useGetCategory;
