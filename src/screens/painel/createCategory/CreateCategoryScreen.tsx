import { LogBox, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Header from "../../../components/Header/Header"
import { Control, Controller, FieldErrors, UseFormGetValues, UseFormHandleSubmit, UseFormSetValue, UseFormWatch } from "react-hook-form"
import { SchemaCategoryForm } from "../../../hooks/useCategory"
import React, { useEffect, useState } from "react"
import { colors } from "../../../constants/colors"
import Input, { ButtonInput } from "../../../components/Input/Input"
import Button from "../../../components/Button/Button"
import EmojiModal from "../../../components/EmojiModal/EmojiModal"
import { Emoji } from "rn-emoji-picker/dist/interfaces"

LogBox.ignoreLogs(["shared value's .value"])


type CreateCategoryFormProps = {
    control: Control<SchemaCategoryForm>;
    handleSubmit: UseFormHandleSubmit<SchemaCategoryForm>;
    errors: FieldErrors<SchemaCategoryForm>;
    isSubmitting: boolean;
    setValue: UseFormSetValue<SchemaCategoryForm>;
    watch: UseFormWatch<SchemaCategoryForm>;
}

type ColorsType = {
    name: string;
    value: string;
}

const colorsCategory: ColorsType[] = [
    {name: 'red', value: '#E01111'},
    {name: 'green', value: '#25E217'},
    {name: 'blue', value: '#2A14B7'},
    {name: 'pink', value: '#FD0A98'},
    {name: 'yellow', value: '#DFA913'},
    {name: 'purple', value: '#C11EF2'}
]

const CreateCategoryScreen = ({control, handleSubmit, errors, isSubmitting, setValue, watch}: CreateCategoryFormProps) => {
    const [modalIconVisible, setModalIconVisible] = useState(false)
    const [selectedEmoji, setSelectedEmoji] = useState<Emoji | null>(null)

    const valueForm = watch()
    

    return (
        <View style={styles.container}>
            <Header title="Criar Categoria" />

            <View style={styles.subcontainer}>


                <View style={styles.previewContainer}>

                    <Text style={[styles.label]}>Preview</Text>
                    <View style={[styles.preview, {backgroundColor: valueForm.color || colors.inputBackground, borderColor: valueForm.color || '#000'}]}>
                        <Text style={{position: 'absolute', left: 20, color: colors.textPrimary || colors.textDark}}>{valueForm.icon || 'Icone'}</Text>
                        <Text style={{color: colors.textPrimary || colors.textDark}}>{valueForm.name || 'Nome da Categoria'}</Text>
                    </View>

                </View>

                <View style={styles.containerForm}>

                    <Controller
                        control={control}
                        name="name"
                        render={({ field: {onChange, value}}) => (
                            <View style={{gap: 2}}>
                                <View style={styles.containerLabelInput}>
                                    <Text style={styles.label}>Nome</Text>
                                    <Input
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="Nome da categoria"
                                    />
                                </View>
                                {errors?.name && <Text style={styles.errorMessage}>{errors.name?.message}</Text>}
                            </View>
                        )}
                        >
                    </Controller>

                    <Controller
                        control={control}
                        name="description"
                        render={({ field: {onChange, value}}) => (
                            <View style={{gap: 2}}>
                                <View style={styles.containerLabelInput}>
                                    <Text style={styles.label}>Descrição</Text>
                                    <Input
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="Descrição da categoria"
                                    />
                                </View>
                                {errors?.description && <Text style={styles.errorMessage}>{errors.description?.message}</Text>}
                            </View>
                        )}
                    >
                    </Controller>


                    <Controller
                        control={control}
                        name="color"
                        render={({field: { onChange, value }}) => (
                            <View style={{gap: 2}}>
                                <View style={styles.containerLabelInput}>
                                    <Text style={styles.label}>Cor</Text>
                                    <Text style={styles.subLabel}>Selecione uma cor para representar a categoria</Text>
                                    
                                    <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
                                        {
                                            colorsCategory && colorsCategory.map((color) => (
                                                <TouchableOpacity 
                                                    key={color.name} 
                                                    style={[styles.buttonColor, { backgroundColor: color.value, borderWidth: value === color.value ? 3 : 0, borderColor: colors.primary}]}
                                                    onPress={() => onChange(color.value)}
                                                >
                                        
                                                </TouchableOpacity>
                                            ))
                                        }
                                    </View>
                                </View>
                                {errors?.color && <Text style={styles.errorMessage}>{errors.color?.message}</Text>}
                            </View>
                        )}
                    >

                    </Controller>


                    <Controller 
                        control={control}
                        name="icon"
                        render={() => (
                            <View style={{gap: 2}}>
                                <View style={styles.containerLabelInput}>
                                    <Text style={styles.label}>Icone</Text>
                                    <Text style={styles.subLabel}>Selecione um icone para representar a categoria</Text>
                                    <ButtonInput onPress={() => setModalIconVisible(true)}>
                                        <Text style={{color: colors.textSecondary}}>{selectedEmoji ? selectedEmoji.emoji : 'Selecionar Icone'}</Text>
                                    </ButtonInput>
                                </View>
                                {errors?.icon && <Text style={styles.errorMessage}>{errors.icon?.message}</Text>}
                            </View>
                        )}
                    >

                    </Controller>

                </View>

                <Button
                    textButton="Criar Categoria" 
                    isSubmitting={isSubmitting} 
                    onPress={handleSubmit((data) => console.log(data))} 
                />
                
            </View>

            <EmojiModal 
                setModalIconVisible={setModalIconVisible}
                modalIconVisible={modalIconVisible}
                setSelectedEmoji={setSelectedEmoji}
                setValue={setValue}
            />

        </View>
    )
}

export default CreateCategoryScreen

const styles = StyleSheet.create({
    previewContainer: {
        width: '95%',
        gap: 2,
    },
    preview: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    container: {
        flex: 1,
    },
    subcontainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingTop: 30,
    },
    containerForm: {
        gap: 20,
        width: '95%',
        marginBottom: 20
    },
    containerLabelInput: {
        gap: 2
    },
    label: {
        color: colors.textDark,
        fontSize: 15,
        fontWeight: 500
    },
    input: {
        width: '90%',
        height: 45,
        backgroundColor: colors.inputBackground
    },
    subLabel: {
        fontSize: 10,
        color: colors.textSecondary,
        marginLeft: 5
    },
    buttonColor: {
        width: 30,
        height: 30,
        borderRadius: 15
    },
    errorMessage: {
        color: colors.error, 
        fontSize: 12,
    }
})