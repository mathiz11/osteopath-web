import * as Yup from "yup";

export type LoginValues = {
  email: string;
  password: string;
};

export const DEFAULT_LOGIN_VALUES: LoginValues = {
  email: "",
  password: "",
};

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("L'email n'est pas au bon format")
    .max(100, "L'email est trop long")
    .required("Ce champ est obligatoire"),
  password: Yup.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(100, "Le mot de passe est trop long")
    .required("Ce champ est obligatoire"),
});
