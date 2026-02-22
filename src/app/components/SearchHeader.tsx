import { Search } from "lucide-react";

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
}

export function SearchHeader({ searchQuery, onSearchChange, onSearch }: SearchHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Поиск товарных знаков КР
        </h1>
        <p className="text-blue-100 text-center mb-8 text-lg">
          Проверьте доступность товарного знака для регистрации в Кыргызской Республике
        </p>
        
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSearch()}
              placeholder="Введите название товарного знака..."
              className="w-full px-6 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          </div>
          <button
            onClick={onSearch}
            className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Искать
          </button>
        </div>
      </div>
    </div>
  );
}
