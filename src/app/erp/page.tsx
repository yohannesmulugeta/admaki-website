import type { Metadata } from 'next';
import ErpClient from './ErpClient';

export const metadata: Metadata = {
  title: 'Custom ERP & Business Systems',
  description:
    'Custom warehouse ERP, coffee export ledgers, inventory traceability, and automated Telegram bots built for Ethiopian operations.',
  openGraph: {
    title: 'Custom ERP & Business Systems | ADMAKI',
    description:
      'Useful behind the scenes. Custom ERP, operational dashboards and workflow solutions built around how your business works.',
  },
};

export default function ErpPage() {
  return <ErpClient />;
}
