# AI/ML Engineer Portfolio

A modern, animated portfolio website for Computer Science graduates specializing in AI/ML and Data Science. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Modern Dark Theme** - Sleek dark design with gradient accents (Violet, Cyan, Amber)
- **Animated Sections** - Smooth scroll-triggered animations using Framer Motion
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **GitHub Integration** - Ready to connect your actual GitHub repositories
- **Contact Form** - Functional contact form with validation
- **SEO Optimized** - Meta tags and Open Graph for social sharing
- **Performance** - Static export ready for fast deployment

## Sections

1. **Hero** - Animated introduction with floating elements and gradient orbs
2. **Experience** - Timeline showing career progression (Startup → Simpaisa)
3. **Projects** - Grid of portfolio projects with category filtering
4. **Skills** - Animated skill bars with proficiency levels
5. **Contact** - Contact form and social links

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide React](https://lucide.dev/) - Icons
- Custom UI components inspired by shadcn/ui

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd my-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization Guide

### 1. Personal Information

Update your personal details:

**src/app/layout.tsx** - Site metadata:
```typescript
export const metadata: Metadata = {
  title: "Your Name | AI/ML Engineer",
  description: "Your personal description...",
  authors: [{ name: "Your Name" }],
}
```

**src/components/sections/hero.tsx** - Hero section:
- Update your title/subtitle
- Update current role badge
- Update social links (GitHub, LinkedIn, Email)

**src/components/sections/contact.tsx** - Contact info:
- Update email address
- Update social media URLs
- Update location info

### 2. Experience Section

Edit `src/components/sections/experience.tsx` to add your work history:

```typescript
const experiences = [
  {
    id: 1,
    company: "Simpaisa",
    role: "AI Product Analyst",
    period: "2024 - Present",
    // ... update description, highlights, tags
  },
  // Add more experiences
]
```

### 3. Projects Section

**Option A: Manual Projects**

Edit `src/components/sections/projects.tsx`:

```typescript
const featuredProjects = [
  {
    id: 1,
    name: "Your Project Name",
    description: "Project description...",
    tech: ["Python", "React", "OpenAI"],
    icon: Brain, // Choose from Lucide icons
    color: "violet", // violet, cyan, or amber
    github: "https://github.com/username/repo",
    stars: 45,
    forks: 12,
    category: "AI/ML",
  },
]
```

**Option B: GitHub API Integration**

To fetch your actual GitHub repositories:

1. Open `src/components/sections/projects.tsx`
2. Add a useEffect to fetch repos:

```typescript
useEffect(() => {
  const fetchRepos = async () => {
    const response = await fetch(
      'https://api.github.com/users/YOUR_USERNAME/repos?sort=updated&per_page=6'
    )
    const data = await response.json()
    // Transform and set data
  }
  fetchRepos()
}, [])
```

### 4. Skills Section

Edit `src/components/sections/skills.tsx`:

```typescript
const skillCategories = [
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    skills: [
      { name: "Large Language Models", level: 95 },
      // Add more skills with proficiency 0-100
    ],
  },
]
```

### 5. Colors & Theme

The theme uses three accent colors defined in `src/app/globals.css`:
- **Violet** (`#8b5cf6`) - Primary
- **Cyan** (`#06b6d4`) - Secondary
- **Amber** (`#f59e0b`) - Tertiary

To change colors, modify the CSS variables in the `:root` section.

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

2. Go to [vercel.com](https://vercel.com) and sign up/login with GitHub

3. Click "New Project" and import your repository

4. Configure build settings (usually auto-detected):
   - Framework Preset: Next.js
   - Build Command: `next build`
   - Output Directory: `dist`

5. Click "Deploy"

6. Your site will be live at `your-project-name.vercel.app`

### Custom Domain on Vercel

1. Go to your project dashboard on Vercel
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `yourname.com`)
4. Follow DNS configuration instructions

### Other Deployment Options

The `dist` folder contains static files ready for:
- **Netlify** - Drag and drop the dist folder
- **GitHub Pages** - Push dist folder to gh-pages branch
- **AWS S3** - Upload dist folder to S3 bucket
- **Firebase Hosting** - Use Firebase CLI to deploy

## Project Structure

```
my-app/
├── src/
│   ├── app/
│   │   ├── globals.css       # Global styles & theme
│   │   ├── layout.tsx        # Root layout & metadata
│   │   └── page.tsx          # Home page composition
│   ├── components/
│   │   ├── ui/               # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── badge.tsx
│   │   ├── navigation.tsx    # Header navigation
│   │   └── sections/         # Page sections
│   │       ├── hero.tsx
│   │       ├── experience.tsx
│   │       ├── projects.tsx
│   │       ├── skills.tsx
│   │       └── contact.tsx
│   ├── lib/
│   │   └── utils.ts          # Utility functions (cn)
│   └── hooks/                # Custom React hooks
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind configuration
├── next.config.mjs           # Next.js configuration
└── package.json
```

## Troubleshooting

**Build errors:**
- Make sure Node.js is version 18+
- Delete `node_modules` and run `npm install` again

**Images not showing:**
- Place images in the `public` folder
- Reference them with `/image-name.jpg`

**Animation issues:**
- Check browser console for errors
- Ensure framer-motion is installed: `npm install framer-motion`

## License

MIT License - feel free to use this template for your own portfolio!

## Credits

- Design inspired by modern dark-themed portfolios
- Icons from [Lucide](https://lucide.dev/)
- Animation library: [Framer Motion](https://www.framer.com/motion/)

---

**Built with ❤️ for CS graduates entering the AI/ML field**
