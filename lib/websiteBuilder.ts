export type BuilderSection = {
  id: string;
  type: string;
  title: string;
  body: string;
  image?: string;
  buttonText?: string;
};

export type BuilderPage = { id: string; title: string; sections: BuilderSection[] };
export type WebsiteDraft = {
  name: string;
  businessName: string;
  category: string;
  description: string;
  style: string;
  layout: string;
  primaryColor: string;
  accentColor: string;
  font: string;
  logo?: string;
  pages: BuilderPage[];
};

export const WEBSITE_CATEGORIES = [
  'Business', 'Company', 'E-commerce', 'Real estate', 'Construction', 'Agriculture',
  'Oil and Gas', 'Renewable Energy', 'Portfolio', 'Blog and News', 'Education',
  'Restaurant', 'Hotel and Tourism', 'Cryptocurrency and Fintech', 'NGO and Organization', 'Personal',
];

export const STARTER_PAGES = ['Home', 'About Us', 'Our Services', 'Products', 'Contact Us', 'Blog', 'FAQ'];

export function starterDraft(category = 'Business', name = 'Your new website'): WebsiteDraft {
  return {
    name, businessName: '', category, description: '', style: 'Modern and professional', layout: 'Balanced',
    primaryColor: '#102d4f', accentColor: '#c79a2f', font: 'Inter, Arial, sans-serif', pages: [{
      id: 'home', title: 'Home', sections: [
        { id: 'hero', type: 'Hero', title: 'A better way to move your business forward', body: 'Tell your story, showcase what you do, and help your customers take the next step.', buttonText: 'Get in touch' },
        { id: 'about', type: 'About', title: 'Built around your needs', body: 'Introduce your business and the people, experience, and ideas behind it.' },
        { id: 'services', type: 'Services', title: 'What we do', body: 'Share your services and explain how you help customers achieve their goals.' },
        { id: 'contact', type: 'Contact', title: 'Let’s start a conversation', body: 'Add your contact details and invite visitors to get in touch.', buttonText: 'Contact us' },
      ],
    }],
  };
}

const text = (value: unknown, max = 5000) => typeof value === 'string' ? value.trim().slice(0, max) : '';

export function validateDraft(input: unknown): WebsiteDraft | null {
  if (!input || typeof input !== 'object') return null;
  const value = input as Record<string, unknown>;
  if (!Array.isArray(value.pages) || value.pages.length < 1 || value.pages.length > 12) return null;
  const pages: BuilderPage[] = [];
  for (const rawPage of value.pages) {
    if (!rawPage || typeof rawPage !== 'object') return null;
    const page = rawPage as Record<string, unknown>;
    if (!Array.isArray(page.sections) || page.sections.length > 20) return null;
    const sections: BuilderSection[] = [];
    for (const rawSection of page.sections) {
      if (!rawSection || typeof rawSection !== 'object') return null;
      const section = rawSection as Record<string, unknown>;
      const image = text(section.image, 2_000_000);
      if (image && !/^https:\/\/|^data:image\/(png|jpeg|webp|gif);base64,/i.test(image)) return null;
      sections.push({
        id: text(section.id, 80) || `section-${sections.length + 1}`,
        type: text(section.type, 50) || 'Content', title: text(section.title, 180), body: text(section.body, 3000),
        ...(image ? { image } : {}), buttonText: text(section.buttonText, 80),
      });
    }
    pages.push({ id: text(page.id, 80) || `page-${pages.length + 1}`, title: text(page.title, 80) || `Page ${pages.length + 1}`, sections });
  }
  const primaryColor = text(value.primaryColor, 7);
  const accentColor = text(value.accentColor, 7);
  return {
    name: text(value.name, 100) || 'Untitled website', businessName: text(value.businessName, 120),
    category: text(value.category, 80) || 'Business', description: text(value.description, 1000),
    style: text(value.style, 80) || 'Modern', layout: text(value.layout, 80) || 'Balanced',
    primaryColor: /^#[0-9a-f]{6}$/i.test(primaryColor) ? primaryColor : '#102d4f',
    accentColor: /^#[0-9a-f]{6}$/i.test(accentColor) ? accentColor : '#c79a2f',
    font: ['Inter, Arial, sans-serif', 'Georgia, serif', 'Arial, sans-serif', 'Verdana, sans-serif'].includes(text(value.font, 60)) ? text(value.font, 60) : 'Inter, Arial, sans-serif',
    logo: text(value.logo, 2_000_000), pages,
  };
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char] as string));
}

