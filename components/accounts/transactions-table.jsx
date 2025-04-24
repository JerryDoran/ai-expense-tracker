'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { categoryColors } from '@/data/categories';

export default function TransactionsTable({ transactions }) {
  const filteredAndSortedTransactions = transactions;
  function handleSort(sort) {}
  return (
    <div className='space-y-4'>
      {/* Filters */}

      {/* Transactions */}
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[50px]'>
                <Checkbox />
              </TableHead>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort('date')}
              >
                <div className='flex items-center'>Date</div>
              </TableHead>
              <TableHead>Description</TableHead>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort('category')}
              >
                <div className='flex items-center'>Category</div>
              </TableHead>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort('amount')}
              >
                <div className='flex items-center justify-end'>Amount</div>
              </TableHead>
              <TableHead>Recurring</TableHead>
              <TableHead className='w-[50px]'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedTransactions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className='text-muted-foreground text-center'
                >
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    {format(new Date(transaction.date), 'PP')}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className='capitalize'>
                    <span
                      style={{
                        background: categoryColors[transaction.category],
                      }}
                      className='px-2 py-1 rounded text-sm'
                    >
                      {transaction.category}
                    </span>
                  </TableCell>
                  <TableCell
                    className='flex justify-end font-medium'
                    style={{
                      color: transaction.type === 'EXPENSE' ? 'red' : 'green',
                    }}
                  >
                    {transaction.type === 'EXPENSE' ? '-' : '+'}$
                    {transaction.amount}
                  </TableCell>
                  <TableCell>
                    {transaction.isRecurring ? () : ()}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
