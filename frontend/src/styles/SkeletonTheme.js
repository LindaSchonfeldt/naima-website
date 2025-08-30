import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

export default function SkeletonTheme({
  children,
  baseColor = '#202020',
  highlightColor = '#444'
}) {
  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      {children}
    </SkeletonTheme>
  )
}

// optional named export for quick skeleton usage
export const SimpleSkeleton = ({ count = 5, height }) => (
  <Skeleton count={count} height={height} />
)
