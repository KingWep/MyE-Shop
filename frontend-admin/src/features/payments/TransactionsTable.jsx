import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { PAYMENT_STATUSES } from '../../utils/constants';
import { HiOutlineEye } from 'react-icons/hi2';

export default function TransactionsTable({ payments }) {
  const columns = [
    { key: 'id', label: 'Transaction ID',
      render: val => <span className="font-semibold text-slate-700 font-mono text-sm">{val}</span> },
    { key: 'orderId', label: 'Order',
      render: val => <span className="font-semibold text-indigo-600">{val}</span> },
    { key: 'customer', label: 'Customer',
      render: val => <span className="font-medium text-slate-800">{val}</span> },
    { key: 'method', label: 'Method',
      render: val => (
        <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
          💳 {val}
        </span>
      ),
    },
    { key: 'date', label: 'Date',
      render: val => <span className="text-slate-500">{formatDate(val)}</span> },
    { key: 'status', label: 'Status',
      render: val => {
        const s = PAYMENT_STATUSES[val] || PAYMENT_STATUSES.pending;
        return <Badge variant={s.variant} dot>{s.label}</Badge>;
      },
    },
    { key: 'amount', label: 'Amount', align: 'right', sortable: true,
      render: val => <span className="font-bold text-slate-900">{formatCurrency(val)}</span> },
  ];

  return <Table columns={columns} data={payments} />;
}
