import { useEffect } from 'react'

export default function GlobalShortcut() {
  useEffect(() => {
    function handler(e) {
      // Don't trigger while typing in inputs
      const tag = e.target && e.target.tagName
      const isInput = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target?.isContentEditable
      if (isInput) return

      // Don't trigger if already on an admin page
      const currentPath = window.location.pathname
      if (currentPath === '/admin' || currentPath === '/secret-admin' || currentPath === '/upload') return

      const mac = e.metaKey && !e.ctrlKey
      const ctrl = e.ctrlKey
      if ((ctrl || mac) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        // Open secret admin in a new tab
        try {
          window.open('/secret-admin', '_blank')
        } catch (err) {
          console.warn('Failed to open secret admin tab', err)
        }
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return null
}
