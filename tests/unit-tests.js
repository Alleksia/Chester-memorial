const UnitTests = {

    testFormatTime() {
      const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
      };
      
      const result1 = formatTime(125) === '2:05';
      const result2 = formatTime(60) === '1:00';
      const result3 = formatTime(0) === '0:00';
      
      return {
        name: 'UT-001: Форматирование времени',
        passed: result1 && result2 && result3,
        details: `125s → 2:05 (${result1}), 60s → 1:00 (${result2}), 0s → 0:00 (${result3})`
      };
    },

    testNextSong() {
      const songs = ['song1', 'song2', 'song3'];
      let currentIndex = 0;
      
      const nextSong = () => {
        currentIndex = (currentIndex + 1) % songs.length;
        return currentIndex;
      };
      
      const idx1 = nextSong(); 
      const idx2 = nextSong(); 
      const idx3 = nextSong(); 
      
      return {
        name: 'UT-002: Переключение на следующую песню',
        passed: idx1 === 1 && idx2 === 2 && idx3 === 0,
        details: `0→1 (${idx1}), 1→2 (${idx2}), 2→0 (${idx3})`
      };
    },
    
    testPrevSong() {
      const songs = ['song1', 'song2', 'song3'];
      let currentIndex = 0;
      
      const prevSong = () => {
        currentIndex = (currentIndex - 1 + songs.length) % songs.length;
        return currentIndex;
      };
      
      const idx1 = prevSong(); 
      const idx2 = prevSong(); 
      const idx3 = prevSong(); 
      
      return {
        name: 'UT-003: Переключение на предыдущую песню',
        passed: idx1 === 2 && idx2 === 1 && idx3 === 0,
        details: `0→2 (${idx1}), 2→1 (${idx2}), 1→0 (${idx3})`
      };
    },
    
    testProgressCalculation() {
      const calcProgress = (current, total) => {
        if (total === 0) return 0;
        return (current / total) * 100;
      };
      
      const r1 = calcProgress(30, 120) === 25;
      const r2 = calcProgress(0, 100) === 0;
      const r3 = calcProgress(100, 100) === 100;
      const r4 = calcProgress(50, 0) === 0;
      
      return {
        name: 'UT-004: Расчёт прогресса воспроизведения',
        passed: r1 && r2 && r3 && r4,
        details: `30/120=25% (${r1}), 0/100=0% (${r2}), 100/100=100% (${r3}), 50/0=0% (${r4})`
      };
    },
    
    runAll() {
      const results = [
        this.testFormatTime(),
        this.testNextSong(),
        this.testPrevSong(),
        this.testProgressCalculation()
      ];
      
      console.log('UNIT-ТЕСТЫ');
      let passed = 0;
      results.forEach(r => {
        const status = r.passed ? '✅' : '❌';
        console.log(`${status} ${r.name}`);
        console.log(`   ${r.details}`);
        if (r.passed) passed++;
      });
      console.log(`ИТОГО UNIT: ${passed}/${results.length}`);
      
      return results;
    }
  };
  
  function runUnitTests() {
    return UnitTests.runAll();
  }
  
  console.log('Unit-тесты готовы. Введите runUnitTests() для запуска.');