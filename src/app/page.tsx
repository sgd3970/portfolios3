/**
 * 메인 홈페이지 컴포넌트
 * 히어로 섹션과 프로젝트 목록을 포함하는 크리에이티브 포트폴리오 페이지
 */

import HeroSection from '@/components/HeroSection/HeroSection';
import ProjectsList from '@/components/ProjectsList/ProjectsList';
import AboutSection from '@/components/AboutSection/AboutSection';
import ContactSection from '@/components/ContactSection/ContactSection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* 히어로 섹션 - 풀스크린 그리드 작업물 갤러리 */}
      <HeroSection />
      
      {/* 프로젝트 목록 섹션 */}
      <ProjectsList
        title="주요 프로젝트"
        description="가장 인상적인 작업들을 만나보세요"
        initialCount={8}
        showFilters={true}
        showSearch={true}
        showSort={true}
        gridType="masonry"
      />

      {/* About 섹션 */}
      <AboutSection />

      {/* Contact 섹션 */}
      <ContactSection />
    </main>
  );
}
