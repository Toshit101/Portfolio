import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, Linkedin, Mail, CheckCircle, AlertCircle } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import FormField from "./ui/FormField";
import Button from "./ui/Button";

type FormState = "idle" | "submitting" | "success" | "error";

// ── Web3Forms ────────────────────────────────────────────────────────────────
// 1. Go to https://web3forms.com  2. Enter kesarwanit4@gmail.com
// 3. Paste the access key they email you below. Messages arrive at that inbox.
const WEB3FORMS_ACCESS_KEY = "76675bfd-aa87-41c8-8061-55fcf75c2bc2";

const SOCIALS = [
  { icon: Github, label: "GitHub", href: "https://github.com/toshit101" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/toshit-kesarwani-529b3b2b7/" },
  { icon: Mail, label: "Email", href: "mailto:kesarwanit4@gmail.com" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [formState, setFormState] = useState<FormState>("idle");
  const [honeypot, setHoneypot] = useState(""); // bots fill this; humans never see it

  const update = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((err) => ({ ...err, [field]: undefined }));
    };

  const validate = () => {
    const next: Partial<typeof form> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.message.trim()) next.message = "Message is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Honeypot tripped — silently accept without sending.
    if (honeypot) { setFormState("success"); return; }

    setFormState("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio message from ${form.name}`,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      setFormState(data.success ? "success" : "error");
    } catch {
      setFormState("error");
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <SectionLabel>Contact</SectionLabel>
            <h2
              id="contact-heading"
              className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-[1.05]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Let&apos;s build
              <br />
              something.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Open to full-time roles, contracts, and consulting engagements. I respond within 24 hours.
            </p>

            {/* Social links */}
            <div className="flex gap-3 mb-10">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  className="w-11 h-11 flex items-center justify-center rounded bg-secondary text-muted-foreground
                    hover:bg-primary hover:text-primary-foreground
                    transition-colors duration-100
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form area */}
          <div aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
                  className="flex flex-col items-start gap-4 p-8 bg-card border border-border rounded"
                  role="status"
                >
                  <CheckCircle size={32} className="text-primary" aria-hidden="true" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "var(--font-display)" }}>
                      Message sent.
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Thanks, {form.name.split(" ")[0]}. I&apos;ll be in touch within 24 hours.
                    </p>
                  </div>
                </motion.div>
              ) : formState === "error" ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
                  className="flex flex-col items-start gap-4 p-8 bg-card border border-destructive/30 rounded"
                  role="alert"
                >
                  <AlertCircle size={32} className="text-destructive" aria-hidden="true" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "var(--font-display)" }}>
                      Something went wrong.
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      The message couldn&apos;t be sent. Try again, or email me directly at kesarwanit4@gmail.com.
                    </p>
                    <Button variant="secondary" size="sm" onClick={() => setFormState("idle")}>
                      Try again
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.175 }}
                  className="flex flex-col gap-5"
                >
                  {/* Honeypot — hidden from users, catches bots */}
                  <input
                    type="text"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
                  />
                  <FormField
                    id="name" label="Name" value={form.name} onChange={update("name")}
                    error={errors.name} placeholder="Jane Doe" required
                    disabled={formState === "submitting"}
                  />
                  <FormField
                    id="email" label="Email" type="email" value={form.email} onChange={update("email")}
                    error={errors.email} placeholder="jane@company.com" required
                    disabled={formState === "submitting"}
                  />
                  <FormField
                    id="message" label="Message" multiline rows={5} value={form.message} onChange={update("message")}
                    error={errors.message} placeholder="Tell me about the project or role…" required
                    disabled={formState === "submitting"}
                  />
                  <Button type="submit" variant="primary" size="lg" loading={formState === "submitting"} className="self-start">
                    Send message
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
