/**
 * 포트폴리오 더미 데이터
 * 실제 프로젝트 데이터를 담은 배열
 */

import { IProject, IArtist, ISocialLink } from '@/types';

// 아티스트 정보
export const artistData: IArtist = {
  name: 'Alex Creative',
  title: 'Creative Designer & Digital Artist',
  bio: `창의적인 디지털 아트와 혁신적인 디자인을 통해 
  브랜드와 사용자를 연결하는 디자이너입니다. 
  8년간의 경험을 바탕으로 그래픽 디자인, UI/UX, 브랜딩 등 
  다양한 분야에서 독창적인 작품을 선보이고 있습니다.`,
  profileImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  email: 'test@test.com',
  phone: '+82 10-1234-5678',
  location: 'Seoul, South Korea',
  socialLinks: [
    {
      platform: 'instagram',
      url: '#',
      username: '@alexcreative',
      icon: 'instagram',
      color: '#E4405F'
    },
    {
      platform: 'behance',
      url: '#',
      username: 'alexcreative',
      icon: 'behance',
      color: '#1769FF'
    },
    {
      platform: 'dribbble',
      url: '#',
      username: 'alexcreative',
      icon: 'dribbble',
      color: '#EA4C89'
    },
    {
      platform: 'linkedin',
      url: '#',
      username: 'alexcreative',
      icon: 'linkedin',
      color: '#0077B5'
    },
    {
      platform: 'youtube',
      url: '#',
      username: '@alexcreative',
      icon: 'youtube',
      color: '#FF0000'
    }
  ] as ISocialLink[],
  skills: [
    'Adobe Creative Suite',
    'Figma',
    'Sketch',
    'Adobe After Effects',
    'Cinema 4D',
    'Blender',
    'Photoshop',
    'Illustrator',
    'InDesign',
    'Premiere Pro',
    'UI/UX Design',
    'Branding',
    'Typography',
    'Motion Graphics',
    'Web Design',
    'Print Design'
  ],
  experience: 8,
  website: '#',
  resumeUrl: '/downloads/alex-creative-resume.pdf'
};

