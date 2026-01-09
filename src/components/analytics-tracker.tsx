'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initDeepReadingTracker, trackContentExplore } from '@/lib/plausible'

/**
 * Analytics Tracker Component
 *
 * 自动追踪以下行为：
 * 1. Deep Reading: 用户在当前页面停留超过 120 秒（每次路由变化重置计时器）
 * 2. Content Explore: 用户在会话中访问第 3 个不同页面
 *
 * 使用方法：在 layout.tsx 中添加 <AnalyticsTracker />
 */
export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // 初始化深度阅读追踪（返回清理函数）
    const cleanupDeepReading = initDeepReadingTracker()

    // 追踪内容探索行为
    trackContentExplore()

    // 清理函数：路由变化时清除旧计时器
    return () => {
      cleanupDeepReading()
    }
  }, [pathname])

  return null // 不渲染任何内容
}
