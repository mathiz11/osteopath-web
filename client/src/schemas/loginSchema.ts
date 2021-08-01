import * as Yup from "yup";

export type LoginValues = {
  email: string;
  password: string;
};

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .max(100, "L'email est trop long")
    .required("Ce champ est obligatoire"),
  password: Yup.string()
    .max(100, "Le mot de passe est trop long")
    .required("Ce champ est obligatoire"),
});
