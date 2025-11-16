import { supabase } from "../../../config/supabase"
import { CategoryType } from "../hooks/useCategory"
import { SchemaCategoryForm } from "../hooks/useCreateCategory"

const CategoryService = {

    createCategory: async (dataCategory: SchemaCategoryForm) => {
        const {data, error} = await supabase.from('categories').insert(dataCategory)

        if(error) {
            console.log('ERROR CREATE CATEGORY')
            console.log(error)
            throw error
        }

        console.log('CATEGORIA CRIADA!!')
        return data
    },

    getAllCategories: async (): Promise<CategoryType[]> => {
        const {data, error} = await supabase.from('categories').select('*')

        if(error) {
            console.log('ERROR GET CATEGORIES')
            throw error
        }

        return data
    }

}

export default CategoryService