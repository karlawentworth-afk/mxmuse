import { useState } from 'react';

const SENIORITY_OPTIONS = [
  'Entry-level',
  'Junior',
  'Mid-level',
  'Senior',
  'Lead',
  'Manager',
  'Director',
  'Head of',
  'VP',
  'C-Suite'
];

export default function InfoForm({ onSubmit, isSubmitting }) {
  const [form, setForm] = useState({
    firstName: '',
    email: '',
    jobTitle: '',
    seniority: ''
  });

  const isValid = form.firstName.trim() && form.email.trim() && form.jobTitle.trim() && form.seniority;

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid || isSubmitting) return;
    onSubmit(form);
  }

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  return (
    <div className="max-w-lg mx-auto px-6 py-12 md:py-16">
      <h2 className="text-3xl md:text-4xl font-heading font-semibold text-near-black mb-3 leading-tight">
        Almost there.
      </h2>
      <p className="text-mid-gray text-lg mb-10">
        We need a few details to generate your personalised profile. Your email is only used to send you your results link.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-semibold text-near-black mb-2">
            First name
          </label>
          <input
            id="firstName"
            type="text"
            required
            value={form.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            className="w-full px-4 py-3.5 border-2 border-warm-gray rounded-xl bg-white text-near-black text-base focus:outline-none focus:border-muse-teal transition-colors"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-near-black mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className="w-full px-4 py-3.5 border-2 border-warm-gray rounded-xl bg-white text-near-black text-base focus:outline-none focus:border-muse-teal transition-colors"
          />
        </div>

        <div>
          <label htmlFor="jobTitle" className="block text-sm font-semibold text-near-black mb-2">
            Current job title
          </label>
          <input
            id="jobTitle"
            type="text"
            required
            value={form.jobTitle}
            onChange={(e) => update('jobTitle', e.target.value)}
            className="w-full px-4 py-3.5 border-2 border-warm-gray rounded-xl bg-white text-near-black text-base focus:outline-none focus:border-muse-teal transition-colors"
          />
        </div>

        <div>
          <label htmlFor="seniority" className="block text-sm font-semibold text-near-black mb-2">
            Current seniority
          </label>
          <select
            id="seniority"
            required
            value={form.seniority}
            onChange={(e) => update('seniority', e.target.value)}
            className={`w-full px-4 py-3.5 border-2 border-warm-gray rounded-xl bg-white text-base focus:outline-none focus:border-muse-teal transition-colors ${
              form.seniority ? 'text-near-black' : 'text-mid-gray'
            }`}
          >
            <option value="" disabled>Select your level</option>
            {SENIORITY_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="group w-full inline-flex items-center justify-center gap-2 py-5 bg-muse-teal text-off-white font-heading font-semibold text-xl rounded-xl hover:bg-muse-teal-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none mt-2"
        >
          {isSubmitting ? 'Generating your profile...' : 'See my results'}
          {!isSubmitting && <span className="inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>}
        </button>
      </form>
    </div>
  );
}
