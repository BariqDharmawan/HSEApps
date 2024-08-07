import { ICategory } from "@/utils/data";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

const useGetDetailCategory = ({id}: {id: ICategory['id']}) => {
    const [category, setCategory] = useState(undefined)

    const getCategory = async () => {
        const {data} = await supabase.from('categories').select().eq('id', id).maybeSingle()

        setCategory(data)
    }

    useEffect(() => {
        getCategory()
    }, [])

    return {
        category: (category ? category as ICategory : undefined)
    }
}

export default useGetDetailCategory;