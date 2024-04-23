'use client'

import * as React from 'react'

import { CopyButton, useCodeBlock } from './controller'

import s from './code-snippet.module.scss'

export const CodeGroupHeader = () => {
  const highligterRef = React.useRef<HTMLDivElement>(null)
  const { activeSnippet, snippets, selectSnippet } = useCodeBlock()

  React.useEffect(() => {
    if (!highligterRef.current) return

    const activeButton = highligterRef.current.parentElement?.querySelector(
      '[data-active="true"]'
    ) as HTMLButtonElement | null
    // translate the higlighter to the current active button
    if (activeButton) {
      const activeButtonComputedStyles = window.getComputedStyle(activeButton)
      highligterRef.current.style.left = `calc(${activeButton.offsetLeft}px + ${activeButtonComputedStyles.paddingLeft})`
      highligterRef.current.style.width = `calc(${activeButton.offsetWidth}px - ${activeButtonComputedStyles.paddingLeft} - ${activeButtonComputedStyles.paddingRight})`
    }
  }, [activeSnippet])

  if (!activeSnippet) return null

  return (
    <header className={s['code-snippet-header']}>
      {snippets.length > 1
        ? snippets.map((snippet) => (
            <button
              key={snippet._id}
              onClick={() => selectSnippet(snippet)}
              data-active={activeSnippet._id === snippet._id}
            >
              {snippet.fileName || 'Untitled'}
            </button>
          ))
        : activeSnippet.fileName || 'Untitled'}

      <CopyButton snippet={activeSnippet.code.code} />
      <div ref={highligterRef} className={s['code-snippet-header__highlighter']} />
    </header>
  )
}