// 포트폴리오 프로젝트 더미 데이터
export const portfolioData: IProject[] = [
  {
    id: 'ocean-waves-motion',
    title: '바다의 파도 모션 그래픽',
    description: '자연의 힘과 아름다움을 표현한 바다 파도 모션 그래픽 프로젝트입니다. 파도의 움직임과 바다의 신비로운 분위기를 시각적으로 구현했습니다.',
    category: 'motion-graphics',
    imageUrls: [
      'https://picsum.photos/800/600?random=1',
      'https://picsum.photos/800/600?random=2',
      'https://picsum.photos/800/600?random=3',
      'https://picsum.photos/800/600?random=4',
      'https://picsum.photos/800/600?random=5'
    ],
    thumbnailUrl: '/videos/thumbnails/thumbnail.png',
    videoUrl: '/videos/projects/testVideo.mp4',
    youtubeId: 'dQw4w9WgXcQ',
    processSteps: [
      {
        id: 'research',
        title: '자연 관찰 및 분석',
        description: '실제 바다 파도의 움직임과 패턴을 관찰하고 분석하여 자연스러운 동작을 연구했습니다.',
        imageUrl: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600&h=400&fit=crop',
        order: 1,
        isCompleted: true
      },
      {
        id: 'concept',
        title: '컨셉 개발',
        description: '바다의 신비로운 분위기와 파도의 역동적인 움직임을 결합한 독특한 컨셉을 개발했습니다.',
        imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop',
        order: 2,
        isCompleted: true
      },
      {
        id: 'motion-design',
        title: '모션 디자인',
        description: '파도의 자연스러운 움직임을 모션 그래픽으로 재현하여 매혹적인 시각 효과를 만들었습니다.',
        imageUrl: 'https://images.unsplash.com/photo-1569163139993-de4ac7feda1c?w=600&h=400&fit=crop',
        order: 3,
        isCompleted: true
      },
      {
        id: 'color-grading',
        title: '색상 보정',
        description: '바다의 다양한 색상을 표현하고 시간대별 분위기를 반영한 색상 보정을 진행했습니다.',
        imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
        order: 4,
        isCompleted: true
      },
      {
        id: 'final-rendering',
        title: '최종 렌더링',
        description: '고품질 렌더링과 사운드 디자인을 통해 완성도 높은 최종 작품을 제작했습니다.',
        imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop',
        order: 5,
        isCompleted: true
      }
    ],
    toolsUsed: [
      'Adobe After Effects',
      'Adobe Premiere Pro',
      'Cinema 4D',
      'DaVinci Resolve',
      'Adobe Audition'
    ],
    tags: ['모션그래픽', '바다', '파도', '자연', '영상', '애니메이션', '블루'],
    createdAt: new Date('2023-09-15'),
    updatedAt: new Date('2023-10-20'),
    isCompleted: true,
    isPublic: true,
    priority: 10,
    colorTheme: 'gradient',
    externalLinks: [
      {
        title: 'Behance에서 보기',
        url: 'https://behance.net/gallery/ocean-waves-motion',
        type: 'behance'
      },
      {
        title: '유튜브에서 보기',
        url: 'https://youtube.com/watch?v=ocean-waves',
        type: 'youtube'
      }
    ],
    client: {
      name: 'Ocean Media',
      company: 'Ocean Media Studios',
      website: 'https://ocean-media.com',
      logoUrl: 'https://images.unsplash.com/photo-1614680376573-df3480f32df2?w=200&h=100&fit=crop'
    },
    duration: '3개월'
  },
  {
    id: 'urban-app-ui',
    title: 'Urban Transit 앱 UI/UX',
    description: '도시 교통 정보를 제공하는 모바일 앱의 UI/UX 디자인 프로젝트입니다. 사용자 친화적인 인터페이스와 직관적인 네비게이션을 구현했습니다.',
    category: 'ui-ux',
    imageUrls: [
      'https://picsum.photos/800/600?random=10',
      'https://picsum.photos/800/600?random=11',
      'https://picsum.photos/800/600?random=12',
      'https://picsum.photos/800/600?random=13',
      'https://picsum.photos/800/600?random=14'
    ],
    thumbnailUrl: 'https://picsum.photos/400/300?random=10',
    videoUrl: '/videos/demos/testVideo.mp4',
    processSteps: [
      {
        id: 'user-research',
        title: '사용자 조사',
        description: '대중교통 이용자들의 니즈와 페인포인트를 조사했습니다.',
        imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop',
        order: 1,
        isCompleted: true
      },
      {
        id: 'wireframing',
        title: '와이어프레임',
        description: '앱의 기본 구조와 정보 아키텍처를 설계했습니다.',
        imageUrl: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop',
        order: 2,
        isCompleted: true
      },
      {
        id: 'ui-design',
        title: 'UI 디자인',
        description: '모던하고 직관적인 사용자 인터페이스를 디자인했습니다.',
        imageUrl: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=600&h=400&fit=crop',
        order: 3,
        isCompleted: true
      },
      {
        id: 'prototyping',
        title: '프로토타이핑',
        description: '인터랙티브 프로토타입을 제작하여 사용자 테스트를 진행했습니다.',
        imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop',
        order: 4,
        isCompleted: true
      }
    ],
    toolsUsed: [
      'Figma',
      'Sketch',
      'Adobe XD',
      'Principle',
      'Zeplin'
    ],
    tags: ['UI/UX', '모바일앱', '교통', '프로토타이핑', '사용자경험'],
    createdAt: new Date('2023-07-10'),
    updatedAt: new Date('2023-08-25'),
    isCompleted: true,
    isPublic: true,
    priority: 9,
    colorTheme: 'electric',
    externalLinks: [
      {
        title: 'Figma 프로토타입',
        url: 'https://figma.com/proto/urban-transit',
        type: 'website'
      }
    ],
    client: {
      name: 'Urban Solutions',
      company: 'Urban Solutions Inc.',
      website: 'https://urbansolutions.com'
    },
    duration: '2개월'
  },
  {
    id: 'nature-magazine',
    title: '자연 다큐멘터리 매거진',
    description: '자연과 환경을 주제로 한 매거진의 레이아웃과 타이포그래피 디자인 프로젝트입니다. 자연의 아름다움을 시각적으로 전달하는 데 중점을 두었습니다.',
    category: 'print-design',
    imageUrls: [
      'https://picsum.photos/800/600?random=20',
      'https://picsum.photos/800/600?random=21',
      'https://picsum.photos/800/600?random=22',
      'https://picsum.photos/800/600?random=23',
      'https://picsum.photos/800/600?random=24'
    ],
    thumbnailUrl: 'https://picsum.photos/400/300?random=20',
    processSteps: [
      {
        id: 'content-analysis',
        title: '콘텐츠 분석',
        description: '매거진의 주제와 타겟 독자층을 분석했습니다.',
        imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
        order: 1,
        isCompleted: true
      },
      {
        id: 'layout-design',
        title: '레이아웃 디자인',
        description: '읽기 쉽고 시각적으로 매력적인 레이아웃을 설계했습니다.',
        imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop',
        order: 2,
        isCompleted: true
      },
      {
        id: 'typography',
        title: '타이포그래피',
        description: '자연의 느낌을 표현할 수 있는 폰트 조합을 선택했습니다.',
        imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop',
        order: 3,
        isCompleted: true
      },
      {
        id: 'print-production',
        title: '인쇄 제작',
        description: '최적의 인쇄 품질을 위한 색상 보정과 파일 준비를 진행했습니다.',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
        order: 4,
        isCompleted: true
      }
    ],
    toolsUsed: [
      'Adobe InDesign',
      'Adobe Photoshop',
      'Adobe Illustrator'
    ],
    tags: ['인쇄물', '매거진', '레이아웃', '타이포그래피', '자연', '환경'],
    createdAt: new Date('2023-05-01'),
    updatedAt: new Date('2023-06-15'),
    isCompleted: true,
    isPublic: true,
    priority: 8,
    colorTheme: 'mint',
    externalLinks: [
      {
        title: 'Behance에서 보기',
        url: 'https://behance.net/gallery/nature-magazine',
        type: 'behance'
      }
    ],
    client: {
      name: 'Nature Publishing',
      company: 'Nature Publishing House',
      website: 'https://naturepublishing.com'
    },
    duration: '1.5개월'
  },
  {
    id: 'festival-poster',
    title: '음악 페스티벌 포스터',
    description: '여름 음악 페스티벌을 위한 역동적이고 화려한 포스터 시리즈입니다. 음악의 에너지와 축제의 분위기를 시각적으로 표현했습니다.',
    category: 'graphic-design',
    imageUrls: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493020258366-be3ead61c4d2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549451371-64aa98a6f773?w=800&h=600&fit=crop'
    ],
    thumbnailUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    processSteps: [
      {
        id: 'concept-development',
        title: '컨셉 개발',
        description: '페스티벌의 분위기와 음악 장르를 반영한 컨셉을 개발했습니다.',
        imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
        order: 1,
        isCompleted: true
      },
      {
        id: 'visual-exploration',
        title: '비주얼 탐색',
        description: '다양한 그래픽 요소와 색상 조합을 실험했습니다.',
        imageUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&h=400&fit=crop',
        order: 2,
        isCompleted: true
      },
      {
        id: 'poster-design',
        title: '포스터 디자인',
        description: '최종 포스터 디자인과 다양한 크기의 변형을 제작했습니다.',
        imageUrl: 'https://images.unsplash.com/photo-1493020258366-be3ead61c4d2?w=600&h=400&fit=crop',
        order: 3,
        isCompleted: true
      }
    ],
    toolsUsed: [
      'Adobe Illustrator',
      'Adobe Photoshop',
      'Adobe After Effects'
    ],
    tags: ['그래픽디자인', '포스터', '음악', '페스티벌', '타이포그래피', '컬러풀'],
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2023-04-10'),
    isCompleted: true,
    isPublic: true,
    priority: 7,
    colorTheme: 'sunset',
    externalLinks: [
      {
        title: 'Instagram에서 보기',
        url: 'https://instagram.com/p/festival-poster',
        type: 'instagram'
      }
    ],
    client: {
      name: 'Summer Beats Festival',
      company: 'Summer Beats Organization',
      website: 'https://summerbeatsfestival.com'
    },
    duration: '3주'
  },
  {
    id: 'tech-startup-identity',
    title: '테크 스타트업 브랜드 아이덴티티',
    description: 'AI 기반 스타트업의 브랜드 아이덴티티 디자인 프로젝트입니다. 미래지향적이면서도 신뢰할 수 있는 브랜드 이미지를 구축했습니다.',
    category: 'branding',
    imageUrls: [
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop'
    ],
    thumbnailUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop',
    videoUrl: '/videos/tech-startup-brand.mp4',
    processSteps: [
      {
        id: 'brand-strategy',
        title: '브랜드 전략',
        description: '스타트업의 비전과 미션을 분석하여 브랜드 전략을 수립했습니다.',
        imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop',
        order: 1,
        isCompleted: true
      },
      {
        id: 'logo-development',
        title: '로고 개발',
        description: '기술과 혁신을 상징하는 로고 시스템을 개발했습니다.',
        imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
        order: 2,
        isCompleted: true
      },
      {
        id: 'brand-applications',
        title: '브랜드 적용',
        description: '명함, 웹사이트, 프레젠테이션 등 다양한 매체에 브랜드를 적용했습니다.',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
        order: 3,
        isCompleted: true
      }
    ],
    toolsUsed: [
      'Adobe Illustrator',
      'Adobe Photoshop',
      'Figma',
      'Adobe InDesign'
    ],
    tags: ['브랜딩', '로고디자인', '테크', '스타트업', 'AI', '미래지향적'],
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-02-28'),
    isCompleted: true,
    isPublic: true,
    priority: 6,
    colorTheme: 'electric',
    externalLinks: [
      {
        title: 'Behance에서 보기',
        url: 'https://behance.net/gallery/tech-startup-identity',
        type: 'behance'
      },
      {
        title: '클라이언트 웹사이트',
        url: 'https://aitech-startup.com',
        type: 'website'
      }
    ],
    client: {
      name: 'AI Tech Solutions',
      company: 'AI Tech Solutions Inc.',
      website: 'https://aitech-startup.com'
    },
    duration: '6주'
  }
];

