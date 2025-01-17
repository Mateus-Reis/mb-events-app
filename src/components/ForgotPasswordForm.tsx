import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Animated from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { GradientText } from "./GradientText";

type ForgotPasswordFormProps = {
  email: string;
  setEmail: (value: string) => void;
  emailError: string;
  setEmailError: (value: string) => void;
  emailSent: boolean;
  loading: boolean;
  onForgotPassword: () => void;
  onCancel: () => void;

  animatedFormStyle: any;
  animatedEmailInputStyle: any;
  animatedLoginButtonStyle: any;
  animatedLinkStyle: any;
};

export function ForgotPasswordForm({
  email,
  setEmail,
  emailError,
  setEmailError,
  emailSent,
  loading,
  onForgotPassword,
  onCancel,
  animatedFormStyle,
  animatedEmailInputStyle,
  animatedLoginButtonStyle,
  animatedLinkStyle,
}: ForgotPasswordFormProps) {
  return (
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
          <Text className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
            Esqueceu sua senha?
          </Text>
          <Text className="text-gray-400 mb-10 text-sm md:text-base">
            Digite seu email para recuperar sua senha
          </Text>

          {emailSent ? (
            <View className="items-center">
              <Text className="text-white text-center mb-8 text-sm md:text-base">
                Se o email estiver cadastrado, enviaremos um link para
                recuperação de senha.
              </Text>
              <TouchableOpacity
                onPress={onCancel}
                className="mt-6 w-full"
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={["#cc0062", "#e33392", "#ef25d6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="py-4 rounded-lg"
                >
                  <Text className="text-white text-center font-semibold text-base md:text-lg">
                    Voltar
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Animated.View style={animatedEmailInputStyle}>
                <Text className="text-white mb-2 ml-1 text-sm md:text-base">
                  Email
                </Text>
                <TextInput
                  className="bg-[#1A1A1A] text-white px-4 py-4 rounded-lg text-base"
                  placeholder="Digite seu email"
                  placeholderTextColor="#666"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setEmailError("");
                  }}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                {emailError && (
                  <Text className="text-red-500 mt-1 ml-1 text-sm">
                    {emailError}
                  </Text>
                )}
              </Animated.View>

              <Animated.View style={animatedLoginButtonStyle}>
                <TouchableOpacity
                  onPress={onForgotPassword}
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
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text className="text-white text-center font-semibold text-base md:text-lg">
                        Enviar
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
                  Lembrou a senha?{" "}
                </Text>
                <TouchableOpacity
                  onPress={onCancel}
                  accessibilityLabel="Voltar para login"
                  activeOpacity={0.7}
                >
                  <GradientText text="Voltar" textClassName="text-base" />
                </TouchableOpacity>
              </Animated.View>
            </>
          )}
        </View>
      </Animated.View>
    </ScrollView>
  );
}
