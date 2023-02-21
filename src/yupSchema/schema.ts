import * as yup from "yup";

export const bookSchema = yup.object({
  bookName: yup
    .string()
    .matches(/[aA-zZ]|[ЁёА-я]|\./, "Должно быть строкой")
    .required(),
  yearsPublic: yup.number().required(),
  authorsArray: yup.array().required(),
});

export const authorSchema = yup.object({
  fullName: yup
    .string()
    .matches(/[aA-zZ]|[ЁёА-я]|\./, "Должно быть строкой")
    .required("Обязательно"),
});
