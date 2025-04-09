'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Hero() {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100; // Adjust this value to control when the effect starts

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add('scrolled');
      } else {
        imageElement.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='pb-20 px-4 mt-40'>
      <div className='container mx-auto text-center'>
        <h1 className='text-5xl font-bold md:text-8xl pb-6 gradient-title'>
          Manager your finances <br /> with intelligence
        </h1>
        <p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
          An AI-powered financial management platform that helps you track,
          analyze, and optimize your spending with real-time insights.
        </p>
        <div className='flex justify-center gap-4 mb-8'>
          <Link href='/dashboard'>
            <Button size='lg' className='px-8 cursor-pointer'>
              Get Started
            </Button>
          </Link>
          <Link href='https://www.thewebarchitech.com/'>
            <Button size='lg' variant='outline' className='px-8 cursor-pointer'>
              Learn More
            </Button>
          </Link>
        </div>
        <div className='hero-image-wrapper'>
          <div ref={imageRef} className='hero-image'>
            <Image
              src='/banner.jpeg'
              alt='Dashboard Preview'
              width={1280}
              height={720}
              priority
              className='rounded-lg shadow-2xl border mx-auto'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
