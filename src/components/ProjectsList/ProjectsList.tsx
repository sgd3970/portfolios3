/**
 * 프로젝트 목록 컴포넌트
 * 비대칭 레이아웃과 다양한 크기의 프로젝트 카드들을 표시
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { portfolioData, projectCategories } from '@/data/portfolioData';
import { IProject, ProjectCategory } from '@/types';
import { ProjectCard } from '@/components/ProjectCard/ProjectCard';

// 프로젝트 목록 Props 인터페이스
interface ProjectsListProps {
  /** 추가 클래스명 */
  className?: string;
  /** 초기 표시할 프로젝트 수 */
  initialCount?: number;
  /** 필터 표시 여부 */
  showFilters?: boolean;
  /** 검색 기능 표시 여부 */
  showSearch?: boolean;
  /** 정렬 기능 표시 여부 */
  showSort?: boolean;
  /** 무한 스크롤 사용 여부 */
  infiniteScroll?: boolean;
  /** 격자 타입 */
  gridType?: 'masonry' | 'standard' | 'creative';
  /** 섹션 제목 */
  title?: string;
  /** 섹션 설명 */
  description?: string;
}

// 필터 옵션 인터페이스
interface FilterOptions {
  category: ProjectCategory | 'all';
  sortBy: 'date' | 'title' | 'priority';
  sortOrder: 'asc' | 'desc';
  searchTerm: string;
}

// 컨테이너 애니메이션 변형
const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// 필터 바 애니메이션 변형
const filterVariants = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  }
};

// 섹션 헤더 애니메이션 변형
const headerVariants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  }
};

/**
 * 프로젝트 목록 컴포넌트
 * 비대칭 레이아웃과 다양한 크기의 프로젝트 카드들을 표시
 */
