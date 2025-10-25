import { useTask } from "../../../hooks/useTask"
import TasksScreen from "../../../screens/painel/createTask/CreateTaskScreen"


const CreateTask = () => {
    const {control, handleSubmit, errors, isSubmitting, onSubmit} = useTask()

    return (
        <TasksScreen 
            control={control} 
            handleSubmit={handleSubmit} 
            errors={errors} 
            isSubmitting={isSubmitting} 
            onSubmit={onSubmit}
        />
    )
}

export default CreateTask