import { ICategory, IPayloadCategory, IPayloadInputCategory } from '@/utils/data';
import { supabase } from '@/utils/supabase';

const useManageCategory = () => {
    const addCategory = async ({ label, id }: IPayloadCategory) => {
        let dataToInsert: IPayloadCategory = { label };
        if (id) {
            dataToInsert.id = id;
        }

        const { data, error } = await supabase.from('categories').insert(dataToInsert).select().maybeSingle();

        return {
            data: data as ICategory,
            error,
        };
    };

    const addInputCategory = async (rows: IPayloadInputCategory[]) => {
        const { data, error } = await supabase.from('category_inputs').insert(rows).select();

        return {
            data,
            error,
        };
    };

    return {
        addInputCategory,
        addCategory,
    };
};

export default useManageCategory;
