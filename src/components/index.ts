/**
 * 컴포넌트 Barrel 파일
 * 모든 컴포넌트를 중앙에서 관리하고 내보내는 파일
 */

// Layout 컴포넌트들
export { default as Layout } from './Layout/Layout';
// export { default as Header } from './Header/Header';
// export { default as Footer } from './Footer/Footer';
// export { default as Navigation } from './Navigation/Navigation';

// UI 컴포넌트들
export { default as Button } from './UI/Button';
export { default as Card } from './UI/Card';
// export { default as Modal } from './UI/Modal';
// export { default as Loader } from './UI/Loader';
// export { default as ThemeToggle } from './UI/ThemeToggle';

// 섹션 컴포넌트들
export { default as HeroSection } from './HeroSection/HeroSection';
export { default as ProjectsList } from './ProjectsList/ProjectsList';
export { default as ProjectCard } from './ProjectCard/ProjectCard';
export { default as AboutSection } from './AboutSection/AboutSection';
export { default as ContactSection } from './ContactSection/ContactSection';
export { default as ContactForm } from './ContactForm/ContactForm';
export { default as ImageGallery } from './ImageGallery/ImageGallery';
export { default as VideoPlayer } from './VideoPlayer/VideoPlayer';
export { default as AnimatedText } from './AnimatedText/AnimatedText';
export { default as SocialLinks } from './SocialLinks/SocialLinks';
// export { default as SkillsGrid } from './SkillsGrid/SkillsGrid';
export { default as ThemeToggle } from './ThemeToggle/ThemeToggle';
// export { default as ScrollToTop } from './ScrollToTop/ScrollToTop';

// 성능 관련 컴포넌트들
export { default as LazyImage } from './Performance/LazyImage';
export { default as DynamicLoader } from './Performance/DynamicLoader';

// SEO 컴포넌트
export { default as SEO } from './SEO/SEO'; 