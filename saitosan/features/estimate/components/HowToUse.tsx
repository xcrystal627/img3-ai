import React from 'react'
import Image from 'next/image'

interface Props {
  src: string
  alt: string
  title: string
  description: string
}

function HowToUse({ src, alt, title, description }: Props) {
  return (
    <div className="grid w-full grid-flow-row justify-items-center gap-2">
      <div className="relative mb-8 aspect-[320/212] w-full sm:w-2/3">
        <Image
          src={src}
          alt={alt}
          fill
          loading="lazy"
          className="absolute object-contain"
        ></Image>
      </div>

      <h3 className="mb-6 text-xl font-bold leading-tight tracking-tight">
        {title}
      </h3>

      <div className="prose prose-neutral prose-a:no-underline prose-a:text-blue-600 max-w-full marker:text-xl marker:text-blue-600">
        <p>{description}</p>
      </div>
    </div>
  )
}

export default HowToUse
