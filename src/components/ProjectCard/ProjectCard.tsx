/**
 * 프로젝트 카드 컴포넌트
 * 개별 프로젝트 정보를 표시하는 인터랙티브 카드
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
import { IProject } from '@/types';

// 프로젝트 카드 Props 인터페이스
interface ProjectCardProps {
  /** 프로젝트 데이터 */
  project: IProject;
  /** 카드 인덱스 (애니메이션 지연용) */
  index: number;
  /** 레이아웃 타입 */
  layout?: 'masonry' | 'standard' | 'creative';
  /** 카드 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 호버 효과 */
  hoverEffect?: 'lift' | 'scale' | 'glow' | 'creative';
  /** 추가 클래스명 */
  className?: string;
  /** 클릭 이벤트 핸들러 */
  onClick?: (project: IProject) => void;
  /** 즐겨찾기 토글 핸들러 */
  onToggleFavorite?: (projectId: string) => void;
  /** 즐겨찾기 여부 */
  isFavorite?: boolean;
  /** 로딩 상태 */
  isLoading?: boolean;
}

// 카드 크기 스타일
const sizeStyles = {
  sm: 'min-h-[250px]',
  md: 'min-h-[300px]',
  lg: 'min-h-[350px]'
};

// 호버 효과 스타일
const hoverEffectStyles = {
  lift: 'hover:-translate-y-2 hover:shadow-lg',
  scale: 'hover:scale-105',
  glow: 'hover:shadow-glow',
  creative: 'hover:shadow-neon hover:scale-105'
};

// 애니메이션 변형들
const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: index * 0.1
    }
  }),
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3
    }
  }
};

// 이미지 오버레이 변형
const overlayVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

// 태그 애니메이션 변형
const tagVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      delay: index * 0.05
    }
  })
};

/**
 * 프로젝트 카드 컴포넌트
 * 개별 프로젝트 정보를 표시하는 인터랙티브 카드
 */
export function ProjectCard({
  project,
  index,
  layout = 'masonry',
  size = 'md',
  hoverEffect = 'lift',
  className,
  onClick,
  onToggleFavorite,
  isFavorite = false,
  isLoading = false
}: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // 카드 클릭 핸들러
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick(project);
    }
  };

  // 즐겨찾기 토글 핸들러
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(project.id);
    }
  };

  // 색상 테마에 따른 스타일
  const getThemeStyles = () => {
    switch (project.colorTheme) {
      case 'coral':
        return 'border-accent-coral/20 hover:border-accent-coral/40';
      case 'mint':
        return 'border-accent-mint/20 hover:border-accent-mint/40';
      case 'sunshine':
        return 'border-accent-sunshine/20 hover:border-accent-sunshine/40';
      case 'electric':
        return 'border-accent-electric/20 hover:border-accent-electric/40';
      case 'gradient':
        return 'border-gradient-from/20 hover:border-gradient-from/40';
      default:
        return 'border-border hover:border-accent-coral/40';
    }
  };

  if (isLoading) {
    return (
      <div className={cn(
        'relative overflow-hidden rounded-lg border bg-card animate-pulse',
        sizeStyles[size],
        className
      )}>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300" />
      </div>
    );
  }

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'group relative overflow-hidden rounded-lg border-2 bg-card cursor-pointer',
        'transition-all duration-300 ease-in-out',
        sizeStyles[size],
        hoverEffectStyles[hoverEffect],
        getThemeStyles(),
        className
      )}
    >
      <Link href={`/projects/${project.id}`} onClick={handleCardClick}>
        {/* 프로젝트 이미지 */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.thumbnailUrl || project.imageUrls[0] || '/images/placeholder.jpg'}
            alt={project.title}
            fill
            className={cn(
              'object-cover transition-all duration-500 group-hover:scale-110',
              imageLoaded ? 'blur-0' : 'blur-sm'
            )}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* 로딩 플레이스홀더 */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
          )}
          
          {/* 호버 오버레이 */}
          <motion.div
            variants={overlayVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="text-white text-center">
              <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center mb-2 mx-auto">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium">자세히 보기</p>
            </div>
          </motion.div>
          
          {/* 즐겨찾기 버튼 */}
          {onToggleFavorite && (
            <button
              onClick={handleToggleFavorite}
              className={cn(
                'absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200',
                isFavorite
                  ? 'bg-accent-coral text-white'
                  : 'bg-white/20 text-white hover:bg-white/30'
              )}
            >
              <svg
                className="w-4 h-4"
                fill={isFavorite ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          )}
          
          {/* 카테고리 배지 */}
          <div className="absolute top-3 left-3">
            <span className={cn(
              'px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm',
              project.colorTheme === 'coral' && 'bg-accent-coral/20 text-accent-coral border border-accent-coral/30',
              project.colorTheme === 'mint' && 'bg-accent-mint/20 text-accent-mint border border-accent-mint/30',
              project.colorTheme === 'sunshine' && 'bg-accent-sunshine/20 text-accent-sunshine border border-accent-sunshine/30',
              project.colorTheme === 'electric' && 'bg-accent-electric/20 text-accent-electric border border-accent-electric/30',
              !project.colorTheme && 'bg-white/20 text-white border border-white/30'
            )}>
              {project.category}
            </span>
          </div>
        </div>

        {/* 프로젝트 정보 */}
        <div className="p-4">
          {/* 제목 */}
          <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-accent-coral transition-colors duration-200">
            {project.title}
          </h3>
          
          {/* 설명 */}
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {project.description}
          </p>
          
          {/* 태그 */}
          <div className="flex flex-wrap gap-1 mb-3">
            {project.tags.slice(0, 3).map((tag, tagIndex) => (
              <motion.span
                key={tag}
                custom={tagIndex}
                variants={tagVariants}
                initial="initial"
                animate="animate"
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
              >
                {tag}
              </motion.span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
          
          {/* 메타 정보 */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>{formatDate(project.updatedAt)}</span>
              {project.duration && (
                <span>{project.duration}</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              <span>{project.processSteps.length} 단계</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// 프로젝트 카드 스켈레톤 컴포넌트
export function ProjectCardSkeleton({
  className,
  size = 'md'
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  return (
    <div className={cn(
      'relative overflow-hidden rounded-lg border bg-card animate-pulse',
      sizeStyles[size],
      className
    )}>
      <div className="h-48 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300" />
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded mb-2" />
        <div className="h-4 bg-gray-200 rounded mb-1" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
        <div className="flex gap-2 mb-3">
          <div className="h-6 bg-gray-300 rounded-full w-16" />
          <div className="h-6 bg-gray-300 rounded-full w-12" />
        </div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-20" />
          <div className="h-4 bg-gray-200 rounded w-16" />
        </div>
      </div>
    </div>
  );
}

// 다양한 크기의 프로젝트 카드 변형들
export const SmallProjectCard = (props: Omit<ProjectCardProps, 'size'>) => (
  <ProjectCard {...props} size="sm" />
);

export const LargeProjectCard = (props: Omit<ProjectCardProps, 'size'>) => (
  <ProjectCard {...props} size="lg" />
);

export const CreativeProjectCard = (props: Omit<ProjectCardProps, 'hoverEffect'>) => (
  <ProjectCard {...props} hoverEffect="creative" />
);

export const FeaturedProjectCard = (props: ProjectCardProps) => (
  <ProjectCard 
    {...props} 
    size="lg" 
    hoverEffect="glow" 
    className="border-accent-coral/30 shadow-lg"
  />
);

export default ProjectCard; 