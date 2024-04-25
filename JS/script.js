let currentWordIndex = 0;
let wordsData = [];

// CSVデータを解析して単語データの配列を作成する関数
function processCSV(csvText) {
  const lines = csvText.trim().split('\n');
  lines.shift(); // 最初の行（ヘッダー）を削除
  lines.forEach((line) => {
    const [id, japaneseWord, ruby, chineseWord, audioPath] = line.split(',');
    wordsData.push({ id, japaneseWord, ruby, chineseWord, audioPath });
  });
  displayWord(currentWordIndex); // 最初の単語を表示
}

// 単語データをもとにカードを表示する関数
function displayWord(index) {
  const word = wordsData[index];
  document.getElementById('word').textContent = word.japaneseWord;
  document.getElementById('ruby').textContent = word.ruby;
  document.getElementById('translation').textContent = word.chineseWord;
  document.getElementById('audio').src = word.audioPath;
  document.getElementById('counter').textContent = `${index + 1}/${wordsData.length}`;
  document.getElementById('card-container').style.display = 'flex'; // CSV読み込み後にカードコンテナを表示
}

// ファイルが選択されたときに動作するイベントリスナー
document.getElementById('csvFileInput').addEventListener('change', function(event) {
  var file = event.target.files[0];
  var reader = new FileReader();

  reader.onload = function(e) {
    var csvText = e.target.result;
    processCSV(csvText);
  };

  reader.readAsText(file);
});

// 単語カードのクリックで言語を切り替えるイベントリスナー
document.getElementById('card').addEventListener('click', function() {
  const japanese = document.getElementById('japanese');
  const chinese = document.getElementById('chinese');
  const audio = document.getElementById('audio');
  
  if (japanese.style.display !== 'none') {
    japanese.style.display = 'none';
    chinese.style.display = 'block';
  } else {
    japanese.style.display = 'block';
    chinese.style.display = 'none';
    audio.play();
  }
});

// 前後の単語へ移動するボタンのイベントリスナー
document.getElementById('prev').addEventListener('click', function() {
  if (wordsData.length > 0) {
    currentWordIndex = (currentWordIndex - 1 + wordsData.length) % wordsData.length;
    displayWord(currentWordIndex);
  }
});

document.getElementById('next').addEventListener('click', function() {
  if (wordsData.length > 0) {
    currentWordIndex = (currentWordIndex + 1) % wordsData.length;
    displayWord(currentWordIndex);
  }
});
//スライドで単語カードを変更する機能
document.getElementById('card-container').addEventListener('touchstart', handleTouchStart, false);        
document.getElementById('card-container').addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var xDiff = xDown - xUp;

    if ( xDiff > 0 ) {
        /* left swipe */ 
        currentWordIndex = (currentWordIndex + 1) % wordsData.length;
        displayWord(currentWordIndex);
    } else {
        /* right swipe */
        currentWordIndex = (currentWordIndex - 1 + wordsData.length) % wordsData.length;
        displayWord(currentWordIndex);
    }
    
    /* reset values */
    xDown = null;                                             
};
