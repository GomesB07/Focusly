import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from 'zod'

const schemaTask = z.object({
    name: z.string('Nome inválido').nonempty().min(5, 'Mínimo de 5 caracteres'),
    description: z.string('Descrição inválida').optional(),
    startDate: z.date('Data inválida'),
    endDate: z.date('Data inválida'),
    category: z.string("Por favor, selecione uma categoria").nonempty()
}).refine((date) => date.endDate >= date.startDate, {
    error: 'Data de término não pode ser menor que a de início',
    path: ['endDate']
})

export type SchemaTaskForm = z.infer<typeof schemaTask>

export const useTask = () => {


    const {control, handleSubmit, formState: {errors, isSubmitting}} = useForm<SchemaTaskForm>({
        resolver: zodResolver(schemaTask),
        mode: 'onSubmit',
        reValidateMode: 'onChange'
    })


    const onSubmit = async () => {
        
    }


    return {
        control,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit
    }
}
