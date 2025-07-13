/**
 * Contact 섹션 컴포넌트
 * 연락처 정보와 문의 폼을 포함한 섹션
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { artistData } from '@/data/portfolioData';
import { IContactForm } from '@/types';

// Contact 섹션 Props 인터페이스
interface ContactSectionProps {
  /** 추가 클래스명 */
  className?: string;
  /** 섹션 제목 */
  title?: string;
  /** 문의 폼 표시 여부 */
  showContactForm?: boolean;
  /** 소셜 링크 표시 여부 */
  showSocialLinks?: boolean;
  /** 연락처 정보 표시 여부 */
  showContactInfo?: boolean;
  /** 배경 패턴 표시 여부 */
  showBackgroundPattern?: boolean;
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

const itemVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const socialVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: index * 0.1
    }
  }),
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2
    }
  }
};

// 소셜 미디어 아이콘 컴포넌트
const SocialIcon = ({ platform }: { platform: string }) => {
  const icons = {
    instagram: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    behance: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
      </svg>
    ),
    dribbble: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.628 0-12 5.373-12 12 0 6.628 5.372 12 12 12s12-5.372 12-12c0-6.627-5.372-12-12-12zm9.885 9.063c-1.737-.036-3.31.126-4.728.456.107-.197.201-.402.287-.611 1.086-2.643 1.892-4.797 2.378-6.349 1.494 1.512 2.487 3.477 2.853 5.67-.063.256-.133.518-.2.785-.051.188-.117.363-.195.533-.13.285-.283.555-.477.806-.014.016-.04.031-.056.047-.047.047-.094.102-.141.148-.148.148-.311.285-.486.413-.175.127-.363.241-.562.343-.392.203-.813.375-1.261.511-.447.137-.92.235-1.414.293-.506.058-1.03.074-1.571.047-.555-.027-1.131-.104-1.726-.23-.605-.128-1.228-.307-1.869-.536-.649-.232-1.317-.515-2.001-.849-.696-.339-1.404-.729-2.122-1.17-.738-.453-1.483-.957-2.235-1.514-.779-.577-1.56-1.205-2.338-1.884-.81-.706-1.608-1.461-2.388-2.265-.831-.857-1.64-1.762-2.423-2.715-.882-1.072-1.732-2.19-2.544-3.356-.927-1.33-1.814-2.705-2.654-4.124-.975-1.648-1.898-3.339-2.764-5.071-.847-1.692-1.634-3.423-2.357-5.191-.706-1.731-1.345-3.497-1.913-5.297-.553-1.756-.035-3.601-.453-5.407zm-9.885 6.937c-1.086 2.643-1.892 4.797-2.378 6.349-1.494-1.512-2.487-3.477-2.853-5.67.063-.256.133-.518.2-.785.051-.188.117-.363.195-.533.13-.285.283-.555.477-.806.014-.016.04-.031.056-.047.047-.047.094-.102.141-.148.148-.148.311-.285.486-.413.175-.127.363-.241.562-.343.392-.203.813-.375 1.261-.511.447-.137.92-.235 1.414-.293.506-.058 1.03-.074 1.571-.047.555.027 1.131.104 1.726.23.605.128 1.228.307 1.869.536.649.232 1.317.515 2.001.849.696.339 1.404.729 2.122 1.17.738.453 1.483.957 2.235 1.514.779.577 1.56 1.205 2.338 1.884.81.706 1.608 1.461 2.388 2.265.831.857 1.64 1.762 2.423 2.715.882 1.072 1.732 2.19 2.544 3.356.927 1.33 1.814 2.705 2.654 4.124.975 1.648 1.898 3.339 2.764 5.071.847 1.692 1.634 3.423 2.357 5.191.706 1.731 1.345 3.497 1.913 5.297.553 1.756.035 3.601.453 5.407zm-4.537-6.937c1.737.036 3.31-.126 4.728-.456-.107.197-.201.402-.287.611z"/>
      </svg>
    ),
    linkedin: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    youtube: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )
  };

  return icons[platform as keyof typeof icons] || null;
};

/**
 * Contact 섹션 컴포넌트
 * 연락처 정보와 문의 폼을 포함한 섹션
 */
