# 🎨 Creative Portfolio

A modern, responsive, and interactive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features smooth animations, dark mode support, and PWA capabilities.

## ✨ Features

- **Modern Design**: Clean, professional, and visually appealing interface
- **Responsive Layout**: Mobile-first design that works on all devices
- **Dark Mode**: Toggle between light and dark themes
- **Smooth Animations**: Powered by Framer Motion
- **PWA Support**: Install as a standalone app
- **Performance Optimized**: Image optimization, code splitting, and caching
- **SEO Friendly**: Comprehensive meta tags and structured data
- **Interactive Elements**: Custom cursor, scroll animations, and hover effects
- **TypeScript**: Fully typed for better development experience

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: next-themes
- **Build Tool**: Turbopack

## 📋 Components

### Core Components
- **Layout**: Header, Footer, Navigation
- **UI Components**: Button, Card, Modal, Loader
- **Sections**: Hero, Projects, About, Contact
- **Advanced**: Image Gallery, Video Player, Animated Text

### Performance Components
- **LazyImage**: Optimized image loading with blur placeholder
- **DynamicLoader**: Code splitting and dynamic imports
- **PWA**: Service worker and app installation

### Special Features
- **Theme Toggle**: Dark/Light mode switching
- **SEO**: Meta tags and structured data
- **Contact Form**: Form validation and submission
- **Social Links**: Social media integration

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 📁 Project Structure

```
portfolios3/
├── public/
│   ├── videos/           # Video files
│   ├── icons/            # PWA icons
│   ├── screenshots/      # App screenshots
│   ├── manifest.json     # PWA manifest
│   └── sw.js            # Service worker
├── src/
│   ├── app/             # Next.js App Router
│   ├── components/      # React components
│   ├── data/           # Portfolio data
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utility functions
│   ├── sections/       # Page sections
│   ├── styles/         # Global styles
│   └── types/          # TypeScript types
├── tailwind.config.js  # Tailwind configuration
├── next.config.js      # Next.js configuration
└── package.json        # Dependencies
```

## 🎥 Adding Videos

Place your video files in the following directories:

```
public/videos/
├── projects/     # Project demonstration videos
├── demos/        # Demo and showcase videos
└── thumbnails/   # Video thumbnail images
```

**Usage in components:**
```typescript
<VideoPlayer 
  src="/videos/projects/your-video.mp4"
  poster="/videos/thumbnails/your-thumbnail.jpg"
  title="Project Demo"
/>
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_BASE_URL=https://yourportfolio.com
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
NEXT_PUBLIC_VAPID_KEY=your-vapid-key
```

### Customization

1. **Portfolio Data**: Edit `src/data/portfolioData.ts`
2. **Colors**: Modify `tailwind.config.js`
3. **Fonts**: Update `src/app/globals.css`
4. **SEO**: Configure `src/components/SEO/SEO.tsx`

## 📱 PWA Configuration

The app includes PWA support with:
- Service worker for offline functionality
- App installation prompt
- Background sync
- Push notifications

To customize PWA settings, edit:
- `public/manifest.json` - App manifest
- `public/sw.js` - Service worker
- `src/lib/pwa.ts` - PWA utilities

## 🎯 Performance Optimizations

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Dynamic imports for heavy components
- **Caching**: Service worker caching strategies
- **Bundle Analysis**: Webpack bundle analyzer
- **Tree Shaking**: Dead code elimination

## 🧪 Testing

```bash
# Run tests
npm run test

# Run e2e tests
npm run test:e2e

# Check build
npm run build

# Analyze bundle
npm run analyze
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=out
```

### Docker
```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## 📊 Build Output

The production build creates:
- Static HTML files for all pages
- Optimized JavaScript bundles
- Compressed images and assets
- Service worker for PWA
- Sitemap and robots.txt

## 🔍 SEO Features

- Open Graph meta tags
- Twitter Card support
- Structured data (JSON-LD)
- Sitemap generation
- Robots.txt configuration
- Canonical URLs

## 🎨 Design System

### Colors
- Primary: Coral (#FF6B6B)
- Secondary: Mint (#4ECDC4)
- Accent: Sunshine (#FFD166)
- Neutral: Various grays

### Typography
- Display: Archivo Black
- Heading: Bebas Neue
- Body: Inter
- Code: Fira Code

### Animations
- Fade in/out effects
- Slide transitions
- Hover interactions
- Scroll-triggered animations

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**: ESLint and TypeScript errors are ignored in production builds
2. **Video Not Loading**: Check file paths and format support
3. **PWA Issues**: Ensure HTTPS in production
4. **Performance**: Use the performance monitoring tools

### Debug Mode
```bash
npm run dev -- --debug
```

## 🚀 배포 (Deployment)

### Vercel 배포 (권장) ✅

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/portfolios3)

#### 자동 배포 (GitHub 연동)
1. [Vercel](https://vercel.com)에 GitHub 계정으로 로그인
2. "New Project" 클릭  
3. GitHub 레포지토리 선택
4. 자동으로 배포 시작

#### 수동 배포 (CLI)
```bash
# Vercel CLI 설치 (전역)
npm i -g vercel

# 프로젝트 디렉토리에서 실행
vercel

# 프로덕션 배포
vercel --prod
```

#### 환경 설정
- **Framework**: Next.js (자동 감지)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

#### 배포 후 확인사항
✅ **이미지 로딩**: Unsplash 이미지들이 정상적으로 표시되는지 확인  
✅ **동영상 재생**: 업로드한 동영상 파일들이 정상적으로 재생되는지 확인  
✅ **반응형 디자인**: 모바일/태블릿에서 레이아웃이 올바르게 표시되는지 확인  
✅ **페이지 로딩 속도**: 이미지 최적화와 코드 스플리팅이 적용되었는지 확인  

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- Framer Motion for smooth animations
- Lucide React for beautiful icons
- All contributors and supporters

---

**Built with ❤️ by [Your Name]**

For more information, visit [your-portfolio.com](https://your-portfolio.com)
