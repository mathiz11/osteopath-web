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
  schema: File | undefined;
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
  schema: undefined,
  conclusion: "",
  treatment: "",
  restTime: "",
  activityRetake: "",
};
