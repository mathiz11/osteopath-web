import * as Yup from "yup";
import { AnimalType } from "../entities/Animal";

export type AnimalValues = {
  id?: number;
  name: string;
  type: string;
  subtype: string | null;
  sex: string;
  breed: string;
};

export const DEFAULT_ANIMAL_VALUES: AnimalValues = {
  name: "",
  type: "",
  subtype: null,
  sex: "",
  breed: "",
};

export const AnimalSchema = Yup.object().shape({
  name: Yup.string()
    .max(100, "Le nom est trop long")
    .required("Ce champ est obligatoire"),
  type: Yup.string().required("Ce champ est obligatoire"),
  subtype: Yup.string()
    .when("type", {
      is: AnimalType.NAC,
      then: Yup.string().required("Ce champ est obligatoire"),
    })
    .nullable(),
  sex: Yup.string()
    .max(100, "Le nom est trop long")
    .required("Ce champ est obligatoire"),
  breed: Yup.string()
    .max(100, "Le nom est trop long")
    .required("Ce champ est obligatoire"),
});