export default function ProjectsList({
  className,
  initialCount = 12,
  showFilters = true,
  showSearch = true,
  showSort = true,
  infiniteScroll = false,
  gridType = 'masonry',
  title = '포트폴리오',
  description = '다양한 프로젝트들을 확인해보세요'
}: ProjectsListProps) {
  // 상태 관리
  const [filteredProjects, setFilteredProjects] = useState<IProject[]>([]);
  const [displayedProjects, setDisplayedProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentCount, setCurrentCount] = useState(initialCount);
  
  // 필터 상태
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    sortBy: 'priority',
    sortOrder: 'desc',
    searchTerm: ''
  });

  // 프로젝트 필터링 및 정렬 함수
  const filterAndSortProjects = (projects: IProject[], options: FilterOptions): IProject[] => {
    let filtered = [...projects];

    // 카테고리 필터
    if (options.category !== 'all') {
      filtered = filtered.filter(project => project.category === options.category);
    }

    // 검색 필터
    if (options.searchTerm) {
      const searchLower = options.searchTerm.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // 정렬
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (options.sortBy) {
        case 'date':
          aValue = new Date(a.updatedAt);
          bValue = new Date(b.updatedAt);
          break;
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'priority':
          aValue = a.priority;
          bValue = b.priority;
          break;
        default:
          aValue = a.priority;
          bValue = b.priority;
      }

      if (options.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  // 프로젝트 데이터 초기화 및 필터링
  useEffect(() => {
    const filtered = filterAndSortProjects(portfolioData, filters);
    setFilteredProjects(filtered);
    setDisplayedProjects(filtered.slice(0, currentCount));
    setHasMore(filtered.length > currentCount);
    setIsLoading(false);
  }, [filters, currentCount]);

  // 더 많은 프로젝트 로드
  const loadMoreProjects = () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    
    setTimeout(() => {
      const newCount = currentCount + initialCount;
      const newDisplayed = filteredProjects.slice(0, newCount);
      
      setDisplayedProjects(newDisplayed);
      setCurrentCount(newCount);
      setHasMore(filteredProjects.length > newCount);
      setLoadingMore(false);
    }, 1000);
  };

  // 필터 변경 핸들러
  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentCount(initialCount);
  };

  // 무한 스크롤 이벤트
  useEffect(() => {
    if (!infiniteScroll) return;

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMoreProjects();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [infiniteScroll, loadingMore, hasMore]);

  // 그리드 스타일 결정
  const getGridClasses = () => {
    switch (gridType) {
      case 'masonry':
        return 'columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6';
      case 'standard':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';
      case 'creative':
        return 'grid grid-cols-12 gap-4 auto-rows-[200px]';
      default:
        return 'columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6';
    }
  };

  // 크리에이티브 그리드 아이템 크기 결정
  const getCreativeGridSize = (index: number) => {
    const patterns = [
      'col-span-6 row-span-2',  // 큰 카드
      'col-span-3 row-span-1',  // 중간 카드
      'col-span-3 row-span-1',  // 중간 카드
      'col-span-4 row-span-1',  // 가로 카드
      'col-span-4 row-span-1',  // 가로 카드
      'col-span-4 row-span-1',  // 가로 카드
      'col-span-6 row-span-1',  // 넓은 카드
      'col-span-3 row-span-2',  // 세로 카드
      'col-span-3 row-span-1',  // 중간 카드
      'col-span-6 row-span-1',  // 넓은 카드
    ];
    return patterns[index % patterns.length];
  };

  return (
    <section className={cn(
      'py-20 px-6 bg-gradient-to-b from-background to-muted/30',
      className
    )}>
      <div className="max-w-7xl mx-auto">
        {/* 섹션 헤더 */}
        <motion.div
          variants={headerVariants}
          initial="initial"
          animate="animate"
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl lg:text-5xl font-black mb-4">
            <span className="text-gradient">{title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* 필터 및 검색 바 */}
        {(showFilters || showSearch || showSort) && (
          <motion.div
            variants={filterVariants}
            initial="initial"
            animate="animate"
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* 카테고리 필터 */}
              {showFilters && (
                <div className="flex flex-wrap gap-2">
                  {projectCategories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => handleFilterChange('category', category.value)}
                      className={cn(
                        'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                        filters.category === category.value
                          ? 'bg-accent-coral text-white shadow-md'
                          : 'bg-white dark:bg-dark-card text-foreground hover:bg-accent-coral/10'
                      )}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              )}

              {/* 검색 및 정렬 */}
              <div className="flex gap-4 items-center">
                {/* 검색 입력 */}
                {showSearch && (
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="프로젝트 검색..."
                      value={filters.searchTerm}
                      onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                      className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent-coral"
                    />
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                )}

                {/* 정렬 선택 */}
                {showSort && (
                  <select
                    value={`${filters.sortBy}-${filters.sortOrder}`}
                    onChange={(e) => {
                      const [sortBy, sortOrder] = e.target.value.split('-');
                      handleFilterChange('sortBy', sortBy);
                      handleFilterChange('sortOrder', sortOrder);
                    }}
                    className="px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent-coral"
                  >
                    <option value="priority-desc">우선순위 높은순</option>
                    <option value="priority-asc">우선순위 낮은순</option>
                    <option value="date-desc">최신순</option>
                    <option value="date-asc">오래된순</option>
                    <option value="title-asc">제목순</option>
                    <option value="title-desc">제목 역순</option>
                  </select>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* 프로젝트 그리드 */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {isLoading ? (
            /* 로딩 스켈레톤 */
            <div className={getGridClasses()}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'bg-gray-200 rounded-lg animate-pulse',
                    gridType === 'masonry' ? 'mb-6 h-64' : 'h-80',
                    gridType === 'creative' && getCreativeGridSize(i)
                  )}
                />
              ))}
            </div>
          ) : displayedProjects.length === 0 ? (
            /* 검색 결과 없음 */
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold mb-2">검색 결과가 없습니다</h3>
              <p className="text-muted-foreground">
                다른 키워드로 검색해보시거나 필터를 조정해보세요.
              </p>
            </div>
          ) : (
            /* 프로젝트 카드들 */
            <div className={getGridClasses()}>
              {displayedProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={cn(
                    gridType === 'masonry' && 'mb-6 break-inside-avoid',
                    gridType === 'creative' && getCreativeGridSize(index)
                  )}
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    layout={gridType}
                  />
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* 더 보기 버튼 */}
        {!infiniteScroll && hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={loadMoreProjects}
              disabled={loadingMore}
              className={cn(
                'px-8 py-3 bg-accent-coral text-white rounded-lg font-medium',
                'hover:bg-accent-coral/90 transition-colors duration-200',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              {loadingMore ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  로딩 중...
                </span>
              ) : (
                '더 보기'
              )}
            </button>
          </div>
        )}

        {/* 프로젝트 통계 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-sm text-muted-foreground">
            <div>
              <span className="font-semibold text-foreground">
                {displayedProjects.length}
              </span>
              <span> / {filteredProjects.length} 프로젝트</span>
            </div>
            <div>
              <span className="font-semibold text-foreground">
                {projectCategories.length - 1}
              </span>
              <span> 카테고리</span>
            </div>
            <div>
              <span className="font-semibold text-foreground">
                {portfolioData.reduce((acc, project) => acc + project.tags.length, 0)}
              </span>
              <span> 태그</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// 사용 예시 컴포넌트들
export const FeaturedProjects = () => (
  <ProjectsList
    title="주요 프로젝트"
    description="가장 인상적인 작업들을 만나보세요"
    initialCount={6}
    showFilters={false}
    showSearch={false}
    gridType="creative"
  />
);

export const RecentProjects = () => (
  <ProjectsList
    title="최근 작업"
    description="최신 프로젝트들을 확인해보세요"
    initialCount={8}
    showSort={false}
    gridType="masonry"
  />
);

export const AllProjects = () => (
  <ProjectsList
    title="모든 프로젝트"
    description="전체 포트폴리오를 탐색해보세요"
    infiniteScroll={true}
    gridType="masonry"
  />
); 