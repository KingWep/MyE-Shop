import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import DashboardPage       from '../pages/DashboardPage';
import ProductsPage        from '../pages/ProductsPage';
import AddProductPage      from '../pages/AddProductPage';
import EditProductPage     from '../pages/EditProductPage';
import CategoriesPage      from '../pages/CategoriesPage';
import BrandsPage          from '../pages/BrandsPage';
import AddBrandPage        from '../pages/AddBrandPage';
import OrdersPage          from '../pages/OrdersPage';
import OrderDetailPage     from '../pages/OrderDetailPage';
import CustomersPage       from '../pages/CustomersPage';
import CustomerDetailPage  from '../pages/CustomerDetailPage';
import PaymentsPage        from '../pages/PaymentsPage';
import ReturnsPage         from '../pages/ReturnsPage';
import ReportsPage         from '../pages/ReportsPage';
import SettingsPage        from '../pages/SettingsPage';
import UsersPage           from '../pages/UsersPage';
import NotFoundPage        from '../pages/NotFoundPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* All admin routes nested under AdminLayout */}
      <Route path="/" element={<AdminLayout />}>
        <Route index                          element={<DashboardPage />} />
        <Route path="products"                element={<ProductsPage />} />
        <Route path="products/add"            element={<AddProductPage />} />
        <Route path="products/edit/:id"       element={<EditProductPage />} />
        <Route path="categories"              element={<CategoriesPage />} />
        <Route path="brands"                  element={<BrandsPage />} />
        <Route path="brands/add"              element={<AddBrandPage />} />
        <Route path="orders"                  element={<OrdersPage />} />
        <Route path="orders/:id"              element={<OrderDetailPage />} />
        <Route path="customers"               element={<CustomersPage />} />
        <Route path="customers/:id"           element={<CustomerDetailPage />} />
        <Route path="payments"                element={<PaymentsPage />} />
        <Route path="returns"                 element={<ReturnsPage />} />
        <Route path="reports"                 element={<ReportsPage />} />
        <Route path="settings"               element={<SettingsPage />} />
        <Route path="users"                   element={<UsersPage />} />
      </Route>

      {/* 404 fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
