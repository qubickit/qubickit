import type * as PageTree from 'fumadocs-core/page-tree';
import {
  ArrowRightLeft,
  BookOpen,
  BookOpenCheck,
  Cpu,
  Download,
  Globe,
  GraduationCap,
  Layers,
  Share2,
  Sparkles,
  Terminal,
  Workflow,
  Wrench,
} from 'lucide-react';
import type { ReactNode } from 'react';

const ICONS = {
  BookOpen,
  BookOpenCheck,
  Download,
  Cpu,
  Share2,
  ArrowRightLeft,
  Wrench,
  GraduationCap,
  Workflow,
  Layers,
  Sparkles,
  Terminal,
  Globe,
};

type IconName = keyof typeof ICONS;

const resolveIcon = (icon?: ReactNode) => {
  if (typeof icon !== 'string') return icon;
  const Icon = ICONS[icon as IconName];
  if (!Icon) return icon;
  return <Icon className="size-4" aria-hidden />;
};

const mapNode = (node: PageTree.Node): PageTree.Node => {
  if (node.type === 'folder') {
    return {
      ...node,
      icon: resolveIcon(node.icon),
      children: node.children.map(mapNode),
      ...(node.index ? { index: mapNode(node.index) as PageTree.Item } : {}),
    };
  }

  if (node.type === 'page' || node.type === 'separator') {
    return {
      ...node,
      icon: resolveIcon(node.icon),
    };
  }

  return node;
};

export const withSidebarIcons = (root: PageTree.Root): PageTree.Root => ({
  ...root,
  children: root.children.map(mapNode),
  ...(root.fallback ? { fallback: withSidebarIcons(root.fallback) } : {}),
});
