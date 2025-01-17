import { useSharedValue, withTiming, withDelay } from "react-native-reanimated";
import { useAnimatedStyle } from "react-native-reanimated";

export function useLoginAnimations() {
  const formOpacity = useSharedValue(0);
  const formTranslateY = useSharedValue(20);

  const emailInputOpacity = useSharedValue(0);
  const passwordInputOpacity = useSharedValue(0);
  const forgotPasswordOpacity = useSharedValue(0);
  const loginButtonOpacity = useSharedValue(0);
  const linkOpacity = useSharedValue(0);

  const nameInputOpacity = useSharedValue(0);
  const phoneInputOpacity = useSharedValue(0);
  const confirmPasswordInputOpacity = useSharedValue(0);
  const registerButtonOpacity = useSharedValue(0);
  const linkToLoginOpacity = useSharedValue(0);

  

  const animatedFormStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{ translateY: formTranslateY.value }],
  }));

  const animatedEmailInputStyle = useAnimatedStyle(() => ({
    opacity: emailInputOpacity.value,
    transform: [
      { translateY: withTiming(emailInputOpacity.value > 0 ? 0 : 20) },
    ],
  }));

  const animatedPasswordInputStyle = useAnimatedStyle(() => ({
    opacity: passwordInputOpacity.value,
    transform: [
      { translateY: withTiming(passwordInputOpacity.value > 0 ? 0 : 20) },
    ],
  }));

  const animatedForgotPasswordStyle = useAnimatedStyle(() => ({
    opacity: forgotPasswordOpacity.value,
    transform: [
      { translateY: withTiming(forgotPasswordOpacity.value > 0 ? 0 : 20) },
    ],
  }));

  const animatedLoginButtonStyle = useAnimatedStyle(() => ({
    opacity: loginButtonOpacity.value,
    transform: [
      { translateY: withTiming(loginButtonOpacity.value > 0 ? 0 : 20) },
    ],
  }));

  const animatedLinkStyle = useAnimatedStyle(() => ({
    opacity: linkOpacity.value,
    transform: [
      { translateY: withTiming(linkOpacity.value > 0 ? 0 : 20) },
    ],
  }));

  const animatedNameInputStyle = useAnimatedStyle(() => ({
    opacity: nameInputOpacity.value,
    transform: [
      { translateY: withTiming(nameInputOpacity.value > 0 ? 0 : 20) },
    ],
  }));

  const animatedPhoneInputStyle = useAnimatedStyle(() => ({
    opacity: phoneInputOpacity.value,
    transform: [
      { translateY: withTiming(phoneInputOpacity.value > 0 ? 0 : 20) },
    ],
  }));

  const animatedConfirmPasswordInputStyle = useAnimatedStyle(() => ({
    opacity: confirmPasswordInputOpacity.value,
    transform: [
      { translateY: withTiming(confirmPasswordInputOpacity.value > 0 ? 0 : 20) },
    ],
  }));

  const animatedRegisterButtonStyle = useAnimatedStyle(() => ({
    opacity: registerButtonOpacity.value,
    transform: [
      { translateY: withTiming(registerButtonOpacity.value > 0 ? 0 : 20) },
    ],
  }));

  const animatedLinkToLoginStyle = useAnimatedStyle(() => ({
    opacity: linkToLoginOpacity.value,
    transform: [
      { translateY: withTiming(linkToLoginOpacity.value > 0 ? 0 : 20) },
    ],
  }));

  
  const startAnimations = () => {
    formOpacity.value = withTiming(1, { duration: 500 });
    formTranslateY.value = withTiming(0, { duration: 500 });

    emailInputOpacity.value = withDelay(200, withTiming(1, { duration: 500 }));
    passwordInputOpacity.value = withDelay(400, withTiming(1, { duration: 500 }));
    loginButtonOpacity.value = withDelay(600, withTiming(1, { duration: 500 }));
    forgotPasswordOpacity.value = withDelay(700, withTiming(1, { duration: 500 }));
    linkOpacity.value = withDelay(800, withTiming(1, { duration: 500 }));

    nameInputOpacity.value = withDelay(200, withTiming(1, { duration: 500 }));
    phoneInputOpacity.value = withDelay(400, withTiming(1, { duration: 500 }));
    passwordInputOpacity.value = withDelay(600, withTiming(1, { duration: 500 }));
    confirmPasswordInputOpacity.value = withDelay(800, withTiming(1, { duration: 500 }));
    registerButtonOpacity.value = withDelay(1000, withTiming(1, { duration: 500 }));
    linkToLoginOpacity.value = withDelay(1200, withTiming(1, { duration: 500 }));
  };

  return {
    startAnimations,
    animatedFormStyle,
    animatedEmailInputStyle,
    animatedPasswordInputStyle,
    animatedLoginButtonStyle,
    animatedLinkStyle,
    animatedForgotPasswordStyle,
    animatedNameInputStyle,
    animatedPhoneInputStyle,
    animatedConfirmPasswordInputStyle,
    animatedRegisterButtonStyle,
    animatedLinkToLoginStyle,
  };
}
