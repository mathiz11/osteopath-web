import * as Yup from "yup";
import { User } from "../entities/User";

export type UserValues = {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  numberOA: string;
  phone: string;
  address: string;
};

export const toUserValues = (user: User): UserValues => ({
  ...user,
  numberOA: user.numberOA ? user.numberOA : "",
  phone: user.phone ? user.phone : "",
  address: user.address ? user.address : "",
});

export const UserSchema = Yup.object().shape({
  firstname: Yup.string()
    .max(100, "Le prénom est trop long")
    .required("Ce champ est obligatoire"),
  lastname: Yup.string()
    .max(100, "Le nom est trop long")
    .required("Ce champ est obligatoire"),
  email: Yup.string()
    .email("L'email n'est pas au bon format")
    .max(100, "L'email est trop long")
    .required("Ce champ est obligatoire"),
  numberOA: Yup.string().max(30, "Le numéro OA est trop long").nullable(),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Le numéro de téléphone est invalide")
    .nullable(),
  address: Yup.string().nullable(),
});
