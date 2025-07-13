/**
 * 프로젝트 전체에서 사용하는 TypeScript 인터페이스와 타입 정의
 */

// 프로젝트 관련 타입들
export interface IProject {
  /** 프로젝트 고유 ID */
  id: string;
  /** 프로젝트 제목 */
  title: string;
  /** 프로젝트 간단 설명 */
  description: string;
  /** 프로젝트 카테고리 */
  category: ProjectCategory;
  /** 프로젝트 이미지 URL 배열 */
  imageUrls: string[];
  /** 프로젝트 영상 URL (선택사항) */
  videoUrl?: string;
  /** YouTube 영상 ID (선택사항) */
  youtubeId?: string;
  /** 프로젝트 작업 과정 단계들 */
  processSteps: IProcessStep[];
  /** 사용된 도구들 */
  toolsUsed: string[];
  /** 프로젝트 태그들 */
  tags: string[];
  /** 프로젝트 생성 날짜 */
  createdAt: Date;
  /** 프로젝트 업데이트 날짜 */
  updatedAt: Date;
  /** 프로젝트 완료 여부 */
  isCompleted: boolean;
  /** 프로젝트 공개 여부 */
  isPublic: boolean;
  /** 프로젝트 우선순위 (1-10) */
  priority: number;
  /** 프로젝트 색상 테마 */
  colorTheme?: ColorTheme;
  /** 프로젝트 외부 링크들 */
  externalLinks?: IExternalLink[];
  /** 프로젝트 클라이언트 정보 */
  client?: IClient;
  /** 프로젝트 기간 */
  duration?: string;
  /** 프로젝트 썸네일 이미지 URL */
  thumbnailUrl?: string;
}

// 프로젝트 카테고리 타입
export type ProjectCategory = 
  | 'graphic-design'
  | 'web-design'
  | 'ui-ux'
  | 'branding'
  | 'illustration'
  | 'photography'
  | 'motion-graphics'
  | 'print-design'
  | 'packaging'
  | 'digital-art'
  | 'typography'
  | 'logo-design'
  | 'other';

// 프로젝트 작업 과정 단계 인터페이스
export interface IProcessStep {
  /** 단계 고유 ID */
  id: string;
  /** 단계 제목 */
  title: string;
  /** 단계 설명 */
  description: string;
  /** 단계 이미지 URL (선택사항) */
  imageUrl?: string;
  /** 단계 순서 */
  order: number;
  /** 단계 완료 여부 */
  isCompleted: boolean;
}

// 외부 링크 인터페이스
export interface IExternalLink {
  /** 링크 제목 */
  title: string;
  /** 링크 URL */
  url: string;
  /** 링크 타입 */
  type: 'website' | 'github' | 'behance' | 'dribbble' | 'instagram' | 'youtube' | 'linkedin' | 'other';
  /** 링크 아이콘 (선택사항) */
  icon?: string;
}

// 클라이언트 정보 인터페이스
export interface IClient {
  /** 클라이언트 이름 */
  name: string;
  /** 클라이언트 회사명 */
  company?: string;
  /** 클라이언트 웹사이트 */
  website?: string;
  /** 클라이언트 로고 URL */
  logoUrl?: string;
}

// 색상 테마 타입
export type ColorTheme = 
  | 'coral'
  | 'mint'
  | 'sunshine'
  | 'lavender'
  | 'peach'
  | 'electric'
  | 'lime'
  | 'sunset'
  | 'gradient'
  | 'monochrome';

// 네비게이션 메뉴 아이템 인터페이스
export interface INavItem {
  /** 메뉴 제목 */
  title: string;
  /** 메뉴 링크 */
  href: string;
  /** 메뉴 아이콘 (선택사항) */
  icon?: string;
  /** 서브메뉴 (선택사항) */
  subItems?: INavItem[];
  /** 메뉴 활성화 여부 */
  isActive?: boolean;
  /** 외부 링크 여부 */
  isExternal?: boolean;
}

// 소셜 미디어 링크 인터페이스
export interface ISocialLink {
  /** 플랫폼 이름 */
  platform: SocialPlatform;
  /** 프로필 URL */
  url: string;
  /** 사용자명 */
  username?: string;
  /** 플랫폼 아이콘 */
  icon: string;
  /** 플랫폼 색상 */
  color: string;
}

// 소셜 미디어 플랫폼 타입
export type SocialPlatform = 
  | 'instagram'
  | 'behance'
  | 'dribbble'
  | 'linkedin'
  | 'twitter'
  | 'youtube'
  | 'github'
  | 'facebook'
  | 'pinterest'
  | 'tiktok'
  | 'email';

