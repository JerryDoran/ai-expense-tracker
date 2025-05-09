'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { format, set } from 'date-fns';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { categoryColors } from '@/data/categories';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Clock, RefreshCw } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash } from 'lucide-react';
import { X } from 'lucide-react';

const RECURRING_INTERVALS = {
  DAILY: 'Daily',
  WEEKLY: 'Weekly',
  BIWEEKLY: 'Biweekly',
  MONTHLY: 'Monthly',
  QUARTERLY: 'Quarterly',
  YEARLY: 'Yearly',
};

export default function TransactionsTable({ transactions }) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    field: 'date',
    direction: 'desc',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [recurringFilter, setRecurringFilter] = useState('');

  const filteredAndSortedTransactions = transactions;

  function handleSort(field) {
    setSortConfig((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  }

  function handleSelect(id) {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  }

  function handleSelectAll() {
    setSelectedIds((prev) =>
      prev.length === filteredAndSortedTransactions.length
        ? []
        : filteredAndSortedTransactions.map((transaction) => transaction.id)
    );
  }

  function handleBulkDelete() {
    // Implement bulk delete logic here

    setSelectedIds([]);
  }

  return (
    <div className='space-y-4'>
      {/* Filters */}
      <div className='flex flex-col sm:flex-row gap-4 '>
        <div className='relative flex-1'>
          <Search className='absolute left-2 top-2.5 size-4 text-muted-foreground' />
          <Input
            className='pl-8'
            placeholder='Search Transactions...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='flex gap-2'>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder='All Types' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='INCOME'>Income</SelectItem>
              <SelectItem value='EXPENSE'>Expense</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={recurringFilter}
            onValueChange={(value) => setRecurringFilter(value)}
          >
            <SelectTrigger className='w-[160px]'>
              <SelectValue placeholder='All Transactions' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='recurring'>Recurring Only</SelectItem>
              <SelectItem value='non-recurring'>Non-recurring</SelectItem>
            </SelectContent>
          </Select>

          {selectedIds.length > 0 && (
            <Button
              className='cursor-pointer'
              variant='destructive'
              size='sm'
              onClick={handleBulkDelete}
            >
              <Trash className='size-4' />
              Delete Selected ({selectedIds.length})
            </Button>
          )}

          {(searchTerm || filterType || recurringFilter) && (
            <Button
              variant='outline'
              size='sm'
              onClick={() => {
                setSearchTerm('');
                setFilterType('');
                setRecurringFilter('');
                setSelectedIds([]);
              }}
              className='cursor-pointer'
            >
              <X className='size-4' />
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Transactions */}
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[50px]'>
                <Checkbox
                  onCheckedChange={handleSelectAll}
                  checked={
                    selectedIds.length ===
                      filteredAndSortedTransactions.length &&
                    filteredAndSortedTransactions.length > 0
                  }
                />
              </TableHead>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort('date')}
              >
                <div className='flex items-center'>
                  Date{' '}
                  {sortConfig.field === 'date' &&
                    (sortConfig.direction === 'asc' ? (
                      <ChevronUp className='ml-2 size-4' />
                    ) : (
                      <ChevronDown className='ml-2 size-4' />
                    ))}
                </div>
              </TableHead>
              <TableHead>Description</TableHead>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort('category')}
              >
                <div className='flex items-center'>
                  Category{' '}
                  {sortConfig.field === 'category' &&
                    (sortConfig.direction === 'asc' ? (
                      <ChevronUp className='ml-2 size-4' />
                    ) : (
                      <ChevronDown className='ml-2 size-4' />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort('amount')}
              >
                <div className='flex items-center justify-end'>
                  Amount{' '}
                  {sortConfig.field === 'amount' &&
                    (sortConfig.direction === 'asc' ? (
                      <ChevronUp className='ml-2 size-4' />
                    ) : (
                      <ChevronDown className='ml-2 size-4' />
                    ))}
                </div>
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
                    <Checkbox
                      onCheckedChange={() => handleSelect(transaction.id)}
                      checked={selectedIds.includes(transaction.id)}
                    />
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
                    className='flex justify-end mt-2 font-medium'
                    style={{
                      color: transaction.type === 'EXPENSE' ? 'red' : 'green',
                    }}
                  >
                    {transaction.type === 'EXPENSE' ? '-' : '+'}$
                    {transaction.amount}
                  </TableCell>
                  <TableCell>
                    {transaction.isRecurring ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge
                              variant='outline'
                              className='gap-1 bg-purple-700 text-purple-100 hover:bg-purple-800 transition'
                            >
                              <RefreshCw className='h-4 w-4' />
                              {
                                RECURRING_INTERVALS[
                                  transaction.recurringInterval
                                ]
                              }
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div>
                              <div className='text-xs'>Next Date:</div>
                              <div className='text-xs font-medium'>
                                {format(
                                  new Date(transaction.nextRecurringDate),
                                  'PP'
                                )}
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <Badge variant='outline' className='gap-1'>
                        <Clock className='h-4 w-4' />
                        One-time
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='cursor-pointer p-0 '
                        >
                          <MoreHorizontal className='size-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(
                              `/transaction/create?edit=${transaction.id}`
                            )
                          }
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className='text-destructive'
                          // onClick={() => deleteTransaction([transaction.id])}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
