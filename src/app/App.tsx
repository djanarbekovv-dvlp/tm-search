import { useState, useMemo } from "react";
import { SearchHeader } from "./components/SearchHeader";
import { FilterSection } from "./components/FilterSection";
import { TrademarkCard, Trademark } from "./components/TrademarkCard";
import { TrademarkDetails } from "./components/TrademarkDetails";
import { mockTrademarks } from "./data/mockTrademarks";
import { AlertCircle, FileSearch } from "lucide-react";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearchQuery, setAppliedSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedTrademark, setSelectedTrademark] = useState<Trademark | null>(null);

  const handleSearch = () => {
    setAppliedSearchQuery(searchQuery);
  };

  const filteredTrademarks = useMemo(() => {
    return mockTrademarks.filter((tm) => {
      // Search filter
      if (appliedSearchQuery && !tm.name.toLowerCase().includes(appliedSearchQuery.toLowerCase()) &&
          !tm.owner.toLowerCase().includes(appliedSearchQuery.toLowerCase()) &&
          !tm.registrationNumber.toLowerCase().includes(appliedSearchQuery.toLowerCase())) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === '1-34' && !tm.category.match(/Класс [1-9]|Класс [1-2][0-9]|Класс 3[0-4]/)) {
          return false;
        }
        if (selectedCategory === '35-45' && !tm.category.match(/Класс 3[5-9]|Класс 4[0-5]/)) {
          return false;
        }
        if (selectedCategory !== '1-34' && selectedCategory !== '35-45' && 
            !tm.category.includes(`Класс ${selectedCategory}`)) {
          return false;
        }
      }

      // Status filter
      if (selectedStatus !== 'all' && tm.status !== selectedStatus) {
        return false;
      }

      return true;
    });
  }, [appliedSearchQuery, selectedCategory, selectedStatus]);

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
      />

      <FilterSection
        selectedCategory={selectedCategory}
        selectedStatus={selectedStatus}
        onCategoryChange={setSelectedCategory}
        onStatusChange={setSelectedStatus}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {appliedSearchQuery && (
          <div className="mb-6">
            <p className="text-gray-600">
              Результаты поиска по запросу: <span className="font-semibold">"{appliedSearchQuery}"</span>
              {" "}— найдено {filteredTrademarks.length} товарных знаков
            </p>
          </div>
        )}

        {!appliedSearchQuery && selectedCategory === 'all' && selectedStatus === 'all' && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
              <FileSearch className="text-blue-600" size={40} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Начните поиск товарного знака
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Введите название товарного знака в поисковую строку или используйте фильтры для просмотра базы данных
            </p>
          </div>
        )}

        {(appliedSearchQuery || selectedCategory !== 'all' || selectedStatus !== 'all') && filteredTrademarks.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <AlertCircle className="text-gray-400" size={40} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Ничего не найдено
            </h2>
            <p className="text-gray-600 max-w-md mx-auto mb-4">
              По вашему запросу не найдено зарегистрированных товарных знаков
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-2xl mx-auto text-left">
              <h3 className="font-semibold text-green-900 mb-2">
                ✅ Возможна регистрация
              </h3>
              <p className="text-green-800">
                Отсутствие результатов может указывать на то, что данное обозначение свободно для регистрации. 
                Рекомендуем проконсультироваться с патентным поверенным для проведения полной проверки на охраноспособность.
              </p>
            </div>
          </div>
        )}

        {filteredTrademarks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrademarks.map((trademark) => (
              <TrademarkCard
                key={trademark.id}
                trademark={trademark}
                onViewDetails={setSelectedTrademark}
              />
            ))}
          </div>
        )}
      </div>

      {selectedTrademark && (
        <TrademarkDetails
          trademark={selectedTrademark}
          onClose={() => setSelectedTrademark(null)}
        />
      )}

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-3">О сервисе</h3>
              <p className="text-gray-300 text-sm">
                Информационная система поиска зарегистрированных товарных знаков Кыргызской Республики
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Полезные ссылки</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Кыргызпатент (kyrgyzpatent.kg)</li>
                <li>• Законодательство КР об интеллектуальной собственности</li>
                <li>• Международная классификация товаров и услуг (МКТУ)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Важная информация</h3>
              <p className="text-gray-300 text-sm">
                Данный сервис носит информационный характер. Для официальной регистрации товарного знака обратитесь в Кыргызпатент.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm text-gray-400">
            © 2026 Поиск товарных знаков КР. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
