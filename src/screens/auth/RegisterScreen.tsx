import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../services/firebase";
import { maskPhone, validateForm } from "@/utils/validations";
import { GradientText } from "@/components/GradientText";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigation";
import Animated from "react-native-reanimated";
import { useLoginAnimations } from "../../hooks/useLoginAnimations"; // Ajuste o caminho conforme necessário

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Register">;
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

const registerValidationSchema = {
  name: { required: true },
  email: { required: true, email: true },
  phone: { required: true, phone: true },
  password: { required: true, minLength: 6 },
  confirmPassword: { required: true, match: "password" },
};

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { signUp } = useAuth();

  const {
    startAnimations,
    animatedFormStyle,
    animatedNameInputStyle,
    animatedEmailInputStyle,
    animatedPhoneInputStyle,
    animatedPasswordInputStyle,
    animatedConfirmPasswordInputStyle,
    animatedRegisterButtonStyle,
    animatedLinkToLoginStyle,
  } = useLoginAnimations();

  useEffect(() => {
    startAnimations();
  }, []);

  const validate = (): boolean => {
    const validationErrors = validateForm(formData, registerValidationSchema);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handlePhoneChange = (text: string): void => {
    setFormData((previousState) => ({
      ...previousState,
      phone: maskPhone(text),
    }));
  };

  const handleRegister = async (): Promise<void> => {
    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signUp(formData.email, formData.password);

      await addDoc(collection(db, "users"), {
        uid: userCredential.user.uid,
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        phone: formData.phone,
        role: "client",
        createdAt: serverTimestamp(),
      });

      navigation.replace("MainTabs");
    } catch (error: any) {
      let errorMessage = "Erro ao criar conta";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Este email já está em uso";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Email inválido";
      } else if (error.code === "auth/operation-not-allowed") {
        errorMessage = "Operação não permitida";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Senha muito fraca";
      }

      Alert.alert("Erro", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#121212]"
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={animatedFormStyle}
          className="flex-1 p-6 pt-16 md:p-8 md:pt-20 lg:p-10 lg:pt-24"
        >
          <View className="max-w-md w-full mx-auto">
            <View className="mb-12">
              <Text className="text-white text-2xl md:text-3xl font-bold mb-3">
                Criar conta
              </Text>
              <Text className="text-gray-400 text-sm md:text-base">
                Preencha os dados abaixo para criar sua conta
              </Text>
            </View>

            <View className="space-y-6">
              {/* Campo Nome */}
              <Animated.View style={animatedNameInputStyle}>
                <Text className="text-white mb-2 ml-1 text-sm md:text-base">
                  Nome
                </Text>
                <TextInput
                  className="bg-[#1A1A1A] text-white px-4 py-4 rounded-lg"
                  placeholder="Digite seu nome completo"
                  placeholderTextColor="#666666"
                  value={formData.name}
                  onChangeText={(text) =>
                    setFormData((previousState) => ({
                      ...previousState,
                      name: text,
                    }))
                  }
                />
                {errors.name && (
                  <Text className="text-red-500 mt-1 ml-1 text-sm">
                    {errors.name}
                  </Text>
                )}
              </Animated.View>

              <Animated.View style={animatedEmailInputStyle}>
                <Text className="text-white mb-2 ml-1 text-sm md:text-base">
                  Email
                </Text>
                <TextInput
                  className="bg-[#1A1A1A] text-white px-4 py-4 rounded-lg"
                  placeholder="Digite seu email"
                  placeholderTextColor="#666666"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formData.email}
                  onChangeText={(text) =>
                    setFormData((previousState) => ({
                      ...previousState,
                      email: text,
                    }))
                  }
                />
                {errors.email && (
                  <Text className="text-red-500 mt-1 ml-1 text-sm">
                    {errors.email}
                  </Text>
                )}
              </Animated.View>

              <Animated.View style={animatedPhoneInputStyle}>
                <Text className="text-white mb-2 ml-1 text-sm md:text-base">
                  Telefone
                </Text>
                <TextInput
                  className="bg-[#1A1A1A] text-white px-4 py-4 rounded-lg"
                  placeholder="(00) 00000-0000"
                  placeholderTextColor="#666666"
                  keyboardType="numeric"
                  value={formData.phone}
                  onChangeText={handlePhoneChange}
                  maxLength={15}
                />
                {errors.phone && (
                  <Text className="text-red-500 mt-1 ml-1 text-sm">
                    {errors.phone}
                  </Text>
                )}
              </Animated.View>

              <Animated.View style={animatedPasswordInputStyle}>
                <Text className="text-white mb-2 ml-1 text-sm md:text-base">
                  Senha
                </Text>
                <View className="relative">
                  <TextInput
                    className="bg-[#1A1A1A] text-white px-4 py-4 rounded-lg pr-12"
                    placeholder="Digite sua senha"
                    placeholderTextColor="#666666"
                    secureTextEntry={!showPassword}
                    value={formData.password}
                    onChangeText={(text) =>
                      setFormData((previousState) => ({
                        ...previousState,
                        password: text,
                      }))
                    }
                  />
                  <TouchableOpacity
                    className="absolute right-4 top-4"
                    onPress={() => setShowPassword(!showPassword)}
                    activeOpacity={0.7}
                  >
                    {showPassword ? (
                      <EyeOff size={24} color="#666666" />
                    ) : (
                      <Eye size={24} color="#666666" />
                    )}
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text className="text-red-500 mt-1 ml-1 text-sm">
                    {errors.password}
                  </Text>
                )}
              </Animated.View>

              <Animated.View style={animatedConfirmPasswordInputStyle}>
                <Text className="text-white mb-2 ml-1 text-sm md:text-base">
                  Confirmar Senha
                </Text>
                <View className="relative">
                  <TextInput
                    className="bg-[#1A1A1A] text-white px-4 py-4 rounded-lg pr-12"
                    placeholder="Confirme sua senha"
                    placeholderTextColor="#666666"
                    secureTextEntry={!showConfirmPassword}
                    value={formData.confirmPassword}
                    onChangeText={(text) =>
                      setFormData((previousState) => ({
                        ...previousState,
                        confirmPassword: text,
                      }))
                    }
                  />
                  <TouchableOpacity
                    className="absolute right-4 top-4"
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    activeOpacity={0.7}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={24} color="#666666" />
                    ) : (
                      <Eye size={24} color="#666666" />
                    )}
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword && (
                  <Text className="text-red-500 mt-1 ml-1 text-sm">
                    {errors.confirmPassword}
                  </Text>
                )}
              </Animated.View>
            </View>

            <Animated.View style={animatedRegisterButtonStyle}>
              <TouchableOpacity
                onPress={handleRegister}
                disabled={loading}
                className="mt-10"
                activeOpacity={0.7}
                accessibilityLabel="Criar conta"
                accessibilityHint="Botão para criar nova conta"
              >
                <LinearGradient
                  colors={["#cc0062", "#e33392", "#ef25d6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="py-4 rounded-lg"
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <Text className="text-white text-center font-semibold text-base md:text-lg">
                      Criar conta
                    </Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View
              style={animatedLinkToLoginStyle}
              className="flex-row justify-center items-center mt-8"
            >
              <Text className="text-gray-400">Já possui uma conta? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Auth")}
                accessibilityLabel="Ir para login"
              >
                <GradientText text="Entrar" textClassName="text-base" />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
