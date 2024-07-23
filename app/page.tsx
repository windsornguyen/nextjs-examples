import React from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  BeakerIcon,
  MagnifyingGlassIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

const routes = [
  {
    name: "Counter",
    path: "/counter",
    description: "State management example",
    icon: BeakerIcon,
  },
  {
    name: "Search",
    path: "/search",
    description: "Data fetching and filtering",
    icon: MagnifyingGlassIcon,
  },
  {
    name: "Todo",
    path: "/todo",
    description: "CRUD operations example",
    icon: ClipboardDocumentListIcon,
  },
];

const RouteCard = ({ route }: { route: (typeof routes)[0] }) => (
  <div className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
    <div className="flex items-center mb-4">
      <route.icon className="h-8 w-8 text-blue-500 mr-3" />
      <h3 className="text-xl font-semibold">{route.name}</h3>
    </div>
    <p className="text-gray-600 mb-4">{route.description}</p>
    <Link
      href={route.path}
      className="text-blue-500 hover:text-blue-600 flex items-center font-medium"
    >
      View example <ArrowRightIcon className="h-4 w-4 ml-2" />
    </Link>
  </div>
);

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          React & Next.js Examples
        </h1>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Featured Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {routes.map((route) => (
              <RouteCard key={route.name} route={route} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            About This Project
          </h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-gray-600 leading-relaxed">
              This project showcases common React and Next.js patterns and
              examples. Each route demonstrates a different concept or feature.
              Feel free to explore the examples and use them as a reference for
              your own projects. Whether you're a beginner or an experienced
              developer, you'll find valuable insights and practical
              implementations here.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-300">
          <p>&copy; 2024 Windsor Nguyen.</p>
          <p className="mt-2 text-sm">Built with Next.js</p>
        </div>
      </footer>
    </div>
  );
}
