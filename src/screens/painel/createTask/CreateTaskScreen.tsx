import {
  Keyboard,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "../../../components/Header/Header";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";
import { SchemaTaskForm } from "../../../hooks/useTask";
import { colors } from "../../../constants/colors";
import { useState } from "react";
import Calendar from "../../../components/Calendar/Calendar";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamList } from "../../../routes/app.routes";
import Button from "../../../components/Button/Button";
import Input, { ButtonInput } from "../../../components/Input/Input";
import NewModal from "../../../components/NewModal/NewModal";

type NavigationProps = StackNavigationProp<AppStackParamList, 'CreateTask'>

type taskFormProps = {
  control: Control<SchemaTaskForm>;
  handleSubmit: UseFormHandleSubmit<SchemaTaskForm>;
  errors: FieldErrors<SchemaTaskForm>;
  isSubmitting: boolean;
  onSubmit: () => Promise<void>
};

export type DatesProps = {
  dateString: string;
  day: number;
  month: number;
  year: number;
  formattedDate: string;
}

export const today = {
    dateString: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    formattedDate: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
}

const CreateTasksScreen = ({
  control,
  handleSubmit,
  errors,
  isSubmitting,
//   onSubmit
}: taskFormProps) => {
  const [startModalVisible, setStartModalVisible] = useState(false)
  const [endModalVisible, setEndModalVisible] = useState(false)
  const [startDate, setStartDate] = useState<DatesProps>(today)
  const [endDate, setEndDate] = useState<DatesProps | undefined>(undefined)

  const navigation = useNavigation<NavigationProps>()

    const onSubmit = (data: any) => {
        console.log(data)
    }


    const openDateModal = (date: string) => {
      if(date === 'startDate') {
          setStartModalVisible(true)
      } else {
          setEndModalVisible(true)
      }
      Keyboard.dismiss()
    }


  return (
    <View style={styles.container}>
      <Header title="Criar Tarefa" />

      <View style={styles.containerForm}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <View style={styles.containerLabelInput}>
              <Text style={styles.label}>Nome</Text>
              <Input
                placeholder="Digite o nome da tarefa"
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <View style={styles.containerLabelInput}>
              <Text style={styles.label}>Descrição</Text>
              <Input
                placeholder="Digite a descrição da tarefa"
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
        />

        <View style={styles.containerDates}>

          <Controller
            control={control}
            name="startDate"
            render={() => (
                <View style={[styles.containerLabelInput, {width: '45%'}]}>
                  <Text style={styles.label}>Data de inicio</Text>
                  <ButtonInput onPress={() => openDateModal('startDate')}
                    children={<Text>{startDate && startDate.formattedDate}</Text>}  
                  >
                  </ButtonInput>
                </View>
            )}
          />

          <Controller
            control={control}
            name="endDate"
            render={() => (
                <View style={[styles.containerLabelInput, {width: '45%'}]}>
                  <Text style={styles.label}>Data de termino</Text>
                  <ButtonInput onPress={() => openDateModal('endDate')}>
                    <Text>{endDate ? endDate.formattedDate : "Data de termino"}</Text>
                  </ButtonInput>
                </View>
            )}
          />

        </View>

        <Controller
          control={control}
          name="category"
          render={({ field: { onChange, value } }) => (
            <View style={styles.containerLabelInput}>
              <Text style={styles.label}>Categoria</Text>
              <ButtonInput onPress={() => navigation.navigate('Categories')}>
                <Text>{"Selecione uma categoria"}</Text>
              </ButtonInput>
            </View>
          )}
        />
      </View>

      <NewModal
        visible={startModalVisible}
        setVisible={setStartModalVisible}
        content={
          <Calendar
            close={() => setStartModalVisible(false)}
            dateValue={(value) => setStartDate(value)}
            startDate={startDate}
            maxDate={endDate ? endDate.dateString : undefined}
            />
          }
      />


      <NewModal
        visible={endModalVisible}
        setVisible={setEndModalVisible}
        content={
          <Calendar
            close={() => setEndModalVisible(false)}
            dateValue={(value) => setEndDate(value)}
            startDate={startDate}
            endDate={endDate}
            endDateCalendar
            minDate={startDate && startDate.dateString}
          />
        }
      />

      <Button textButton="Criar" isSubmitting={isSubmitting} onPress={handleSubmit(onSubmit)} />

    </View>
  );
};

export default CreateTasksScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  containerForm: {
    width: "95%",
    height: "50%",
    marginTop: 50,
    display: "flex",
    gap: 25,
  },
  containerLabelInput: {
    gap: 2,
  },
  label: {
    fontSize: 15,
    fontWeight: 500,
  },
  containerDates: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSubmit: {
    width: '90%',
    height: 50,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButton: {
    fontWeight: '500',
    fontSize: 20,
    color: colors.primary
  }
});
