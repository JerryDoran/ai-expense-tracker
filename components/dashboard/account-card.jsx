import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ArrowDownRight } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';

export default function AccountCard({ account }) {
  return (
    <Card
      key={account.id}
      className='hover:shadow-md hover:shadow-blue-300/20 transition-shadow group relative cursor-pointer'
    >
      <CardHeader className='flex flex-row items-center justify-between space-y-0'>
        <CardTitle className='text-sm font-medium capitalize'>
          {account.name}
        </CardTitle>
        <Switch className='cursor-pointer' />
      </CardHeader>
      <Link href={`/account/${account.id}`}>
        <CardContent className=''>
          <div className='text-2xl font-bold'>
            ${parseFloat(account.balance).toFixed(2)}
          </div>
          <p className='text-xs text-muted-foreground'>
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{' '}
            Account
          </p>
        </CardContent>
        <CardFooter className='flex justify-between text-sm text-muted-foreground pt-6'>
          <div className='flex items-center'>
            <ArrowUpRight className='size-4 mr-2 text-green-500' />
            Income
          </div>
          <div className='flex items-center'>
            <ArrowDownRight className='size-4 mr-2 text-red-500' />
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
