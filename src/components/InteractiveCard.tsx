'use client'

import React, { useState } from 'react'

export default function InteractiveCard({ children }: { children: React.ReactNode }) {
    const [isHovered, setIsHovered] = useState(false)

    const baseClasses = 'w-1/5 h-[300px] rounded-lg transition-all cursor-pointer'
    
    const normalClasses = 'shadow-lg bg-white'
    
    const hoverClasses = 'shadow-2xl bg-neutral-200'

    return (
        <div 
            className={`${baseClasses} ${isHovered ? hoverClasses : normalClasses}`}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
        >
            {children}
        </div>
    )
}