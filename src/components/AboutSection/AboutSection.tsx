/**
 * About Me 섹션 컴포넌트
 * 아티스트/디자이너 소개와 스킬을 표시하는 섹션
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { artistData, skillCategories } from '@/data/portfolioData';

// About 섹션 Props 인터페이스
interface AboutSectionProps {
  /** 추가 클래스명 */
  className?: string;
  /** 섹션 제목 */
  title?: string;
  /** 프로필 이미지 표시 여부 */
  showProfileImage?: boolean;
  /** 스킬 표시 여부 */
  showSkills?: boolean;
  /** 통계 표시 여부 */
  showStats?: boolean;
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

const skillVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: index * 0.1
    }
  })
};

const statVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.1
    }
  })
};

/**
 * About Me 섹션 컴포넌트
 * 아티스트/디자이너 소개와 스킬을 표시하는 섹션
 */
export default function AboutSection({
  className,
  title = "About Me",
  showProfileImage = true,
  showSkills = true,
  showStats = true,
  showBackgroundPattern = true
}: AboutSectionProps) {
  return (
    <section className={cn(
      'relative py-20 px-6 bg-gradient-to-b from-background to-muted/30 overflow-hidden',
      className
    )}>
      {/* 배경 패턴 */}
      {showBackgroundPattern && (
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-mint/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-sunshine/20 rounded-full blur-3xl" />
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
              <span className="text-gradient-warm">{title}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              창의적인 디자인과 혁신적인 아이디어로 세상을 변화시키는 디자이너
            </p>
          </motion.div>

          {/* 메인 콘텐츠 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* 프로필 이미지 */}
            {showProfileImage && (
              <motion.div
                variants={itemVariants}
                className="relative order-2 lg:order-1"
              >
                <div className="relative w-full max-w-md mx-auto">
                  {/* 이미지 컨테이너 */}
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                    <Image
                      src={artistData.profileImageUrl || 'https://picsum.photos/400/400?random=100'}
                      alt={artistData.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  
                  {/* 장식 요소들 */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-coral/20 rounded-full blur-xl" />
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-mint/20 rounded-full blur-xl" />
                </div>
              </motion.div>
            )}

            {/* 텍스트 콘텐츠 */}
            <motion.div
              variants={itemVariants}
              className="order-1 lg:order-2"
            >
              <div className="mb-6">
                <h3 className="font-display text-2xl font-bold mb-2">
                  {artistData.name}
                </h3>
                <p className="text-accent-coral font-medium text-lg mb-4">
                  {artistData.title}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  {artistData.location && (
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{artistData.location}</span>
                    </div>
                  )}
                  {artistData.experience && (
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{artistData.experience}년 경력</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-foreground leading-relaxed">
                  {artistData.bio}
                </p>
              </div>

              {/* 연락처 정보 */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-accent-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-foreground">{artistData.email}</span>
                </div>
                {artistData.phone && (
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-accent-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-foreground">{artistData.phone}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* 스킬 섹션 */}
          {showSkills && (
            <motion.div
              variants={itemVariants}
              className="mb-16"
            >
              <h3 className="font-display text-2xl font-bold text-center mb-8">
                <span className="text-gradient-cool">Skills & Expertise</span>
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {Object.entries(skillCategories).map(([category, skills], categoryIndex) => (
                  <motion.div
                    key={category}
                    variants={itemVariants}
                    className="bg-card rounded-lg p-6 border"
                  >
                    <h4 className="font-semibold text-lg mb-4 capitalize text-accent-coral">
                      {category === 'other' ? 'Other' : category}
                    </h4>
                    <div className="space-y-2">
                      {skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          custom={categoryIndex * 3 + skillIndex}
                          variants={skillVariants}
                          initial="initial"
                          whileInView="animate"
                          viewport={{ once: true }}
                          className="flex items-center gap-2 text-sm text-foreground"
                        >
                          <div className="w-1.5 h-1.5 bg-accent-coral rounded-full" />
                          <span>{skill}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 통계 섹션 */}
          {showStats && (
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {[
                { label: '완료 프로젝트', value: '50+', icon: '📊' },
                { label: '만족한 고객', value: '30+', icon: '😊' },
                { label: '수상 경력', value: '5+', icon: '🏆' },
                { label: '경력 연수', value: `${artistData.experience}+`, icon: '⚡' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  custom={index}
                  variants={statVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="font-display text-3xl font-bold text-gradient mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// 간단한 About 섹션 변형
export const SimpleAboutSection = () => (
  <AboutSection
    showProfileImage={false}
    showStats={false}
    showBackgroundPattern={false}
    title="소개"
  />
);

// 스킬 중심 About 섹션 변형
export const SkillsFocusedAboutSection = () => (
  <AboutSection
    showProfileImage={false}
    showStats={false}
    title="전문 분야"
  />
); 