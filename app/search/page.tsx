'use client';

import React, {
  FC,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  KeyboardEvent,
} from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
};

type ProductListProps = {
  products: Product[];
};

type SearchBoxProps = {
  value: string;
  onSearch: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

// Simulated API call
const fetchProducts = async (query = ""): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const allProducts: Product[] = [
    { id: 1, name: "Laptop", price: 999 },
    { id: 2, name: "Laptop Pro", price: 1299 },
    { id: 3, name: "Laptop Air", price: 1099 },
    { id: 4, name: "Smartphone", price: 699 },
    { id: 5, name: "Smartphone Plus", price: 799 },
    { id: 6, name: "Smartphone Mini", price: 599 },
    { id: 7, name: "Tablet", price: 499 },
    { id: 8, name: "Tablet Pro", price: 699 },
    { id: 9, name: "Tablet Mini", price: 399 },
    { id: 10, name: "Smartwatch", price: 299 },
    { id: 11, name: "Smartwatch Pro", price: 399 },
    { id: 12, name: "Smartwatch Lite", price: 199 },
    { id: 13, name: "Headphones", price: 199 },
    { id: 14, name: "Headphones Wireless", price: 249 },
    { id: 15, name: "Headphones Pro", price: 299 },
  ];
  return allProducts.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
};

const debounce = <F extends (...args: any[]) => any>(func: F, wait: number) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<F>): void => {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
};

const SearchBox: FC<SearchBoxProps> = ({ value, onSearch, onChange }) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="border-2 rounded w-full max-w-md">
      <input
        type="text"
        value={value}
        onKeyDown={handleKeyDown}
        onChange={onChange}
        placeholder="Search products..."
        className="w-full px-4 py-2 outline-none"
      />
    </div>
  );
};

const ProductList: FC<ProductListProps> = ({ products }) => {
  return (
    <ul className="w-full max-w-md space-y-2">
      {products.map((product) => (
        <li
          key={product.id}
          className="flex items-center justify-between p-3 bg-white shadow rounded"
        >
          <span className="font-semibold">{product.name}</span>
          <span>${product.price}</span>
        </li>
      ))}
    </ul>
  );
};

const ProductManager: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setLoading(true);
      fetchProducts(term)
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch products");
          setLoading(false);
        });
    }, 750),
    []
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    debouncedSearch(query);
  };

  if (error) {
    return <div className="text-red-500 text-xl">{error}</div>;
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <div className="bg-gray-200 p-4 rounded-lg relative">
        <SearchBox
          value={query}
          onSearch={handleSearch}
          onChange={handleChange}
        />
      </div>
      <button
        onClick={handleSearch}
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-12 border-2 rounded-md w-full mb-2"
      >
        Search
      </button>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">Searching...</p>
        </div>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
};

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-2xl font-semibold mb-4">Product Search</div>
      <ProductManager />
    </main>
  );
}
