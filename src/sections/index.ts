/**
 * 섹션 컴포넌트들 Barrel 파일
 * 모든 섹션 컴포넌트를 중앙에서 관리하고 내보내는 파일
 */

// 섹션 컴포넌트들을 중앙에서 관리하는 인덱스 파일
export { default as HeroSection } from '../components/HeroSection/HeroSection';
export { default as ProjectsList } from '../components/ProjectsList/ProjectsList';
export { default as AboutSection } from '../components/AboutSection/AboutSection';
export { default as ContactSection } from '../components/ContactSection/ContactSection';

// 추후 구현 예정인 섹션들
// export { default as SkillsSection } from './SkillsSection';
// export { default as TestimonialsSection } from './TestimonialsSection';
// export { default as ExperienceSection } from './ExperienceSection';
// export { default as ServicesSection } from './ServicesSection';
// export { default as BlogSection } from './BlogSection';
// export { default as FooterSection } from './FooterSection'; 