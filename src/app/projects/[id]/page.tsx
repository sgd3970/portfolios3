/**
 * 프로젝트 상세 페이지
 * 개별 프로젝트의 상세 정보를 표시하는 페이지
 */

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { portfolioData, getProjectById } from '@/data/portfolioData';
import { IProject } from '@/types';
import { formatDate } from '@/lib/utils';

// 페이지 Props 타입
interface ProjectDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// 정적 경로 생성
export async function generateStaticParams() {
  return portfolioData.map((project) => ({
    id: project.id,
  }));
}

// 메타데이터 생성
export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return {
      title: '프로젝트를 찾을 수 없습니다',
      description: '요청하신 프로젝트를 찾을 수 없습니다.',
    };
  }

  return {
    title: `${project.title} - 포트폴리오`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      url: `/projects/${project.id}`,
      images: [
        {
          url: project.thumbnailUrl || project.imageUrls[0],
          width: 800,
          height: 600,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [project.thumbnailUrl || project.imageUrls[0]],
    },
  };
}

// 프로젝트 상세 페이지 컴포넌트
export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 섹션 */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-6xl mx-auto">
          {/* 뒤로 가기 버튼 */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent-coral transition-colors mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            뒤로 가기
          </Link>

          {/* 프로젝트 헤더 */}
          <div className="mb-12">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-accent-coral/20 text-accent-coral rounded-full text-sm font-medium">
                {project.category}
              </span>
              <span className="text-muted-foreground text-sm">
                {formatDate(project.updatedAt)}
              </span>
              {project.duration && (
                <span className="text-muted-foreground text-sm">
                  {project.duration}
                </span>
              )}
            </div>
            
            <h1 className="font-display text-4xl lg:text-5xl font-black mb-4">
              {project.title}
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-3xl">
              {project.description}
            </p>
          </div>

          {/* 프로젝트 정보 그리드 */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <h3 className="font-semibold text-lg mb-3">클라이언트</h3>
              <p className="text-muted-foreground">
                {project.client?.name || '개인 프로젝트'}
              </p>
              {project.client?.website && (
                <a
                  href={project.client.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-coral hover:underline text-sm"
                >
                  웹사이트 보기
                </a>
              )}
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-3">사용 도구</h3>
              <div className="flex flex-wrap gap-2">
                {project.toolsUsed.map((tool) => (
                  <span
                    key={tool}
                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-3">태그</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-accent-coral/10 text-accent-coral text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 이미지 갤러리 */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6">
            {project.imageUrls.map((imageUrl, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-lg ${
                  index === 0 ? 'aspect-video' : 'aspect-[4/3]'
                }`}
              >
                <Image
                  src={imageUrl}
                  alt={`${project.title} - 이미지 ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 작업 과정 */}
      <section className="py-12 px-6 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            작업 과정
          </h2>
          
          <div className="space-y-8">
            {project.processSteps.map((step, index) => (
              <div key={step.id} className="flex gap-6">
                <div className="flex-shrink-0 w-8 h-8 bg-accent-coral rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  {step.imageUrl && (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden">
                      <Image
                        src={step.imageUrl}
                        alt={step.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 600px"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 비디오 섹션 */}
      {project.youtubeId && (
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-center mb-8">
              프로젝트 영상
            </h2>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${project.youtubeId}`}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </section>
      )}

      {/* 외부 링크 */}
      {project.externalLinks && project.externalLinks.length > 0 && (
        <section className="py-12 px-6 bg-muted/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl font-bold mb-8">
              관련 링크
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {project.externalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent-coral text-white rounded-lg hover:bg-accent-coral/90 transition-colors"
                >
                  <span>{link.title}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 다른 프로젝트 */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-8">
            다른 프로젝트
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioData
              .filter(p => p.id !== project.id)
              .slice(0, 3)
              .map((otherProject) => (
                <Link
                  key={otherProject.id}
                  href={`/projects/${otherProject.id}`}
                  className="group"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                    <Image
                      src={otherProject.thumbnailUrl || otherProject.imageUrls[0]}
                      alt={otherProject.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-accent-coral transition-colors">
                    {otherProject.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {otherProject.description}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// 정적 생성 (SSG) 설정
export const dynamic = 'force-static';
export const revalidate = 600; // 10분마다 ISR 