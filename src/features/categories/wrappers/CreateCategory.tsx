import { useCreateCategory } from "../hooks/useCreateCategory"
import CreateCategoryScreen from "../screens/CreateCategoryScreen"
import { AppStackParamList } from "../../../routes/app.routes"
import { StackScreenProps } from "@react-navigation/stack"

type RouteProps = StackScreenProps<AppStackParamList, 'CreateCategory'>

const CreateCategory = ({route}: RouteProps) => {

    const {control, handleSubmit, errors, isSubmitting, setValue, watch, onSubmit} = useCreateCategory()

    const {onCreated} = route.params

    return (
        <CreateCategoryScreen
            control={control}
            handleSubmit={handleSubmit}
            errors={errors}
            isSubmitting={isSubmitting}
            setValue={setValue}
            watch={watch}
            onSubmit={onSubmit}
            onCreated={onCreated}
        />
    )
}

export default CreateCategory