import * as z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"


const schemaCategory = z.object({
    name: z.string('Nome inválido').min(2, 'Por favor, digite pelo menos 2 caracteres'),
    description: z.string('Descrição inválida').min(5, 'Por favor, digite pelo menos 5 caracteres'),
    color: z.string('Por favor, selecione uma cor').nonempty(),
    icon: z.string('Icone precisa ser escolhido').nonempty()
})

export type SchemaCategoryForm = z.infer<typeof schemaCategory>

export const useCategory = () => {

    const {control, handleSubmit, formState: {errors, isSubmitting}, setValue, watch} = useForm<SchemaCategoryForm>({
        resolver: zodResolver(schemaCategory),
        mode: 'onChange'
    })

    return {
        control,
        handleSubmit,
        errors,
        isSubmitting,
        setValue,
        watch
    }

}