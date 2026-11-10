import Image from 'next/image';
import { withBasePath } from '@/lib/siteConfig';

export default function BrandLogo({ light = false, symbol = false, className = '' }: { light?: boolean; symbol?: boolean; className?: string }) {
  const name = symbol ? `admaki-symbol${light ? '-white' : ''}` : `admaki-logo${light ? '-white' : ''}`;
  return <Image src={withBasePath(`/brand/${name}.svg`)} width={symbol ? 434 : 1148} height={284} alt="ADMAKI Digital" className={`brand-logo ${symbol ? 'brand-symbol' : ''} ${className}`} unoptimized />;
}
