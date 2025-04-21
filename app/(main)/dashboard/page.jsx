import { getUserAccounts } from '@/actions/dashboard-actions';
import AccountCard from '@/components/dashboard/account-card';
import CreateAccountForm from '@/components/dashboard/create-account-form';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export default async function DashboardPage() {
  const accounts = await getUserAccounts();
  console.log(accounts);
  return (
    <div className='px-5'>
      {/* Budget Progress */}

      {/* Overview */}

      {/* Accounts Grid */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <CreateAccountForm>
          <Card className='cursor-pointer hover:shadow-md hover:shadow-blue-300/20 transition-shadow border-dashed'>
            <CardContent className='flex flex-col items-center justify-center text-muted-foreground h-full pt-5'>
              <Plus className='size-10 mb-2' />
              <p className='text-sm font-medium'>Add new account</p>
            </CardContent>
          </Card>
        </CreateAccountForm>
        {accounts.length > 0 &&
          accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
      </div>
    </div>
  );
}
