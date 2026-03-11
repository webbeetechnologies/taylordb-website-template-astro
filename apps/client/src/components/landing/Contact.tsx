import { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
}

interface Props {
  apiUrl: string;
}

export default function Contact({ apiUrl }: Props) {
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();

      if (!res.ok) {
        setStatus({ type: "error", text: json.message ?? "Something went wrong." });
      } else {
        setStatus({ type: "success", text: json.message });
        setForm({ firstName: "", lastName: "", phone: "", email: "", message: "" });
      }
    } catch {
      setStatus({ type: "error", text: "Network error — is the server running?" });
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full border-b border-gray-400 bg-transparent pb-2 text-sm focus:outline-none focus:border-gray-800 transition-colors";

  return (
    <section id="contact" className="bg-cream py-16 md:py-24" data-animate="fade-up">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold leading-none">
              Stay<br />Connected
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {status && (
              <div
                className={`rounded-lg px-4 py-3 text-sm font-medium ${
                  status.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {status.text}
              </div>
            )}

            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-sm mb-2">First name *</label>
                <input
                  name="firstName"
                  type="text"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Last name *</label>
                <input
                  name="lastName"
                  type="text"
                  required
                  value={form.lastName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Phone</label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Email *</label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Write a message *</label>
              <textarea
                name="message"
                rows={4}
                required
                value={form.message}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-orange text-white py-4 rounded-full font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
            >
              {submitting ? "Sending…" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