// 프로젝트 카테고리 목록
export const projectCategories = [
  { value: 'all', label: 'All Projects' },
  { value: 'branding', label: 'Branding' },
  { value: 'ui-ux', label: 'UI/UX' },
  { value: 'graphic-design', label: 'Graphic Design' },
  { value: 'web-design', label: 'Web Design' },
  { value: 'print-design', label: 'Print Design' },
  { value: 'illustration', label: 'Illustration' },
  { value: 'photography', label: 'Photography' },
  { value: 'motion-graphics', label: 'Motion Graphics' },
  { value: 'packaging', label: 'Packaging' },
  { value: 'digital-art', label: 'Digital Art' },
  { value: 'typography', label: 'Typography' },
  { value: 'logo-design', label: 'Logo Design' },
  { value: 'other', label: 'Other' }
];

// 스킬 카테고리별 분류
export const skillCategories = {
  design: [
    'Adobe Photoshop',
    'Adobe Illustrator',
    'Adobe InDesign',
    'Figma',
    'Sketch',
    'Adobe XD'
  ],
  web: [
    'HTML/CSS',
    'JavaScript',
    'React',
    'Next.js',
    'Tailwind CSS',
    'WordPress'
  ],
  motion: [
    'Adobe After Effects',
    'Cinema 4D',
    'Blender',
    'Premiere Pro',
    'DaVinci Resolve'
  ],
  other: [
    'Photography',
    'Typography',
    'Branding',
    'UI/UX Research',
    'Prototyping',
    'Print Production'
  ]
};

