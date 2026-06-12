import { useState } from 'react';
import Modal from '../../components/ui/Modal';
import Input, { Textarea, Select } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import ImageUploadInput from '../products/ImageUploadInput';

export default function BrandModal({ isOpen, onClose, initialData, onSave }) {
  const isEdit = !!initialData?.id;
  const [form, setForm] = useState({
    name: initialData?.name || '',
    country: initialData?.country || '',
    website: initialData?.website || '',
    description: initialData?.description || '',
    status: initialData?.status || 'active',
    logo: initialData?.logo || null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (key, val) => {
    setForm(prev => ({ ...prev, [key]: val }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const handleSave = async () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Brand name is required';
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    onSave?.({ ...initialData, ...form });
    setLoading(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Brand' : 'Add Brand'}
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} loading={loading}>
            {isEdit ? 'Update Brand' : 'Create Brand'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <ImageUploadInput
          label="Brand Logo"
          value={form.logo}
          onChange={val => set('logo', val)}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Brand Name"
            placeholder="e.g. Apple"
            value={form.name}
            onChange={e => set('name', e.target.value)}
            error={errors.name}
            required
          />
          <Input
            label="Country"
            placeholder="e.g. USA"
            value={form.country}
            onChange={e => set('country', e.target.value)}
          />
        </div>
        <Input
          label="Website"
          type="url"
          placeholder="https://example.com"
          value={form.website}
          onChange={e => set('website', e.target.value)}
        />
        <Textarea
          label="Description"
          value={form.description}
          onChange={e => set('description', e.target.value)}
          rows={3}
        />
        <Select label="Status" value={form.status} onChange={e => set('status', e.target.value)}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </Select>
      </div>
    </Modal>
  );
}
