import type { Metadata } from 'next';
import BusinessGuide from '@/components/seo/BusinessGuide';
export const metadata: Metadata = {"title": "ለኢትዮጵያ ንግዶች ዲጂታል መሣሪያዎች", "description": "ስለ NFC ካርድ፣ QR ሜኑ፣ ድረ ገጽ፣ ማህበራዊ ሚዲያና ብጁ ሶፍትዌር ጠቃሚ መረጃ።", "alternates": {"canonical": "/am/guides/digital-tools-for-ethiopian-businesses", "languages": {"en": "/guides/digital-tools-for-ethiopian-businesses", "am": "/am/guides/digital-tools-for-ethiopian-businesses", "x-default": "/guides/digital-tools-for-ethiopian-businesses"}}, "openGraph": {"title": "ለኢትዮጵያ ንግዶች ዲጂታል መሣሪያዎች", "description": "ስለ NFC ካርድ፣ QR ሜኑ፣ ድረ ገጽ፣ ማህበራዊ ሚዲያና ብጁ ሶፍትዌር ጠቃሚ መረጃ።", "url": "/am/guides/digital-tools-for-ethiopian-businesses", "locale": "am_ET"}};
export default function Page() { return <BusinessGuide am={true} />; }
