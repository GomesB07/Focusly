import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { colors } from "../../../constants/colors";
import Logo from "../../../../assets/svg/Logo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRef, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SignUpFormData } from "../../../hooks/useSignUp";
import Button from "../../../components/Button/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RootRoutes } from "../../../routes/routes";

interface SignUpScreenProps {
  control: Control<SignUpFormData>;
  onSubmit: (data: SignUpFormData) => Promise<void>;
  handleSubmit: UseFormHandleSubmit<SignUpFormData>;
  errors: FieldErrors<SignUpFormData>;
  isSubmitting: boolean;
}

type AuthNavigationProp = StackNavigationProp<RootRoutes, "SignUp">;

const SignUpScreen = ({
  control,
  onSubmit,
  handleSubmit,
  errors,
  isSubmitting,
}: SignUpScreenProps) => {
  const nameInput = useRef<TextInput>(null);
  const emailInput = useRef<TextInput>(null);
  const passwordInput = useRef<TextInput>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigation = useNavigation<AuthNavigationProp>();

  const submitSignUp = handleSubmit(async (data) => {
    Keyboard.dismiss();
    await onSubmit(data);
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          display: "flex",
          height: "100%",
          alignItems: "center",
        }}
        enableOnAndroid={true}
      >
        <Logo style={styles.logo} color={colors.primary} />

        <View style={styles.containerInputsAndButton}>
          <View style={styles.inputAndLabel}>
            <Text
              style={[
                styles.label,
                { color: errors.name ? colors.error : colors.textPrimary },
              ]}
            >
              Nome
            </Text>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={[
                    styles.inputView,
                    {
                      borderColor: errors.name ? colors.error : "",
                      borderWidth: errors.name ? 2 : 0,
                    },
                  ]}
                >
                  <FontAwesome
                    name="user"
                    size={20}
                    color={colors.textSecondary}
                  />
                  <TextInput
                    placeholder="Digite seu nome"
                    defaultValue=""
                    ref={nameInput}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.input}
                    maxLength={15}
                  />
                </View>
              )}
            ></Controller>
            {errors.name && (
              <Text style={{ color: colors.error, marginLeft: 10 }}>
                {errors.name?.message}
              </Text>
            )}
          </View>

          <View style={styles.inputAndLabel}>
            <Text
              style={[
                styles.label,
                { color: errors.email ? colors.error : colors.textPrimary },
              ]}
            >
              Email
            </Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={[
                    styles.inputView,
                    {
                      borderColor: errors.email ? colors.error : "",
                      borderWidth: errors.email ? 2 : 0,
                    },
                  ]}
                >
                  <FontAwesome
                    name="envelope"
                    size={20}
                    color={colors.textSecondary}
                  />
                  <TextInput
                    placeholder="Digite seu email"
                    defaultValue=""
                    ref={emailInput}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              )}
            ></Controller>
            {errors.email && (
              <Text style={{ color: colors.error, marginLeft: 10 }}>
                {errors.email?.message}
              </Text>
            )}
          </View>

          <View style={styles.inputAndLabel}>
            <Text
              style={[
                styles.label,
                { color: errors.password ? colors.error : colors.textPrimary },
              ]}
            >
              Senha
            </Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={[
                    styles.inputView,
                    {
                      borderColor: errors.password ? colors.error : "",
                      borderWidth: errors.password ? 2 : 0,
                    },
                  ]}
                >
                  <FontAwesome
                    name="lock"
                    size={20}
                    color={colors.textSecondary}
                  />
                  <TextInput
                    placeholder="Digite sua senha"
                    ref={passwordInput}
                    defaultValue=""
                    secureTextEntry={!showPassword}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    style={styles.input}
                    maxLength={20}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    style={styles.buttonShowPassword}
                    onPress={() => setShowPassword((prev => !prev))}
                  >
                    {showPassword ? (
                      <FontAwesome
                        name="eye"
                        size={20}
                        color={colors.primary}
                      />
                    ) : (
                      <FontAwesome
                        name="eye-slash"
                        size={20}
                        color={colors.textSecondary}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              )}
            > 
            </Controller>
            {errors.password && (
              <Text style={{ color: colors.error, marginLeft: 10 }}>
                {errors.password?.message}
              </Text>
            )}
          </View>

          <Button
            isSubmitting={isSubmitting}
            textButton="Cadastrar"
            onPress={submitSignUp}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.linkHaveAccount}
        >
          <Text style={{ color: "#fff", marginRight: 5 }}>
            Já tem uma conta?
          </Text>
          <Text style={{ color: colors.primary }}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.otherLoginMethods}>
          <Text style={{ color: "#fff" }}>Cadastre-se também com</Text>

          <View style={styles.cardsOtherLoginMethods}>
            <TouchableOpacity style={styles.cardOtherLoginMethods}>
              <FontAwesome name="apple" size={24} color={colors.textPrimary} />
              <Text style={styles.textCardOtherLoginMethods}>Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.cardOtherLoginMethods,
                { backgroundColor: colors.error },
              ]}
            >
              <FontAwesome name="google" size={24} color={colors.textPrimary} />
              <Text style={styles.textCardOtherLoginMethods}>Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
    alignItems: "center",
  },
  logo: {
    marginTop: 60,
  },
  containerInputsAndButton: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    marginTop: 30,
    gap: 10,
  },
  inputAndLabel: {
    width: "90%",
  },
  label: {
    color: colors.textPrimary,
    fontSize: 16,
    marginLeft: 5,
    marginBottom: 2,
  },
  inputView: {
    width: "100%",
    height: 50,
    backgroundColor: colors.inputBackground,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    gap: 10,
  },
  input: {
    width: "82%",
    height: '100%'
  },
  buttonShowPassword: {
    height: "100%",
    width: "10%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  linkHaveAccount: {
    color: colors.textPrimary,
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
  },
  otherLoginMethods: {
    width: "100%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 5,
  },
  cardsOtherLoginMethods: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    marginTop: 10,
  },
  cardOtherLoginMethods: {
    width: "40%",
    height: 50,
    borderRadius: 8,
    backgroundColor: "#1A1A1A",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  textCardOtherLoginMethods: {
    color: colors.textPrimary,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
});
