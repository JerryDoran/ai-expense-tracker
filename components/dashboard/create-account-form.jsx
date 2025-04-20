'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { accountSchema } from '@/lib/zod-schemas';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/use-fetch';
import { createAccount } from '@/actions/dashboard-actions';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function CreateAccountForm({ children }) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: '',
      type: 'CHECKING',
      balance: '',
      isDefault: false,
    },
  });

  const {
    data: newAccount,
    error,
    loading: createAccountLoading,
    fn: createAccountFn,
  } = useFetch(createAccount);

  useEffect(() => {
    if (newAccount && !createAccountLoading) {
      toast.success('Account created successfully!');
      reset();
      setOpen(false);
    }
  }, [newAccount, createAccountLoading]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  async function onSubmit(data) {
    await createAccountFn(data);
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className='p-6'>
        <DrawerHeader>
          <DrawerTitle>Create New Account</DrawerTitle>
        </DrawerHeader>
        <div className='px-6 pb-6'>
          <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-2'>
              <Label htmlFor='name' className='text-sm font-medium'>
                Account Name
              </Label>
              <Input
                id='name'
                {...register('name')}
                placeholder='e.g., My checking account'
              />
              {errors.name && (
                <p className='text-red-500 text-sm'>{errors.name.message}</p>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='type' className='text-sm font-medium'>
                Account Type
              </Label>
              <Select
                onValueChange={(value) => setValue('type', value)}
                defaultValue={watch('type')}
              >
                <SelectTrigger id='type' className='w-full'>
                  <SelectValue placeholder='Account type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='CHECKING'>Checking</SelectItem>
                  <SelectItem value='SAVINGS'>Savings</SelectItem>
                </SelectContent>
              </Select>

              {errors.type && (
                <p className='text-red-500 text-sm'>{errors.type.message}</p>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='balance' className='text-sm font-medium'>
                Initial Balance
              </Label>
              <Input
                id='balance'
                type='number'
                step='0.01'
                {...register('balance')}
                placeholder='0.00'
              />
              {errors.balance && (
                <p className='text-red-500 text-sm'>{errors.balance.message}</p>
              )}
            </div>
            <div className='flex items-center justify-between rounded-lg border p-3'>
              <div className='space-y-1'>
                <Label
                  htmlFor='isDefault'
                  className='text-sm font-medium cursor-pointer'
                >
                  Set as Default
                </Label>
                <p className='text-xs text-muted-foreground'>
                  This account will be selected by default for transactions
                </p>
              </div>

              <Switch
                id='isDefault'
                onCheckedChange={(checked) => setValue('isDefault', checked)}
                defaultValue={watch('isDefault')}
              />
            </div>
            <div className='space-x-2 pt-4'>
              <DrawerClose asChild>
                <Button
                  type='button'
                  variant='outline'
                  className='flex-1 cursor-pointer'
                >
                  Cancel
                </Button>
              </DrawerClose>
              <Button
                type='submit'
                className='flex-1 cursor-pointer'
                disabled={createAccountLoading}
              >
                {createAccountLoading ? (
                  <>
                    <Loader2 className='mr-2 animate-spin size-4' /> Creating...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
