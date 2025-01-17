interface FormData {
  [key: string]: any;
}

interface ValidationRule {
  required?: boolean;
  email?: boolean;
  phone?: boolean;
  minLength?: number;
  match?: string;
}

interface ValidationSchema {
  [key: string]: ValidationRule;
}

interface FormErrors {
  [key: string]: string;
}

export const validateForm = (
  data: FormData,
  schema: ValidationSchema
): FormErrors => {
  const errors: FormErrors = {};

  for (const field in schema) {
    const rules = schema[field];
    const value = data[field];

    if (rules.required) {
      if (!value || (typeof value === "string" && value.trim() === "")) {
        errors[field] = "Este campo é obrigatório";
        continue;
      }
    }

    if (rules.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        errors[field] = "Email inválido";
      }
    }

    if (rules.phone) {
      const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
      if (value && !phoneRegex.test(value)) {
        errors[field] = "Telefone inválido. Formato: (00) 00000-0000";
      }
    }

    if (rules.minLength) {
      if (value && value.length < rules.minLength) {
        errors[
          field
        ] = `Este campo deve ter no mínimo ${rules.minLength} caracteres`;
      }
    }

    if (rules.match) {
      if (value && value !== data[rules.match]) {
        errors[field] = "Os campos não correspondem";
      }
    }
  }

  return errors;
};


export const maskPhone = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d)(\d{4})$/, "$1-$2");
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "Email é obrigatório";
  }
  if (!emailRegex.test(email)) {
    return "Email inválido";
  }
  return "";
};

export const validatePassword = (password: string) => {
  if (!password) {
    return "Senha é obrigatória";
  }
  if (password.length < 6) {
    return "Senha deve ter no mínimo 6 caracteres";
  }
  return "";
};

export const validatePhone = (phone: string) => {
  const phoneNumber = phone.replace(/\D/g, "");
  return phoneNumber.length === 11;
};


