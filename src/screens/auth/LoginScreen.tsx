import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Animated from "react-native-reanimated";
import { Eye, EyeOff } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useLoginAnimations } from "@/hooks/useLoginAnimations";
import { handleForgotPassword } from "@/utils/forgotPassword";
import { WaveBackground } from "@/components/WaveBackground";
import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";
import { GradientText } from "@/components/GradientText";
import { validateEmail, validatePassword } from "@/utils/validations";

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Auth">;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [forgotPassword, setForgotPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const {
    startAnimations,
    animatedFormStyle,
    animatedEmailInputStyle,
    animatedPasswordInputStyle,
    animatedLoginButtonStyle,
    animatedLinkStyle,
    animatedForgotPasswordStyle,
  } = useLoginAnimations();

  useEffect(() => {
    startAnimations();
  }, [forgotPassword]);

  useEffect(() => {
    if (emailSent) {
      const timer = setTimeout(() => {
        setForgotPassword(false);
        setEmailSent(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [emailSent]);

  const validateForm = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({
      email: emailError,
      password: passwordError,
      general: "",
    });

    return !emailError && !passwordError;
  };

  async function handleLogin() {
    setErrors({ email: "", password: "", general: "" });

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      navigation.replace("MainTabs");
    } catch (error: any) {
      setErrors({
        ...errors,
        general: "Email ou senha inválidos. Verifique suas credenciais.",
      });
    } finally {
      setLoading(false);
    }
  }

  async function onForgotPassword() {
    await handleForgotPassword({
      email,
      setEmailError: (error) => setErrors({ ...errors, email: error }),
      setLoading,
      setEmailSent,
    });
  }

  const renderForgotPassword = () => (
    <ForgotPasswordForm
      email={email}
      setEmail={setEmail}
      emailError={errors.email}
      setEmailError={(error) => setErrors({ ...errors, email: error })}
      emailSent={emailSent}
      loading={loading}
      onForgotPassword={onForgotPassword}
      onCancel={() => setForgotPassword(false)}
      animatedFormStyle={animatedFormStyle}
      animatedEmailInputStyle={animatedEmailInputStyle}
      animatedLoginButtonStyle={animatedLoginButtonStyle}
      animatedLinkStyle={animatedLinkStyle}
    />
  );

  const renderLogin = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      className="flex-1"
    >
      <Animated.View
        style={animatedFormStyle}
        className="flex-1 px-6 md:px-8 lg:px-10 pt-4"
      >
        <View className="max-w-md w-full mx-auto">
          <View className="space-y-4 mb-10">
            <View className="flex-row flex-wrap items-center">
              <Text className="text-white text-2xl md:text-3xl lg:text-4xl font-bold">
                Bem-vindo(a) ao
              </Text>
              <GradientText
                text="mb.events"
                textClassName="text-2xl md:text-3xl lg:text-4xl font-bold ml-2"
              />
            </View>
            <Text className="text-gray-400 text-sm md:text-base">
              Tudo que você precisa para sua experiência em eventos.
            </Text>
          </View>

          {errors.general && (
            <View className="mb-4 bg-red-500/10 p-3 rounded-lg">
              <Text className="text-red-500 text-sm">{errors.general}</Text>
            </View>
          )}

          <View className="space-y-6">
            <Animated.View style={animatedEmailInputStyle}>
              <Text className="text-white mb-2 ml-1 text-sm md:text-base">
                Email
              </Text>
              <TextInput
                className={`bg-[#1A1A1A] text-white px-4 py-4 rounded-lg text-base ${
                  errors.email ? "border border-red-500" : ""
                }`}
                placeholder="Digite seu email"
                placeholderTextColor="#666"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) {
                    setErrors({ ...errors, email: "" });
                  }
                }}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              {errors.email && (
                <Text className="text-red-500 text-sm mt-1 ml-1">
                  {errors.email}
                </Text>
              )}
            </Animated.View>

            <Animated.View style={animatedPasswordInputStyle}>
              <Text className="text-white mb-2 ml-1 text-sm md:text-base">
                Senha
              </Text>
              <View className="relative">
                <TextInput
                  className={`bg-[#1A1A1A] text-white px-4 py-4 rounded-lg pr-12 text-base ${
                    errors.password ? "border border-red-500" : ""
                  }`}
                  placeholder="Digite sua senha"
                  placeholderTextColor="#666"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (errors.password) {
                      setErrors({ ...errors, password: "" });
                    }
                  }}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  className="absolute right-4 top-4"
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                >
                  {showPassword ? (
                    <EyeOff size={24} color="#666" />
                  ) : (
                    <Eye size={24} color="#666" />
                  )}
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text className="text-red-500 text-sm mt-1 ml-1">
                  {errors.password}
                </Text>
              )}
            </Animated.View>
          </View>

          <Animated.View style={animatedForgotPasswordStyle}>
            <TouchableOpacity
              className="self-end mt-3"
              onPress={() => setForgotPassword(true)}
              activeOpacity={0.7}
            >
              <GradientText
                text="Esqueceu a senha?"
                textClassName="text-base"
              />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={animatedLoginButtonStyle}>
            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              className="mt-8"
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={["#cc0062", "#e33392", "#ef25d6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="py-4 rounded-lg"
              >
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text className="text-white text-center font-semibold text-base md:text-lg">
                    Entrar
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={animatedLinkStyle}
            className="flex-row justify-center items-center mt-6"
          >
            <Text className="text-gray-400 text-sm md:text-base">
              Não tem uma conta?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              accessibilityLabel="Ir para registro"
              activeOpacity={0.7}
            >
              <GradientText text="Registrar" textClassName="text-base" />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.View>
    </ScrollView>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#121212]"
    >
      <WaveBackground />
      {forgotPassword ? renderForgotPassword() : renderLogin()}
    </KeyboardAvoidingView>
  );
}
