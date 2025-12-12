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
      { type: 'image', src: '/templates/spa-glow/hero.png', thumb: '/templates/thumbs/spa-glow-hero.png', title: 'Hero' },
      { type: 'image', src: '/templates/spa-glow/booking.png', thumb: '/templates/thumbs/spa-glow-booking.png', title: 'Đặt lịch' },
      { type: 'video', src: '/videos/spa-glow-demo.mp4', thumb: '/templates/thumbs/spa-glow-video.png', title: 'Demo video' }
    ],
    cardMedia: [
      { type: 'image', src: '/templates/spa-glow/card-1.png' },
      { type: 'image', src: '/templates/spa-glow/card-2.png' },
      { type: 'image', src: '/templates/spa-glow/card-3.png' }
    ],
    demoVideo: { title: 'Spa Glow Demo', src: '/videos/spa-glow-demo.mp4', poster: '/templates/thumbs/spa-glow-video.png' },
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
      { type: 'image', src: '/templates/proxy-hub/hero.png', thumb: '/templates/thumbs/proxy-hub-hero.png' },
      { type: 'image', src: '/templates/proxy-hub/status.png', thumb: '/templates/thumbs/proxy-hub-status.png' },
      { type: 'video', src: '/videos/proxy-hub.mp4', thumb: '/templates/thumbs/proxy-hub-video.png', title: 'Live demo' }
    ],
    cardMedia: [
      { type: 'image', src: '/templates/proxy-hub/card-1.png' },
      { type: 'image', src: '/templates/proxy-hub/card-2.png' }
    ],
    demoVideo: { title: 'Proxy Hub Demo', src: '/videos/proxy-hub.mp4', poster: '/templates/thumbs/proxy-hub-video.png' },
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
      { type: 'image', src: '/templates/gaming-accounts/hero.png', thumb: '/templates/thumbs/gaming-hero.png' },
      { type: 'image', src: '/templates/gaming-accounts/store.png', thumb: '/templates/thumbs/gaming-store.png' },
      { type: 'video', src: '/videos/gaming-accounts.mp4', thumb: '/templates/thumbs/gaming-video.png' }
    ],
    cardMedia: [
      { type: 'image', src: '/templates/gaming-accounts/card-1.png' },
      { type: 'image', src: '/templates/gaming-accounts/card-2.png' }
    ],
    demoVideo: { title: 'Gaming Accounts Demo', src: '/videos/gaming-accounts.mp4', poster: '/templates/thumbs/gaming-video.png' },
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
      { type: 'image', src: '/templates/social-boost/hero.png', thumb: '/templates/thumbs/social-boost-hero.png' },
      { type: 'image', src: '/templates/social-boost/pricing.png', thumb: '/templates/thumbs/social-boost-pricing.png' }
    ],
    cardMedia: [
      { type: 'image', src: '/templates/social-boost/card-1.png' },
      { type: 'image', src: '/templates/social-boost/card-2.png' }
    ],
    demoVideo: { title: 'Social Boost Demo', src: '/videos/social-boost.mp4', poster: '/templates/thumbs/social-boost-video.png' },
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
      { type: 'image', src: '/templates/api-payment/hero.png', thumb: '/templates/thumbs/api-payment-hero.png' },
      { type: 'image', src: '/templates/api-payment/docs.png', thumb: '/templates/thumbs/api-payment-docs.png' }
    ],
    cardMedia: [
      { type: 'image', src: '/templates/api-payment/card-1.png' },
      { type: 'image', src: '/templates/api-payment/card-2.png' }
    ],
    demoVideo: { title: 'API Payment Demo', src: '/videos/api-payment.mp4', poster: '/templates/thumbs/api-payment-video.png' },
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
      { type: 'image', src: '/templates/tools-market/hero.png', thumb: '/templates/thumbs/tools-market-hero.png' },
      { type: 'image', src: '/templates/tools-market/list.png', thumb: '/templates/thumbs/tools-market-list.png' }
    ],
    cardMedia: [
      { type: 'image', src: '/templates/tools-market/card-1.png' },
      { type: 'image', src: '/templates/tools-market/card-2.png' }
    ],
    demoVideo: { title: 'Tools Market Demo', src: '/videos/tools-market.mp4', poster: '/templates/thumbs/tools-market-video.png' },
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
      { type: 'image', src: '/templates/cosmetic-store/hero.png', thumb: '/templates/thumbs/cosmetic-hero.png' },
      { type: 'image', src: '/templates/cosmetic-store/review.png', thumb: '/templates/thumbs/cosmetic-review.png' }
    ],
    cardMedia: [
      { type: 'image', src: '/templates/cosmetic-store/card-1.png' },
      { type: 'image', src: '/templates/cosmetic-store/card-2.png' }
    ],
    demoVideo: { title: 'Cosmetic Store Demo', src: '/videos/cosmetic-store.mp4', poster: '/templates/thumbs/cosmetic-video.png' },
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
      { type: 'image', src: '/templates/household/hero.png', thumb: '/templates/thumbs/household-hero.png' },
      { type: 'image', src: '/templates/household/guide.png', thumb: '/templates/thumbs/household-guide.png' }
    ],
    cardMedia: [
      { type: 'image', src: '/templates/household/card-1.png' },
      { type: 'image', src: '/templates/household/card-2.png' }
    ],
    demoVideo: { title: 'Household Demo', src: '/videos/household.mp4', poster: '/templates/thumbs/household-video.png' },
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
      { type: 'image', src: '/templates/fashion/hero.png', thumb: '/templates/thumbs/fashion-hero.png' },
      { type: 'image', src: '/templates/fashion/lookbook.png', thumb: '/templates/thumbs/fashion-lookbook.png' }
    ],
    cardMedia: [
      { type: 'image', src: '/templates/fashion/card-1.png' },
      { type: 'image', src: '/templates/fashion/card-2.png' }
    ],
    demoVideo: { title: 'Fashion Demo', src: '/videos/fashion.mp4', poster: '/templates/thumbs/fashion-video.png' },
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
      { type: 'image', src: '/templates/b2b/hero.png', thumb: '/templates/thumbs/b2b-hero.png' },
      { type: 'video', src: '/videos/b2b-landing.mp4', thumb: '/templates/thumbs/b2b-video.png' }
    ],
    cardMedia: [
      { type: 'image', src: '/templates/b2b/card-1.png' },
      { type: 'image', src: '/templates/b2b/card-2.png' }
    ],
    demoVideo: { title: 'B2B Landing Demo', src: '/videos/b2b-landing.mp4', poster: '/templates/thumbs/b2b-video.png' },
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
    categories: ['b2c', 'landing', 'digital-products'],
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
      { type: 'image', src: '/templates/b2c-fast/hero.png', thumb: '/templates/thumbs/b2c-hero.png' },
      { type: 'image', src: '/templates/b2c-fast/faq.png', thumb: '/templates/thumbs/b2c-faq.png' }
    ],
    cardMedia: [
      { type: 'image', src: '/templates/b2c-fast/card-1.png' },
      { type: 'image', src: '/templates/b2c-fast/card-2.png' }
    ],
    demoVideo: { title: 'B2C Fast Demo', src: '/videos/b2c-fast.mp4', poster: '/templates/thumbs/b2c-video.png' },
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
      { type: 'image', src: '/templates/digital-product/hero.png', thumb: '/templates/thumbs/digital-hero.png' },
      { type: 'image', src: '/templates/digital-product/checkout.png', thumb: '/templates/thumbs/digital-checkout.png' }
    ],
    cardMedia: [
      { type: 'image', src: '/templates/digital-product/card-1.png' },
      { type: 'image', src: '/templates/digital-product/card-2.png' }
    ],
    demoVideo: { title: 'Digital Product Demo', src: '/videos/digital-product.mp4', poster: '/templates/thumbs/digital-video.png' },
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
      { type: 'image', src: '/templates/payment-lite/hero.png', thumb: '/templates/thumbs/payment-lite-hero.png' },
      { type: 'image', src: '/templates/payment-lite/security.png', thumb: '/templates/thumbs/payment-lite-security.png' }
    ],
    cardMedia: [
      { type: 'image', src: '/templates/payment-lite/card-1.png' },
      { type: 'image', src: '/templates/payment-lite/card-2.png' }
    ],
    demoVideo: { title: 'Payment API Demo', src: '/videos/payment-lite.mp4', poster: '/templates/thumbs/payment-lite-video.png' },
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
