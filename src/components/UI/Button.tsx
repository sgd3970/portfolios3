/**
 * 크리에이티브한 버튼 컴포넌트
 * 다양한 스타일과 애니메이션을 지원하는 재사용 가능한 버튼
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// 버튼 Props 인터페이스
interface ButtonProps {
  /** 버튼 내용 */
  children: React.ReactNode;
  /** 버튼 크기 */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** 버튼 스타일 변형 */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'creative' | 'gradient';
  /** 버튼 색상 테마 */
  colorTheme?: 'coral' | 'mint' | 'sunshine' | 'electric' | 'gradient';
  /** 버튼 모양 */
  shape?: 'rounded' | 'square' | 'pill' | 'creative';
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 로딩 상태 */
  loading?: boolean;
  /** 클릭 이벤트 핸들러 */
  onClick?: () => void;
  /** 버튼 타입 */
  type?: 'button' | 'submit' | 'reset';
  /** 추가 클래스명 */
  className?: string;
  /** 커스텀 스타일 */
  style?: React.CSSProperties;
  /** 애니메이션 활성화 여부 */
  animated?: boolean;
  /** 아이콘 (선택사항) */
  icon?: React.ReactNode;
  /** 아이콘 위치 */
  iconPosition?: 'left' | 'right';
  /** 접근성을 위한 aria-label */
  ariaLabel?: string;
  /** 테스트 ID */
  testId?: string;
}

// 버튼 크기 스타일
const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl'
};

// 버튼 변형 스타일
const variantStyles = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  outline: 'border-2 border-accent-coral text-accent-coral hover:bg-accent-coral hover:text-white',
  ghost: 'text-foreground hover:bg-accent-coral/10',
  creative: 'bg-gradient-creative text-white hover:scale-105 hover:shadow-neon',
  gradient: 'bg-gradient-sunset text-white hover:bg-gradient-ocean hover:shadow-glow'
};

// 색상 테마 스타일
const colorThemeStyles = {
  coral: 'bg-accent-coral hover:bg-accent-coral/90 text-white',
  mint: 'bg-accent-mint hover:bg-accent-mint/90 text-white',
  sunshine: 'bg-accent-sunshine hover:bg-accent-sunshine/90 text-black',
  electric: 'bg-accent-electric hover:bg-accent-electric/90 text-white',
  gradient: 'bg-gradient-sunset hover:bg-gradient-ocean text-white'
};

// 버튼 모양 스타일
const shapeStyles = {
  rounded: 'rounded-lg',
  square: 'rounded-none',
  pill: 'rounded-full',
  creative: 'rounded-creative'
};

// 애니메이션 변형
const buttonVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2, ease: 'easeInOut' }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1, ease: 'easeInOut' }
  }
};

// 로딩 스피너 컴포넌트
const LoadingSpinner = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"
  />
);

/**
 * 크리에이티브한 버튼 컴포넌트
 * 다양한 스타일과 애니메이션을 지원하는 재사용 가능한 버튼
 */
export default function Button({
  children,
  size = 'md',
  variant = 'primary',
  colorTheme,
  shape = 'rounded',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className,
  style,
  animated = true,
  icon,
  iconPosition = 'left',
  ariaLabel,
  testId,
  ...props
}: ButtonProps) {
  // 버튼 클래스 조합
  const buttonClasses = cn(
    // 기본 스타일
    'inline-flex items-center justify-center font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-coral',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'relative overflow-hidden',
    
    // 크기 스타일
    sizeStyles[size],
    
    // 변형 스타일 (colorTheme가 있으면 우선 적용)
    colorTheme ? colorThemeStyles[colorTheme] : variantStyles[variant],
    
    // 모양 스타일
    shapeStyles[shape],
    
    // 전체 너비
    fullWidth && 'w-full',
    
    // 비활성화 상태
    disabled && 'pointer-events-none',
    
    // 추가 클래스명
    className
  );

  // 버튼 내용 구성
  const buttonContent = (
    <>
      {/* 로딩 스피너 또는 아이콘 */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        icon && iconPosition === 'left' && (
          <span className="mr-2">{icon}</span>
        )
      )}
      
      {/* 버튼 텍스트 */}
      {!loading && children}
      
      {/* 오른쪽 아이콘 */}
      {!loading && icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </>
  );

  // 애니메이션이 활성화된 경우 motion.button 사용
  if (animated && !disabled) {
    return (
      <motion.button
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className={buttonClasses}
        onClick={onClick}
        type={type}
        disabled={disabled || loading}
        style={style}
        aria-label={ariaLabel}
        data-testid={testId}
        {...props}
      >
        {buttonContent}
      </motion.button>
    );
  }

  // 일반 버튼
  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      style={style}
      aria-label={ariaLabel}
      data-testid={testId}
      {...props}
    >
      {buttonContent}
    </button>
  );
}

// 버튼 컴포넌트 변형들
export const CreativeButton = (props: ButtonProps) => (
  <Button {...props} variant="creative" animated={true} />
);

export const GradientButton = (props: ButtonProps) => (
  <Button {...props} variant="gradient" animated={true} />
);

export const OutlineButton = (props: ButtonProps) => (
  <Button {...props} variant="outline" />
);

export const PillButton = (props: ButtonProps) => (
  <Button {...props} shape="pill" />
); 