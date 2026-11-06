import { z } from "zod";

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com",
  "tempmail.com",
  "10minutemail.com",
  "guerrillamail.com",
  "yopmail.com",
  "sharklasers.com",
  "trashmail.com",
  "getnada.com",
  "temp-mail.org",
  "fakeinbox.com",
]);

const SPAM_CONTENT_REGEX =
  /(https?:\/\/|www\.|\[url=|<a\s+href|viagra|casino|crypto\s+giveaway|buy\s+backlinks|porn|betting|lottery)/i;

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Full name must be at least 2 characters.")
    .max(80, "Name is too long.")
    .refine((val) => !/https?:\/\//i.test(val), {
      message: "URLs are not permitted in the name field.",
    }),
  email: z
    .string()
    .email("Please enter a valid business email address.")
    .refine(
      (val) => {
        const domain = val.split("@")[1]?.toLowerCase();
        return domain ? !DISPOSABLE_EMAIL_DOMAINS.has(domain) : false;
      },
      {
        message:
          "Disposable email addresses are not accepted. Please use your work or personal email.",
      }
    ),
  phone: z
    .string()
    .min(8, "Phone number is required.")
    .max(20, "Phone number is too long.")
    .regex(/^[+0-9\s\-()]+$/, "Please enter a valid phone number.")
    .refine(
      (val) => {
        const digits = val.replace(/\D/g, "");
        return digits.length >= 10 && digits.length <= 15 && !/^(\d)\1+$/.test(digits);
      },
      {
        message: "Please enter a valid 10-to-15 digit phone or WhatsApp number.",
      }
    ),
  company: z.string().max(100).optional(),
  website: z.string().max(200).optional(),
  service: z.string().min(1, "Please select a service interest."),
  budget: z.string().optional(),
  message: z
    .string()
    .min(10, "Please provide a brief description of your goals (at least 10 characters).")
    .max(2000, "Message must be under 2,000 characters.")
    .refine((val) => !SPAM_CONTENT_REGEX.test(val), {
      message:
        "For security reasons, external links and promotional spam keywords are not allowed in the message body.",
    }),
  preferredContact: z.enum(["phone", "whatsapp", "email"]),
  consent: z.literal(true, {
    message: "You must agree to be contacted regarding your enquiry.",
  }),
  // Dual Honeypot fields for anti-spam (must remain empty)
  companyFax: z.string().max(0, "Bot detected").optional(),
  secondaryRole: z.string().max(0, "Bot detected").optional(),
  // Time-trap timestamp (milliseconds) to block instant bot submissions
  formLoadedAt: z.number().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
