import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const adminStatus = localStorage.getItem('admin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const validUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const validPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (username === validUsername && password === validPassword) {
      localStorage.setItem('admin', 'true');
      setIsAdmin(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    setIsAdmin(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/products', { name, price, imageUrl, productUrl })
      .then(() => {
        alert('Product added successfully!');
        setName('');
        setPrice('');
        setImageUrl('');
        setProductUrl('');
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-500 to-indigo-600">
      {/* Navigation Bar */}
      <div className="w-full px-4 py-2 bg-gray-900 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            {isAdmin && (
              <>
                <a href="/" className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
                  View Site
                </a>
                <button 
                  onClick={handleLogout} 
                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Main Content - Centering the Form */}
      <div className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 max-w-md bg-gray-800 rounded-2xl shadow-lg">
          {isAdmin ? (
            <>
              <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-center text-white">Add Product</h2>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow duration-200 ease-in-out shadow-md hover:shadow-lg text-gray-900 placeholder-gray-400"
                />
                <input
                  type="number"
                  placeholder="#code"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow duration-200 ease-in-out shadow-md hover:shadow-lg text-gray-900 placeholder-gray-400"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow duration-200 ease-in-out shadow-md hover:shadow-lg text-gray-900 placeholder-gray-400"
                />
                <input
                  type="text"
                  placeholder="Product URL"
                  value={productUrl}
                  onChange={(e) => setProductUrl(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow duration-200 ease-in-out shadow-md hover:shadow-lg text-gray-900 placeholder-gray-400"
                />
                <button 
                  type="submit" 
                  className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
                >
                  Add Product
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-center text-white">Admin Login</h2>
              <form onSubmit={handleLogin} className="grid grid-cols-1 gap-6">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow duration-200 ease-in-out shadow-md hover:shadow-lg text-gray-900 placeholder-gray-400"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow duration-200 ease-in-out shadow-md hover:shadow-lg text-gray-900 placeholder-gray-400"
                />
                {errorMessage && (
                  <p className="text-red-500 text-center">{errorMessage}</p>
                )}
                <button 
                  type="submit" 
                  className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
                >
                  Login
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
