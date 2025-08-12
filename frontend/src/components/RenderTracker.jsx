import { useRef, useEffect } from 'react'

export const RenderTracker = ({ name, data }) => {
  const renderCount = useRef(0)
  const prevData = useRef(data)

  useEffect(() => {
    renderCount.current += 1
    const hasDataChanged =
      JSON.stringify(prevData.current) !== JSON.stringify(data)

    console.log(`🔄 ${name}:`, {
      renderCount: renderCount.current,
      dataChanged: hasDataChanged,
      data: data
    })

    prevData.current = data
  })

  return null // This component doesn't render anything
}
