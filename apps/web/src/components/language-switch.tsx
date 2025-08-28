'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'

export function LanguageSwitch() {
  const [currentLang, setCurrentLang] = useState('EN')

  const toggleLanguage = () => {
    setCurrentLang(currentLang === 'EN' ? 'हि' : 'EN')
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-1 text-sm"
    >
      <Globe className="h-4 w-4" />
      <span>{currentLang}</span>
    </Button>
  )
}