import { useState } from 'react';
import ReturnsTable from '../features/returns/ReturnsTable';
import { returns as initialReturns } from '../api/mockData';
import Badge from '../components/ui/Badge';
import { PageHeader } from '../components';

export default function ReturnsPage() {
  const [returns, setReturns] = useState(initialReturns);

  const handleApprove = (item) => {
    setReturns(prev => prev.map(r => r.id === item.id ? { ...r, status: 'approved' } : r));
  };

  const handleReject = (item) => {
    setReturns(prev => prev.map(r => r.id === item.id ? { ...r, status: 'rejected' } : r));
  };

  const counts = {
    total:     returns.length,
    requested: returns.filter(r => r.status === 'requested').length,
    approved:  returns.filter(r => r.status === 'approved').length,
    completed: returns.filter(r => r.status === 'completed').length,
    rejected:  returns.filter(r => r.status === 'rejected').length,
  };

  return (
    <div>
      <PageHeader 
        title="Returns & Refunds" 
        crumbs={[{ label: 'Dashboard', path: '/' }, { label: 'Returns' }]}
      />

      {/* Summary */}
      <div className="mb-6 flex flex-wrap gap-3">
        <div className="card-sm flex items-center gap-3">
          <span className="text-2xl font-bold text-slate-900">{counts.total}</span>
          <span className="text-sm text-slate-500">Total</span>
        </div>
        <div className="card-sm flex items-center gap-2">
          <Badge variant="warning" dot>{counts.requested} Pending</Badge>
        </div>
        <div className="card-sm flex items-center gap-2">
          <Badge variant="success" dot>{counts.approved} Approved</Badge>
        </div>
        <div className="card-sm flex items-center gap-2">
          <Badge variant="danger" dot>{counts.rejected} Rejected</Badge>
        </div>
        <div className="card-sm flex items-center gap-2">
          <Badge variant="info" dot>{counts.completed} Completed</Badge>
        </div>
      </div>

      <ReturnsTable
        returns={returns}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}
