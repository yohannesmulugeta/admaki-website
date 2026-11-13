import type { Metadata } from 'next';
import ErpClient from './ErpClient';

export const metadata: Metadata = {
  alternates: { canonical: '/erp' },
  title: "Custom Software & ERP Development in Ethiopia",
  description: "Custom software and ERP development for Ethiopian businesses, including coffee warehouse custody, inventory and operational workflows.",
  openGraph: {
    url: '/erp',
    title: 'Custom ERP & Business Systems | ADMAKI',
    description:
      'Useful behind the scenes. Custom ERP, operational dashboards and workflow solutions built around how your business works.',
  },
};

export default function ErpPage() {
  return <ErpClient />;
}
