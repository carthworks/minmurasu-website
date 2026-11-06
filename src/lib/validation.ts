import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid business email address."),
  phone: z
    .string()
    .min(8, "Phone number is required.")
    .regex(/^[+0-9\s\-()]+$/, "Please enter a valid phone number."),
  company: z.string().optional(),
  website: z.string().optional(),
  service: z.string().min(1, "Please select a service interest."),
  budget: z.string().optional(),
  message: z
    .string()
    .min(10, "Please provide a brief description of your goals (at least 10 characters)."),
  preferredContact: z.enum(["phone", "whatsapp", "email"]),
  consent: z.literal(true, {
    message: "You must agree to be contacted regarding your enquiry.",
  }),
  // Honeypot field for anti-spam (must remain empty)
  companyFax: z.string().max(0, "Bot detected").optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
