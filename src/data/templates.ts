export type TemplateCategory =
  | 'spa'
  | 'proxy'
  | 'game-accounts'
  | 'social-boost'
  | 'payment-api'
  | 'tools-marketplace'
  | 'b2b'
  | 'b2c'
  | 'cosmetics'
  | 'household'
  | 'fashion'
  | 'digital-products';

export type TemplateTag = 'new' | 'hot' | 'popular' | 'discount';

export type TemplateItem = {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  categories: TemplateCategory[];
  templateType: 'Service' | 'E-commerce' | 'Landing';
  audience: 'B2B' | 'B2C' | 'Both';
  price: number;
  originalPrice?: number;
  currency: 'VND' | 'USD';
  isHot: boolean;
  isNew: boolean;
  isPopular: boolean;
  createdAt: string;
  popularityScore: number;
  gallery: Array<{ type: 'image' | 'video'; src: string; thumb: string; title?: string }>;
  cardMedia: Array<{ type: 'image'; src: string }>;
  demoVideo: { title: string; src: string; poster?: string };
  features: string[];
  usedByCustomers: Array<{ name: string; industry: string; logo?: string; quote?: string }>;
  supportContacts: {
    telegram?: string;
    zalo?: string;
    messenger?: string;
    phone?: string;
  };
  similarTemplateIds: string[];
};