// 즐겨찾기 프로젝트 ID 목록
export const featuredProjectIds = [
  'ocean-waves-motion',
  'urban-app-ui',
  'nature-magazine'
];

// 프로젝트 총 개수
export const projectsCount = portfolioData.length;

// 최근 프로젝트 가져오기 함수
export const getRecentProjects = (limit: number = 3): IProject[] => {
  return portfolioData
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, limit);
};

// 카테고리별 프로젝트 가져오기 함수
export const getProjectsByCategory = (category: string): IProject[] => {
  if (category === 'all') return portfolioData;
  return portfolioData.filter(project => project.category === category);
};

// 프로젝트 ID로 프로젝트 찾기 함수
export const getProjectById = (id: string): IProject | undefined => {
  return portfolioData.find(project => project.id === id);
};

// 즐겨찾기 프로젝트 가져오기 함수
export const getFeaturedProjects = (): IProject[] => {
  return portfolioData.filter(project => 
    featuredProjectIds.includes(project.id)
  );
};

// 태그별 프로젝트 가져오기 함수
export const getProjectsByTag = (tag: string): IProject[] => {
  return portfolioData.filter(project => 
    project.tags.includes(tag)
  );
};

// 모든 태그 가져오기 함수
export const getAllTags = (): string[] => {
  const tags = portfolioData.flatMap(project => project.tags);
  return [...new Set(tags)].sort();
}; 