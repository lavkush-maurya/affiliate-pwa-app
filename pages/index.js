import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // New state for search input
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to Fetch Products');
        setLoading(false);
      }
    };

    const adminStatus = localStorage.getItem('admin') === 'true';
    setIsAdmin(adminStatus);

    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin'); // Remove admin status from local storage
    setIsAdmin(false); // Update the state
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) { // Confirm before deletion
      try {
        await axios.delete(`/api/products/${id}`);
        setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
        console.error('Failed to delete product', error);
        alert('Failed to delete product');
      }
    }
  };

  const handleEdit = (product) => {
    router.push(`/edit-product/${product._id}`);
  };

  // Filter products based on the searchQuery and compare it with the price
  const filteredProducts = products.filter(product =>
    product.price.toString().includes(searchQuery) // Ensure price is a string for comparison
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-500 to-indigo-600">
      {/* Admin Header */}
      {isAdmin && (
        <div className="bg-gray-900 p-4 mb-4 text-white flex justify-between items-center rounded-b-lg shadow-lg">
          <h1 className="text-xl font-bold">S / K</h1>
          <div>
            <Link href="/admin" className="p-2 mr-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
              Add Product
            </Link>
            <button 
              onClick={handleLogout} 
              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="p-4 mt-4">
        <input
          type="text"
          placeholder="Search by price..."
          value={searchQuery} // Bind input to searchQuery state
          onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 text-gray-900 placeholder-gray-500"
        />
      </div>

      {/* Loading/Error Messages */}
      <div className="p-4 text-center">
        {loading && (
          <p className="text-lg font-bold text-white">Loading...</p>
        )}
        {error && (
          <p className="text-red-500 text-lg font-bold">
            {error}
          </p>
        )}
      </div>

      {/* Product List or "No Match" Message */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {!loading && !error && (
          filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-200 lg:hover:scale-105">
                <Link href={product.productUrl || '#'} className="flex flex-row sm:flex-col">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-contain rounded-t-lg"
                    title={product.name}
                  />
                  <div className="p-4">
                    <p className="text-gray-500">#{product.price}</p>
                    <h3 className="font-bold text-gray-800 truncate-multiline" title={product.name}>{product.name}</h3>
                    {product.productUrl ? null : <p className="text-red-500">Error: Product link is missing.</p>}
                  </div>
                </Link>
                {isAdmin && (
                  <div className="flex justify-between items-center p-4 border-t border-gray-300">
                    <button onClick={() => handleEdit(product)} className="text-blue-500 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:underline">Delete</button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-lg font-bold text-white col-span-full text-center">No Match Product Found</p>
          )
        )}
      </div>
    </div>
  );
}
