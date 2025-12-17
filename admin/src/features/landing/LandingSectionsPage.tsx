import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SEO } from '@/lib/seo';
import { landingApi } from '@/services/adminApi';
import { LandingSection } from '@/types/api';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/common/EmptyState';
import { Plus, Edit, ArrowUp, ArrowDown } from 'lucide-react';

// Mock data for preview
const mockSections: LandingSection[] = [
  {
    id: '1',
    sectionType: 'hero',
    title: 'Hero Section',
    contentJson: { heading: 'Welcome to K-WingX', subheading: 'Build amazing products' },
    position: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    sectionType: 'features',
    title: 'Features Section',
    contentJson: { items: ['Feature 1', 'Feature 2', 'Feature 3'] },
    position: 2,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    sectionType: 'testimonials',
    title: 'Testimonials',
    contentJson: { testimonials: [] },
    position: 3,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    sectionType: 'cta',
    title: 'Call to Action',
    contentJson: { text: 'Get Started Today', buttonText: 'Sign Up' },
    position: 4,
    isActive: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function LandingSectionsPage() {
  const { data, isLoading } = useQuery<LandingSection[]>({
    queryKey: ['landing-sections'],
    queryFn: async () => {
      try {
        return await landingApi.list();
      } catch {
        // Return mock data
        return mockSections.sort((a, b) => a.position - b.position);
      }
    },
  });

  return (
    <>
      <SEO title="Landing Sections" />
      <PageHeader
        title="Landing Sections"
        description="Manage landing page sections"
        actions={
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Section
          </Button>
        }
      />

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto"></div>
        </div>
      ) : !data || data.length === 0 ? (
        <EmptyState
          title="No sections found"
          description="Get started by creating a new section."
          action={
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Section
            </Button>
          }
        />
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Position</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((section) => (
                <TableRow key={section.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{section.position}</span>
                      <div className="flex flex-col">
                        <Button variant="ghost" size="sm" className="h-4 p-0">
                          <ArrowUp className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-4 p-0">
                          <ArrowDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="info">{section.sectionType}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{section.title}</TableCell>
                  <TableCell>
                    <Badge variant={section.isActive ? 'success' : 'default'}>
                      {section.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}

