/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 크리에이티브한 색상 팔레트 - 팝한 색상과 실험적인 조합
      colors: {
        // 주요 브랜드 색상
        primary: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        
        // 크리에이티브한 액센트 색상
        accent: {
          coral: '#FF6B6B',
          mint: '#4ECDC4',
          sunshine: '#FFD166',
          lavender: '#C7CEEA',
          peach: '#FFB4A2',
          electric: '#4D96FF',
          lime: '#9BF6FF',
          sunset: '#FF8787',
        },
        
        // 그라데이션을 위한 색상
        gradient: {
          from: '#667eea',
          via: '#764ba2',
          to: '#f093fb',
          warm: '#ff9a9e',
          cool: '#a8edea',
        },
        
        // 다크 모드를 위한 색상
        dark: {
          bg: '#0f0f0f',
          card: '#1a1a1a',
          text: '#e4e4e7',
          muted: '#71717a',
        },
        
        // 커스텀 회색톤
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
      
      // 폰트 설정
      fontFamily: {
        // 디스플레이 폰트 (제목용)
        display: ['Archivo Black', 'Bebas Neue', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
        
        // 본문 폰트 (가독성 우선)
        body: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        
        // 모노스페이스 폰트
        mono: ['Fira Code', 'monospace'],
      },
      
      // 커스텀 폰트 크기
      fontSize: {
        '2xs': '0.6875rem', // 11px
        'xs': '0.75rem',    // 12px
        'sm': '0.875rem',   // 14px
        'base': '1rem',     // 16px
        'lg': '1.125rem',   // 18px
        'xl': '1.25rem',    // 20px
        '2xl': '1.5rem',    // 24px
        '3xl': '1.875rem',  // 30px
        '4xl': '2.25rem',   // 36px
        '5xl': '3rem',      // 48px
        '6xl': '3.75rem',   // 60px
        '7xl': '4.5rem',    // 72px
        '8xl': '6rem',      // 96px
        '9xl': '8rem',      // 128px
      },
      
      // 커스텀 간격
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      
      // 커스텀 애니메이션
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'blur-in': 'blurIn 0.8s ease-out',
      },
      
      // 커스텀 키프레임
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        blurIn: {
          '0%': { filter: 'blur(10px)', opacity: '0' },
          '100%': { filter: 'blur(0px)', opacity: '1' },
        },
      },
      
      // 박스 그림자
      boxShadow: {
        'creative': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'creative-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'creative-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'neon': '0 0 20px rgba(255, 107, 107, 0.3)',
        'glow': '0 0 30px rgba(78, 205, 196, 0.4)',
      },
      
      // 브레이크포인트 확장
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      
      // 커스텀 그라데이션
      backgroundImage: {
        'gradient-creative': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-warm': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        'gradient-cool': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #FF8787 0%, #FFD166 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #4ECDC4 0%, #4D96FF 100%)',
      },
      
      // 커스텀 필터
      backdropBlur: {
        'xs': '2px',
      },
      
      // 커스텀 보더 반경
      borderRadius: {
        'creative': '1.5rem',
        'artistic': '2rem',
      },
      
      // 커스텀 z-index
      zIndex: {
        '100': '100',
        '1000': '1000',
      },
    },
  },
  plugins: [
    // 다크 모드를 위한 플러그인
    require('@tailwindcss/typography'),
  ],
  darkMode: 'class', // 다크 모드 클래스 기반
} 