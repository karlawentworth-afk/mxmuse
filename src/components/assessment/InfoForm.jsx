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
    <div className="max-w-lg mx-auto px-6 py-12">
      <h2 className="text-2xl md:text-3xl font-heading font-semibold text-near-black mb-3">
        Almost there.
      </h2>
      <p className="text-mid-gray mb-8">
        We need a few details to generate your personalised profile. Your email is only used to send you your results link.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-near-black mb-1.5">
            First name
          </label>
          <input
            id="firstName"
            type="text"
            required
            value={form.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            className="w-full px-4 py-3 border border-warm-gray rounded-lg bg-white text-near-black focus:outline-none focus:border-muse-teal"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-near-black mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className="w-full px-4 py-3 border border-warm-gray rounded-lg bg-white text-near-black focus:outline-none focus:border-muse-teal"
          />
        </div>

        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-near-black mb-1.5">
            Current job title
          </label>
          <input
            id="jobTitle"
            type="text"
            required
            value={form.jobTitle}
            onChange={(e) => update('jobTitle', e.target.value)}
            className="w-full px-4 py-3 border border-warm-gray rounded-lg bg-white text-near-black focus:outline-none focus:border-muse-teal"
          />
        </div>

        <div>
          <label htmlFor="seniority" className="block text-sm font-medium text-near-black mb-1.5">
            Current seniority
          </label>
          <select
            id="seniority"
            required
            value={form.seniority}
            onChange={(e) => update('seniority', e.target.value)}
            className={`w-full px-4 py-3 border border-warm-gray rounded-lg bg-white focus:outline-none focus:border-muse-teal ${
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
          className="w-full py-3 bg-muse-teal text-white font-medium rounded-lg hover:bg-muse-teal-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        >
          {isSubmitting ? 'Generating your profile...' : 'See my results'}
        </button>
      </form>
    </div>
  );
}
