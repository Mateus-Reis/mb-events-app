import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useAuth } from "../../contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react-native";
import Svg, { Path } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { validateEmail } from "@/utils/validations";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const { width } = Dimensions.get("window");

type GradientTextProps = {
  text: string;
  textClassName?: string;
};

const GradientText: React.FC<GradientTextProps> = ({
  text,
  textClassName = "",
}) => {
  return (
    <MaskedView
      maskElement={
        <Text
          className={textClassName}
          style={{
            backgroundColor: "transparent",
          }}
        >
          {text}
        </Text>
      }
    >
      <LinearGradient
        colors={["#cc0062", "#e33392", "#ef25d6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text
          className={textClassName}
          style={{
            opacity: 0,
          }}
        >
          {text}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
};

function WaveBackground() {
  return (
    <View className="w-full">
      <View className="bg-black h-96 items-center justify-center">
        <Image
          source={require("../../../assets/mb.events-logo.png")}
          resizeMode="contain"
        />
      </View>
      <Svg height="100" width={width} viewBox={`0 0 ${width} 100`}>
        <Path
          d={`M0,0 
               L${width},0 
               L${width},50
               C${width * 0.65},90 ${width * 0.35},20 0,70
               L0,0 Z`}
          fill="black"
        />
      </Svg>
    </View>
  );
}

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState("");
  const { signIn } = useAuth();

  const formOpacity = useSharedValue(0);
  const formTranslateY = useSharedValue(20);

  const animatedFormStyle = useAnimatedStyle(() => {
    return {
      opacity: formOpacity.value,
      transform: [{ translateY: formTranslateY.value }],
    };
  });

  const emailInputOpacity = useSharedValue(0);
  const passwordInputOpacity = useSharedValue(0);
  const loginButtonOpacity = useSharedValue(0);

  const animatedEmailInputStyle = useAnimatedStyle(() => {
    return {
      opacity: emailInputOpacity.value,
      transform: [
        { translateY: withTiming(emailInputOpacity.value > 0 ? 0 : 20) },
      ],
    };
  });

  const animatedPasswordInputStyle = useAnimatedStyle(() => {
    return {
      opacity: passwordInputOpacity.value,
      transform: [
        { translateY: withTiming(passwordInputOpacity.value > 0 ? 0 : 20) },
      ],
    };
  });

  const animatedLoginButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: loginButtonOpacity.value,
      transform: [
        { translateY: withTiming(loginButtonOpacity.value > 0 ? 0 : 20) },
      ],
    };
  });

  useEffect(() => {
    formOpacity.value = withTiming(1, { duration: 500 });
    formTranslateY.value = withTiming(0, { duration: 500 });

    emailInputOpacity.value = withDelay(200, withTiming(1, { duration: 500 }));
    passwordInputOpacity.value = withDelay(
      400,
      withTiming(1, { duration: 500 })
    );
    loginButtonOpacity.value = withDelay(600, withTiming(1, { duration: 500 }));
  }, [forgotPassword]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (emailSent) {
      timer = setTimeout(() => {
        setForgotPassword(false);
        setEmailSent(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [emailSent]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      navigation.replace("MainTabs");
    } catch (error: any) {
      Alert.alert("Erro", "Verifique suas credenciais");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setEmailError("Email é obrigatório");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Email inválido");
      return;
    }

    setLoading(true);
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
    } catch (error: any) {
      Alert.alert("Erro", "Ocorreu um erro ao enviar o email de recuperação");
    } finally {
      setLoading(false);
    }
  };

  const renderForgotPassword = () => (
    <Animated.View style={animatedFormStyle} className="flex-1 px-8 -mt-4">
      <Text className="text-white text-3xl font-bold mb-2">
        Esqueceu sua senha?
      </Text>
      <Text className="text-gray-400 mb-8">
        Digite seu email para recuperar sua senha
      </Text>

      {emailSent ? (
        <View className="items-center">
          <Text className="text-white text-center mb-6">
            Se o email estiver cadastrado, enviaremos um link para recuperação
            de senha.
          </Text>
          <TouchableOpacity
            onPress={() => setForgotPassword(false)}
            className="mt-6"
          >
            <LinearGradient
              colors={["#cc0062", "#e33392", "#ef25d6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="py-3 rounded-lg px-8"
            >
              <Text className="text-white text-center font-semibold text-lg">
                Voltar
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Animated.View style={animatedEmailInputStyle}>
            <Text className="text-white mb-2 ml-1">Email</Text>
            <TextInput
              className="bg-[#1A1A1A] text-white px-4 py-3 rounded-lg"
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
              <Text className="text-red-500 mt-1 ml-1">{emailError}</Text>
            )}
          </Animated.View>

          <Animated.View style={animatedLoginButtonStyle}>
            <TouchableOpacity
              onPress={handleForgotPassword}
              disabled={loading}
              className="mt-6"
            >
              <LinearGradient
                colors={["#cc0062", "#e33392", "#ef25d6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="py-3 rounded-lg"
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-white text-center font-semibold text-lg">
                    Enviar
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          <View className="flex-row justify-center items-center mt-4">
            <Text className="text-gray-400">Lembrou a senha? </Text>
            <TouchableOpacity
              onPress={() => setForgotPassword(false)}
              accessibilityLabel="Voltar para login"
            >
              <GradientText text="Voltar" textClassName="text-base" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </Animated.View>
  );

  const renderLogin = () => (
    <Animated.View style={animatedFormStyle} className="flex-1 px-8 -mt-4">
      <View className="space-y-2 mb-8">
        <View className="flex-row flex-wrap">
          <Text className="text-white text-3xl font-bold mb-2">
            Bem-vindo(a) ao
          </Text>
          <GradientText
            text="mb.events"
            textClassName="text-white text-3xl font-bold mb-2 ml-2"
          />
        </View>
        <Text className="text-gray-400">
          Tudo que você precisa para sua experiência em eventos.
        </Text>
      </View>

      <View className="space-y-4">
        <Animated.View style={animatedEmailInputStyle}>
          <Text className="text-white mb-2 ml-1">Email</Text>
          <TextInput
            className="bg-[#1A1A1A] text-white px-4 py-3 rounded-lg"
            placeholder="Digite seu email"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </Animated.View>

        <Animated.View style={animatedPasswordInputStyle}>
          <Text className="text-white mb-2 ml-1">Senha</Text>
          <View className="relative">
            <TextInput
              className="bg-[#1A1A1A] text-white px-4 py-3 rounded-lg pr-12"
              placeholder="Digite sua senha"
              placeholderTextColor="#666"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              className="absolute right-4 top-3"
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={24} color="#666" />
              ) : (
                <Eye size={24} color="#666" />
              )}
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>

      <TouchableOpacity
        className="self-end mt-2"
        onPress={() => setForgotPassword(true)}
      >
        <GradientText text="Esqueceu a senha?" textClassName="text-base" />
      </TouchableOpacity>

      <Animated.View style={animatedLoginButtonStyle}>
        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          className="mt-6"
        >
          <LinearGradient
            colors={["#cc0062", "#e33392", "#ef25d6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="py-3 rounded-lg"
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white text-center font-semibold text-lg">
                Entrar
              </Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      <View className="flex-row justify-center items-center mt-4">
        <Text className="text-gray-400">Não tem uma conta?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          accessibilityLabel="Ir para registro"
        >
          <GradientText text="Registrar" textClassName="text-base ml-1" />
        </TouchableOpacity>
      </View>
    </Animated.View>
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
