import CategoryService from "../services/categoryService"


export type CategoryType = {
    id: string;
    name: string;
    description: string;
    color: string;
    user_id: string;
    icon: string;
    created_at: string;
    updated_at: string;
}


export const useCategory = () => {

    const getCategories = async (): Promise<CategoryType[]> => {
        const data = await CategoryService.getAllCategories()

        console.log('ALL CATEGORIES')
        return data
    }

    return {
        getCategories
    }
}