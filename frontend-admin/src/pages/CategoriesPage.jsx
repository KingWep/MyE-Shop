import { useState } from 'react';
import CategoriesTable from '../features/categories/CategoriesTable';
import CategoryModal from '../features/categories/CategoryModal';
import { Button, PageHeader } from '../components';
import { categories as initialCategories } from '../api/mockData';
import { useModal } from '../hooks/useModal';
import { HiPlus } from 'react-icons/hi2';

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const addModal = useModal();
  const editModal = useModal();

  const handleSave = (data) => {
    if (data.id) {
      setCategories(prev => prev.map(c => c.id === data.id ? { ...c, ...data } : c));
    } else {
      setCategories(prev => [...prev, { ...data, id: Date.now(), products: 0, image: `https://placehold.co/48x48/6366f1/fff?text=${data.name[0]}` }]);
    }
  };

  const handleDelete = (id) => setCategories(prev => prev.filter(c => c.id !== id));

  return (
    <div>
      <PageHeader 
        title="Categories" 
        crumbs={[{ label: 'Dashboard', path: '/' }, { label: 'Products', path: '/products' }, { label: 'Categories' }]}
      >
        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm" onClick={addModal.open}>
          <HiPlus className="h-4 w-4" />
          Add Category
        </Button>
      </PageHeader>

      <CategoriesTable
        categories={categories}
        onEdit={editModal.open}
        onDelete={handleDelete}
      />

      <CategoryModal
        isOpen={addModal.isOpen}
        onClose={addModal.close}
        onSave={handleSave}
      />
      <CategoryModal
        isOpen={editModal.isOpen}
        onClose={editModal.close}
        initialData={editModal.data}
        onSave={handleSave}
      />
    </div>
  );
}
