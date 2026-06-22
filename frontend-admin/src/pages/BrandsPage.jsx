import { useState } from 'react';
import BrandsGrid from '../features/brands/BrandsGrid';
import BrandModal from '../features/brands/BrandModal';
import { Button, PageHeader } from '../components';
import { brands as initialBrands } from '../api/mockData';
import { useModal } from '../hooks/useModal';
import { HiPlus } from 'react-icons/hi2';
import { brandStats } from '../data/pageStats';

export default function BrandsPage() {
  const [brands, setBrands] = useState(initialBrands);
  const addModal = useModal();
  const editModal = useModal();

  const handleSave = (data) => {
    if (data.id) {
      setBrands(prev => prev.map(b => b.id === data.id ? { ...b, ...data } : b));
    } else {
      setBrands(prev => [...prev, { ...data, id: Date.now(), products: 0, logo: `https://placehold.co/64x64/6366f1/fff?text=${data.name[0]}` }]);
    }
  };

  const handleDelete = (brand) => {
    if (window.confirm(`Delete brand "${brand.name}"?`)) {
      setBrands(prev => prev.filter(b => b.id !== brand.id));
    }
  };

  return (
    <div>
      <PageHeader 
        title="Brands" 
        description="Manage product brands and partnerships."
        crumbs={[{ label: 'Dashboard', path: '/' }, { label: 'Brands' }]}
        stats={brandStats}
      >
        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm" onClick={addModal.open}>
          <HiPlus className="h-4 w-4" />
          Add Brand
        </Button>
      </PageHeader>

      <BrandsGrid
        brands={brands}
        onEdit={editModal.open}
        onDelete={handleDelete}
      />

      <BrandModal isOpen={addModal.isOpen} onClose={addModal.close} onSave={handleSave} />
      <BrandModal isOpen={editModal.isOpen} onClose={editModal.close} initialData={editModal.data} onSave={handleSave} />
    </div>
  );
}
