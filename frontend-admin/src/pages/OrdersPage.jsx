import OrdersTable from '../features/orders/OrdersTable';
import { orders } from '../api/mockData';
import { PageHeader } from '../components';

export default function OrdersPage() {
  return (
    <div>
      <PageHeader 
        title="Orders" 
        crumbs={[{ label: 'Dashboard', path: '/' }, { label: 'Orders' }]}
      />
      <OrdersTable orders={orders} />
    </div>
  );
}
