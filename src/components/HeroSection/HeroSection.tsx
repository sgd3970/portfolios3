/**
 * 메인 히어로 섹션 컴포넌트
 * 풀스크린 그리드 작업물 갤러리와 인터랙티브 요소들을 포함
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { portfolioData } from '@/data/portfolioData';
import { IProject } from '@/types';

// 히어로 섹션 Props 인터페이스
interface HeroSectionProps {
  /** 추가 클래스명 */
  className?: string;
  /** 표시할 프로젝트 수 */
  maxProjects?: number;
  /** 자동 재생 간격 (ms) */
  autoPlayInterval?: number;
  /** 자동 재생 활성화 여부 */
  autoPlay?: boolean;
}

// 그리드 아이템 Props 인터페이스
interface GridItemProps {
  project: IProject;
  index: number;
  isActive: boolean;
  onHover: (project: IProject | null) => void;
  onClick: (project: IProject) => void;
}

// 애니메이션 변형들
const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const gridItemVariants = {
  initial: { opacity: 0, scale: 0.8, filter: "blur(4px)" },
  animate: (index: number) => ({
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay: index * 0.2
    }
  }),
  hover: {
    scale: 1.05,
    filter: "blur(0px)",
    transition: {
      duration: 0.3
    }
  }
};

const overlayVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 }
  }
};

const titleVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.2 }
  }
};

// 그리드 아이템 컴포넌트
const GridItem: React.FC<GridItemProps> = ({ 
  project, 
  index, 
  isActive, 
  onHover, 
  onClick 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // 그리드 아이템 크기 결정 (비정형 레이아웃)
  const getGridItemSize = (index: number) => {
    const patterns = [
      'col-span-2 row-span-2', // 큰 사각형
      'col-span-1 row-span-1', // 작은 사각형
      'col-span-2 row-span-1', // 가로 직사각형
      'col-span-1 row-span-2', // 세로 직사각형
      'col-span-1 row-span-1', // 작은 사각형
    ];
    return patterns[index % patterns.length];
  };

  return (
    <motion.div
      custom={index}
      variants={gridItemVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className={cn(
        'relative group cursor-pointer overflow-hidden rounded-lg',
        'bg-gradient-to-br from-accent-coral/20 to-accent-mint/20',
        getGridItemSize(index)
      )}
      onMouseEnter={() => onHover(project)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(project)}
    >
      {/* 프로젝트 이미지 */}
      <div className="relative w-full h-full min-h-[200px]">
        <Image
          src={project.thumbnailUrl || project.imageUrls[0]}
          alt={project.title}
          fill
          className={cn(
            'object-cover transition-all duration-500',
            imageLoaded ? 'blur-0' : 'blur-md',
            'group-hover:scale-110'
          )}
          onLoad={() => setImageLoaded(true)}
          priority={index < 4}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* 그라데이션 오버레이 */}
        <div className={cn(
          'absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent',
          'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
        )} />
        
        {/* 색상 오버레이 */}
        <div className={cn(
          'absolute inset-0 mix-blend-overlay transition-opacity duration-300',
          'opacity-0 group-hover:opacity-20',
          project.colorTheme === 'coral' && 'bg-accent-coral',
          project.colorTheme === 'mint' && 'bg-accent-mint',
          project.colorTheme === 'sunshine' && 'bg-accent-sunshine',
          project.colorTheme === 'electric' && 'bg-accent-electric',
          project.colorTheme === 'gradient' && 'bg-gradient-sunset'
        )} />
      </div>

      {/* 호버 시 프로젝트 정보 */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 flex items-end justify-start p-4 bg-black/40 backdrop-blur-sm"
          >
            <div className="text-white">
              <h3 className="font-display text-lg font-bold mb-1">
                {project.title}
              </h3>
              <p className="text-sm opacity-90 mb-2 line-clamp-2">
                {project.description}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  {project.category}
                </span>
                <span className="text-xs opacity-75">
                  {project.duration}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 로딩 스켈레톤 */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
      )}
    </motion.div>
  );
};

/**
 * 메인 히어로 섹션 컴포넌트
 * 풀스크린 그리드 작업물 갤러리와 인터랙티브 요소들을 포함
 */
export default function HeroSection({
  className,
  maxProjects = 12,
  autoPlayInterval = 5000,
  autoPlay = false
}: HeroSectionProps) {
  const [hoveredProject, setHoveredProject] = useState<IProject | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // 표시할 프로젝트들 (우선순위 순으로 정렬)
  const displayProjects = portfolioData
    .sort((a, b) => b.priority - a.priority)
    .slice(0, maxProjects);

  // 자동 재생 로직
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayProjects.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, displayProjects.length]);

  // 컴포넌트 마운트 시 로딩 상태 해제
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // 프로젝트 클릭 핸들러
  const handleProjectClick = (project: IProject) => {
    // 프로젝트 상세 페이지로 이동
    window.location.href = `/projects/${project.id}`;
  };

  return (
    <section className={cn(
      'relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-background to-muted',
      className
    )}>
      {/* 배경 데코레이션 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent-coral/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-mint/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent-sunshine/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 h-full min-h-screen flex flex-col">
        {/* 상단 타이틀 영역 */}
        <div className="flex-shrink-0 pt-20 pb-8 px-6 text-center">
          <motion.div
            variants={titleVariants}
            initial="initial"
            animate="animate"
            className="max-w-4xl mx-auto"
          >
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black mb-4">
              <span className="text-gradient">Creative</span>
              <span className="text-foreground"> & </span>
              <span className="text-gradient-warm">Experimental</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              디자인과 아트를 통해 새로운 시각적 경험을 창조합니다
            </p>
          </motion.div>
        </div>

        {/* 프로젝트 그리드 */}
        <div className="flex-1 px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              /* 로딩 스켈레톤 */
              <div className="grid grid-cols-4 gap-4 auto-rows-[200px]">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'bg-gray-200 rounded-lg animate-pulse',
                      i % 3 === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
                    )}
                  />
                ))}
              </div>
            ) : (
              /* 실제 프로젝트 그리드 */
              <div className="grid grid-cols-4 gap-4 auto-rows-[200px]">
                {displayProjects.map((project, index) => (
                  <GridItem
                    key={project.id}
                    project={project}
                    index={index}
                    isActive={hoveredProject?.id === project.id}
                    onHover={setHoveredProject}
                    onClick={handleProjectClick}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 하단 내비게이션 */}
        <div className="flex-shrink-0 pb-8 px-6">
          <div className="max-w-4xl mx-auto flex justify-center items-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex items-center gap-2"
            >
              <span className="text-sm text-muted-foreground">
                작품을 클릭하여 자세히 보기
              </span>
              <svg
                className="w-4 h-4 text-accent-coral animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 현재 호버된 프로젝트 정보 (데스크톱 전용) */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed top-1/2 right-8 transform -translate-y-1/2 z-50 bg-white/90 dark:bg-dark-card/90 backdrop-blur-md rounded-lg p-4 shadow-lg max-w-xs hidden lg:block"
          >
            <h4 className="font-semibold mb-2">{hoveredProject.title}</h4>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
              {hoveredProject.description}
            </p>
            <div className="flex flex-wrap gap-1 mb-3">
              {hoveredProject.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-accent-coral/20 text-accent-coral px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{hoveredProject.category}</span>
              <span>{hoveredProject.duration}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// 반응형 그리드 훅 (모바일 대응)
export function useResponsiveGrid() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
} 