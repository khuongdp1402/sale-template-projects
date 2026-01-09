import { useQuery } from '@tanstack/react-query';
import { SEO } from '@/lib/seo';
import { LandingSection } from '@/types/api';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/common/EmptyState';
import { Plus, Edit, ArrowUp, ArrowDown, Layout, Eye } from 'lucide-react';
import { Card } from '@/components/ui/Card';
// import { cn } from '@/lib/utils';

export function LandingSectionsPage() {
  const { data, isLoading } = useQuery<LandingSection[]>({
    queryKey: ['landing-sections'],
    queryFn: async () => {
      // Mock for now
      return [
        { id: '1', sectionType: 'Hero', title: 'Hero Banner', contentJson: {}, position: 1, isActive: true, createdAt: '', updatedAt: '' },
        { id: '2', sectionType: 'Features', title: 'Core Features', contentJson: {}, position: 2, isActive: true, createdAt: '', updatedAt: '' },
        { id: '3', sectionType: 'Pricing', title: 'Pricing Table', contentJson: {}, position: 3, isActive: false, createdAt: '', updatedAt: '' },
      ];
    },
  });

  return (
    <div className="space-y-6">
      <SEO title="Landing Sections" />
      <PageHeader
        title="Landing Page CMS"
        description="Manage sections, layout and content of the marketing website"
        actions={
          <Button variant="default" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Section
          </Button>
        }
      />

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 w-full animate-pulse bg-slate-100 dark:bg-slate-800/50 rounded-xl" />
          ))}
        </div>
      ) : !data || data.length === 0 ? (
        <EmptyState
          title="No sections found"
          description="Your landing page is empty."
          action={<Button><Plus className="h-4 w-4 mr-2" />Create Section</Button>}
        />
      ) : (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-[#1e293b]/50">
                <TableRow>
                  <TableHead className="w-20">Order</TableHead>
                  <TableHead>Section Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((section) => (
                  <TableRow key={section.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-slate-400">{section.position}</span>
                        <div className="flex flex-col gap-0.5">
                          <button className="text-slate-400 hover:text-blue-500"><ArrowUp className="h-3 w-3" /></button>
                          <button className="text-slate-400 hover:text-blue-500"><ArrowDown className="h-3 w-3" /></button>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-slate-900 dark:text-white">
                      {section.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-none">
                        {section.sectionType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={section.isActive ? 'success' : 'default'} className="capitalize">
                        {section.isActive ? 'Active' : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <Card className="p-4 bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-900/30">
            <div className="flex gap-3">
              <Layout className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0" />
              <p className="text-sm text-amber-800 dark:text-amber-400">
                <strong>Tip:</strong> You can drag and drop sections to reorder them on the live website. Changes are reflected instantly.
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
