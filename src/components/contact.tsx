"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionHeading } from "@/components/section-heading";
import { COMPANY_INFO } from "@/lib/constants";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Bitte geben Sie Ihren Namen ein.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Bitte geben Sie Ihre E-Mail-Adresse ein.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Bitte geben Sie eine Nachricht ein.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // TODO: Backend-Integration (z.B. E-Mail-Versand via API-Route)
    setSubmitted(true);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section
      id="kontakt"
      className="scroll-mt-20 bg-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Kontakt"
          subtitle="Nehmen Sie Kontakt mit uns auf — wir beraten Sie gerne unverbindlich."
        />

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-green-200 bg-green-50 p-12 text-center">
                <CheckCircle2 className="mb-4 h-12 w-12 text-green-600" />
                <h3 className="mb-2 text-xl font-semibold text-doci-dark">
                  Vielen Dank!
                </h3>
                <p className="text-doci-gray">
                  Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns
                  schnellstmöglich bei Ihnen.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="Ihr vollständiger Name"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className="mt-1.5"
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className="mt-1 text-sm text-doci-red">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">E-Mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ihre@email.de"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className="mt-1.5"
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-1 text-sm text-doci-red">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+49 (0) 123 456 789"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Nachricht *</Label>
                  <Textarea
                    id="message"
                    placeholder="Beschreiben Sie Ihr Anliegen..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className="mt-1.5"
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" className="mt-1 text-sm text-doci-red">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  <Send className="mr-2 h-4 w-4" />
                  Nachricht senden
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <h3 className="mb-6 text-xl font-semibold text-doci-dark">
                So erreichen Sie uns
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-doci-red-light">
                    <MapPin className="h-5 w-5 text-doci-red" />
                  </div>
                  <div>
                    <p className="font-medium text-doci-dark">Adresse</p>
                    <p className="text-sm text-doci-gray">
                      {COMPANY_INFO.street}
                      <br />
                      {COMPANY_INFO.zip} {COMPANY_INFO.city}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-doci-red-light">
                    <Phone className="h-5 w-5 text-doci-red" />
                  </div>
                  <div>
                    <p className="font-medium text-doci-dark">Telefon</p>
                    <p className="text-sm text-doci-gray">
                      {COMPANY_INFO.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-doci-red-light">
                    <Mail className="h-5 w-5 text-doci-red" />
                  </div>
                  <div>
                    <p className="font-medium text-doci-dark">E-Mail</p>
                    <p className="text-sm text-doci-gray">
                      {COMPANY_INFO.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-doci-dark p-6 text-white">
              <h4 className="mb-2 font-semibold">Öffnungszeiten</h4>
              <div className="space-y-1 text-sm text-white/70">
                <p>Mo – Fr: 07:00 – 17:00 Uhr</p>
                <p>Sa: nach Vereinbarung</p>
                <p>So: geschlossen</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
