import {
  SignedIn,
  UserButton,
  SignedOut,
  SignInButton,
  SignUpButton,
} from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutDashboard } from 'lucide-react';
import { PenBox } from 'lucide-react';

export default function Header() {
  return (
    <div className='fixed top-0 w-full backdrop-blur-md  border-b border-gray-700 z-50 flex items-center justify-between px-4 py-2'>
      <nav className='container mx-auto px-4 py-1 flex items-center justify-between'>
        <Link href='/' className='text-2xl font-bold flex items-center'>
          <Image
            src='/logo.svg'
            alt='Beekeeper Logo'
            width={30}
            height={30}
            className='size-8 object-contain mr-2 mb-2'
          />
          <span className='gradient-title'>Beekeeper</span>
        </Link>
        <div className='flex items-center space-x-4'>
          <SignedIn>
            <Link href='/dashboard' className='text-gray-700'>
              <Button
                variant='secondary'
                className='cursor-pointer text-muted-foreground transition-colors hover:text-gray-200'
              >
                <LayoutDashboard className='size-4' />
                <span className='hidden md:inline'>Dashboard</span>
              </Button>
            </Link>
            <Link href='/transaction/create'>
              <Button className='cursor-pointer transition-colors text-gray-200 bg-blue-500 hover:bg-blue-600'>
                <PenBox className='size-4' />
                <span className='hidden md:inline'>Add Transaction</span>
              </Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton forceRedirectUrl='/dashboard'>
              <Button variant='secondary' className='cursor-pointer'>
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton forceRedirectUrl='/dashboard'>
              <Button variant='secondary' className='cursor-pointer'>
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
}
