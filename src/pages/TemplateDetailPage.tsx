import React, { useMemo, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { getSimilarTemplates, getTemplateById } from "../data/templates";
import TemplateMediaGallery from "../components/templates/TemplateMediaGallery";
import TemplateInfoPanel from "../components/templates/TemplateInfoPanel";
import TemplateCustomersSection from "../components/templates/TemplateCustomersSection";
import TemplateSupportSection from "../components/templates/TemplateSupportSection";
import SimilarTemplatesSection from "../components/templates/SimilarTemplatesSection";

export const TemplateDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const template = id ? getTemplateById(id) : undefined;
  const supportRef = useRef<HTMLDivElement | null>(null);

  const similar = useMemo(() => (template ? getSimilarTemplates(template) : []), [template]);

  if (!template) {
    return (
      <section className="space-y-4 text-center">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Template not found</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">Template bạn tìm không tồn tại hoặc đã bị gỡ.</p>
        <Link
          to="/templates"
          className="inline-flex items-center justify-center rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-sky-700"
        >
          Quay lại danh sách
        </Link>
      </section>
    );
  }

  const scrollToSupport = () => {
    supportRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="space-y-8">
      <Link to="/templates" className="text-xs font-semibold text-sky-600 hover:text-sky-700">
        ← Quay lại danh sách
      </Link>

      <div className="grid gap-6 lg:grid-cols-2">
        <TemplateMediaGallery template={template} />
        <TemplateInfoPanel template={template} onScrollToSupport={scrollToSupport} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Overview</h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">{template.longDescription}</p>
        </section>

        <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Features included</h3>
          <ul className="grid grid-cols-1 gap-2 text-sm text-slate-700 dark:text-slate-200">
            {template.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <TemplateCustomersSection template={template} />

      <div ref={supportRef}>
        <TemplateSupportSection template={template} />
      </div>

      <SimilarTemplatesSection templates={similar} />
    </section>
  );
};
