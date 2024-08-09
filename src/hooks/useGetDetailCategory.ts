import { ICategory, ICategoryFields } from '@/utils/data';
import { supabase } from '@/utils/supabase';
import { useEffect, useState } from 'react';

const useGetDetailCategory = ({ id, getFields }: { id: ICategory['id']; getFields?: boolean }) => {
    const [category, setCategory] = useState(undefined);
    const [fields, setFields] = useState<ICategoryFields[]>([]);

    const getCategory = async () => {
        const { data } = await supabase.from('categories').select().eq('id', id).maybeSingle();

        setCategory(data);
    };

    const getFieldCategory = async () => {
        const { data } = await supabase.from('category_inputs').select().eq('category_id', id);
        setFields(data as ICategoryFields[]);
    };

    useEffect(() => {
        getCategory();
        if (getFields) {
            getFieldCategory();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        category: category ? (category as ICategory) : undefined,
        fields,
    };
};

export default useGetDetailCategory;
