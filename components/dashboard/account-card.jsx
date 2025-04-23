'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { updateDefaultAccount } from '@/actions/account';
import useFetch from '@/hooks/use-fetch';

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
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function AccountCard({ account }) {
  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    error,
    data: updatedAccount,
  } = useFetch(updateDefaultAccount);

  async function handleDefaultChange(e) {
    e.preventDefault();

    if (account.isDefault) {
      toast.warning('You need at least one default account');
      return;
    }

    await updateDefaultFn(account.id);
  }

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success('Default account updated successfully!');
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Default account was not updated!');
    }
  }, [error]);

  return (
    <Card
      key={account.id}
      className='hover:shadow-md hover:shadow-blue-300/20 transition-shadow group relative cursor-pointer'
    >
      <CardHeader className='flex flex-row items-center justify-between space-y-0'>
        <CardTitle className='text-sm font-medium capitalize'>
          {account.name}
        </CardTitle>
        <div className='flex space-x-4 items-center'>
          {updateDefaultLoading && <Loader2 className='animate-spin size-5' />}
          <Switch
            className='cursor-pointer'
            checked={account.isDefault}
            onClick={handleDefaultChange}
            disabled={updateDefaultLoading}
          />
        </div>
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
