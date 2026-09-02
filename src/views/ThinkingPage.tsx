'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import { articles } from '@/data/mock';

const moreArticles = [
  ...articles,
  {
    id: 'feature-engineering',
    title: '风控特征工程：从业务理解到特征构建',
    excerpt: '好的特征是模型成功的基础。本文分享在风控场景中如何从业务出发，构建有效的特征体系。',
    date: '2025-04',
  },
  {
    id: 'model-deployment',
    title: '模型上线工程化：从Notebook到生产系统',
    excerpt: '模型训练只是开始，如何将模型稳定地部署到生产环境，保证实时性和可靠性？',
    date: '2025-02',
  },
  {
    id: 'risk-strategy',
    title: '风控策略设计方法论：从规则到智能',
    excerpt: '风控策略不是简单的规则堆叠，而是需要系统性的设计方法论。本文梳理了策略设计的核心框架。',
    date: '2024-12',
  },
];

export default function ThinkingPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">思考</h1>
            <p className="text-lg text-slate-400">风控领域的思考与总结</p>
          </div>
        </AnimatedSection>

        <div className="space-y-4">
          {moreArticles.map((article, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -1 }}
                className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 cursor-pointer hover:border-cyan-400/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-slate-100 mb-2">{article.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{article.excerpt}</p>
                  </div>
                  <span className="text-xs text-slate-500 whitespace-nowrap mt-1">{article.date}</span>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
