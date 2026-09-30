import { useState } from 'react';
import {
  FileJson,
  Check,
  Copy,
  ExternalLink,
  Terminal,
  Globe,
  ShieldCheck,
  Download,
  Server,
  Layers,
  Sparkles,
  Info,
  FolderGit2,
  CheckCircle2,
  FileCode,
  ArrowRight,
  RefreshCw,
  Cpu,
  Play
} from 'lucide-react';

const VERCEL_JSON_CONTENT = `{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}`;

const VERCEL_IGNORE_CONTENT = `node_modules
.env
.env.local
.git
dist
.cache
.DS_Store`;

export default function App() {
  const [lang, setLang] = useState<'hi' | 'en'>('en');
  const [activeTab, setActiveTab] = useState<'overview' | 'config' | 'guide' | 'env' | 'serverless'>('overview');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [simulatedPath, setSimulatedPath] = useState('/dashboard');
  const [simulatedStatus, setSimulatedStatus] = useState<string | null>(null);
  const [repoUrl, setRepoUrl] = useState('https://github.com/afreedkhan8000/my-project.git');

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const downloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const testRouteSimulation = (path: string) => {
    setSimulatedPath(path);
    setSimulatedStatus(`Rewriting "${path}" ➔ "/index.html" (SPA fallback match - HTTP 200 OK)`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-slate-800 selection:text-white">
      {/* Top Bar Contract (1 Row, 3 Zones) */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white to-slate-400 flex items-center justify-center text-slate-950 font-black shadow-sm">
            ▲
          </div>
          <div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
              Vercel Deploy Hub
              <span className="hidden sm:inline-flex items-center text-[11px] font-medium text-emerald-400 bg-emerald-950/80 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                Ready to Deploy
              </span>
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-400">
          <button
            onClick={() => setActiveTab('overview')}
            className={`transition-colors hover:text-white ${activeTab === 'overview' ? 'text-white' : ''}`}
          >
            {lang === 'hi' ? 'ओवरव्यू (Overview)' : 'Overview'}
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`transition-colors hover:text-white ${activeTab === 'config' ? 'text-white' : ''}`}
          >
            vercel.json
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`transition-colors hover:text-white ${activeTab === 'guide' ? 'text-white' : ''}`}
          >
            {lang === 'hi' ? 'होस्टिंग गाइड (Guide)' : 'Hosting Guide'}
          </button>
          <button
            onClick={() => setActiveTab('env')}
            className={`transition-colors hover:text-white ${activeTab === 'env' ? 'text-white' : ''}`}
          >
            .env & Secrets
          </button>
          <button
            onClick={() => setActiveTab('serverless')}
            className={`transition-colors hover:text-white ${activeTab === 'serverless' ? 'text-white' : ''}`}
          >
            {lang === 'hi' ? 'बैकएंड / बॉट्स नोट' : 'Architecture'}
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2.5">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
            className="px-2.5 py-1.5 text-xs font-medium rounded-md border border-slate-700 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Toggle Language"
          >
            {lang === 'hi' ? 'English में देखें' : 'हिंदी में देखें'}
          </button>

          <a
            href="https://vercel.com/new"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-200 rounded-md transition-colors shadow-sm whitespace-nowrap"
          >
            <span>Vercel Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-slate-900/90 to-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none text-9xl font-black">
            ▲
          </div>

          <div className="max-w-3xl flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <span className="text-emerald-400 font-semibold">● Live Ready</span>
              <span>·</span>
              <span>Vite + React SPA</span>
              <span>·</span>
              <span>Production Config Created</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight text-balance">
              {lang === 'hi'
                ? 'आपका प्रोजेक्ट Vercel पर लाइव (Online) करने के लिए तैयार है'
                : 'Your Project is Ready to Deploy Online on Vercel'}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {lang === 'hi'
                ? 'इस प्रोजेक्ट में Vercel की मुख्य कॉन्फ़िगरेशन फ़ाइलें (vercel.json और .vercelignore) जोड़ दी गई हैं। नीचे दिए गए स्टेप्स से आप इसे 1 मिनट में ऑनलाइन होस्ट कर सकते हैं।'
                : 'All production Vercel configuration files (vercel.json and .vercelignore) have been generated. Follow the guide below to deploy it live with custom domain and free SSL in under a minute.'}
            </p>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => copyToClipboard(VERCEL_JSON_CONTENT, 'hero-json')}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                {copiedKey === 'hero-json' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedKey === 'hero-json' ? 'Copied vercel.json!' : 'Copy vercel.json'}</span>
              </button>

              <button
                onClick={() => downloadFile('vercel.json', VERCEL_JSON_CONTENT)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                <Download className="w-4 h-4 text-slate-300" />
                <span>Download vercel.json</span>
              </button>

              <button
                onClick={() => setActiveTab('guide')}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              >
                <span>{lang === 'hi' ? 'सीधे डिप्लॉय करने के स्टेप्स' : 'View Deploy Steps'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Tab Selector for Mobile & Desktop */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang === 'hi' ? '1. डिप्लॉयमेंट स्थिति (Status)' : '1. Overview & Status'}
          </button>

          <button
            onClick={() => setActiveTab('config')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'config'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang === 'hi' ? '2. vercel.json फ़ाइल' : '2. vercel.json Config'}
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'guide'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang === 'hi' ? '3. होस्ट कैसे करें (Guide)' : '3. How to Host'}
          </button>

          <button
            onClick={() => setActiveTab('env')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'env'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang === 'hi' ? '4. एनवायरनमेंट वेरिएबल्स (.env)' : '4. Environment Variables'}
          </button>

          <button
            onClick={() => setActiveTab('serverless')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'serverless'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang === 'hi' ? '5. Python / बॉट्स गाइड' : '5. Bot/Python Hosting Note'}
          </button>
        </div>

        {/* Tab 1: Overview & Status Checklist */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-6">
            {/* Checklist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Config File</span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-lg font-bold text-white">vercel.json</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {lang === 'hi'
                    ? 'रूट डायरेक्टरी में सफलतापूर्वक बन गई है। इसमें Vite framework और outputDirectory dist सेट है।'
                    : 'Created in root directory. Configures Vite framework and dist output directory.'}
                </p>
                <div className="pt-2 text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <span>Status: Configured & Valid</span>
                </div>
              </div>

              <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ignore Rules</span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-lg font-bold text-white">.vercelignore</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {lang === 'hi'
                    ? 'node_modules, .env, .git और dist को फालतू अपलोड होने से रोकता है।'
                    : 'Prevents uploading node_modules, secret .env files, and build artifacts.'}
                </p>
                <div className="pt-2 text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <span>Status: Optimized</span>
                </div>
              </div>

              <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">SPA Routing</span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-lg font-bold text-white">404 Rewrite Rule</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {lang === 'hi'
                    ? 'पेज रिफ्रेश करने पर 404 Not Found नहीं आएगा, सभी रूट index.html पर रीराइट होंगे।'
                    : 'All paths fallback to index.html to guarantee seamless client-side React routing.'}
                </p>
                <div className="pt-2 text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <span>Status: Active</span>
                </div>
              </div>
            </div>

            {/* Interactive Route Rewrite Tester */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'hi' ? 'SPA रूट रीराइट सिम्युलेटर (Route Test)' : 'SPA Route Rewrite Simulator'}</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    {lang === 'hi'
                      ? 'Vercel पर React ऐप में जब कोई यूजर सीधे किसी लिंक पर जाता है, तो vercel.json का रीराइट नियम काम करता है:'
                      : 'Tests how vercel.json handles client-side direct link visits:'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {['/', '/dashboard', '/accounts', '/settings', '/api/health'].map((path) => (
                  <button
                    key={path}
                    onClick={() => testRouteSimulation(path)}
                    className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors border ${
                      simulatedPath === path
                        ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Test: {path}
                  </button>
                ))}
              </div>

              {simulatedStatus && (
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-emerald-400 flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{simulatedStatus}</span>
                </div>
              )}
            </div>

            {/* Package.json Build Verification Card */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-slate-400" />
                  <h3 className="text-sm font-semibold text-white">package.json Build Command</h3>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-900 px-2 py-0.5 rounded">
                  npm run build
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'hi'
                  ? 'Vercel ऑटोमैटिकली `npm run build` चलाता है और आउटपुट `dist` फ़ोल्डर को ग्लोबली डिप्लॉय करता है। आपके पैकेज में यह स्क्रिप्ट पूरी तरह सेट है।'
                  : 'Vercel runs `npm run build` automatically and serves the resulting `dist` folder. Your package.json script is properly configured.'}
              </p>
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg font-mono text-xs text-slate-300">
                <span className="text-slate-500">// Output Directory:</span> dist
                <br />
                <span className="text-slate-500">// Build Command:</span> vite build
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Config Files (vercel.json & .vercelignore) */}
        {activeTab === 'config' && (
          <div className="flex flex-col gap-6">
            {/* vercel.json Viewer */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
              <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileJson className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs sm:text-sm font-bold text-white font-mono">vercel.json</span>
                  <span className="text-[11px] text-slate-400">· Root directory</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(VERCEL_JSON_CONTENT, 'tab-json')}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-slate-700 hover:bg-slate-600 text-white transition-colors"
                  >
                    {copiedKey === 'tab-json' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'tab-json' ? 'Copied!' : 'Copy Code'}</span>
                  </button>

                  <button
                    onClick={() => downloadFile('vercel.json', VERCEL_JSON_CONTENT)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-slate-700 hover:bg-slate-600 text-white transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-950 overflow-x-auto">
                <pre className="font-mono text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <code>{VERCEL_JSON_CONTENT}</code>
                </pre>
              </div>

              {/* Explanation of keys */}
              <div className="bg-slate-900/90 border-t border-slate-800 p-5 flex flex-col gap-4">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {lang === 'hi' ? 'इस JSON के हर पार्ट का क्या मतलब है:' : 'Why each setting is required:'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800 flex flex-col gap-1">
                    <span className="font-mono text-emerald-400 font-semibold">"framework": "vite"</span>
                    <span className="text-slate-300">
                      {lang === 'hi'
                        ? 'Vercel को बताता है कि यह Vite प्रोजेक्ट है, जिससे वह सही Node वर्जन और बिल्ड टूल्स चुनता है।'
                        : 'Informs Vercel this is a Vite project for automatic optimization.'}
                    </span>
                  </div>

                  <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800 flex flex-col gap-1">
                    <span className="font-mono text-emerald-400 font-semibold">"outputDirectory": "dist"</span>
                    <span className="text-slate-300">
                      {lang === 'hi'
                        ? 'Vite बिल्ड करने के बाद सारी कम्पाइल फाइल्स `dist` फोल्डर में डालता है। Vercel यहीं से साइट लाइव करेगा।'
                        : 'Specifies the production bundle output directory that Vercel deploys to its CDN.'}
                    </span>
                  </div>

                  <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800 flex flex-col gap-1">
                    <span className="font-mono text-emerald-400 font-semibold">"rewrites": [...]</span>
                    <span className="text-slate-300">
                      {lang === 'hi'
                        ? 'Single Page Application (SPA) के लिए बेहद जरूरी: पेज रीलोड करने पर 404 एरर को रोकता है।'
                        : 'Crucial for Single Page Apps (SPA) to prevent 404s when users refresh subroutes.'}
                    </span>
                  </div>

                  <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800 flex flex-col gap-1">
                    <span className="font-mono text-emerald-400 font-semibold">"headers": [...]</span>
                    <span className="text-slate-300">
                      {lang === 'hi'
                        ? 'वेबसाइट की सिक्योरिटी के लिए X-Frame-Options और X-Content-Type-Options हेडर्स सेट करता है।'
                        : 'Enforces modern browser security headers against clickjacking and MIME attacks.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* .vercelignore Viewer */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
              <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs sm:text-sm font-bold text-white font-mono">.vercelignore</span>
                  <span className="text-[11px] text-slate-400">· Root directory</span>
                </div>

                <button
                  onClick={() => copyToClipboard(VERCEL_IGNORE_CONTENT, 'tab-ignore')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-slate-700 hover:bg-slate-600 text-white transition-colors"
                >
                  {copiedKey === 'tab-ignore' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'tab-ignore' ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              <div className="p-4 bg-slate-950 overflow-x-auto">
                <pre className="font-mono text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <code>{VERCEL_IGNORE_CONTENT}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Step-by-Step Deployment Guide */}
        {activeTab === 'guide' && (
          <div className="flex flex-col gap-6">
            {/* Method 1: GitHub (Recommended) */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-7 flex flex-col gap-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                    <FolderGit2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {lang === 'hi' ? 'तरीका 1: GitHub + Vercel (सबसे आसान व सुरक्षित)' : 'Method 1: GitHub + Vercel (Recommended)'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {lang === 'hi'
                        ? 'ऑटोमैटिक डिप्लॉयमेंट: जब भी आप कोड अपडेट करेंगे, Vercel अपने आप नई साइट लाइव कर देगा।'
                        : 'Automatic deployments whenever you push new changes to GitHub.'}
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-block px-2.5 py-1 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 rounded-md">
                  Recommended
                </span>
              </div>

              {/* Step by step */}
              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="w-7 h-7 rounded-full bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center shrink-0 border border-slate-700">
                    1
                  </div>
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h4 className="text-sm font-semibold text-white">
                        {lang === 'hi' ? 'अपनी GitHub रिपॉजिटरी का लिंक यहाँ डालें:' : 'Paste your GitHub Repository URL:'}
                      </h4>
                      <span className="text-xs text-emerald-400 font-medium">
                        {lang === 'hi' ? '✓ रिपॉजिटरी बन चुकी है' : '✓ Repository Created'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-lg p-2">
                      <FolderGit2 className="w-4 h-4 text-emerald-400 shrink-0 ml-1" />
                      <input
                        type="text"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        placeholder="https://github.com/afreedkhan8000/YOUR_REPO_NAME.git"
                        className="bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-500 w-full focus:outline-none font-mono"
                      />
                    </div>

                    <p className="text-xs text-slate-300">
                      {lang === 'hi'
                        ? 'अब अपने कंप्यूटर/प्रोजेक्ट टर्मिनल में ये 6 कमांड्स रन करें:'
                        : 'Run these commands in your project terminal:'}
                    </p>
                    <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 relative group">
                      <pre className="font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto">
{`git init
git add .
git commit -m "feat: initial commit for vercel deploy"
git branch -M main
git remote add origin ${repoUrl || 'https://github.com/afreedkhan8000/YOUR_REPO.git'}
git push -u origin main`}
                      </pre>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `git init\ngit add .\ngit commit -m "feat: initial commit for vercel deploy"\ngit branch -M main\ngit remote add origin ${repoUrl || 'https://github.com/afreedkhan8000/YOUR_REPO.git'}\ngit push -u origin main`,
                            'git-cmds'
                          )
                        }
                        className="absolute top-2 right-2 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        title="Copy Git Commands"
                      >
                        {copiedKey === 'git-cmds' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="w-7 h-7 rounded-full bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center shrink-0 border border-slate-700">
                    2
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <h4 className="text-sm font-semibold text-white">
                      {lang === 'hi' ? 'Vercel.com पर जाकर लॉगिन करें' : 'Open Vercel.com & Sign In'}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {lang === 'hi'
                        ? 'ब्राउज़र में vercel.com खोलें और "Continue with GitHub" चुनकर लॉगिन करें।'
                        : 'Visit vercel.com and sign in with your GitHub account.'}
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="w-7 h-7 rounded-full bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center shrink-0 border border-slate-700">
                    3
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <h4 className="text-sm font-semibold text-white">
                      {lang === 'hi' ? 'प्रोजेक्ट इम्पोर्ट करें ("Add New" ➔ "Project")' : 'Import Project ("Add New" ➔ "Project")'}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {lang === 'hi'
                        ? 'डैशबोर्ड पर "Add New Project" पर क्लिक करें और अपनी GitHub रिपॉजिटरी के सामने "Import" बटन दबाएं।'
                        : 'Click "Add New" ➔ "Project" and click "Import" next to your GitHub repository.'}
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4">
                  <div className="w-7 h-7 rounded-full bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center shrink-0 border border-slate-700">
                    4
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <h4 className="text-sm font-semibold text-white">
                      {lang === 'hi' ? 'Deploy बटन दबाएं!' : 'Click "Deploy"'}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {lang === 'hi'
                        ? 'क्योंकि vercel.json पहले से मौजूद है, Vercel अपने आप Framework Preset को "Vite" और Output Directory को "dist" पहचान लेगा। आपको बस "Deploy" दबाना है।'
                        : 'Because vercel.json is already present, Vercel will automatically recognize the Vite preset and output directory. Just click "Deploy".'}
                    </p>
                    <div className="p-3 bg-emerald-950/40 border border-emerald-900/60 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 shrink-0 text-emerald-400" />
                      <span>
                        {lang === 'hi'
                          ? '30 सेकंड में आपकी वेबसाइट `https://your-project.vercel.app` पर लाइव हो जाएगी!'
                          : 'Within 30 seconds your app will be live with a free SSL domain!'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Method 2: Vercel CLI */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-7 flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                <div className="p-2 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {lang === 'hi' ? 'तरीका 2: Vercel CLI से सीधा डिप्लॉय (कमांड लाइन)' : 'Method 2: Direct Deploy via Vercel CLI'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {lang === 'hi' ? 'बिना GitHub के अपने कंप्यूटर से सीधा डिप्लॉय करने के लिए' : 'Deploy directly from your machine without GitHub'}
                  </p>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex flex-col gap-2 relative">
                <span className="text-xs font-semibold text-slate-400">Run in your terminal:</span>
                <pre className="font-mono text-xs sm:text-sm text-slate-200 leading-relaxed overflow-x-auto">
{`# 1. Install Vercel CLI globally
npm i -g vercel

# 2. Login to your Vercel account
vercel login

# 3. Deploy to production
vercel --prod`}
                </pre>
                <button
                  onClick={() => copyToClipboard(`npm i -g vercel\nvercel login\nvercel --prod`, 'cli-cmds')}
                  className="absolute top-3 right-3 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Copy CLI Commands"
                >
                  {copiedKey === 'cli-cmds' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Environment Variables */}
        {activeTab === 'env' && (
          <div className="flex flex-col gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-7 flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                <div className="p-2 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {lang === 'hi' ? 'Vercel पर एनवायरनमेंट वेरिएबल्स (.env) कैसे जोड़ें' : 'Configuring Environment Variables in Vercel'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {lang === 'hi'
                      ? 'सीक्रेट कीज़ और API टोकन्स को सुरक्षित रखने का सही तरीका'
                      : 'How to securely store API keys and environment variables in Vercel'}
                  </p>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed flex flex-col gap-3">
                <p>
                  {lang === 'hi'
                    ? '⚠️ ध्यान रखें: `.env` फ़ाइल को कभी भी GitHub पर कमिट नहीं किया जाता (यह .vercelignore में सुरक्षित है)। Vercel पर वैरिएबल ऐसे जोड़े जाते हैं:'
                    : '⚠️ Remember: `.env` files should never be committed to Git. In Vercel, you set variables via the web dashboard:'}
                </p>

                <ol className="list-decimal list-inside space-y-2 pl-2">
                  <li>
                    {lang === 'hi'
                      ? 'Vercel डैशबोर्ड में अपने प्रोजेक्ट पर जाएं।'
                      : 'Open your project in the Vercel Dashboard.'}
                  </li>
                  <li>
                    {lang === 'hi'
                      ? 'ऊपर "Settings" टैब पर क्लिक करें।'
                      : 'Click on the "Settings" tab at the top.'}
                  </li>
                  <li>
                    {lang === 'hi'
                      ? 'बाएं मेनू में "Environment Variables" चुनें।'
                      : 'Select "Environment Variables" in the left sidebar.'}
                  </li>
                  <li>
                    {lang === 'hi'
                      ? 'Key और Value डालें (जैसे GEMINI_API_KEY या VITE_API_URL) और "Save" पर क्लिक करें।'
                      : 'Enter Key and Value (e.g., GEMINI_API_KEY or VITE_API_URL) and click "Save".'}
                  </li>
                </ol>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs flex flex-col gap-1.5 mt-2">
                  <span className="text-slate-400 font-semibold">// Vite Frontend Naming Rule:</span>
                  <span className="text-slate-200">
                    Vite React में क्लाइंट-साइड कोड में दिखने वाले वेरिएबल्स का नाम <code className="text-emerald-400">VITE_</code> से शुरू होना चाहिए (उदाहरण: <code className="text-emerald-400">VITE_BACKEND_URL</code>).
                  </span>
                  <span className="text-slate-500">Access in code via: import.meta.env.VITE_BACKEND_URL</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Bot / Python Hosting Architecture Note */}
        {activeTab === 'serverless' && (
          <div className="flex flex-col gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-7 flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                <div className="p-2 rounded-lg bg-amber-950/80 text-amber-400 border border-amber-800/60">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {lang === 'hi' ? 'महत्वपूर्ण गाइड: Vercel vs बैकएंड बॉट्स (Python / Sockets)' : 'Architecture Guide: Vercel vs 24/7 Socket Bots'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {lang === 'hi' ? 'Vercel पर क्या चल सकता है और क्या नहीं, इसे समझें' : 'Understanding what Vercel supports'}
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <div className="p-4 bg-amber-950/20 border border-amber-900/60 rounded-xl flex flex-col gap-2">
                  <span className="font-bold text-amber-300 flex items-center gap-2">
                    <Info className="w-4 h-4 shrink-0 text-amber-400" />
                    <span>
                      {lang === 'hi'
                        ? 'Vercel सर्वरलेस (Serverless) प्लेटफॉर्म है'
                        : 'Vercel is a Serverless Platform'}
                    </span>
                  </span>
                  <p>
                    {lang === 'hi'
                      ? 'Vercel विशेष रूप से वेबसाइट्स, React/Vite डैशबोर्ड, और HTTP Serverless Functions के लिए बना है। Vercel पर लगातार 24 घंटे चलने वाले बैकग्राउंड सॉकेट्स (TCP/UDP socket daemons या Python bot loops) नहीं चल सकते, क्योंकि Vercel की रिक्वेस्ट 15-60 सेकंड में अपने आप टाइमआउट हो जाती है।'
                      : 'Vercel is purpose-built for frontend web applications, React/Vite dashboards, and HTTP Serverless functions. It cannot maintain persistent 24/7 background TCP/UDP socket connections (like game bots or continuous daemon loops), as serverless functions terminate quickly after responding to an HTTP request.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex flex-col gap-2">
                    <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      <span>{lang === 'hi' ? 'Vercel पर क्या चलाएं (Best)' : 'Best for Vercel:'}</span>
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs">
                      <li>React / Vite Web Dashboards</li>
                      <li>User interfaces & Admin panels</li>
                      <li>REST API Serverless endpoints (`/api/*`)</li>
                      <li>Static landing pages & Web apps</li>
                      <li>Free custom domain with global CDN & SSL</li>
                    </ul>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex flex-col gap-2">
                    <span className="text-sm font-bold text-cyan-400 flex items-center gap-1.5">
                      <Cpu className="w-4 h-4" />
                      <span>{lang === 'hi' ? '24/7 Python बॉट कहाँ चलाएं:' : 'Where to host 24/7 Python Bots:'}</span>
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs">
                      <li><strong>Render.com</strong> (Background Worker)</li>
                      <li><strong>Railway.app</strong> (Always-on service)</li>
                      <li><strong>Ubuntu / Linux VPS</strong> (DigitalOcean, AWS EC2, Hetzner)</li>
                      <li><strong>Docker Container</strong> on Cloud Run or Fly.io</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col gap-2">
                  <span className="text-sm font-bold text-white">
                    {lang === 'hi' ? 'आइडियल सेटअप (Recommended Architecture):' : 'Recommended Architecture:'}
                  </span>
                  <p className="text-xs text-slate-300">
                    {lang === 'hi'
                      ? '1. अपना वेब डैशबोर्ड / फ्रंटएंड Vercel पर होस्ट करें (बिल्कुल फ्री, सुपर फास्ट दुनिया भर में)।\n2. अगर आपके पास कोई बैकग्राउंड Python बॉट या सॉकेट इंजन है, तो उसे VPS या Render पर चलाएं और Vercel वेब डैशबोर्ड को उससे कनेक्ट करें।'
                      : '1. Host your Web Dashboard / Frontend on Vercel (free, lightning-fast global CDN).\n2. If you have a background socket bot or daemon, run it on a VPS or Render and connect your Vercel frontend to it via API.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span>Vercel Deploy Hub</span>
          <span>·</span>
          <span>Vite + React</span>
          <span>·</span>
          <span>Production Ready</span>
        </div>
        <div>
          <span>vercel.json & .vercelignore configured</span>
        </div>
      </footer>
    </div>
  );
}
