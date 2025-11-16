import { useTask } from "../../../features/tasks/hooks/useTask"
import TasksScreen from "../../../features/tasks/screens/CreateTaskScreen"


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