
const trademarks = [
    {
        id: 1,
        name: "NARAN",
        owner: "ТОО «Наран Групп»",
        category: "Пиво, напитки",
        class: "32",
        status: "active",
        regNumber: "KY-2019-45632",
        regDate: "15.03.2019",
        expiryDate: "15.03.2029",
        image: "https://via.placeholder.com/120/EF4444/FFFFFF?text=N",
        address: "г. Бишкек, пр. Манаса 56",
        type: "Словесный"
    },
    {
        id: 2,
        name: "KUMTOR",
        owner: "Центерра Gold Inc.",
        category: "Драгоценные металлы",
        class: "14",
        status: "active",
        regNumber: "KY-2003-12045",
        regDate: "22.07.2003",
        expiryDate: "22.07.2033",
        image: "https://via.placeholder.com/120/F59E0B/FFFFFF?text=K",
        address: "г. Бишкек, ул. Московская 56",
        type: "Комбинированный"
    },
    {
        id: 3,
        name: "MEGA COM",
        owner: "АО «Альфа Телеком»",
        category: "Телекоммуникации",
        class: "38",
        status: "active",
        regNumber: "KY-2015-38921",
        regDate: "10.01.2015",
        expiryDate: "10.01.2035",
        image: "https://via.placeholder.com/120/3B82F6/FFFFFF?text=M",
        address: "г. Бишкек, пр. Чуй 265",
        type: "Словесный"
    },
    {
        id: 4,
        name: "AIR KYRGYZSTAN",
        owner: "ОАО «Авиакомпания Кыргызстан»",
        category: "Транспорт, авиация",
        class: "39",
        status: "pending",
        regNumber: "KY-2024-00123",
        regDate: "—",
        expiryDate: "—",
        image: "https://via.placeholder.com/120/6366F1/FFFFFF?text=A",
        address: "г. Бишкек, аэропорт Манас",
        type: "Комбинированный"
    },
    {
        id: 5,
        name: "SUPARA",
        owner: "ТОО «Супара Этно-Комплекс»",
        category: "Рестораны, отели",
        class: "43",
        status: "active",
        regNumber: "KY-2017-29876",
        regDate: "05.09.2017",
        expiryDate: "05.09.2027",
        image: "https://via.placeholder.com/120/10B981/FFFFFF?text=S",
        address: "г. Бишкек, с. Кок-Жар",
        type: "Изобразительный"
    },
    {
        id: 6,
        name: "DORDOI",
        owner: "ТОО «Дордой Ассоциация»",
        category: "Торговля, розница",
        class: "35",
        status: "active",
        regNumber: "KY-2005-23456",
        regDate: "18.11.2005",
        expiryDate: "18.11.2025",
        image: "https://via.placeholder.com/120/8B5CF6/FFFFFF?text=D",
        address: "г. Бишкек, ул. Исанова 105",
        type: "Словесный"
    },
    {
        id: 7,
        name: "SHORO",
        owner: "ТОО «Шоро Компани»",
        category: "Безалкогольные напитки",
        class: "32",
        status: "expired",
        regNumber: "KY-1998-08912",
        regDate: "20.05.1998",
        expiryDate: "20.05.2018",
        image: "https://via.placeholder.com/120/6B7280/FFFFFF?text=S",
        address: "г. Бишкек, пр. Жибек-Жолу 403",
        type: "Словесный"
    },
    {
        id: 8,
        name: "BISHKEK BEER",
        owner: "ТОО «Бишкекское пиво»",
        category: "Алкогольные напитки",
        class: "33",
        status: "active",
        regNumber: "KY-2020-56789",
        regDate: "12.08.2020",
        expiryDate: "12.08.2030",
        image: "https://via.placeholder.com/120/FCD34D/000000?text=B",
        address: "г. Бишкек, ул. Льва Толстого 1",
        type: "Комбинированный"
    },
    {
        id: 9,
        name: "KYYAL",
        owner: "ИП Асанов К.",
        category: "Текстиль, одежда",
        class: "25",
        status: "pending",
        regNumber: "KY-2024-00456",
        regDate: "—",
        expiryDate: "—",
        image: "https://via.placeholder.com/120/EC4899/FFFFFF?text=K",
        address: "г. Ош, ул. Ленина 45",
        type: "Изобразительный"
    }
];

let currentFilter = 'all';
let searchQuery = '';

function getStatusConfig(status) {
    const configs = {
        active: { 
            label: 'Действует', 
            color: 'bg-green-100 text-green-800 border-green-200',
            dot: 'bg-green-500'
        },
        pending: { 
            label: 'На рассмотрении', 
            color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            dot: 'bg-yellow-500'
        },
        expired: { 
            label: 'Истек', 
            color: 'bg-red-100 text-red-800 border-red-200',
            dot: 'bg-red-500'
        }
    };
    return configs[status] || configs.active;
}

