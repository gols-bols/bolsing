document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchOverlay = document.getElementById('search-overlay');

    // Словарь для перевода поисковых запросов
    const searchDictionary = {
        // Русские слова и их английские эквиваленты
        'часы': 'watch',
        'синий': 'blue',
        'золотой': 'golden',
        'серебряный': 'silver',
        'циферблат': 'dial',
        'магазин': 'shop',
        'о нас': 'about',
        'сервис': 'service',
        'контакты': 'contact',
        'главная': 'home',
        // Английские слова и их русские эквиваленты
        'watch': 'часы',
        'blue': 'синий',
        'golden': 'золотой',
        'silver': 'серебряный',
        'dial': 'циферблат',
        'shop': 'магазин',
        'about': 'о нас',
        'service': 'сервис',
        'contact': 'контакты',
        'home': 'главная'
    };

    // Функция для перевода поискового запроса
    function translateSearchQuery(query) {
        const words = query.toLowerCase().split(' ');
        return words.map(word => searchDictionary[word] || word).join(' ');
    }

    // Функция для определения текущего языка
    function getCurrentLanguage() {
        return document.documentElement.lang;
    }

    // Функция для получения URL страницы в зависимости от языка
    function getPageUrl(page, lang) {
        return lang === 'ru' ? `/ru/${page}` : `/${page}`;
    }

    // Функция для поиска
    function performSearch(query) {
        const currentLang = getCurrentLanguage();
        const translatedQuery = translateSearchQuery(query);
        
        // Определяем, какие страницы соответствуют запросу
        const results = [];
        
        // Поиск по названиям часов
        if (query.toLowerCase().includes('синий') || query.toLowerCase().includes('blue')) {
            results.push({
                title: currentLang === 'ru' ? 'Часы с синим циферблатом' : 'Blue Dial Watch',
                url: getPageUrl('watch-blue.html', currentLang)
            });
        }
        if (query.toLowerCase().includes('серебряный') || query.toLowerCase().includes('silver')) {
            results.push({
                title: currentLang === 'ru' ? 'Часы с серебряным циферблатом' : 'Silver Dial Watch',
                url: getPageUrl('watch-silver.html', currentLang)
            });
        }
        if (query.toLowerCase().includes('золотой') || query.toLowerCase().includes('golden')) {
            results.push({
                title: currentLang === 'ru' ? 'Часы с золотым циферблатом' : 'Golden Dial Watch',
                url: getPageUrl('watch-golden.html', currentLang)
            });
        }

        // Поиск по разделам сайта
        if (query.toLowerCase().includes('магазин') || query.toLowerCase().includes('shop')) {
            results.push({
                title: currentLang === 'ru' ? 'Магазин' : 'Shop',
                url: getPageUrl('shop.html', currentLang)
            });
        }
        if (query.toLowerCase().includes('о нас') || query.toLowerCase().includes('about')) {
            results.push({
                title: currentLang === 'ru' ? 'О нас' : 'About',
                url: getPageUrl('about.html', currentLang)
            });
        }
        if (query.toLowerCase().includes('сервис') || query.toLowerCase().includes('service')) {
            results.push({
                title: currentLang === 'ru' ? 'Сервис' : 'Service',
                url: getPageUrl('service.html', currentLang)
            });
        }
        if (query.toLowerCase().includes('контакты') || query.toLowerCase().includes('contact')) {
            results.push({
                title: currentLang === 'ru' ? 'Контакты' : 'Contact',
                url: getPageUrl('contact.html', currentLang)
            });
        }
        if (query.toLowerCase().includes('главная') || query.toLowerCase().includes('home')) {
            results.push({
                title: currentLang === 'ru' ? 'Главная' : 'Home',
                url: getPageUrl('', currentLang)
            });
        }

        return results;
    }

    // Функция для отображения результатов поиска
    function displayResults(results) {
        if (!searchResults) return;

        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            searchResults.innerHTML = `<div class="search-no-results">${
                getCurrentLanguage() === 'ru' ? 'Ничего не найдено' : 'No results found'
            }</div>`;
            return;
        }

        const resultsList = document.createElement('ul');
        resultsList.className = 'search-results-list';

        results.forEach(result => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = result.url;
            a.textContent = result.title;
            li.appendChild(a);
            resultsList.appendChild(li);
        });

        searchResults.appendChild(resultsList);
    }

    // Обработчик ввода в поле поиска
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            
            if (query.length > 0) {
                const results = performSearch(query);
                displayResults(results);
                if (searchOverlay) {
                    searchOverlay.style.display = 'block';
                }
            } else {
                if (searchResults) {
                    searchResults.innerHTML = '';
                }
                if (searchOverlay) {
                    searchOverlay.style.display = 'none';
                }
            }
        });

        // Закрытие результатов поиска при клике вне поля поиска
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults?.contains(e.target)) {
                if (searchResults) {
                    searchResults.innerHTML = '';
                }
                if (searchOverlay) {
                    searchOverlay.style.display = 'none';
                }
            }
        });
    }
}); 