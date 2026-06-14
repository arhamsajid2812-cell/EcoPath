'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    switch (metric.name) {
      case 'FCP':
      case 'LCP':
      case 'CLS':
      case 'FID':
      case 'TTFB':
      case 'INP':
        // In a real application, send these to an analytics endpoint
        // console.log(`[Web Vitals] ${metric.name}: ${metric.value}ms`)
        break
    }
  })

  return null
}
