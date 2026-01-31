import { z } from "zod";

export const billingSchema = z
  .object({
    entity: z.enum(["company", "private"]),
    name: z.string().trim().min(1, "Name is required"),
    address: z.string().trim().min(1, "Address is required"),
    city: z.string().trim().min(1, "City is required"),
    zip: z
      .string()
      .trim()
      .min(1, "ZIP is required")
      .regex(/^\d{5}$/, "Zip code must be 5 digits"),
    country: z.string().trim().min(1, "Country is required"),
    vat: z
      .string()
      .trim()
      .regex(/^\d{11}$/, "VAT number must be 11 digits")
      .optional()
      .or(z.literal("")),
    sdiPec: z
      .string()
      .trim()
      .refine((val) => {
        if (!val) return true;
        const isSdi = /^[A-Z0-9]{7}$/.test(val);
        const isPec = z.email().safeParse(val).success;
        return isSdi || isPec;
      }, "Must be either a valid SDI code or PEC")
      .optional()
      .or(z.literal("")),
    fiscalCode: z
      .string()
      .trim()
      .regex(/^[A-Z0-9]{16}$/, "Fiscal code must be 16 alphanumeric characters")
      .optional()
      .or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    const isItaly = data.country.toLowerCase() === "italy";

    // If private entity in Italy, fiscal code is mandatory
    if (data.entity === "private" && isItaly) {
      if (!data.fiscalCode || data.fiscalCode === "") {
        ctx.addIssue({
          code: "custom",
          message: "Fiscal code is required for private entities in Italy",
          path: ["fiscalCode"],
        });
      }
    }

    // If company entity in Italy, VAT is mandatory
    if (data.entity === "company" && isItaly) {
      if (!data.vat || data.vat === "") {
        ctx.addIssue({
          code: "custom",
          message: "VAT number is required for companies in Italy",
          path: ["vat"],
        });
      }
    }
  });

export type BillingFormData = z.infer<typeof billingSchema>;
