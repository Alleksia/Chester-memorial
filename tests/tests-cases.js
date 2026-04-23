const TestRunner = {
    results: [],
    
    testNavigation() {
        const cards = document.querySelectorAll('.section-card, .nav-card');
        const hasBio = Array.from(cards).some(card => 
            card.textContent.toLowerCase().includes('biography') ||
            card.href?.includes('biography')
        );
        const hasPhoto = Array.from(cards).some(card => 
            card.textContent.toLowerCase().includes('photo') ||
            card.href?.includes('photo')
        );
        const hasSongs = Array.from(cards).some(card => 
            card.textContent.toLowerCase().includes('song') ||
            card.href?.includes('song')
        );
        
        return {
            name: 'TC-001: Навигационные карточки',
            passed: hasBio && hasPhoto && hasSongs,
            details: `Bio: ${hasBio}, Photo: ${hasPhoto}, Songs: ${hasSongs}`
        };
    },
    
    testResponsive() {
        const hasMetaViewport = document.querySelector('meta[name="viewport"]') !== null;
        const hasMediaQueries = Array.from(document.styleSheets).some(sheet => {
            try {
                return Array.from(sheet.cssRules || []).some(rule => 
                    rule.media && rule.media.mediaText.includes('max-width')
                );
            } catch(e) { return false; }
        });
        
        return {
            name: 'TC-002: Адаптивность',
            passed: hasMetaViewport,
            details: `Viewport: ${hasMetaViewport}, Media queries: ${hasMediaQueries}`
        };
    },
    
    testSemanticHTML() {
        const hasHeader = document.querySelector('header, .hero') !== null;
        const hasMain = document.querySelector('main') !== null;
        const hasFooter = document.querySelector('footer') !== null;
        const hasNav = document.querySelector('nav') !== null;
        
        return {
            name: 'TC-003: Семантическая вёрстка',
            passed: hasHeader && hasMain && hasFooter,
            details: `Header: ${hasHeader}, Main: ${hasMain}, Footer: ${hasFooter}, Nav: ${hasNav}`
        };
    },
    
    testImages() {
        const images = document.querySelectorAll('img');
        const allHaveAlt = Array.from(images).every(img => img.hasAttribute('alt'));
        
        return {
            name: 'TC-004: Атрибуты alt у изображений',
            passed: allHaveAlt,
            details: `Всего изображений: ${images.length}, с alt: ${Array.from(images).filter(i => i.alt).length}`
        };
    },
    
    runAll() {
        this.results = [
            this.testNavigation(),
            this.testResponsive(),
            this.testSemanticHTML(),
            this.testImages()
        ];
        
        console.log('РЕЗУЛЬТАТЫ ТЕСТИРОВАНИЯ');
        console.log('Сайт: Chester Bennington Memorial');
        console.log('Дата: ' + new Date().toLocaleDateString());
        console.log('');
        
        let passed = 0;
        this.results.forEach(result => {
            const status = result.passed ? '✅ ПРОЙДЕН' : '❌ ПРОВАЛЕН';
            console.log(`${status} - ${result.name}`);
            console.log(`  ${result.details}`);
            if (result.passed) passed++;
        });
        
        console.log('');
        console.log(`ИТОГО: ${passed}/${this.results.length} тестов пройдено`);
        
        return this.results;
    }
};

function runAllTests() {
    return TestRunner.runAll();
}

console.log('Тесты готовы. Введите runAllTests() для запуска.');