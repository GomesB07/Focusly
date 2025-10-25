import { useCategory } from "../../../hooks/useCategory"
import CreateCategoryScreen from "../../../screens/painel/createCategory/CreateCategoryScreen"

const CreateCategory = () => {

    const {control, handleSubmit, errors, isSubmitting, setValue, watch} = useCategory()

    return (
        <CreateCategoryScreen
            control={control}
            handleSubmit={handleSubmit}
            errors={errors}
            isSubmitting={isSubmitting}
            setValue={setValue}
            watch={watch}
        />
    )
}

export default CreateCategory