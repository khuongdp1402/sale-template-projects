import React from 'react';
import { TemplateItem } from '../../data/templates';
import { FiMessageCircle, FiPhone, FiSend } from 'react-icons/fi';

type Props = {
  template: TemplateItem;
};

const TemplateSupportSection: React.FC<Props> = ({ template }) => {
  const contacts = template.supportContacts;
  const buttons = [
    contacts.messenger && { label: 'Messenger', href: contacts.messenger, className: 'bg-blue-600 hover:bg-blue-700', icon: <FiMessageCircle /> },
    contacts.zalo && { label: 'Zalo', href: contacts.zalo, className: 'bg-sky-500 hover:bg-sky-600', icon: <FiMessageCircle /> },
    contacts.telegram && { label: 'Telegram', href: contacts.telegram, className: 'bg-cyan-600 hover:bg-cyan-700', icon: <FiSend /> }
  ].filter(Boolean) as Array<{ label: string; href: string; className: string; icon: React.ReactNode }>;

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Support &amp; Contact</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">Chọn kênh để liên hệ hỗ trợ triển khai.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        {buttons.map((btn) => (
          <a
            key={btn.label}
            href={btn.href}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-white shadow transition ${btn.className}`}
          >
            {btn.icon}
            {btn.label}
          </a>
        ))}
        {contacts.phone && (
          <a
            href={`tel:${contacts.phone}`}
            className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            <FiPhone />
            {contacts.phone}
          </a>
        )}
      </div>
    </section>
  );
};

export default TemplateSupportSection;








