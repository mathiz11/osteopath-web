import * as Yup from "yup";

export type CardValues = {
  id?: number;
  age: number;
  isCastrated: boolean;
  diet: string;
  score: number;
  discipline: string;
  lifestyle: string;
  antecedent: string;
  dewormer: string;
  vaccine: string;
  marshal: string;
  dentistry: string;
  observation: string;
  schema?: File | null;
  schemaFilename?: string;
  conclusion: string;
  treatment: string;
  restTime: string;
  activityRetake: string;
};

export const DEFAULT_CARD_VALUES: CardValues = {
  age: 0,
  isCastrated: false,
  diet: "",
  score: 0,
  discipline: "",
  lifestyle: "",
  antecedent: "",
  dewormer: "",
  vaccine: "",
  marshal: "",
  dentistry: "",
  observation: "",
  schema: null,
  conclusion: "",
  treatment: "",
  restTime: "",
  activityRetake: "",
};

export const CardSchema = Yup.object().shape({
  age: Yup.number()
    .test("test-age", "L'age doit être compris entre 1 et 120 ans", (age) =>
      age ? age > 0 && age < 120 : false
    )
    .required("Ce champ est obligatoire"),
  isCastrated: Yup.boolean().required("Ce champ est obligatoire"),
  diet: Yup.string().nullable(),
  score: Yup.number()
    .test("test-score", "Le score doit être compris entre 1 et 5", (score) =>
      score ? score > 0 && score <= 5 : false
    )
    .required("Ce champ est obligatoire"),
  discipline: Yup.string().nullable(),
  lifestyle: Yup.string().nullable(),
  antecedent: Yup.string().nullable(),
  dewormer: Yup.string().max(100, "Le vermifuge est trop long").nullable(),
  vaccine: Yup.string().nullable(),
  marshal: Yup.string().nullable(),
  dentistry: Yup.string().nullable(),
  observation: Yup.string().nullable(),
  schema: Yup.mixed().nullable(),
  conclusion: Yup.string().nullable(),
  treatment: Yup.string().nullable(),
  restTime: Yup.string().max(100, "Le temps de repos est trop long").nullable(),
  activityRetake: Yup.string()
    .max(100, "La reprise d'activié est trop longue")
    .nullable(),
});
