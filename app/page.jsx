import Hero from '@/components/hero';
import { Card, CardContent } from '@/components/ui/card';
import { featuresData, statsData } from '@/data/landing';

export default function Home() {
  return (
    <div className='mt-20'>
      <Hero />
      <section className='py-20 bg-slate-800'>
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
    </div>
  );
}
