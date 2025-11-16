import { useCategory } from "../hooks/useCategory"
import CategoriesScreen from "../screens/CategoriesScreen"

const Categories = () => {

    const {getCategories} = useCategory()

    return (
        <CategoriesScreen 
            getCategories={getCategories}
        />
    )
}

export default Categories