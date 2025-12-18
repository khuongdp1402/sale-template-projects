import { useRightPanel } from './useRightPanel';
import { RightDrawer } from '@/components/ui/RightDrawer';
import { UsersPanel } from '@/features/users/UsersPanel';
import { TemplatesPanel } from '@/features/templates/TemplatesPanel';
import { BlogPanel } from '@/features/blog/BlogPanel';
import { ContactsPanel } from '@/features/contacts/ContactsPanel';
import { LogsPanel } from '@/features/logs/LogsPanel';

export function PanelRenderer() {
  const { isOpen, type, mode, id, closePanel } = useRightPanel();

  if (!type) return null;

  const commonProps = { mode, id, onClose: closePanel } as const;

  let content: React.ReactNode = null;
  let title = '';
  let subtitle: string | undefined;

  switch (type) {
    case 'users':
      title = mode === 'create' ? 'New User' : 'User';
      subtitle = mode === 'create' ? 'Create a new admin user' : undefined;
      content = <UsersPanel {...commonProps} />;
      break;
    case 'templates':
      title = mode === 'create' ? 'New Template' : 'Template';
      content = <TemplatesPanel {...commonProps} />;
      break;
    case 'blog':
      title = mode === 'create' ? 'New Post' : 'Blog Post';
      content = <BlogPanel {...commonProps} />;
      break;
    case 'contacts':
      title = 'Contact Request';
      content = <ContactsPanel {...commonProps} />;
      break;
    case 'logs':
      title = 'Log Detail';
      content = <LogsPanel {...commonProps} />;
      break;
    default:
      content = null;
  }

  if (!content) return null;

  return (
    <RightDrawer open={isOpen} onClose={closePanel} title={title} subtitle={subtitle}>
      {content}
    </RightDrawer>
  );
}