function renderCards() {
    const grid = document.getElementById('resultsGrid');
    const emptyState = document.getElementById('emptyState');
    
    let filtered = trademarks.filter(tm => {
        const matchesSearch = tm.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tm.owner.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = currentFilter === 'all' || tm.status === currentFilter;
        return matchesSearch && matchesFilter;
    });

    // Update stats
    document.getElementById('totalCount').textContent = filtered.length;
    const available = filtered.filter(t => t.status !== 'active' && t.status !== 'pending').length;
    document.getElementById('availableCount').textContent = available;

    // Update availability indicator
    const availStatus = document.getElementById('availabilityStatus');
    if (searchQuery.length > 2) {
        const exactMatch = trademarks.find(t => t.name.toLowerCase() === searchQuery.toLowerCase());
        if (!exactMatch) {
            availStatus.classList.remove('hidden');
        } else {
            availStatus.classList.add('hidden');
        }
    } else {
        availStatus.classList.add('hidden');
    }

    if (filtered.length === 0) {
        grid.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    
    grid.innerHTML = filtered.map(tm => {
        const status = getStatusConfig(tm.status);
        return `
            <div onclick="openModal(${tm.id})" class="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-gray-300 transition-all cursor-pointer group fade-in">
                <div class="flex items-start gap-4">
                    <div class="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img src="${tm.image}" alt="${tm.name}" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-1">
                            <h3 class="font-semibold text-lg truncate group-hover:text-red-600 transition-colors">${tm.name}</h3>
                            <span class="text-xs px-2 py-0.5 rounded-full border ${status.color} font-medium flex items-center gap-1.5">
                                <span class="w-1.5 h-1.5 rounded-full ${status.dot}"></span>
                                ${status.label}
                            </span>
                        </div>
                        <p class="text-sm text-gray-600 mb-2 truncate">${tm.owner}</p>
                        <div class="flex items-center gap-3 text-xs text-gray-500">
                            <span class="flex items-center gap-1">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                                </svg>
                                Класс ${tm.class}
                            </span>
                            <span>•</span>
                            <span>${tm.category}</span>
                        </div>
                    </div>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span class="text-xs text-gray-400">№ ${tm.regNumber}</span>
                    <span class="text-xs font-medium text-gray-600 group-hover:text-red-600 flex items-center gap-1 transition-colors">
                        Подробнее
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                    </span>
                </div>
            </div>
        `;
    }).join('');
}

function handleSearch(value) {
    searchQuery = value.trim();
    const clearBtn = document.getElementById('clearBtn');
    clearBtn.classList.toggle('hidden', !searchQuery);
    renderCards();
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    handleSearch('');
}

function setFilter(filter) {
    currentFilter = filter;
    
    // Update button styles
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.dataset.filter === filter) {
            btn.className = 'filter-btn active px-4 py-2 rounded-lg text-sm font-medium bg-gray-900 text-white transition-all';
        } else {
            btn.className = 'filter-btn px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all';
        }
    });
    
    renderCards();
}

function openModal(id) {
    const tm = trademarks.find(t => t.id === id);
    if (!tm) return;
    
    const status = getStatusConfig(tm.status);
    const modal = document.getElementById('detailModal');
    const content = document.getElementById('modalContent');
    
    content.innerHTML = `
        <div class="space-y-6">
            <div class="flex items-center gap-4">
                <div class="w-24 h-24 rounded-xl overflow-hidden bg-gray-100">
                    <img src="${tm.image}" alt="${tm.name}" class="w-full h-full object-cover">
                </div>
                <div>
                    <h2 class="text-2xl font-bold mb-1">${tm.name}</h2>
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${status.color}">
                        <span class="w-2 h-2 rounded-full ${status.dot}"></span>
                        ${status.label}
                    </span>
                </div>
            </div>

            <div class="space-y-4">
                <div class="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div class="flex justify-between py-2 border-b border-gray-200 last:border-0">
                        <span class="text-gray-500">Владелец</span>
                        <span class="font-medium text-right">${tm.owner}</span>
                    </div>
                    <div class="flex justify-between py-2 border-b border-gray-200 last:border-0">
                        <span class="text-gray-500">Регистрационный номер</span>
                        <span class="font-medium font-mono">${tm.regNumber}</span>
                    </div>
                    <div class="flex justify-between py-2 border-b border-gray-200 last:border-0">
                        <span class="text-gray-500">МКТУ Класс</span>
                        <span class="font-medium">${tm.class} — ${tm.category}</span>
                    </div>
                    <div class="flex justify-between py-2 border-b border-gray-200 last:border-0">
                        <span class="text-gray-500">Тип знака</span>
                        <span class="font-medium">${tm.type}</span>
                    </div>
                    <div class="flex justify-between py-2 border-b border-gray-200 last:border-0">
                        <span class="text-gray-500">Дата регистрации</span>
                        <span class="font-medium">${tm.regDate}</span>
                    </div>
                    <div class="flex justify-between py-2 border-b border-gray-200 last:border-0">
                        <span class="text-gray-500">Срок действия до</span>
                        <span class="font-medium ${tm.status === 'expired' ? 'text-red-600' : ''}">${tm.expiryDate}</span>
                    </div>
                    <div class="flex justify-between py-2 border-b border-gray-200 last:border-0">
                        <span class="text-gray-500">Адрес</span>
                        <span class="font-medium text-right">${tm.address}</span>
                    </div>
                </div>

                <div class="bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <h4 class="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Юридическая информация
                    </h4>
                    <p class="text-sm text-blue-800 leading-relaxed">
                        Данные предоставлены Государственной службой интеллектуальной собственности и инноваций при Кабинете Министров Кыргызской Республики.
                    </p>
                </div>

                <button onclick="downloadCertificate(${tm.id})" class="w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    Скачать выписку (PDF)
                </button>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('detailModal');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

function downloadCertificate(id) {
    alert('Генерация PDF выписки из реестра...\n(В реальном приложении здесь будет скачивание документа)');
}

function toggleHelp() {
    alert('Справка:\n\n• Введите название товарного знака для поиска\n• Используйте фильтры для сортировки по статусу\n• Зеленый индикатор означает доступность для регистрации\n• Нажмите на карточку для детальной информации');
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// Initial render
renderCards();