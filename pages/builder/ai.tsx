import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getSupabaseClient } from '../../lib/supabaseClient';
import { renderPreview, STARTER_PAGES, starterDraft, WEBSITE_CATEGORIES, type BuilderPage, type BuilderSection, type WebsiteDraft } from '../../lib/websiteBuilder';

type SavedProject = { id: string; name: string; status: string; draft: WebsiteDraft; updated_at: string };
const inputClass = 'mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100';
const cardClass = 'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm';

export default function AIBuilder() {
  const [draft, setDraft] = useState<WebsiteDraft>(() => starterDraft());
  const [prompt, setPrompt] = useState('');
  const [editPrompt, setEditPrompt] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [projects, setProjects] = useState<SavedProject[]>([]);
  const [projectId, setProjectId] = useState('');
  const [pageId, setPageId] = useState('home');
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewKey, setPreviewKey] = useState(0);
  const [logo, setLogo] = useState('');
  const logoInput = useRef<HTMLInputElement>(null);
  const imageInput = useRef<HTMLInputElement>(null);
  const page = draft.pages.find((item) => item.id === pageId) || draft.pages[0];
  const preview = useMemo(() => page ? renderPreview(draft, page) : '', [draft, page]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('perfi-builder-draft');
      if (raw) {
        const saved = JSON.parse(raw) as { draft?: WebsiteDraft; id?: string };
        if (saved.draft) setDraft(saved.draft);
        if (saved.id) setProjectId(saved.id);
      }
      const local = JSON.parse(localStorage.getItem('perfi-builder-projects') || '[]') as SavedProject[];
      setProjects(local);
    } catch { /* Ignore corrupt browser-local drafts. */ }
    void loadCloudProjects();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('perfi-builder-draft', JSON.stringify({ draft, id: projectId }));
  }, [draft, projectId]);

  async function getToken() {
    try {
      const client = getSupabaseClient();
      const { data } = await client.auth.getSession();
      return data.session?.access_token || '';
    } catch { return ''; }
  }

  async function loadCloudProjects() {
    const token = await getToken();
    if (!token) return;
    try {
      const response = await fetch('/api/builder/projects', { headers: { Authorization: `Bearer ${token}` } });
      const data = await response.json();
      if (response.ok && Array.isArray(data.projects)) setProjects(data.projects);
      else if (data.error) setMessage(data.error);
    } catch { setMessage('Could not connect to website storage. Your current browser draft is still available.'); }
  }

  function update(patch: Partial<WebsiteDraft>) { setDraft((current) => ({ ...current, ...patch })); }
  function updateSection(id: string, patch: Partial<BuilderSection>) {
    setDraft((current) => ({ ...current, pages: current.pages.map((item) => item.id === page.id ? { ...item, sections: item.sections.map((section) => section.id === id ? { ...section, ...patch } : section) } : item) }));
  }
  function moveSection(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= page.sections.length) return;
    const sections = [...page.sections]; [sections[index], sections[target]] = [sections[target], sections[index]];
    setDraft((current) => ({ ...current, pages: current.pages.map((item) => item.id === page.id ? { ...item, sections } : item) }));
  }
  function addPage(title = 'New page') {
    if (draft.pages.length >= 12) return setMessage('A website can have up to 12 pages.');
    const next: BuilderPage = { id: `page-${Date.now()}`, title, sections: [{ id: `section-${Date.now()}`, type: 'Content', title, body: 'Add your page content here.' }] };
    setDraft((current) => ({ ...current, pages: [...current.pages, next] })); setPageId(next.id);
  }
  function deletePage(id: string) {
    if (draft.pages.length <= 1) return setMessage('A website must have at least one page.');
    const pages = draft.pages.filter((item) => item.id !== id); setDraft((current) => ({ ...current, pages })); setPageId(pages[0].id);
  }

  async function runAI(edit = false) {
    const text = edit ? editPrompt.trim() : prompt.trim();
    if (text.length < 12) { setMessage('Please describe your website or requested edit in at least 12 characters.'); return; }
    setBusy(true); setMessage('');
    try {
      const response = await fetch('/api/builder/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: edit ? (draft.description || prompt) : text, edit: edit ? text : undefined, draft: edit ? draft : undefined, category: draft.category, name: draft.name }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Website generation failed.');
      setDraft((current) => ({ ...data.draft, logo: current.logo }));
      setPageId(data.draft.pages[0]?.id || 'home');
      if (!edit) setPrompt(text); else setEditPrompt('');
      setMessage('Your AI website draft is ready. Review and customize it below.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Website generation failed.'); }
    finally { setBusy(false); }
  }

  async function saveProject() {
    setMessage('');
    const token = await getToken();
    if (!token) {
      const item: SavedProject = { id: projectId || `local-${Date.now()}`, name: draft.name, status: 'local draft', draft, updated_at: new Date().toISOString() };
      const updated = [item, ...projects.filter((project) => project.id !== item.id)];
      setProjects(updated); setProjectId(item.id); localStorage.setItem('perfi-builder-projects', JSON.stringify(updated));
      setMessage('Saved in this browser only. Sign in and configure the database to sync projects across devices.'); return;
    }
    setBusy(true);
    try {
      const url = projectId && !projectId.startsWith('local-') ? `/api/builder/projects/${projectId}` : '/api/builder/projects';
      const response = await fetch(url, { method: projectId && !projectId.startsWith('local-') ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ draft }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not save website.');
      setProjectId(data.project.id); await loadCloudProjects(); setMessage('Website draft saved to your account.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Could not save website.'); }
    finally { setBusy(false); }
  }

  async function openProject(project: SavedProject) {
    if (project.id.startsWith('local-')) { setDraft(project.draft); setProjectId(project.id); setPageId(project.draft.pages[0]?.id || 'home'); return; }
    const token = await getToken();
    try {
      const response = await fetch(`/api/builder/projects/${project.id}`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not open website.');
      setDraft(data.project.draft); setProjectId(project.id); setPageId(data.project.draft.pages[0]?.id || 'home'); setMessage('Website draft opened.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Could not open website.'); }
  }

  async function uploadImage(event: ChangeEvent<HTMLInputElement>, sectionId?: string) {
    const file = event.target.files?.[0]; if (!file) return;
    if (!file.type.startsWith('image/') || file.size > 1_000_000) { setMessage('Choose an image under 1 MB (PNG, JPG, GIF or WebP).'); event.target.value = ''; return; }
    const reader = new FileReader();
    reader.onload = () => {
      const image = String(reader.result || '');
      if (sectionId) updateSection(sectionId, { image }); else { setLogo(image); update({ logo: image }); }
      setMessage('Image added to your draft. Save the draft to keep this change.');
    };
    reader.readAsDataURL(file); event.target.value = '';
  }

  function chooseTemplate(category: string) {
    const template = starterDraft(category, `${category} website`);
    template.businessName = ''; template.description = `A polished ${category.toLowerCase()} website.`;
    update(template); setPageId('home'); setPrompt(`Create a professional ${category.toLowerCase()} website with useful pages, clear calls to action and polished business copy.`);
  }

  async function publish() {
    const response = await fetch('/api/builder/publish', { method: 'POST' });
    const data = await response.json(); setMessage(`${data.error} ${Array.isArray(data.setup) ? data.setup.join(' ') : ''}`);
  }

  return <div className="min-h-screen bg-slate-50">
    <Head><title>AI Website Builder — PERFI SITE</title><meta name="description" content="Create, preview and edit a website draft with the PERFI SITE AI builder." /></Head>
    <Header />
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-xs font-bold uppercase tracking-[.2em] text-amber-700">PERFI SITE · Website studio</p><h1 className="mt-2 text-3xl font-extrabold text-perfi-navy sm:text-4xl">Create your website</h1><p className="mt-2 max-w-2xl text-sm text-slate-600">Start with a brief or template, then shape your pages and preview the result. Your AI provider must be configured to generate content.</p></div>
        <div className="flex gap-2"><Link href="/builder" className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700">Builder home</Link><button onClick={saveProject} disabled={busy} className="rounded-xl bg-perfi-navy px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50">Save draft</button></div>
      </div>
      {message && <div role="status" className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">{message}</div>}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div className="space-y-5">
          <section className={cardClass}>
            <div className="flex items-start justify-between gap-3"><div><h2 className="text-lg font-bold text-slate-900">1. Choose a starting point</h2><p className="mt-1 text-sm text-slate-500">Pick a template category or describe a custom idea below.</p></div><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">16 categories</span></div>
            <label className="mt-4 block text-sm font-semibold text-slate-700">Website category<select className={inputClass} value={draft.category} onChange={(event) => update({ category: event.target.value })}>{WEBSITE_CATEGORIES.map((item) => <option key={item}>{item}</option>)}</select></label>
            <div className="mt-3 flex flex-wrap gap-2">{WEBSITE_CATEGORIES.map((item) => <button key={item} type="button" onClick={() => chooseTemplate(item)} className={`rounded-full border px-3 py-1.5 text-xs font-medium ${draft.category === item ? 'border-perfi-navy bg-blue-50 text-perfi-navy' : 'border-slate-200 text-slate-600 hover:border-amber-500'}`}>{item}</button>)}</div>
          </section>
          <section className={cardClass}>
            <h2 className="text-lg font-bold text-slate-900">2. Tell us about your website</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700">Website name<input className={inputClass} value={draft.name} onChange={(event) => update({ name: event.target.value })} maxLength={100} /></label>
              <label className="text-sm font-semibold text-slate-700">Business or organization<input className={inputClass} value={draft.businessName} onChange={(event) => update({ businessName: event.target.value })} placeholder="Your business name" maxLength={120} /></label>
              <label className="text-sm font-semibold text-slate-700">Design style<select className={inputClass} value={draft.style} onChange={(event) => update({ style: event.target.value })}>{['Modern and professional', 'Minimal and clean', 'Bold and creative', 'Elegant and premium', 'Friendly and welcoming', 'Classic and editorial'].map((style) => <option key={style}>{style}</option>)}</select></label>
              <label className="text-sm font-semibold text-slate-700">Preferred layout<select className={inputClass} value={draft.layout} onChange={(event) => update({ layout: event.target.value })}>{['Balanced', 'Content first', 'Image-led', 'Grid layout', 'Editorial'].map((layout) => <option key={layout}>{layout}</option>)}</select></label>
            </div>
            <label className="mt-4 block text-sm font-semibold text-slate-700">Short business description<textarea className={inputClass} rows={2} maxLength={1000} value={draft.description} onChange={(event) => update({ description: event.target.value })} placeholder="What does your business do?" /></label>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700">Primary brand colour<input type="color" className="mt-2 block h-11 w-full cursor-pointer rounded-lg border border-slate-200 bg-white p-1" value={draft.primaryColor} onChange={(event) => update({ primaryColor: event.target.value })} /></label>
              <label className="text-sm font-semibold text-slate-700">Accent colour<input type="color" className="mt-2 block h-11 w-full cursor-pointer rounded-lg border border-slate-200 bg-white p-1" value={draft.accentColor} onChange={(event) => update({ accentColor: event.target.value })} /></label>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <input ref={logoInput} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={(event) => void uploadImage(event)} />
              <button type="button" onClick={() => logoInput.current?.click()} className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700">{draft.logo ? 'Change company logo' : 'Upload company logo'}</button>
              <label className="flex items-center gap-2 text-sm text-slate-600"><span>Font</span><select className="rounded-lg border border-slate-200 p-2" value={draft.font} onChange={(event) => update({ font: event.target.value })}>{['Inter, Arial, sans-serif', 'Georgia, serif', 'Arial, sans-serif', 'Verdana, sans-serif'].map((font) => <option key={font} value={font}>{font.split(',')[0]}</option>)}</select></label>
            </div>
          </section>
          <section className={`${cardClass} border-amber-200 bg-gradient-to-br from-white to-amber-50/60`}>
            <h2 className="text-lg font-bold text-slate-900">3. Generate with AI</h2>
            <p className="mt-1 text-sm text-slate-600">Describe the pages, audience, tone, images and features you need.</p>
            <textarea className={`${inputClass} mt-4`} rows={5} maxLength={4000} value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Describe the website you want to build. Tell our AI what your business does, the pages you need, the design you prefer and the features you want." />
            <button type="button" onClick={() => void runAI()} disabled={busy} className="mt-3 w-full rounded-xl bg-perfi-navy px-5 py-3.5 text-sm font-extrabold tracking-wide text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-wait disabled:opacity-60">{busy ? 'CREATING YOUR WEBSITE…' : '✦ GENERATE MY WEBSITE WITH AI'}</button>
            <p className="mt-2 text-xs text-slate-500">AI requests are sent to a server-side endpoint. No provider secret is exposed in the browser.</p>
          </section>
          <section className={cardClass}>
            <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-lg font-bold text-slate-900">Pages</h2><p className="mt-1 text-sm text-slate-500">Rename, add or remove draft pages.</p></div><button onClick={() => addPage()} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold">＋ Add page</button></div>
            <div className="mt-4 space-y-2">{draft.pages.map((item, index) => <div key={item.id} className="flex items-center gap-2"><button onClick={() => setPageId(item.id)} className={`flex-1 rounded-lg px-3 py-2 text-left text-sm font-semibold ${pageId === item.id ? 'bg-blue-50 text-perfi-navy' : 'bg-slate-50 text-slate-700'}`}>{index + 1}. {item.title}</button><input aria-label={`Rename ${item.title}`} className="w-32 rounded-lg border border-slate-200 px-2 py-2 text-sm" value={item.title} onChange={(event) => setDraft((current) => ({ ...current, pages: current.pages.map((entry) => entry.id === item.id ? { ...entry, title: event.target.value.slice(0, 80) } : entry) }))} /><button title="Remove page" onClick={() => deletePage(item.id)} className="rounded-lg px-2 py-2 text-slate-500 hover:bg-red-50 hover:text-red-700">×</button></div>)}</div>
            <div className="mt-4 flex flex-wrap gap-2">{STARTER_PAGES.filter((title) => !draft.pages.some((item) => item.title.toLowerCase() === title.toLowerCase())).map((title) => <button key={title} onClick={() => addPage(title)} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600">＋ {title}</button>)}</div>
          </section>
          <section className={cardClass}>
            <h2 className="text-lg font-bold text-slate-900">My websites</h2><p className="mt-1 text-sm text-slate-500">Saved drafts can be reopened here.</p>
            {projects.length ? <ul className="mt-3 space-y-2">{projects.map((item) => <li key={item.id} className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 p-3"><div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-800">{item.name}</p><p className="text-xs text-slate-500">{item.status === 'local draft' ? 'Saved in this browser' : 'Saved draft'}</p></div><button onClick={() => void openProject(item)} className="shrink-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold">Open</button></li>)}</ul> : <p className="mt-3 text-sm text-slate-500">No saved websites yet. Save your draft to find it here.</p>}
          </section>
        </div>
        <div className="space-y-5">
          <section className={`${cardClass} overflow-hidden p-0`}>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-4"><div><p className="text-xs font-bold uppercase tracking-wider text-amber-700">Live draft preview</p><h2 className="mt-1 font-bold text-slate-900">{draft.name || 'Your website'}</h2></div><div className="flex flex-wrap gap-1 rounded-lg bg-slate-100 p-1">{(['desktop', 'tablet', 'mobile'] as const).map((item) => <button key={item} onClick={() => setDevice(item)} className={`rounded-md px-2.5 py-1.5 text-xs font-semibold capitalize ${device === item ? 'bg-white shadow-sm text-perfi-navy' : 'text-slate-500'}`}>{item === 'desktop' ? '▰' : item === 'tablet' ? '▯' : '▯'} {item}</button>)}</div></div>
            <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 px-4 py-3"><div className="flex items-center gap-2"><select aria-label="Preview page" className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm" value={page?.id || ''} onChange={(event) => setPageId(event.target.value)}>{draft.pages.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select><button title="Refresh preview" onClick={() => setPreviewKey((value) => value + 1)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">↻ Refresh</button></div><button onClick={() => void saveProject()} className="rounded-lg bg-perfi-navy px-3 py-2 text-sm font-semibold text-white">Save changes</button></div>
            <div className="flex justify-center overflow-auto bg-slate-200 p-3 sm:p-5"><iframe key={`${page?.id}-${previewKey}`} title={`${draft.name} preview`} sandbox="" srcDoc={preview} className="h-[620px] max-w-full rounded-lg border border-slate-300 bg-white shadow-sm transition-all" style={{ width: device === 'desktop' ? '100%' : device === 'tablet' ? '768px' : '390px' }} /></div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-4 py-3 text-xs text-slate-500"><span>Safe, script-free sandbox preview. Preview is not yet a published website.</span><button onClick={() => void publish()} className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 font-semibold text-amber-900">Publishing setup</button></div>
          </section>
          <section className={cardClass}>
            <div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-lg font-bold text-slate-900">Edit {page?.title || 'page'} sections</h2><p className="mt-1 text-sm text-slate-500">Changes update the sandbox preview automatically.</p></div><button onClick={() => setDraft((current) => ({ ...current, pages: current.pages.map((item) => item.id === page.id ? { ...item, sections: [...item.sections, { id: `section-${Date.now()}`, type: 'New section', title: 'Your new section', body: 'Add your content here.' }] } : item) }))} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold">＋ Add section</button></div>
            <div className="mt-4 space-y-4">{page?.sections.map((section, index) => <article key={section.id} className="rounded-xl border border-slate-200 p-4"><div className="mb-3 flex items-center justify-between gap-2"><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{section.type || 'Section'} · {index + 1}</span><div className="flex gap-1"><button aria-label="Move section up" onClick={() => moveSection(index, -1)} className="rounded px-2 py-1 text-sm hover:bg-slate-100">↑</button><button aria-label="Move section down" onClick={() => moveSection(index, 1)} className="rounded px-2 py-1 text-sm hover:bg-slate-100">↓</button><button aria-label="Remove section" onClick={() => setDraft((current) => ({ ...current, pages: current.pages.map((item) => item.id === page.id ? { ...item, sections: item.sections.filter((entry) => entry.id !== section.id) } : item) }))} className="rounded px-2 py-1 text-sm text-red-600 hover:bg-red-50">Remove</button></div></div><div className="grid gap-3 sm:grid-cols-2"><label className="text-xs font-semibold text-slate-600">Section type<input className={inputClass} value={section.type} onChange={(event) => updateSection(section.id, { type: event.target.value })} /></label><label className="text-xs font-semibold text-slate-600">Heading<input className={inputClass} value={section.title} onChange={(event) => updateSection(section.id, { title: event.target.value })} /></label></div><label className="mt-3 block text-xs font-semibold text-slate-600">Copy<textarea className={inputClass} rows={3} value={section.body} onChange={(event) => updateSection(section.id, { body: event.target.value })} /></label><div className="mt-3 grid gap-3 sm:grid-cols-2"><label className="text-xs font-semibold text-slate-600">Button label<input className={inputClass} value={section.buttonText || ''} onChange={(event) => updateSection(section.id, { buttonText: event.target.value })} placeholder="Optional" /></label><div><input ref={imageInput} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={(event) => void uploadImage(event, section.id)} /><p className="text-xs font-semibold text-slate-600">Image</p><button type="button" onClick={() => imageInput.current?.click()} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-left text-sm text-slate-600">{section.image ? 'Change image' : 'Upload image (under 1 MB)'}</button></div></div></article>)}</div>
          </section>
          <section className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm"><h2 className="font-bold text-slate-900">AI editing assistant</h2><p className="mt-1 text-sm text-slate-500">Ask for a change; AI will return a revised editable draft.</p><textarea className={inputClass} rows={3} value={editPrompt} onChange={(event) => setEditPrompt(event.target.value)} placeholder="Tell AI what you want to change. E.g. Change my website colours to navy blue and gold, add customer testimonials, or make the mobile layout better." /><button disabled={busy} onClick={() => void runAI(true)} className="mt-3 rounded-xl bg-perfi-navy px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50">{busy ? 'Updating…' : '✦ Apply AI edit'}</button></section>
          <section className="rounded-2xl border border-slate-200 bg-slate-100 p-5"><h2 className="font-bold text-slate-800">Hosting &amp; domains</h2><p className="mt-1 text-sm leading-6 text-slate-600">Publishing is deliberately not simulated. Cloudflare deployment, the perfi-site.com wildcard domain, DNS routing, and a secure deployment pipeline must be configured before this website can go live. The publishing setup button shows the required next steps.</p></section>
        </div>
      </div>
    </main>
    <Footer />
  </div>;
}
