/**
 * 유틸리티 함수 모음
 * 클래스명 조합, 문자열 처리, 날짜 형식 등의 도우미 함수들
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 클래스명을 조합하고 Tailwind CSS 클래스들을 병합하는 함수
 * @param inputs - 클래스명들
 * @returns 병합된 클래스명 문자열
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 문자열을 슬러그로 변환하는 함수
 * @param text - 변환할 텍스트
 * @returns 슬러그 문자열
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * 날짜를 포맷팅하는 함수
 * @param date - 포맷팅할 날짜
 * @param locale - 로케일 (기본값: 'ko-KR')
 * @returns 포맷팅된 날짜 문자열
 */
export function formatDate(date: Date, locale: string = 'ko-KR'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * 상대적인 시간을 반환하는 함수
 * @param date - 기준 날짜
 * @returns 상대적인 시간 문자열
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return '방금 전';
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}분 전`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  } else if (diffInSeconds < 2592000) {
    return `${Math.floor(diffInSeconds / 86400)}일 전`;
  } else {
    return formatDate(date);
  }
}

/**
 * 문자열을 자르고 말줄임표를 추가하는 함수
 * @param text - 자를 텍스트
 * @param maxLength - 최대 길이
 * @returns 자른 텍스트
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * 배열을 섞는 함수
 * @param array - 섞을 배열
 * @returns 섞인 배열
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * 숫자를 포맷팅하는 함수
 * @param num - 포맷팅할 숫자
 * @param locale - 로케일 (기본값: 'ko-KR')
 * @returns 포맷팅된 숫자 문자열
 */
export function formatNumber(num: number, locale: string = 'ko-KR'): string {
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * 이메일 주소 유효성 검사 함수
 * @param email - 검사할 이메일 주소
 * @returns 유효성 검사 결과
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 전화번호 유효성 검사 함수 (한국 전화번호)
 * @param phone - 검사할 전화번호
 * @returns 유효성 검사 결과
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
  return phoneRegex.test(phone);
}

/**
 * URL 유효성 검사 함수
 * @param url - 검사할 URL
 * @returns 유효성 검사 결과
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * 디바운스 함수
 * @param func - 디바운스할 함수
 * @param delay - 지연 시간 (ms)
 * @returns 디바운스된 함수
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * 쓰로틀 함수
 * @param func - 쓰로틀할 함수
 * @param delay - 지연 시간 (ms)
 * @returns 쓰로틀된 함수
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), delay);
    }
  };
}

/**
 * 색상 밝기 계산 함수
 * @param color - 헥스 색상 코드
 * @returns 밝기 값 (0-255)
 */
export function getColorBrightness(color: string): number {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

/**
 * 색상이 밝은지 어두운지 판단하는 함수
 * @param color - 헥스 색상 코드
 * @returns 밝은 색상인지 여부
 */
export function isLightColor(color: string): boolean {
  return getColorBrightness(color) > 128;
}

/**
 * 랜덤 ID 생성 함수
 * @param length - ID 길이
 * @returns 랜덤 ID
 */
export function generateRandomId(length: number = 8): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * 로컬 스토리지에 데이터 저장 (안전한 방법)
 * @param key - 저장할 키
 * @param value - 저장할 값
 */
export function setLocalStorage(key: string, value: any): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.warn('로컬 스토리지 저장 실패:', error);
  }
}

/**
 * 로컬 스토리지에서 데이터 불러오기 (안전한 방법)
 * @param key - 불러올 키
 * @param defaultValue - 기본값
 * @returns 불러온 값 또는 기본값
 */
export function getLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    }
  } catch (error) {
    console.warn('로컬 스토리지 불러오기 실패:', error);
  }
  return defaultValue;
}

/**
 * 현재 디바이스 타입 확인 함수
 * @returns 디바이스 타입
 */
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/**
 * 스크롤을 부드럽게 특정 요소로 이동시키는 함수
 * @param elementId - 이동할 요소의 ID
 * @param offset - 오프셋 (px)
 */
export function scrollToElement(elementId: string, offset: number = 0): void {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
} 