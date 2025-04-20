'use server';

import { db } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

function serializeTransaction(obj) {
  const serialized = { ...obj };

  if (obj.balance) {
    serialized.balance = obj.balance.toNumber();
  }
  return serialized;
}

export async function createAccount(data) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error('Unauthorized!');
    }

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) {
      throw new Error('User not found!');
    }

    const balance = data.balance ? parseFloat(data.balance) : 0;

    if (isNaN(balance)) {
      throw new Error('Invalid balance amount!');
    }

    const existingAccount = await db.account.findMany({
      where: {
        userId: user.id,
      },
    });

    const shouldBeDefaultAccount =
      existingAccount.length === 0 ? true : data.isDefault;

    // if this account should be default, make all other accounts non-default
    if (shouldBeDefaultAccount) {
      await db.account.updateMany({
        where: {
          userId: user.id,
          isDefault: true,
        },
        data: {
          isDefault: false,
        },
      });
    }

    const account = await db.account.create({
      data: {
        name: data.name,
        type: data.type,
        balance,
        isDefault: shouldBeDefaultAccount,
        userId: user.id,
      },
    });

    const serializedAccount = serializeTransaction(account);

    revalidatePath('/dashboard');

    return { success: true, account: serializedAccount };
  } catch (error) {
    throw new Error(error.message);
  }
}
