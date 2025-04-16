import CreateAccountForm from '@/components/dashboard/create-account-form';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export default function DashboardPage() {
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
      </div>
    </div>
  );
}
