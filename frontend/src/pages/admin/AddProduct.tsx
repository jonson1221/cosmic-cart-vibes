
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.price || !formData.description || !formData.category || !formData.image) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Check if price is valid
    if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      toast.error('Please enter a valid price');
      return;
    }
    
    setLoading(true);
    
    // In a real application, this would send the data to the backend API
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Product added successfully');
      navigate('/admin/products');
    } catch (error) {
      toast.error('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto p-4">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Product Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    required
                    aria-label="Product Name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="price" className="text-sm font-medium">Price ($)</label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    required
                    aria-label="Price"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">Description</label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter product description"
                    required
                    rows={4}
                    aria-label="Description"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">Category</label>
                  <Select
                    value={formData.category}
                    onValueChange={handleSelectChange}
                    required
                  >
                    <SelectTrigger id="category" aria-label="Category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="skincare">Skincare</SelectItem>
                      <SelectItem value="makeup">Makeup</SelectItem>
                      <SelectItem value="haircare">Haircare</SelectItem>
                      <SelectItem value="fragrances">Fragrances</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="image" className="text-sm font-medium">Image URL</label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Enter image URL"
                    required
                    aria-label="Image URL"
                  />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate('/admin/products')}
                    aria-label="Cancel"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={loading}
                    aria-label="Add Product"
                  >
                    {loading ? 'Adding...' : 'Add Product'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddProduct;
