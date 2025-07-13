/**
 * 크리에이티브한 카드 컴포넌트
 * 다양한 스타일과 애니메이션을 지원하는 재사용 가능한 카드
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// 카드 Props 인터페이스
interface CardProps {
  /** 카드 내용 */
  children: React.ReactNode;
  /** 카드 크기 */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** 카드 스타일 변형 */
  variant?: 'default' | 'outline' | 'ghost' | 'creative' | 'gradient';
  /** 카드 색상 테마 */
  colorTheme?: 'coral' | 'mint' | 'sunshine' | 'electric' | 'gradient';
  /** 카드 모양 */
  shape?: 'rounded' | 'square' | 'creative' | 'artistic';
  /** 그림자 효과 */
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'creative' | 'glow';
  /** 호버 효과 */
  hover?: 'none' | 'lift' | 'scale' | 'glow' | 'creative';
  /** 클릭 가능 여부 */
  clickable?: boolean;
  /** 클릭 이벤트 핸들러 */
  onClick?: () => void;
  /** 추가 클래스명 */
  className?: string;
  /** 커스텀 스타일 */
  style?: React.CSSProperties;
  /** 애니메이션 활성화 여부 */
  animated?: boolean;
  /** 패딩 */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** 배경 이미지 URL */
  backgroundImage?: string;
  /** 오버레이 사용 여부 */
  overlay?: boolean;
  /** 테스트 ID */
  testId?: string;
}

// 카드 크기 스타일
const sizeStyles = {
  sm: 'min-h-[200px]',
  md: 'min-h-[250px]',
  lg: 'min-h-[300px]',
  xl: 'min-h-[400px]'
};

// 카드 변형 스타일
const variantStyles = {
  default: 'bg-white dark:bg-dark-card border border-border',
  outline: 'border-2 border-accent-coral bg-transparent',
  ghost: 'bg-transparent border-none',
  creative: 'bg-gradient-creative text-white border-none',
  gradient: 'bg-gradient-sunset text-white border-none'
};

// 색상 테마 스타일
const colorThemeStyles = {
  coral: 'bg-accent-coral/10 border-accent-coral text-accent-coral',
  mint: 'bg-accent-mint/10 border-accent-mint text-accent-mint',
  sunshine: 'bg-accent-sunshine/10 border-accent-sunshine text-accent-sunshine',
  electric: 'bg-accent-electric/10 border-accent-electric text-accent-electric',
  gradient: 'bg-gradient-sunset text-white border-none'
};

// 카드 모양 스타일
const shapeStyles = {
  rounded: 'rounded-lg',
  square: 'rounded-none',
  creative: 'rounded-creative',
  artistic: 'rounded-artistic'
};

// 그림자 스타일
const shadowStyles = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  creative: 'shadow-creative',
  glow: 'shadow-glow'
};

// 호버 효과 스타일
const hoverStyles = {
  none: '',
  lift: 'hover:-translate-y-1 hover:shadow-lg',
  scale: 'hover:scale-105',
  glow: 'hover:shadow-glow',
  creative: 'hover:shadow-neon hover:scale-105'
};

// 패딩 스타일
const paddingStyles = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8'
};

// 애니메이션 변형
const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  },
  hover: {
    y: -5,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
  }
};

/**
 * 크리에이티브한 카드 컴포넌트
 * 다양한 스타일과 애니메이션을 지원하는 재사용 가능한 카드
 */
export default function Card({
  children,
  size = 'md',
  variant = 'default',
  colorTheme,
  shape = 'rounded',
  shadow = 'md',
  hover = 'lift',
  clickable = false,
  onClick,
  className,
  style,
  animated = true,
  padding = 'md',
  backgroundImage,
  overlay = false,
  testId,
  ...props
}: CardProps) {
  // 카드 클래스 조합
  const cardClasses = cn(
    // 기본 스타일
    'relative overflow-hidden transition-all duration-300 ease-in-out',
    
    // 크기 스타일
    sizeStyles[size],
    
    // 변형 스타일 (colorTheme가 있으면 우선 적용)
    colorTheme ? colorThemeStyles[colorTheme] : variantStyles[variant],
    
    // 모양 스타일
    shapeStyles[shape],
    
    // 그림자 스타일
    shadowStyles[shadow],
    
    // 호버 효과
    hoverStyles[hover],
    
    // 패딩
    paddingStyles[padding],
    
    // 클릭 가능 여부
    clickable && 'cursor-pointer',
    
    // 배경 이미지 관련
    backgroundImage && 'bg-cover bg-center',
    
    // 추가 클래스명
    className
  );

  // 카드 내용 구성
  const cardContent = (
    <>
      {/* 배경 이미지 */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      {/* 오버레이 */}
      {overlay && (
        <div className="absolute inset-0 bg-black/30" />
      )}
      
      {/* 카드 내용 */}
      <div className={cn(
        'relative z-10 h-full',
        backgroundImage && 'text-white'
      )}>
        {children}
      </div>
    </>
  );

  // 애니메이션이 활성화된 경우 motion.div 사용
  if (animated) {
    return (
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover={hover !== 'none' ? "hover" : undefined}
        className={cardClasses}
        onClick={clickable ? onClick : undefined}
        style={style}
        data-testid={testId}
        {...props}
      >
        {cardContent}
      </motion.div>
    );
  }

  // 일반 div
  return (
    <div
      className={cardClasses}
      onClick={clickable ? onClick : undefined}
      style={style}
      data-testid={testId}
      {...props}
    >
      {cardContent}
    </div>
  );
}

// 카드 하위 컴포넌트들
export const CardHeader = ({ 
  children, 
  className, 
  ...props 
}: { 
  children: React.ReactNode; 
  className?: string; 
  [key: string]: any; 
}) => (
  <div className={cn('mb-4', className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ 
  children, 
  className, 
  ...props 
}: { 
  children: React.ReactNode; 
  className?: string; 
  [key: string]: any; 
}) => (
  <h3 className={cn('text-xl font-semibold mb-2', className)} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ 
  children, 
  className, 
  ...props 
}: { 
  children: React.ReactNode; 
  className?: string; 
  [key: string]: any; 
}) => (
  <p className={cn('text-muted-foreground', className)} {...props}>
    {children}
  </p>
);

export const CardContent = ({ 
  children, 
  className, 
  ...props 
}: { 
  children: React.ReactNode; 
  className?: string; 
  [key: string]: any; 
}) => (
  <div className={cn('flex-1', className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ 
  children, 
  className, 
  ...props 
}: { 
  children: React.ReactNode; 
  className?: string; 
  [key: string]: any; 
}) => (
  <div className={cn('mt-4 flex items-center justify-between', className)} {...props}>
    {children}
  </div>
);

// 카드 컴포넌트 변형들
export const CreativeCard = (props: CardProps) => (
  <Card {...props} variant="creative" animated={true} hover="creative" />
);

export const GradientCard = (props: CardProps) => (
  <Card {...props} variant="gradient" animated={true} hover="glow" />
);

export const ImageCard = (props: CardProps & { image: string }) => (
  <Card 
    {...props} 
    backgroundImage={props.image} 
    overlay={true} 
    hover="scale"
    padding="lg"
  />
);

export const ProjectCard = (props: CardProps) => (
  <Card 
    {...props} 
    hover="lift" 
    shadow="md" 
    clickable={true}
    animated={true}
  />
); 