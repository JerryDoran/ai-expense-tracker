import Image from 'next/image';
import Link from 'next/link';
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from '@/data/landing';
import Hero from '@/components/hero';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className='mt-20'>
      <Hero />
      <section className='py-20 bg-slate-800/80'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {statsData.map((stat, index) => (
              <div key={index} className='flex flex-col items-center'>
                <div className='text-4xl font-bold mb-2'>{stat.value}</div>
                <div className='text-muted-foreground'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className='py-20'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>
            Everything you need to manage your finances
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {featuresData.map((feature, index) => (
              <Card key={index} className='p-6'>
                <CardContent className='space-y-4 pt-4'>
                  {feature.icon}
                </CardContent>
                <h3 className='text-xl font-semibold'>{feature.title}</h3>
                <p className='text-muted-foreground'>{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className='py-20 bg-slate-800/80'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-16'>How it works</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {howItWorksData.map((item, index) => (
              <div key={index} className='text-center'>
                <div className='size-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6'>
                  {item.icon}
                </div>
                <h3 className='text-xl font-semibold mb-4'>{item.title}</h3>
                <p className='text-muted-foreground'>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className='py-20'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>
            What our users say
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {testimonialsData.map((testimonial, index) => (
              <Card key={index} className='p-6'>
                <CardContent className='pt-4'>
                  <div className='flex items-center mb-4'>
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className='rounded-full'
                    />
                    <div className='ml-4'>
                      <div className='font-semibold'>{testimonial.name}</div>
                      <span className='text-muted-foreground text-sm'>
                        {testimonial.role}
                      </span>
                    </div>
                  </div>
                  <p className='text-muted-foreground mt-4 text-sm'>
                    {testimonial.quote}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className='py-20 bg-slate-700/80'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold text-center mb-4'>
            Ready to take control of your finances?
          </h2>
          <p className='text-muted-foreground mb-8 max-w-2xl mx-auto'>
            Join thousands of users who are already saving and investing smarter
            with Beekeeper
          </p>
          <Link href='/dashboard'>
            <Button
              size='lg'
              className='animate-bounce uppercase cursor-pointer transition-colors text-gray-200 bg-blue-500 hover:bg-blue-600'
            >
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
