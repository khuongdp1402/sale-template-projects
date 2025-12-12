import React from 'react';

export const ContactPage: React.FC = () => {
  return (
    <section className="max-w-xl space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Contact</h1>
        <p className="text-sm text-slate-600">
          Tell us about your project and we will get back to you within one business day.
        </p>
      </header>
      <form className="space-y-4 text-sm">
        <div className="space-y-1">
          <label htmlFor="name" className="block text-xs font-medium text-slate-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            placeholder="Your name"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="email" className="block text-xs font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="message" className="block text-xs font-medium text-slate-700">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            placeholder="Share a bit about what you're building..."
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          Send message
        </button>
      </form>
    </section>
  );
};
