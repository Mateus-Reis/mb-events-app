import { Alert } from "react-native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { validateEmail } from "./validations";

type HandleForgotPasswordParams = {
  email: string;
  setEmailError: (val: string) => void;
  setLoading: (val: boolean) => void;
  setEmailSent: (val: boolean) => void;
};

export async function handleForgotPassword({
  email,
  setEmailError,
  setLoading,
  setEmailSent,
}: HandleForgotPasswordParams) {
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
}