// 사용자/아티스트 정보 인터페이스
export interface IArtist {
  /** 아티스트 이름 */
  name: string;
  /** 아티스트 직책/전문분야 */
  title: string;
  /** 아티스트 소개 */
  bio: string;
  /** 프로필 이미지 URL */
  profileImageUrl?: string;
  /** 이메일 주소 */
  email: string;
  /** 전화번호 */
  phone?: string;
  /** 위치 */
  location?: string;
  /** 소셜 미디어 링크들 */
  socialLinks: ISocialLink[];
  /** 전문 기술들 */
  skills: string[];
  /** 경력 년수 */
  experience?: number;
  /** 웹사이트 URL */
  website?: string;
  /** 이력서 URL */
  resumeUrl?: string;
}

// 문의 폼 인터페이스
export interface IContactForm {
  /** 이름 */
  name: string;
  /** 이메일 주소 */
  email: string;
  /** 회사명 (선택사항) */
  company?: string;
  /** 연락처 (선택사항) */
  phone?: string;
  /** 프로젝트 유형 */
  projectType?: ProjectCategory;
  /** 예산 범위 */
  budget?: BudgetRange;
  /** 문의 내용 */
  message: string;
  /** 개인정보 처리 동의 */
  privacyConsent: boolean;
  /** 마케팅 수신 동의 */
  marketingConsent?: boolean;
}

// 예산 범위 타입
export type BudgetRange = 
  | 'under-1000'
  | '1000-5000'
  | '5000-10000'
  | '10000-20000'
  | 'over-20000'
  | 'discuss';

// 애니메이션 설정 인터페이스
export interface IAnimationSettings {
  /** 애니메이션 지속 시간 (ms) */
  duration: number;
  /** 애니메이션 지연 시간 (ms) */
  delay?: number;
  /** 애니메이션 이징 함수 */
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | string;
  /** 애니메이션 반복 횟수 */
  repeat?: number;
  /** 애니메이션 방향 */
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  /** 애니메이션 끝 상태 유지 */
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
}

// 테마 설정 인터페이스
export interface IThemeSettings {
  /** 다크 모드 활성화 여부 */
  isDarkMode: boolean;
  /** 주요 색상 */
  primaryColor: string;
  /** 액센트 색상 */
  accentColor: string;
  /** 폰트 크기 */
  fontSize: 'small' | 'medium' | 'large';
  /** 애니메이션 속도 */
  animationSpeed: 'slow' | 'normal' | 'fast';
  /** 접근성 설정 */
  accessibility: {
    /** 움직임 줄이기 */
    reduceMotion: boolean;
    /** 고대비 모드 */
    highContrast: boolean;
    /** 키보드 네비게이션 */
    keyboardNavigation: boolean;
  };
}

// API 응답 인터페이스
export interface IApiResponse<T = any> {
  /** 응답 성공 여부 */
  success: boolean;
  /** 응답 데이터 */
  data?: T;
  /** 에러 메시지 */
  error?: string;
  /** 응답 메시지 */
  message?: string;
  /** 응답 상태 코드 */
  statusCode?: number;
}

// 페이지네이션 인터페이스
export interface IPagination {
  /** 현재 페이지 */
  currentPage: number;
  /** 총 페이지 수 */
  totalPages: number;
  /** 페이지당 항목 수 */
  itemsPerPage: number;
  /** 총 항목 수 */
  totalItems: number;
  /** 다음 페이지 존재 여부 */
  hasNextPage: boolean;
  /** 이전 페이지 존재 여부 */
  hasPreviousPage: boolean;
}

// 필터 옵션 인터페이스
export interface IFilterOptions {
  /** 카테고리 필터 */
  categories?: ProjectCategory[];
  /** 태그 필터 */
  tags?: string[];
  /** 날짜 범위 필터 */
  dateRange?: {
    from: Date;
    to: Date;
  };
  /** 정렬 옵션 */
  sortBy?: 'date' | 'title' | 'priority' | 'category';
  /** 정렬 방향 */
  sortOrder?: 'asc' | 'desc';
  /** 검색 키워드 */
  searchKeyword?: string;
}

// 로딩 상태 타입
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// 에러 정보 인터페이스
export interface IError {
  /** 에러 메시지 */
  message: string;
  /** 에러 코드 */
  code?: string;
  /** 에러 상세 정보 */
  details?: any;
  /** 에러 발생 시간 */
  timestamp?: Date;
}

// 유틸리티 타입들
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// 컴포넌트 Props 공통 타입
export interface IBaseProps {
  /** 컴포넌트 클래스명 */
  className?: string;
  /** 컴포넌트 ID */
  id?: string;
  /** 자식 요소들 */
  children?: React.ReactNode;
  /** 커스텀 스타일 */
  style?: React.CSSProperties;
  /** 테스트 ID */
  testId?: string;
} 