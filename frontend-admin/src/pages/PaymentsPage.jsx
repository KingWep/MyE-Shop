import TransactionsTable from '../features/payments/TransactionsTable';
import { payments } from '../api/mockData';
import { formatCurrency } from '../utils/formatters';
import { PageHeader } from '../components';

const summary = [
  { label: 'Total Paid',    value: payments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0),    color: 'emerald', emoji: '✅' },
  { label: 'Pending',       value: payments.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0), color: 'amber',   emoji: '⏳' },
  { label: 'Failed',        value: payments.filter(p => p.status === 'failed').reduce((s, p) => s + p.amount, 0),  color: 'red',     emoji: '❌' },
  { label: 'Refunded',      value: payments.filter(p => p.status === 'refunded').reduce((s, p) => s + p.amount, 0),color: 'slate',   emoji: '🔄' },
];

const colorMap = {
  emerald: 'bg-emerald-50 text-emerald-700',
  amber:   'bg-amber-50 text-amber-700',
  red:     'bg-red-50 text-red-700',
  slate:   'bg-slate-100 text-slate-700',
};

export default function PaymentsPage() {
  return (
    <div>
      <PageHeader 
        title="Payments" 
        crumbs={[{ label: 'Dashboard', path: '/' }, { label: 'Payments' }]}
      />

      {/* Summary cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {summary.map(item => (
          <div key={item.label} className={`rounded-xl p-4 ${colorMap[item.color]}`}>
            <div className="flex items-center gap-2">
              <span className="text-xl">{item.emoji}</span>
              <div>
                <p className="text-lg font-bold">{formatCurrency(item.value)}</p>
                <p className="text-xs font-medium opacity-80">{item.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <TransactionsTable payments={payments} />
    </div>
  );
}
