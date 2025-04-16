'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { accountSchema } from '@/lib/zod-schemas';
import {
  Drawer,
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

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className='p-6'>
        <DrawerHeader>
          <DrawerTitle>Create New Account</DrawerTitle>
        </DrawerHeader>
        <div className='px-6 pb-6'>
          <form className='space-y-4'>
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
                  <SelectItem value='checking'>Checking</SelectItem>
                  <SelectItem value='savings'>Savings</SelectItem>
                </SelectContent>
              </Select>

              {errors.type && (
                <p className='text-red-500 text-sm'>{errors.type.message}</p>
              )}
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
