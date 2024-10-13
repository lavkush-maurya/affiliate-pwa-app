import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const EditProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState({ name: '', price: '', imageUrl: '', productUrl: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`/api/products/${id}`);
          setProduct(response.data.data); // Ensure you are accessing the data correctly
          setLoading(false);
        } catch (error) {
          console.error('Error fetching product', error);
          alert('Failed to fetch product details');
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/products/${id}`, product);
      alert('Product updated successfully!');
      router.push('/'); // Redirect to product list after update
    } catch (error) {
      console.error('Error updating product', error);
      alert('Failed to update product');
    }
  };

  if (loading) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
      <form onSubmit={handleSubmit} className="container mx-auto p-6 bg-white rounded-lg shadow-lg mt-6 max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Edit Product</h2>

        <div className="mb-4">
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            placeholder="Product Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
            placeholder="#code"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={product.imageUrl}
            onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
            placeholder="Image URL"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={product.productUrl}
            onChange={(e) => setProduct({ ...product, productUrl: e.target.value })}
            placeholder="Product URL"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
