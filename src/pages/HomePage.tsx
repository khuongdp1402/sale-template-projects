import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';
import BrandMissionSection from '../components/BrandMissionSection';
import ClientLogoWall from '../components/ClientLogoWall';
import FutureRoadmapSection from '../components/FutureRoadmapSection';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import WhyChooseSection from '../components/WhyChooseSection';

type Feature = {
  title: string;
  description: string;
};

type TemplatePreview = {
  name: string;
  description: string;
};

type PricingPlan = {
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
};

const features: Feature[] = [
  {
    title: 'home.features.automaticDeployment.title',
    description: 'home.features.automaticDeployment.description',
  },
  {
    title: 'home.features.salesTemplates.title',
    description: 'home.features.salesTemplates.description',
  },
  {
    title: 'home.features.affiliate.title',
    description: 'home.features.affiliate.description',
  },
  {
    title: 'home.features.customDomain.title',
    description: 'home.features.customDomain.description',
  },
];

const templatePreviews: TemplatePreview[] = [
  {
    name: 'home.templates.saasLaunch.name',
    description: 'home.templates.saasLaunch.description',
  },
  {
    name: 'home.templates.creatorStudio.name',
    description: 'home.templates.creatorStudio.description',
  },
  {
    name: 'home.templates.mobileApp.name',
    description: 'home.templates.mobileApp.description',
  },
  {
    name: 'home.templates.agency.name',
    description: 'home.templates.agency.description',
  },
];

const pricingPlans: PricingPlan[] = [
  {
    name: 'Basic',
    price: '$19/mo',
    features: ['1 active template', 'Shared subdomain', 'Email support', 'Basic analytics'],
  },
  {
    name: 'Pro',
    price: '$49/mo',
    features: ['Up to 5 templates', 'Custom domain support', 'Priority support', 'Advanced analytics'],
    highlighted: true,
  },
  {
    name: 'Premium',
    price: '$99/mo',
    features: ['Unlimited templates', 'Multiple domains', 'Team access', 'Dedicated success manager'],
  },
];

export const HomePage: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="space-y-16">
      {/* Hero section */}
      <section className="grid gap-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0e1c46] via-[#0a1436] to-[#12295e] p-8 text-white shadow-2xl md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/20">
            {t('home.badge')}
          </span>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {t('home.title')}
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-white/80">
            {t('home.subtitle')}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/templates"
              className="inline-flex items-center justify-center rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-primary-500/30 transition hover:-translate-y-0.5 hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1436]"
            >
              {t('home.primaryCta')}
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-white/30 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1436]"
            >
              {t('home.secondaryCta')}
            </button>
          </div>
        </div>
        <div className="relative">
          <div
            className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary-400/30 via-sky-300/20 to-purple-400/20 blur-2xl"
            aria-hidden="true"
          />
          <div className="relative rounded-2xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90" />
            </div>
            <div className="space-y-3 text-xs text-white/70">
              <div className="h-6 w-32 rounded-md bg-white/20" />
              <div className="h-3 w-full rounded-md bg-white/15" />
              <div className="h-3 w-5/6 rounded-md bg-white/15" />
              <div className="h-3 w-3/4 rounded-md bg-white/15" />
              <div className="mt-4 flex gap-2">
                <div className="h-8 w-24 rounded-md bg-primary-400/30" />
                <div className="h-8 w-20 rounded-md bg-white/15" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="h-12 rounded-md bg-white/10" />
                <div className="h-12 rounded-md bg-white/10" />
                <div className="h-12 rounded-md bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="space-y-6">
        <header className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            {t('home.featuresTitle')}
          </h2>
          <p className="text-sm text-slate-600 max-w-xl dark:text-slate-300">
            {t('home.featuresSubtitle')}
          </p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600 text-xs font-semibold">
                Icon
              </div>
              <h3 className="mb-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
                {t(feature.title)}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {t(feature.description)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Templates preview section */}
      <section className="space-y-6">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              {t('home.templatesTitle')}
            </h2>
            <p className="text-sm text-slate-600 max-w-xl dark:text-slate-300">
              {t('home.templatesSubtitle')}
            </p>
          </div>
          <Link
            to="/templates"
            className="inline-flex items-center justify-center self-start rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            {t('home.templatesViewAll')}
          </Link>
        </header>
        <div className="grid gap-4 md:grid-cols-3">
          {templatePreviews.slice(0, 3).map((template) => (
            <div
              key={template.name}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm"
            >
              <div className="mb-3 h-32 w-full rounded-lg bg-slate-100" />
              <h3 className="mb-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
                {t(template.name)}
              </h3>
              <p className="mb-3 text-xs text-slate-600 flex-1 dark:text-slate-300">
                {t(template.description)}
              </p>
              <div className="mt-auto">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  View details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing teaser section */}
      <section className="space-y-6">
        <header className="space-y-2 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            {t('home.pricingTitle')}
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto dark:text-slate-300">
            {t('home.pricingSubtitle')}
          </p>
        </header>
        <div className="grid gap-4 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-2xl border bg-white p-5 text-sm shadow-sm ${
                plan.highlighted
                  ? 'border-primary-200 ring-1 ring-primary-200 bg-primary-50/40'
                  : 'border-slate-200'
              }`}
            >
              <h3 className="text-sm font-semibold text-slate-900">{plan.name}</h3>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{plan.price}</p>
              <ul className="mt-4 space-y-2 text-xs text-slate-600 flex-1">
                {plan.features.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={`mt-4 inline-flex items-center justify-center rounded-md px-4 py-2 text-xs font-medium shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                  plan.highlighted
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Get started
              </button>
            </div>
          ))}
        </div>
      </section>

      <WhyChooseSection />
      <TestimonialsCarousel />
      <ClientLogoWall />
      <BrandMissionSection />
      <FutureRoadmapSection />
    </div>
  );
};
