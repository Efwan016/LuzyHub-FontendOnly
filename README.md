
# 🎬 LuzyHub

LuzyHub is a modern streaming web application built with **React + TypeScript + Vite**.  
Watch movies, TV series, K-Drama, anime, and short TV content in a fast and responsive interface.

---

## 🚀 Tech Stack

- ⚛️ React
- 🟦 TypeScript
- ⚡ Vite
- 🎨 TailwindCSS
- 🔥 React Router
- 📡 Third-party API Integration

---

## ⚠️ Disclaimer

All content displayed on this website is **not stored on our servers**.

We only fetch and display data from third-party APIs.  
We are **not responsible** for the content provided by external sources.

> Semua konten di website ini tidak disimpan di server kami.  
> Kami hanya menampilkan data dari API pihak ketiga.  
> Kami tidak bertanggung jawab atas konten yang ditampilkan.

If you are a content owner and have concerns, please contact the respective API/content provider.

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/Efwan016/LuzyHub-FontendOnly
cd luzyhub


Install dependencies:

npm install


Run development server:

npm run dev


Build for production:

npm run build


Preview production build:

npm run preview

⚙️ React + TypeScript + Vite Setup

This project uses Vite with React and TypeScript.

Currently, two official plugins are available:

@vitejs/plugin-react – Uses Babel (or oxc with rolldown-vite) for Fast Refresh

@vitejs/plugin-react-swc – Uses SWC for Fast Refresh

🧠 React Compiler

The React Compiler is not enabled by default due to its impact on development and build performance.

To enable it, see:
https://react.dev/learn/react-compiler/installation

🛠 ESLint Configuration (Recommended for Production)

For production-level applications, enable type-aware lint rules:

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      // or stricter:
      // tseslint.configs.strictTypeChecked,
      // optional stylistic rules:
      // tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])


You can also install additional React lint rules:

npm install eslint-plugin-react-x eslint-plugin-react-dom --save-dev


Then update your config:

import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
  },
])

🌍 SEO & Deployment

Recommended production setup:

Enable SSR (Next.js or custom SSR) for better SEO

Add sitemap.xml

Add robots.txt

Configure meta tags per movie page

Use environment variables for API keys

📜 License

This project is for educational and personal development purposes.

💎 Future Improvements

Watch history

Continue watching

User authentication

Subtitle selection

Quality selector

Server-side rendering

PWA support

Made with ❤️ by LuzyHub