'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Tool {
  name: string;
  href: string;
  icon: string;
  description: string;
}

interface RecommendedToolsProps {
  title?: string;
  tools: Tool[];
  variant?: 'default' | 'compact';
}

/**
 * 推荐工具组件
 *
 * 用于在页面底部展示相关工具推荐，提升用户粘性和页面浏览深度
 *
 * @example
 * <RecommendedTools
 *   title="Got your codes? Try these next:"
 *   tools={[
 *     {name: 'Hive Builder', href: '/hive-builder', icon: '🏗️', description: 'Build optimal hive'},
 *     {name: 'Item Values', href: '/values', icon: '💎', description: 'Check sticker prices'},
 *   ]}
 * />
 */
export function RecommendedTools({
  title = 'Explore More Tools',
  tools,
  variant = 'default',
}: RecommendedToolsProps) {
  if (tools.length === 0) return null;

  return (
    <section className="mt-12 border-t pt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <ArrowRight className="h-5 w-5 text-muted-foreground" />
      </div>

      <div
        className={
          variant === 'compact'
            ? 'flex flex-wrap gap-3'
            : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
        }
      >
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className={
              variant === 'compact'
                ? 'inline-flex items-center gap-2 px-4 py-2 rounded-lg border bg-card hover:bg-accent transition-colors'
                : 'group p-6 rounded-lg border bg-card hover:shadow-lg hover:border-primary/50 transition-all duration-200'
            }
          >
            {variant === 'default' && (
              <>
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {tool.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tool.description}
                </p>
              </>
            )}

            {variant === 'compact' && (
              <>
                <span className="text-xl">{tool.icon}</span>
                <span className="font-medium text-sm">{tool.name}</span>
              </>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}

/**
 * 预定义的工具推荐配置
 * 方便在不同页面快速使用
 */
export const recommendedToolsConfig = {
  // 适用于 /codes 页面（用户获取代码后的推荐）
  afterCodes: [
    {
      name: 'Hive Builder',
      href: '/hive-builder',
      icon: '🏗️',
      description: 'Design and optimize your perfect bee hive layout with our drag-and-drop builder',
    },
    {
      name: 'Item Values',
      href: '/values',
      icon: '💎',
      description: 'Check current market prices for stickers and beequips to make smart trades',
    },
    {
      name: 'Calculator',
      href: '/calculator',
      icon: '📊',
      description: 'Calculate item conversions and trade values instantly',
    },
  ],

  // 适用于 /values 页面（查看价值后的推荐）
  afterValues: [
    {
      name: 'Trade Calculator',
      href: '/calculator',
      icon: '📊',
      description: 'Calculate if a trade is fair based on current market values',
    },
    {
      name: 'Hive Builder',
      href: '/hive-builder',
      icon: '🏗️',
      description: 'Plan your hive layout to maximize efficiency',
    },
    {
      name: 'Active Codes',
      href: '/codes',
      icon: '🎁',
      description: 'Get free rewards with the latest working codes',
    },
  ],

  // 适用于 /hive-builder 页面（使用工具后的推荐）
  afterHiveBuilder: [
    {
      name: 'Bee Encyclopedia',
      href: '/bees',
      icon: '🐝',
      description: 'Learn about all bee types and their abilities',
    },
    {
      name: 'Item Values',
      href: '/values',
      icon: '💎',
      description: 'Check prices to optimize your hive investments',
    },
    {
      name: 'Advisor',
      href: '/advisor',
      icon: '🤖',
      description: 'Get AI-powered recommendations for your hive',
    },
  ],

  // 适用于 /calculator 页面（使用计算器后的推荐）
  afterCalculator: [
    {
      name: 'Item Values',
      href: '/values',
      icon: '💎',
      description: 'Browse all item values and market trends',
    },
    {
      name: 'Advisor',
      href: '/advisor',
      icon: '🤖',
      description: 'Get personalized trading advice from AI',
    },
    {
      name: 'Active Codes',
      href: '/codes',
      icon: '🎁',
      description: 'Claim free items with working codes',
    },
  ],

  // 适用于 /bees 页面（浏览蜜蜂后的推荐）
  afterBees: [
    {
      name: 'Hive Builder',
      href: '/hive-builder',
      icon: '🏗️',
      description: 'Build your hive with the bees you just learned about',
    },
    {
      name: 'Beequips',
      href: '/values?tab=beequips',
      icon: '⚡',
      description: 'Find the best equipment for your bees',
    },
  ],
};
