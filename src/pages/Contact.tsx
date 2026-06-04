import { useState } from 'react';
import { Instagram, ArrowRight } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${formData.subject} — from ${formData.name}`);
    const body = encodeURIComponent(`From: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.location.href = `mailto:info@trapcloud.eu?subject=${subject}&body=${body}`;
    setSent(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container max-w-md">
        <div className="flex flex-col items-center gap-12">
          {sent ? (
            <p className="text-sm text-foreground/80 uppercase tracking-[0.2em]">Message sent.</p>
          ) : (
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="text-center">
                  <label htmlFor="name" className="block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full py-2 bg-transparent border-b border-border/50 focus:border-foreground/50 outline-none transition-colors text-sm text-center"
                  />
                </div>
                <div className="text-center">
                  <label htmlFor="email" className="block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full py-2 bg-transparent border-b border-border/50 focus:border-foreground/50 outline-none transition-colors text-sm text-center"
                  />
                </div>
              </div>

              <div className="text-center">
                <label htmlFor="subject" className="block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full py-2 bg-transparent border-b border-border/50 focus:border-foreground/50 outline-none transition-colors appearance-none cursor-pointer text-sm text-center"
                >
                  <option value="" disabled className="bg-background text-foreground">Select</option>
                  <option value="booking" className="bg-background text-foreground">Artist Booking</option>
                  <option value="show" className="bg-background text-foreground">Show / Event Inquiry</option>
                  <option value="partnership" className="bg-background text-foreground">Partnership</option>
                  <option value="press" className="bg-background text-foreground">Press</option>
                  <option value="other" className="bg-background text-foreground">Other</option>
                </select>
              </div>

              <div className="text-center">
                <label htmlFor="message" className="block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full py-2 bg-transparent border-b border-border/50 focus:border-foreground/50 outline-none transition-colors resize-none text-sm text-center"
                />
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="nav-link inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em]"
                >
                  Send Message
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </form>
          )}

          {/* Social Links */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-6">
              <a
                href="https://www.instagram.com/trapcloud.eu"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Follow Us
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