export const templates: TemplateItem[] = [
  {
    id: 'spa-glow-landing',
    name: 'Spa Glow Landing',
    shortDescription: 'Trang đích spa với đặt lịch nhanh, review khách và ưu đãi nổi bật.',
    longDescription:
      'Template tối ưu cho spa/thẩm mỹ viện với hero nổi bật, combo dịch vụ, lịch đặt, review và bản đồ. Phù hợp chạy ads và remarketing.',
    categories: ['spa', 'b2c', 'cosmetics'],
    templateType: 'Landing',
    audience: 'B2C',
    price: 690000,
    originalPrice: 990000,
    currency: 'VND',
    isHot: true,
    isNew: false,
    isPopular: true,
    createdAt: '2024-10-01',
    popularityScore: 92,
    gallery: [
      { type: 'image', src: '/templates/covers/template-01.svg', thumb: '/templates/thumbs/template-01.svg', title: 'Hero' },
      { type: 'image', src: '/templates/covers/template-02.svg', thumb: '/templates/thumbs/template-02.svg', title: 'Services' },
      { type: 'image', src: '/templates/covers/template-03.svg', thumb: '/templates/thumbs/template-03.svg', title: 'Booking' },
      { type: 'image', src: '/templates/covers/template-04.svg', thumb: '/templates/thumbs/template-04.svg', title: 'Reviews' },
      { type: 'video', src: '/videos/demo-01.mp4', thumb: '/templates/thumbs/template-01.svg', title: 'Demo video' },
      { type: 'image', src: '/templates/covers/template-05.svg', thumb: '/templates/thumbs/template-05.svg', title: 'Gallery' }
    ],
    cardMedia: [
      { type: 'image', src: '/templates/thumbs/template-01.svg' },
      { type: 'image', src: '/templates/thumbs/template-02.svg' },
      { type: 'image', src: '/templates/thumbs/template-03.svg' }
    ],
    demoVideo: { title: 'Spa Glow Demo', src: '/videos/demo-01.mp4', poster: '/templates/thumbs/template-01.svg' },
    features: ['Đặt lịch nhanh', 'Combo ưu đãi', 'Popup khuyến mãi', 'Tích hợp chat', 'SEO sẵn sàng'],
    usedByCustomers: [
      { name: 'Aura Clinic', industry: 'Spa', quote: 'Tăng 35% booking trong 2 tuần đầu.' },
      { name: 'Glow Beauty', industry: 'Cosmetics' }
    ],
    supportContacts: { zalo: 'https://zalo.me/0123456789', telegram: 'https://t.me/kwingx', phone: '0988123123' },
    similarTemplateIds: ['cosmetic-store-lite', 'social-boost-hub', 'b2c-landing-fast']
  },
  {
    id: 'proxy-hub-service',
    name: 'Proxy Hub Service',
    shortDescription: 'Trang dịch vụ proxy với bảng giá động và trạng thái uptime.',
    longDescription:
      'Phù hợp cho dịch vụ proxy/SSH với bảng giá gói, trạng thái uptime, FAQ, hỗ trợ đa kênh và CTA mạnh.',
    categories: ['proxy', 'b2b', 'b2c', 'tools-marketplace'],
    templateType: 'Service',
    audience: 'Both',
    price: 890000,
    originalPrice: 1290000,
    currency: 'VND',
    isHot: true,
    isNew: true,
    isPopular: true,
    createdAt: '2025-01-10',
    popularityScore: 95,
    gallery: [
      { type: 'image', src: '/templates/covers/template-02.svg', thumb: '/templates/thumbs/template-02.svg', title: 'Hero' },
      { type: 'image', src: '/templates/covers/template-06.svg', thumb: '/templates/thumbs/template-06.svg', title: 'Pricing' },
      { type: 'image', src: '/templates/covers/template-07.svg', thumb: '/templates/thumbs/template-07.svg', title: 'Status' },
      { type: 'video', src: '/videos/demo-02.mp4', thumb: '/templates/thumbs/template-02.svg', title: 'Live demo' },
      { type: 'image', src: '/templates/covers/template-08.svg', thumb: '/templates/thumbs/template-08.svg', title: 'Features' },
      { type: 'image', src: '/templates/covers/template-09.svg', thumb: '/templates/thumbs/template-09.svg', title: 'FAQ' }
    ],
    cardMedia: [
      { type: 'image', src: '/templates/thumbs/template-02.svg' },
      { type: 'image', src: '/templates/thumbs/template-06.svg' },
      { type: 'image', src: '/templates/thumbs/template-07.svg' }
    ],
    demoVideo: { title: 'Proxy Hub Demo', src: '/videos/demo-02.mp4', poster: '/templates/thumbs/template-02.svg' },
    features: ['Bảng giá động', 'Status uptime', 'CTA mạnh', 'Tích hợp hỗ trợ', 'Blog/FAQ'],
    usedByCustomers: [
      { name: 'ProxyVN', industry: 'Proxy', quote: 'Chốt sale tăng 28% nhờ CTA rõ ràng.' },
      { name: 'NetGuard', industry: 'Cybersecurity' }
    ],
    supportContacts: { telegram: 'https://t.me/kwingx', messenger: 'https://m.me/kwingx', phone: '0977333888' },
    similarTemplateIds: ['api-payment-hub', 'tools-market-b2b', 'gaming-accounts-pro']
  },
  {
    id: 'gaming-accounts-pro',
    name: 'Gaming Accounts Pro',
    shortDescription: 'Landing bán nick game, hiển thị kho sản phẩm và review.',
    longDescription:
      'Tối ưu cho bán nick/game accounts với gallery sản phẩm, bảo hành, thanh toán và social proof mạnh.',
    categories: ['game-accounts', 'b2c', 'digital-products'],
    templateType: 'E-commerce',
    audience: 'B2C',
    price: 990000,
    currency: 'VND',
    isHot: false,
    isNew: true,
    isPopular: true,
    createdAt: '2025-01-05',
    popularityScore: 88,
    gallery: [
      { type: 'image', src: '/templates/covers/template-03.svg', thumb: '/templates/thumbs/template-03.svg', title: 'Hero' },
      { type: 'image', src: '/templates/covers/template-08.svg', thumb: '/templates/thumbs/template-08.svg', title: 'Store' },
      { type: 'image', src: '/templates/covers/template-09.svg', thumb: '/templates/thumbs/template-09.svg', title: 'Products' },
      { type: 'video', src: '/videos/demo-03.mp4', thumb: '/templates/thumbs/template-03.svg', title: 'Demo video' },
      { type: 'image', src: '/templates/covers/template-10.svg', thumb: '/templates/thumbs/template-10.svg', title: 'Checkout' },
      { type: 'image', src: '/templates/covers/template-01.svg', thumb: '/templates/thumbs/template-01.svg', title: 'Reviews' }
    ],
    cardMedia: [
      { type: 'image', src: '/templates/thumbs/template-03.svg' },
      { type: 'image', src: '/templates/thumbs/template-08.svg' },
      { type: 'image', src: '/templates/thumbs/template-09.svg' }
    ],
    demoVideo: { title: 'Gaming Accounts Demo', src: '/videos/demo-03.mp4', poster: '/templates/thumbs/template-03.svg' },
    features: ['Kho sản phẩm', 'Lọc nhanh', 'Bảo hành', 'Thanh toán đa kênh', 'Review/Rating'],
    usedByCustomers: [
      { name: 'GameZone', industry: 'Gaming', quote: 'ROI ads tăng 25% nhờ UI rõ ràng.' },
      { name: 'NickPro', industry: 'Digital goods' }
    ],
    supportContacts: { zalo: 'https://zalo.me/0111222333', messenger: 'https://m.me/kwingx', phone: '0933222111' },
    similarTemplateIds: ['social-boost-hub', 'fashion-landing-lite', 'tools-market-b2b']
  },
  {
    id: 'social-boost-hub',
    name: 'Social Boost Hub',
    shortDescription: 'Dịch vụ tăng like/view/follow với bảng giá, gói combo và testimonial.',
    longDescription:
      'Template cho dịch vụ social boost với bảng giá, gói combo, testimonial, lộ trình triển khai và kênh hỗ trợ.',
    categories: ['social-boost', 'b2c', 'b2b'],
    templateType: 'Service',
    audience: 'Both',
    price: 790000,
    originalPrice: 1090000,
    currency: 'VND',
    isHot: true,
    isNew: false,
    isPopular: true,
    createdAt: '2024-11-12',
    popularityScore: 90,
    gallery: [
      { type: 'image', src: '/templates/covers/template-04.svg', thumb: '/templates/thumbs/template-04.svg', title: 'Hero' },
      { type: 'image', src: '/templates/covers/template-05.svg', thumb: '/templates/thumbs/template-05.svg', title: 'Pricing' },
      { type: 'image', src: '/templates/covers/template-06.svg', thumb: '/templates/thumbs/template-06.svg', title: 'Services' },
      { type: 'video', src: '/videos/demo-04.mp4', thumb: '/templates/thumbs/template-04.svg', title: 'Demo video' },
      { type: 'image', src: '/templates/covers/template-07.svg', thumb: '/templates/thumbs/template-07.svg', title: 'Testimonials' },
      { type: 'image', src: '/templates/covers/template-08.svg', thumb: '/templates/thumbs/template-08.svg', title: 'FAQ' }
    ],
    cardMedia: [
      { type: 'image', src: '/templates/thumbs/template-04.svg' },
      { type: 'image', src: '/templates/thumbs/template-05.svg' },
      { type: 'image', src: '/templates/thumbs/template-06.svg' }
    ],
    demoVideo: { title: 'Social Boost Demo', src: '/videos/demo-04.mp4', poster: '/templates/thumbs/template-04.svg' },
    features: ['Bảng giá linh hoạt', 'Gói combo', 'FAQ', 'Testimonial', 'Lead form'],
    usedByCustomers: [{ name: 'ViralUp', industry: 'Marketing' }, { name: 'InfluPro', industry: 'Creator services' }],
    supportContacts: { telegram: 'https://t.me/kwingx', messenger: 'https://m.me/kwingx' },
    similarTemplateIds: ['gaming-accounts-pro', 'spa-glow-landing', 'b2c-landing-fast']
  },
  {
    id: 'api-payment-hub',
    name: 'API Payment Hub',
    shortDescription: 'Landing cho API thanh toán/tool MMO với docs và case study.',
    longDescription:
      'Nổi bật tính năng API, docs tóm tắt, case study và CTA đăng ký. Phù hợp fintech/payments và tool MMO.',
    categories: ['payment-api', 'b2b', 'tools-marketplace'],
    templateType: 'Service',
    audience: 'B2B',
    price: 1290000,
    originalPrice: 1490000,
    currency: 'VND',
    isHot: false,
    isNew: false,
    isPopular: true,
    createdAt: '2024-09-20',
    popularityScore: 87,
    gallery: [
      { type: 'image', src: '/templates/covers/template-05.svg', thumb: '/templates/thumbs/template-05.svg', title: 'Hero' },
      { type: 'image', src: '/templates/covers/template-09.svg', thumb: '/templates/thumbs/template-09.svg', title: 'Docs' },
      { type: 'image', src: '/templates/covers/template-10.svg', thumb: '/templates/thumbs/template-10.svg', title: 'API' },
      { type: 'video', src: '/videos/demo-05.mp4', thumb: '/templates/thumbs/template-05.svg', title: 'Demo video' },
      { type: 'image', src: '/templates/covers/template-01.svg', thumb: '/templates/thumbs/template-01.svg', title: 'Integration' },
      { type: 'image', src: '/templates/covers/template-02.svg', thumb: '/templates/thumbs/template-02.svg', title: 'Security' }
    ],
    cardMedia: [
      { type: 'image', src: '/templates/thumbs/template-05.svg' },
      { type: 'image', src: '/templates/thumbs/template-09.svg' },
      { type: 'image', src: '/templates/thumbs/template-10.svg' }
    ],
    demoVideo: { title: 'API Payment Demo', src: '/videos/demo-05.mp4', poster: '/templates/thumbs/template-05.svg' },
    features: ['Docs tóm tắt', 'Case study', 'CTA đăng ký', 'Bảo mật', 'SLA rõ ràng'],
    usedByCustomers: [
      { name: 'PayFlex', industry: 'Fintech', quote: 'Thuyết phục khách B2B nhanh hơn nhờ case study rõ ràng.' }
    ],
    supportContacts: { telegram: 'https://t.me/kwingx', phone: '0909090909' },
    similarTemplateIds: ['proxy-hub-service', 'tools-market-b2b', 'b2b-landing-pro']
  },
  {
    id: 'tools-market-b2b',
    name: 'Tools Marketplace B2B',
    shortDescription: 'Danh mục tool MMO/b2b với thẻ sản phẩm và lead capture.',
    longDescription:
      'Hiển thị danh sách tool/dịch vụ kèm giá, highlights, review và CTA liên hệ cho khách B2B/B2C.',
    categories: ['tools-marketplace', 'b2b', 'b2c', 'digital-products'],
    templateType: 'E-commerce',
    audience: 'Both',
    price: 1190000,
    currency: 'VND',
    isHot: false,
    isNew: false,
    isPopular: true,
    createdAt: '2024-08-01',
    popularityScore: 84,
    gallery: [
      { type: 'image', src: '/templates/covers/template-06.svg', thumb: '/templates/thumbs/template-06.svg', title: 'Hero' },
      { type: 'image', src: '/templates/covers/template-07.svg', thumb: '/templates/thumbs/template-07.svg', title: 'Tools List' },
      { type: 'image', src: '/templates/covers/template-08.svg', thumb: '/templates/thumbs/template-08.svg', title: 'Categories' },
      { type: 'video', src: '/videos/demo-06.mp4', thumb: '/templates/thumbs/template-06.svg', title: 'Demo video' },
      { type: 'image', src: '/templates/covers/template-09.svg', thumb: '/templates/thumbs/template-09.svg', title: 'Details' },
      { type: 'image', src: '/templates/covers/template-10.svg', thumb: '/templates/thumbs/template-10.svg', title: 'Pricing' }
    ],
    cardMedia: [
      { type: 'image', src: '/templates/thumbs/template-06.svg' },
      { type: 'image', src: '/templates/thumbs/template-07.svg' },
      { type: 'image', src: '/templates/thumbs/template-08.svg' }
    ],
    demoVideo: { title: 'Tools Market Demo', src: '/videos/demo-06.mp4', poster: '/templates/thumbs/template-06.svg' },
    features: ['Grid sản phẩm', 'Lead capture', 'Review', 'CTA đa kênh', 'SEO on-page'],
    usedByCustomers: [{ name: 'MMO Hub', industry: 'MMO' }, { name: 'ToolBox', industry: 'SaaS' }],
    supportContacts: { messenger: 'https://m.me/kwingx', phone: '0901234567' },
    similarTemplateIds: ['api-payment-hub', 'proxy-hub-service', 'gaming-accounts-pro']
  },
  {
    id: 'cosmetic-store-lite',
    name: 'Cosmetic Store Lite',
    shortDescription: 'Landing bán mỹ phẩm với combo, review KOL và upsell.',
    longDescription:
      'Tối ưu chuyển đổi cho bán mỹ phẩm/skincare, có combo, KOL review, upsell và mini FAQ.',
    categories: ['cosmetics', 'b2c', 'fashion'],
    templateType: 'E-commerce',
    audience: 'B2C',
    price: 650000,
    originalPrice: 850000,
    currency: 'VND',
    isHot: true,
    isNew: false,
    isPopular: true,
    createdAt: '2024-12-05',
    popularityScore: 89,
    gallery: [
      { type: 'image', src: '/templates/covers/template-07.svg', thumb: '/templates/thumbs/template-07.svg', title: 'Hero' },
      { type: 'image', src: '/templates/covers/template-11.svg', thumb: '/templates/thumbs/template-11.svg', title: 'Products' },
      { type: 'image', src: '/templates/covers/template-01.svg', thumb: '/templates/thumbs/template-01.svg', title: 'Reviews' },
      { type: 'video', src: '/videos/demo-07.mp4', thumb: '/templates/thumbs/template-07.svg', title: 'Demo video' },
      { type: 'image', src: '/templates/covers/template-02.svg', thumb: '/templates/thumbs/template-02.svg', title: 'Combos' },
      { type: 'image', src: '/templates/covers/template-03.svg', thumb: '/templates/thumbs/template-03.svg', title: 'FAQ' }
    ],
    cardMedia: [
      { type: 'image', src: '/templates/thumbs/template-07.svg' },
      { type: 'image', src: '/templates/thumbs/template-11.svg' },
      { type: 'image', src: '/templates/thumbs/template-01.svg' }
    ],
    demoVideo: { title: 'Cosmetic Store Demo', src: '/videos/demo-07.mp4', poster: '/templates/thumbs/template-07.svg' },
    features: ['Combo/flash sale', 'KOL review', 'Upsell', 'FAQ', 'Form đặt hàng nhanh'],
    usedByCustomers: [{ name: 'GlowUp', industry: 'Cosmetics' }, { name: 'BeautyLane', industry: 'Beauty' }],
    supportContacts: { zalo: 'https://zalo.me/0999888777', phone: '0911222333' },
    similarTemplateIds: ['spa-glow-landing', 'fashion-landing-lite', 'b2c-landing-fast']
  },
  {
    id: 'household-ecom',
    name: 'Household Ecom',
    shortDescription: 'Landing bán đồ gia dụng/nhà cửa với bộ sản phẩm nổi bật.',
    longDescription:
      'Phù hợp chạy ads đồ gia dụng, có combo, bảo hành, hướng dẫn sử dụng và form chốt nhanh.',
    categories: ['household', 'b2c', 'digital-products'],
    templateType: 'E-commerce',
    audience: 'B2C',
    price: 720000,
    currency: 'VND',
    isHot: false,
    isNew: false,
    isPopular: true,
    createdAt: '2024-07-15',
    popularityScore: 80,
    gallery: [
      { type: 'image', src: '/templates/covers/template-08.svg', thumb: '/templates/thumbs/template-08.svg', title: 'Hero' },
      { type: 'image', src: '/templates/covers/template-09.svg', thumb: '/templates/thumbs/template-09.svg', title: 'Products' },
      { type: 'image', src: '/templates/covers/template-10.svg', thumb: '/templates/thumbs/template-10.svg', title: 'Guide' },
      { type: 'video', src: '/videos/demo-08.mp4', thumb: '/templates/thumbs/template-08.svg', title: 'Demo video' },
      { type: 'image', src: '/templates/covers/template-01.svg', thumb: '/templates/thumbs/template-01.svg', title: 'Warranty' },
      { type: 'image', src: '/templates/covers/template-02.svg', thumb: '/templates/thumbs/template-02.svg', title: 'Shipping' }
    ],
    cardMedia: [
      { type: 'image', src: '/templates/thumbs/template-08.svg' },
      { type: 'image', src: '/templates/thumbs/template-09.svg' },
      { type: 'image', src: '/templates/thumbs/template-10.svg' }
    ],
    demoVideo: { title: 'Household Demo', src: '/videos/demo-08.mp4', poster: '/templates/thumbs/template-08.svg' },
    features: ['Combo', 'Bảo hành', 'Hướng dẫn', 'Form nhanh', 'Ưu đãi vận chuyển'],
    usedByCustomers: [{ name: 'CleanHome', industry: 'Household' }],
    supportContacts: { messenger: 'https://m.me/kwingx', phone: '0988111000' },
    similarTemplateIds: ['cosmetic-store-lite', 'b2c-landing-fast', 'fashion-landing-lite']
  },
  {
    id: 'fashion-landing-lite',
    name: 'Fashion Landing Lite',
    shortDescription: 'Landing bán thời trang/áo thun với lookbook và social proof.',
    longDescription:
      'Lookbook, kích thước, đánh giá khách, ưu đãi freeship. Hợp shop thời trang, áo thun, phụ kiện.',
    categories: ['fashion', 'b2c'],
    templateType: 'E-commerce',
    audience: 'B2C',
    price: 640000,
    currency: 'VND',
    isHot: false,
    isNew: true,
    isPopular: false,
    createdAt: '2024-12-28',
    popularityScore: 73,
    gallery: [
      { type: 'image', src: '/templates/covers/template-09.svg', thumb: '/templates/thumbs/template-09.svg', title: 'Hero' },
      { type: 'image', src: '/templates/covers/template-11.svg', thumb: '/templates/thumbs/template-11.svg', title: 'Lookbook' },
      { type: 'image', src: '/templates/covers/template-10.svg', thumb: '/templates/thumbs/template-10.svg', title: 'Size Chart' },
      { type: 'video', src: '/videos/demo-09.mp4', thumb: '/templates/thumbs/template-09.svg', title: 'Demo video' },
      { type: 'image', src: '/templates/covers/template-01.svg', thumb: '/templates/thumbs/template-01.svg', title: 'Reviews' },
      { type: 'image', src: '/templates/covers/template-02.svg', thumb: '/templates/thumbs/template-02.svg', title: 'Checkout' }
    ],
    cardMedia: [
      { type: 'image', src: '/templates/thumbs/template-09.svg' },
      { type: 'image', src: '/templates/thumbs/template-11.svg' },
      { type: 'image', src: '/templates/thumbs/template-10.svg' }
    ],
    demoVideo: { title: 'Fashion Demo', src: '/videos/demo-09.mp4', poster: '/templates/thumbs/template-09.svg' },
    features: ['Lookbook', 'Size chart', 'Review', 'Freeship', 'Form mua nhanh'],
    usedByCustomers: [{ name: 'TrendWear', industry: 'Fashion' }],
    supportContacts: { zalo: 'https://zalo.me/0777333444' },
    similarTemplateIds: ['cosmetic-store-lite', 'household-ecom', 'b2c-landing-fast']
  },
  {
    id: 'b2b-landing-pro',
    name: 'B2B Landing Pro',
    shortDescription: 'Trang B2B với pain points, solution, KPI và lead form.',
    longDescription:
      'Phù hợp SaaS/dịch vụ B2B: nêu pain points, giải pháp, KPI, case study và form lead đa kênh.',
    categories: ['b2b'],
    templateType: 'Landing',
    audience: 'B2B',
    price: 1250000,
    currency: 'VND',
    isHot: false,
    isNew: false,
    isPopular: true,
    createdAt: '2024-10-15',
    popularityScore: 86,
    gallery: [
      { type: 'image', src: '/templates/covers/template-10.svg', thumb: '/templates/thumbs/template-10.svg', title: 'Hero' },
      { type: 'image', src: '/templates/covers/template-05.svg', thumb: '/templates/thumbs/template-05.svg', title: 'Solution' },
      { type: 'image', src: '/templates/covers/template-06.svg', thumb: '/templates/thumbs/template-06.svg', title: 'KPI' },
      { type: 'video', src: '/videos/demo-10.mp4', thumb: '/templates/thumbs/template-10.svg', title: 'Demo video' },
      { type: 'image', src: '/templates/covers/template-07.svg', thumb: '/templates/thumbs/template-07.svg', title: 'Case Study' },
      { type: 'image', src: '/templates/covers/template-08.svg', thumb: '/templates/thumbs/template-08.svg', title: 'Lead Form' }
    ],
    cardMedia: [
      { type: 'image', src: '/templates/thumbs/template-10.svg' },
      { type: 'image', src: '/templates/thumbs/template-05.svg' },
      { type: 'image', src: '/templates/thumbs/template-06.svg' }
    ],
    demoVideo: { title: 'B2B Landing Demo', src: '/videos/demo-10.mp4', poster: '/templates/thumbs/template-10.svg' },
    features: ['Pain & solution', 'KPI', 'Case study', 'Lead form', 'Trust signals'],
    usedByCustomers: [{ name: 'DataPilot', industry: 'Analytics' }, { name: 'FlowAI', industry: 'Automation' }],
    supportContacts: { telegram: 'https://t.me/kwingx', messenger: 'https://m.me/kwingx' },
    similarTemplateIds: ['api-payment-hub', 'tools-market-b2b', 'proxy-hub-service']
  },
  {
    id: 'b2c-landing-fast',
    name: 'B2C Landing Fast',
    shortDescription: 'Landing nhanh cho chiến dịch ads, tối ưu CTA và social proof.',
    longDescription:
      'Dành cho chiến dịch ads nhanh: hero ngắn, CTA nổi bật, social proof và FAQ để chốt nhanh.',
    categories: ['b2c', 'digital-products'],
    templateType: 'Landing',
    audience: 'B2C',
    price: 580000,
    currency: 'VND',
    isHot: false,
    isNew: false,
    isPopular: true,
    createdAt: '2024-06-25',
    popularityScore: 82,
    gallery: [
      { type: 'image', src: '/templates/covers/template-11.svg', thumb: '/templates/thumbs/template-11.svg', title: 'Hero' },
      { type: 'image', src: '/templates/covers/template-01.svg', thumb: '/templates/thumbs/template-01.svg', title: 'CTA' },
      { type: 'image', src: '/templates/covers/template-02.svg', thumb: '/templates/thumbs/template-02.svg', title: 'Social Proof' },
      { type: 'video', src: '/videos/demo-11.mp4', thumb: '/templates/thumbs/template-11.svg', title: 'Demo video' },
      { type: 'image', src: '/templates/covers/template-03.svg', thumb: '/templates/thumbs/template-03.svg', title: 'FAQ' },
      { type: 'image', src: '/templates/covers/template-04.svg', thumb: '/templates/thumbs/template-04.svg', title: 'Form' }
    ],
    cardMedia: [
      { type: 'image', src: '/templates/thumbs/template-11.svg' },
      { type: 'image', src: '/templates/thumbs/template-01.svg' },
      { type: 'image', src: '/templates/thumbs/template-02.svg' }
    ],
    demoVideo: { title: 'B2C Fast Demo', src: '/videos/demo-11.mp4', poster: '/templates/thumbs/template-11.svg' },
    features: ['Hero ngắn', 'CTA nổi bật', 'Social proof', 'FAQ', 'Form nhanh'],
    usedByCustomers: [{ name: 'QuickAds', industry: 'Marketing' }],
    supportContacts: { messenger: 'https://m.me/kwingx' },
    similarTemplateIds: ['fashion-landing-lite', 'cosmetic-store-lite', 'social-boost-hub']
  },
  {
    id: 'digital-product-launch',
    name: 'Digital Product Launch',
    shortDescription: 'Trang bán sản phẩm số/ebook/tool với checkout đơn giản.',
    longDescription:
      'Tối ưu cho sản phẩm số: nội dung, tính năng, feedback, giá/ưu đãi và CTA mua ngay.',
    categories: ['digital-products', 'b2c'],
    templateType: 'E-commerce',
    audience: 'B2C',
    price: 540000,
    currency: 'VND',
    isHot: false,
    isNew: true,
    isPopular: true,
    createdAt: '2024-12-18',
    popularityScore: 77,
    gallery: [
      { type: 'image', src: '/templates/covers/template-12.svg', thumb: '/templates/thumbs/template-12.svg', title: 'Hero' },
      { type: 'image', src: '/templates/covers/template-05.svg', thumb: '/templates/thumbs/template-05.svg', title: 'Features' },
      { type: 'image', src: '/templates/covers/template-06.svg', thumb: '/templates/thumbs/template-06.svg', title: 'Checkout' },
      { type: 'video', src: '/videos/demo-12.mp4', thumb: '/templates/thumbs/template-12.svg', title: 'Demo video' },
      { type: 'image', src: '/templates/covers/template-07.svg', thumb: '/templates/thumbs/template-07.svg', title: 'Testimonials' },
      { type: 'image', src: '/templates/covers/template-08.svg', thumb: '/templates/thumbs/template-08.svg', title: 'FAQ' }
    ],
    cardMedia: [
      { type: 'image', src: '/templates/thumbs/template-12.svg' },
      { type: 'image', src: '/templates/thumbs/template-05.svg' },
      { type: 'image', src: '/templates/thumbs/template-06.svg' }
    ],
    demoVideo: { title: 'Digital Product Demo', src: '/videos/demo-12.mp4', poster: '/templates/thumbs/template-12.svg' },
    features: ['Lợi ích', 'Feedback', 'Checkout đơn giản', 'Ưu đãi', 'FAQ'],
    usedByCustomers: [{ name: 'CourseHub', industry: 'E-learning' }],
    supportContacts: { zalo: 'https://zalo.me/0666999000' },
    similarTemplateIds: ['b2c-landing-fast', 'fashion-landing-lite', 'gaming-accounts-pro']
  },
  {
    id: 'landing-payment-api',
    name: 'Landing Payment API',
    shortDescription: 'Landing nhẹ cho API thanh toán với highlight bảo mật.',
    longDescription:
      'Biến thể gọn nhẹ cho API thanh toán, nhấn mạnh bảo mật, tốc độ, hỗ trợ và CTA đăng ký.',
    categories: ['payment-api', 'b2b'],
    templateType: 'Landing',
    audience: 'B2B',
    price: 880000,
    currency: 'VND',
    isHot: false,
    isNew: false,
    isPopular: false,
    createdAt: '2024-05-12',
    popularityScore: 70,
    gallery: [
      { type: 'image', src: '/templates/covers/template-05.svg', thumb: '/templates/thumbs/template-05.svg', title: 'Hero' },
      { type: 'image', src: '/templates/covers/template-09.svg', thumb: '/templates/thumbs/template-09.svg', title: 'Security' },
      { type: 'image', src: '/templates/covers/template-10.svg', thumb: '/templates/thumbs/template-10.svg', title: 'Speed' },
      { type: 'video', src: '/videos/demo-13.mp4', thumb: '/templates/thumbs/template-05.svg', title: 'Demo video' },
      { type: 'image', src: '/templates/covers/template-01.svg', thumb: '/templates/thumbs/template-01.svg', title: 'Integration' },
      { type: 'image', src: '/templates/covers/template-02.svg', thumb: '/templates/thumbs/template-02.svg', title: 'Support' }
    ],
    cardMedia: [
      { type: 'image', src: '/templates/thumbs/template-05.svg' },
      { type: 'image', src: '/templates/thumbs/template-09.svg' },
      { type: 'image', src: '/templates/thumbs/template-10.svg' }
    ],
    demoVideo: { title: 'Payment API Demo', src: '/videos/demo-13.mp4', poster: '/templates/thumbs/template-05.svg' },
    features: ['Bảo mật', 'Tốc độ', 'CTA đăng ký', 'Tích hợp dễ', 'Hỗ trợ nhanh'],
    usedByCustomers: [{ name: 'PayLink', industry: 'Fintech' }],
    supportContacts: { telegram: 'https://t.me/kwingx' },
    similarTemplateIds: ['api-payment-hub', 'proxy-hub-service', 'b2b-landing-pro']
  }
];

export const getTemplateById = (id: string) => templates.find((template) => template.id === id);
export const getAllTemplates = () => templates;
export const getSimilarTemplates = (template: TemplateItem) =>
  templates.filter((item) => template.similarTemplateIds.includes(item.id));
