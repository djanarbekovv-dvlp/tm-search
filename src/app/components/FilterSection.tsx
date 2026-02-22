interface FilterSectionProps {
  selectedCategory: string;
  selectedStatus: string;
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
}

export function FilterSection({
  selectedCategory,
  selectedStatus,
  onCategoryChange,
  onStatusChange,
}: FilterSectionProps) {
  const categories = [
    { value: 'all', label: 'Все категории' },
    { value: '1-34', label: 'Товары (классы 1-34)' },
    { value: '35-45', label: 'Услуги (классы 35-45)' },
    { value: '1', label: 'Класс 1: Химические продукты' },
    { value: '9', label: 'Класс 9: Программное обеспечение' },
    { value: '25', label: 'Класс 25: Одежда и обувь' },
    { value: '30', label: 'Класс 30: Кондитерские изделия' },
    { value: '35', label: 'Класс 35: Реклама и бизнес' },
    { value: '41', label: 'Класс 41: Образование' },
    { value: '42', label: 'Класс 42: IT-услуги' },
  ];

  const statuses = [
    { value: 'all', label: 'Все статусы' },
    { value: 'registered', label: 'Зарегистрирован' },
    { value: 'pending', label: 'На рассмотрении' },
    { value: 'expired', label: 'Истек срок' },
    { value: 'rejected', label: 'Отклонен' },
  ];

  return (
    <div className="bg-white border-b border-gray-200 py-4 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[250px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Категория (класс МКТУ)
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[250px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Статус
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
