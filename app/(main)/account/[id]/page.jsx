import { getAccountWithTransactions } from '@/actions/account';
import { notFound } from 'next/navigation';

export default async function AccountPage({ params }) {
  const accountData = await getAccountWithTransactions(params.id);
  console.log(accountData);

  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;

  return (
    <div className='space-y-8 px-5 flex gap-4 items-center justify-between'>
      <div className=''>
        <h1 className='text-4xl sm:text-5xl font-bold gradient-title capitalize'>
          {account.name}
        </h1>
        <p className='text-muted-foreground'>
          {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account{' '}
        </p>
      </div>
      <div className='text-right pb-2'>
        <div className='text-xl font-bold sm:text-2xl'>
          ${parseFloat(account.balance).toFixed(2)}
        </div>
        <p className='text-muted-foreground text-sm'>
          {account._count.transactions} transactions
        </p>
      </div>

      {/* Chart section */}

      {/* Transactions */}
    </div>
  );
}
