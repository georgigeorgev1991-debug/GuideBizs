export type MailSource = "nieuwsbrief" | "gpx" | "prive" | "contact";

export type FieldErrors = Record<string, string>;

export type FormState = {
  ok: boolean;
  message: string;
  errors: FieldErrors;
};

export const emptyFormState: FormState = {
  ok: false,
  message: "",
  errors: {},
};
