import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl mt-4">Page Not Found</p>
      <p className="mt-2">Sorry, we couldn't find the page you're looking for.</p>

      <Link href="/" className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
          Go back to Home
      </Link>
    </div>
  );
}