function safeImage(value?: string) {
  return value && (/^https:\/\//i.test(value) || /^data:image\/(png|jpeg|webp|gif);base64,/i.test(value)) ? value : '';
}

/** Creates a script-free document for an opaque, sandboxed iframe preview. */
export function renderPreview(draft: WebsiteDraft, page: BuilderPage) {
  const sections = page.sections.map((section) => `<section class="section"><div class="copy"><p class="eyebrow">${escapeHtml(section.type)}</p><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.body)}</p>${section.buttonText ? `<a class="button">${escapeHtml(section.buttonText)}</a>` : ''}</div>${safeImage(section.image) ? `<img src="${escapeHtml(safeImage(section.image))}" alt="${escapeHtml(section.title)}">` : ''}</section>`).join('');
  const logo = safeImage(draft.logo);
  return `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src https: data:; style-src 'unsafe-inline'; font-src https: data:"><style>*{box-sizing:border-box}body{margin:0;color:#182638;font-family:${draft.font};line-height:1.6}header,footer{padding:20px max(5vw,24px);background:${draft.primaryColor};color:#fff}header{display:flex;align-items:center;justify-content:space-between;gap:20px}header img{max-height:42px;max-width:160px}nav{display:flex;gap:20px;flex-wrap:wrap;font-size:14px}.hero{padding:90px max(7vw,24px);background:linear-gradient(130deg,${draft.primaryColor},#245174);color:#fff}.hero h1{max-width:800px;font-size:clamp(36px,6vw,68px);line-height:1.08;margin:8px 0 16px}.hero p{max-width:680px;color:#e5edf4;font-size:18px}.eyebrow{text-transform:uppercase;letter-spacing:.13em;color:${draft.accentColor};font-size:12px;font-weight:700}.button{display:inline-block;margin-top:12px;padding:12px 20px;border-radius:6px;background:${draft.accentColor};color:${draft.primaryColor};font-weight:700;text-decoration:none}.section{max-width:1100px;margin:auto;padding:62px 28px;display:grid;grid-template-columns:1fr 1fr;gap:36px;align-items:center}.section:nth-child(odd){background:#f7f8fa}.section h2{font-size:32px;line-height:1.2;color:${draft.primaryColor}}.section img{width:100%;max-height:350px;object-fit:cover;border-radius:12px}footer{text-align:center}@media(max-width:650px){header{align-items:flex-start;flex-direction:column}.section{grid-template-columns:1fr;padding:40px 22px}.hero{padding:64px 24px}.section h2{font-size:27px}}</style></head><body><header>${logo ? `<img src="${escapeHtml(logo)}" alt="${escapeHtml(draft.businessName || draft.name)}">` : `<strong>${escapeHtml(draft.businessName || draft.name)}</strong>`}<nav>${draft.pages.map((item) => `<span>${escapeHtml(item.title)}</span>`).join('')}</nav></header><main><section class="hero"><p class="eyebrow">${escapeHtml(draft.category)}</p><h1>${escapeHtml(page.sections[0]?.title || draft.name)}</h1><p>${escapeHtml(page.sections[0]?.body || draft.description || 'A professional website created with PERFI SITE.')}</p>${page.sections[0]?.buttonText ? `<a class="button">${escapeHtml(page.sections[0].buttonText)}</a>` : ''}</section>${sections}</main><footer>© ${new Date().getFullYear()} ${escapeHtml(draft.businessName || draft.name)} · Made with PERFI SITE</footer></body></html>`;
}
