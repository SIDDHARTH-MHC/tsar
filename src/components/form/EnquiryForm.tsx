"use client";

import { useEffect, useState } from "react";
import { ENQUIRY } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  city: string;
  locations: string;
  plan: string;
  message: string;
};

const initial: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  industry: "",
  city: "",
  locations: "",
  plan: "Not sure yet",
  message: "",
};

export function EnquiryForm() {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>(
    {},
  );
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get("plan");
    if (plan && ENQUIRY.planOptions.includes(plan as (typeof ENQUIRY.planOptions)[number])) {
      setValues((v) => ({ ...v, plan }));
    }

    const onHash = () => {
      const hash = window.location.hash;
      if (hash.includes("plan=")) {
        const q = new URLSearchParams(hash.split("?")[1] ?? "");
        const p = q.get("plan");
        if (p) setValues((v) => ({ ...v, plan: decodeURIComponent(p) }));
      }
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  function validateField(key: keyof FormState, value: string): string | undefined {
    switch (key) {
      case "name":
        return value.trim().length < 2 ? "Please tell us your name." : undefined;
      case "company":
        return value.trim().length < 2
          ? "Please add your company name."
          : undefined;
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
          ? "That email doesn't look right — mind checking it?"
          : undefined;
      case "phone": {
        const digits = value.replace(/\D/g, "").replace(/^91/, "");
        return digits.length !== 10
          ? "Please enter a 10-digit phone number."
          : undefined;
      }
      case "city":
        return value && value.trim().length < 2
          ? "Please enter a valid city."
          : undefined;
      default:
        return undefined;
    }
  }

  function setField(key: keyof FormState, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (touched[key] || errors[key]) {
      setErrors((e) => ({ ...e, [key]: validateField(key, value) }));
    }
  }

  function onBlur(key: keyof FormState) {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((e) => ({ ...e, [key]: validateField(key, values[key]) }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    (["name", "company", "email", "phone"] as const).forEach((key) => {
      const err = validateField(key, values[key]);
      if (err) nextErrors[key] = err;
    });
    if (values.city) {
      const err = validateField("city", values.city);
      if (err) nextErrors.city = err;
    }
    setErrors(nextErrors);
    setTouched({
      name: true,
      company: true,
      email: true,
      phone: true,
      city: true,
    });

    if (Object.keys(nextErrors).length) {
      const first = Object.keys(nextErrors)[0];
      document.getElementById(`field-${first}`)?.focus();
      return;
    }

    // Visual + structure pass: navigate to thank-you without API
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 600));
    window.location.href = "/thank-you";
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <Field
        id="name"
        label="Full name"
        required
        autoComplete="name"
        value={values.name}
        error={errors.name}
        onChange={(v) => setField("name", v)}
        onBlur={() => onBlur("name")}
      />
      <Field
        id="company"
        label="Company"
        required
        autoComplete="organization"
        value={values.company}
        error={errors.company}
        onChange={(v) => setField("company", v)}
        onBlur={() => onBlur("company")}
      />
      <Field
        id="email"
        label="Work email"
        type="email"
        required
        autoComplete="email"
        value={values.email}
        error={errors.email}
        onChange={(v) => setField("email", v)}
        onBlur={() => onBlur("email")}
      />
      <Field
        id="phone"
        label="Phone"
        type="tel"
        required
        autoComplete="tel"
        value={values.phone}
        error={errors.phone}
        onChange={(v) => setField("phone", v)}
        onBlur={() => onBlur("phone")}
        hint="+91"
      />

      <div className="border-t border-noir/10 pt-6">
        <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-charcoal/50">
          {ENQUIRY.optionalDivider}
        </p>
        <div className="space-y-6">
          <SelectField
            id="industry"
            label="Industry"
            value={values.industry}
            options={ENQUIRY.industryOptions}
            onChange={(v) => setField("industry", v)}
          />
          <Field
            id="city"
            label="City"
            value={values.city}
            error={errors.city}
            onChange={(v) => setField("city", v)}
            onBlur={() => onBlur("city")}
          />
          <SelectField
            id="locations"
            label="Number of locations"
            value={values.locations}
            options={ENQUIRY.locationOptions}
            onChange={(v) => setField("locations", v)}
          />
          <SelectField
            id="plan"
            label="Interested in"
            value={values.plan}
            options={ENQUIRY.planOptions}
            onChange={(v) => setField("plan", v)}
            allowEmpty={false}
          />
          <div>
            <label htmlFor="field-message" className="mb-2 block text-sm font-medium text-noir">
              Message
            </label>
            <textarea
              id="field-message"
              rows={4}
              placeholder={ENQUIRY.messagePlaceholder}
              value={values.message}
              onChange={(e) => setField("message", e.target.value)}
              className="w-full resize-y rounded-[var(--radius-xs)] border border-noir/15 bg-ivory px-4 py-3 text-base text-noir outline-none transition-colors duration-[var(--duration-fast)] placeholder:text-charcoal/40 focus:border-gold"
            />
          </div>
        </div>
      </div>

      <div aria-live="polite" className="sr-only">
        {Object.values(errors).filter(Boolean).join(". ")}
      </div>

      <Button type="submit" className="w-full" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : ENQUIRY.submitLabel}
      </Button>
      <p className="text-center text-xs text-charcoal/55">{ENQUIRY.underButton}</p>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  required,
  type = "text",
  autoComplete,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={`field-${id}`} className="mb-2 block text-sm font-medium text-noir">
        {label}
        {required ? <span className="text-gold"> *</span> : null}
      </label>
      <div className="relative">
        {hint ? (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-charcoal/45">
            {hint}
          </span>
        ) : null}
        <input
          id={`field-${id}`}
          type={type}
          autoComplete={autoComplete}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={!!error}
          aria-describedby={error ? `error-${id}` : undefined}
          className={cn(
            "w-full rounded-[var(--radius-xs)] border bg-ivory px-4 py-3 text-base text-noir outline-none transition-colors duration-[var(--duration-fast)] focus:border-gold",
            hint && "pl-12",
            error ? "border-error" : "border-noir/15",
          )}
        />
      </div>
      {error ? (
        <p id={`error-${id}`} className="mt-1.5 text-[13px] text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  options,
  onChange,
  allowEmpty = true,
}: {
  id: string;
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
  allowEmpty?: boolean;
}) {
  return (
    <div>
      <label htmlFor={`field-${id}`} className="mb-2 block text-sm font-medium text-noir">
        {label}
      </label>
      <select
        id={`field-${id}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-[var(--radius-xs)] border border-noir/15 bg-ivory px-4 py-3 text-base text-noir outline-none transition-colors duration-[var(--duration-fast)] focus:border-gold"
      >
        {allowEmpty ? <option value="">Select…</option> : null}
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
