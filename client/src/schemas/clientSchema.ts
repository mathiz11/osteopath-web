import * as Yup from "yup";

export type ClientValues = {
  firstname?: string;
  lastname?: string;
  phone?: string;
  email?: string;
  address?: string;
};

export const ClientSchema = Yup.object().shape({
  firstname: Yup.string()
    .max(100, "Le prénom est trop long")
    .required("Ce champ est obligatoire"),
  lastname: Yup.string()
    .max(100, "Le nom est trop long")
    .required("Ce champ est obligatoire"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Le numéro de téléphone est invalide")
    .required("Ce champ est obligatoire"),
  email: Yup.string()
    .email("L'email est invalide")
    .max(100, "L'email est trop long")
    .required("Ce champ est obligatoire"),
  address: Yup.string().required("Ce champ est obligatoire"),
});
