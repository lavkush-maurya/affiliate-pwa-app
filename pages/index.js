import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadStaticData = async () => {
      try {
        const response = await fetch('/data/productList.json');
        if (!response.ok) {
          throw new Error('Failed to fetch static data');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStaticData();
  }, []);

  const filteredProducts = products.filter(product =>
    product.price.toString().includes(searchQuery)
  );

  // Set default theme based on local storage or use light as default
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', storedTheme);
  }, []);

    

  return (
    <>
      <Head>
        <title>Products - GoodsHub</title>
        <meta name="description" content="Explore our range of products available at great prices. Search for your favorite items!" />
        <meta property="og:title" content="Product List - GoodsHub" />
        <meta property="og:description" content="Explore our range of products available at great prices. Search for your favorite items!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/" />
        <meta property="og:image" content="/icon-512x512.jpg" />
      </Head>
      
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <div className="text-2xl font-bold text-gray-800">SK</div>
        <nav className="flex space-x-4">
          
        </nav>
      </header>

      <main className="min-h-screen flex flex-col bg-gradient-to-r from-purple-500 to-indigo-600">
        <section className="p-4 mt-4">
          <input
            type="text"
            placeholder="Search by code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 text-gray-900 placeholder-gray-500"
            aria-label="Search products"
          />
        </section>

        <section className="p-4 text-center">
          {loading && (
            <p className="text-lg font-bold text-white">Loading...</p>
          )}
          {error && (
            <p className="text-red-500 text-lg font-bold">{error}</p>
          )}
        </section>

        <section className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {!loading && !error && (
            filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <article key={product.name} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-200 lg:hover:scale-105">
                  <Link href={product.productUrl || '#'} className="flex flex-row sm:flex-col">
                    <img
                      src={product.imageUrl}
                      alt={`Image of ${product.name}`}
                      className="w-full h-48 object-contain rounded-t-lg"
                      title={product.name}
                    />
                    <div className="p-4">
                      <p className="text-gray-500">#{product.price}</p>
                      <h3 className="font-bold text-gray-800 truncate-multiline" title={product.name}>{product.name}</h3>
                      {product.productUrl ? null : <p className="text-red-500">Error: Product link is missing.</p>}
                    </div>
                  </Link>
                </article>
              ))
            ) : (
              <p className="text-lg font-bold text-white col-span-full text-center">No Match Product Found</p>
            )
          )}
        </section>
      </main>
    </>
  );
}