export default function ContactSection({
  className,
  title = "Get In Touch",
  showContactForm = true,
  showSocialLinks = true,
  showContactInfo = true,
  showBackgroundPattern = true
}: ContactSectionProps) {
  const [formData, setFormData] = useState<IContactForm>({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    privacyConsent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // 폼 입력 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 체크박스 핸들러
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 실제 API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        privacyConsent: false
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={cn(
      'relative py-20 px-6 bg-gradient-to-b from-muted/30 to-background overflow-hidden',
      className
    )}>
      {/* 배경 패턴 */}
      {showBackgroundPattern && (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-accent-electric/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-accent-coral/30 rounded-full blur-3xl" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* 섹션 제목 */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl lg:text-5xl font-black mb-4">
              <span className="text-gradient-cool">{title}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              새로운 프로젝트나 협업 기회에 대해 이야기해보세요
            </p>
          </motion.div>

          {/* 메인 콘텐츠 */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* 연락처 정보 */}
            <motion.div
              variants={itemVariants}
              className="space-y-8"
            >
              {showContactInfo && (
                <div className="space-y-6">
                  <h3 className="font-display text-2xl font-bold mb-6">
                    연락처 정보
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-accent-coral/10 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-accent-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold">이메일</h4>
                        <p className="text-muted-foreground">{artistData.email}</p>
                      </div>
                    </div>

                    {artistData.phone && (
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-accent-mint/10 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-accent-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold">전화번호</h4>
                          <p className="text-muted-foreground">{artistData.phone}</p>
                        </div>
                      </div>
                    )}

                    {artistData.location && (
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-accent-sunshine/10 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-accent-sunshine" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold">위치</h4>
                          <p className="text-muted-foreground">{artistData.location}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 소셜 링크 */}
              {showSocialLinks && (
                <div>
                  <h3 className="font-display text-2xl font-bold mb-6">
                    소셜 미디어
                  </h3>
                  <div className="flex gap-4">
                    {artistData.socialLinks.map((social, index) => (
                      <motion.a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        custom={index}
                        variants={socialVariants}
                        initial="initial"
                        whileInView="animate"
                        whileHover="hover"
                        viewport={{ once: true }}
                        className="flex items-center justify-center w-12 h-12 rounded-lg border-2 border-border hover:border-accent-coral transition-colors duration-200"
                        style={{ color: social.color }}
                      >
                        <SocialIcon platform={social.platform} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* 문의 폼 */}
            {showContactForm && (
              <motion.div
                variants={itemVariants}
                className="bg-card rounded-lg p-8 border"
              >
                <h3 className="font-display text-2xl font-bold mb-6">
                  프로젝트 문의
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        이름 *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent-coral focus:border-transparent bg-background"
                        placeholder="홍길동"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        이메일 *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent-coral focus:border-transparent bg-background"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-2">
                        회사명
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent-coral focus:border-transparent bg-background"
                        placeholder="회사명 (선택)"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        연락처
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent-coral focus:border-transparent bg-background"
                        placeholder="010-1234-5678"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      프로젝트 내용 *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent-coral focus:border-transparent bg-background"
                      placeholder="프로젝트에 대한 자세한 내용을 알려주세요..."
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="privacyConsent"
                      name="privacyConsent"
                      checked={formData.privacyConsent}
                      onChange={handleCheckboxChange}
                      required
                      className="w-4 h-4 text-accent-coral border-border rounded focus:ring-accent-coral"
                    />
                    <label htmlFor="privacyConsent" className="text-sm text-muted-foreground">
                      개인정보 처리방침에 동의합니다 *
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.privacyConsent}
                    className={cn(
                      'w-full py-3 px-6 rounded-lg font-medium transition-all duration-200',
                      'bg-accent-coral text-white hover:bg-accent-coral/90',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                      'flex items-center justify-center gap-2'
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        전송 중...
                      </>
                    ) : (
                      '문의하기'
                    )}
                  </button>

                  {/* 제출 상태 메시지 */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-100 border border-green-200 rounded-lg text-green-700">
                      문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-100 border border-red-200 rounded-lg text-red-700">
                      문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.
                    </div>
                  )}
                </form>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// 간단한 Contact 섹션 변형
export const SimpleContactSection = () => (
  <ContactSection
    showContactForm={false}
    showBackgroundPattern={false}
    title="연락처"
  />
);

// 폼 중심 Contact 섹션 변형
export const FormFocusedContactSection = () => (
  <ContactSection
    showContactInfo={false}
    showSocialLinks={false}
    title="프로젝트 문의"
  />
); 