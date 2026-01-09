/**
 * Plausible Analytics Event Tracking Utilities
 *
 * 用于追踪自定义事件到 Plausible Analytics
 * 文档: https://plausible.io/docs/custom-event-goals
 */

// Plausible 事件类型定义
interface PlausibleEventOptions {
  /** 自定义事件属性 */
  props?: Record<string, string | number | boolean>;
  /** 回调函数（事件发送后执行） */
  callback?: () => void;
}

/**
 * 追踪自定义事件
 *
 * @param eventName - 事件名称（需在 Plausible 后台预先配置）
 * @param options - 事件选项（props 和 callback）
 *
 * @example
 * // 基础用法
 * trackEvent('code_copied');
 *
 * @example
 * // 带属性
 * trackEvent('tool_used', {
 *   props: { tool: 'hive-builder' }
 * });
 *
 * @example
 * // 带回调
 * trackEvent('download', {
 *   callback: () => console.log('Download tracked')
 * });
 */
export function trackEvent(
  eventName: string,
  options?: PlausibleEventOptions
): void {
  // 检查 window.plausible 是否存在（客户端环境）
  if (typeof window === 'undefined') {
    console.warn('Plausible: Cannot track event in SSR environment');
    return;
  }

  // 检查 plausible 函数是否已加载
  if (typeof window.plausible !== 'function') {
    console.warn('Plausible: plausible() function not found. Make sure the script is loaded.');
    return;
  }

  try {
    window.plausible(eventName, options);
  } catch (error) {
    console.error('Plausible: Error tracking event', eventName, error);
  }
}

/**
 * 追踪代码复制事件
 * 用于 /codes 页面
 */
export function trackCodeCopy(codeType: string): void {
  trackEvent('code_copied', {
    props: {
      code_type: codeType,
    },
  });
}

/**
 * 追踪工具使用事件
 * 用于 /hive-builder, /calculator, /advisor 等工具页面
 */
export function trackToolUsage(
  toolName: 'hive-builder' | 'calculator' | 'advisor' | 'search'
): void {
  trackEvent('tool_used', {
    props: {
      tool: toolName,
    },
  });
}

/**
 * 追踪内容互动事件
 * 用于页面滚动、展开内容等
 */
export function trackContentInteraction(
  action: 'scroll' | 'expand' | 'filter' | 'sort',
  section?: string
): void {
  trackEvent('content_interaction', {
    props: {
      action,
      ...(section && { section }),
    },
  });
}

/**
 * 追踪外部链接点击
 * 注意: Plausible 已自动追踪 outbound-links，此函数用于额外的自定义追踪
 */
export function trackExternalLink(destination: string): void {
  trackEvent('external_click', {
    props: {
      destination,
    },
  });
}

/**
 * 初始化深度阅读追踪
 * 当用户在页面停留超过 120 秒时自动触发 deep_reading 事件
 *
 * 每次路由变化时会重置计时器，只追踪当前页面的停留时间
 *
 * @example
 * // 在 layout.tsx 或页面组件中调用
 * useEffect(() => {
 *   const cleanup = initDeepReadingTracker();
 *   return cleanup; // 清理旧计时器
 * }, [pathname]);
 */
export function initDeepReadingTracker(): () => void {
  if (typeof window === 'undefined') return () => {};

  // 清除之前的计时器（如果存在）
  if ((window as any).__deepReadingTimer) {
    clearTimeout((window as any).__deepReadingTimer);
  }

  // 设置新的计时器
  (window as any).__deepReadingTimer = setTimeout(() => {
    trackEvent('deep_reading', {
      props: {
        page: window.location.pathname,
      },
    });
    // 触发后清除计时器引用
    (window as any).__deepReadingTimer = null;
  }, 120000); // 120 seconds

  // 返回清理函数
  return () => {
    if ((window as any).__deepReadingTimer) {
      clearTimeout((window as any).__deepReadingTimer);
      (window as any).__deepReadingTimer = null;
    }
  };
}

/**
 * 追踪内容探索行为
 * 当用户在单次会话中访问第 3 个不同页面时触发 content_explore 事件
 *
 * 使用 sessionStorage 追踪会话内的页面访问
 *
 * @example
 * // 在 layout.tsx 中的每次路由变化时调用
 * useEffect(() => {
 *   trackContentExplore();
 * }, [pathname]);
 */
export function trackContentExplore(): void {
  if (typeof window === 'undefined') return;

  try {
    const STORAGE_KEY = 'plausible_visited_pages';
    const currentPath = window.location.pathname;

    // 获取已访问页面列表
    const visitedPagesStr = sessionStorage.getItem(STORAGE_KEY);
    const visitedPages: string[] = visitedPagesStr
      ? JSON.parse(visitedPagesStr)
      : [];

    // 如果当前页面未访问过，添加到列表
    if (!visitedPages.includes(currentPath)) {
      visitedPages.push(currentPath);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(visitedPages));

      // 当访问第 3 个不同页面时触发事件
      if (visitedPages.length === 3) {
        trackEvent('content_explore', {
          props: {
            pages_visited: visitedPages.length,
            third_page: currentPath,
          },
        });
      }
    }
  } catch (error) {
    console.error('Plausible: Error tracking content explore', error);
  }
}

// 声明全局 window.plausible 类型
declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: PlausibleEventOptions
    ) => void;
  }
}
