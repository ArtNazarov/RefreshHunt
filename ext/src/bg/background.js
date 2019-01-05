 
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
   switch(request) {
    case 'request_words' : {
        chrome.tabs.create({
            url: chrome.extension.getURL('dialog.html'),
            active: false
        }, function(tab) {
            // After the tab has been created, open a window to inject the tab
            chrome.windows.create({
                tabId: tab.id,
                type: 'popup',
                focused: true
                // incognito, top, left, ...
            });
        });
    break;}
    default : {
      if (request.method == "sync_location"){
              console.log('send to inject.js...');
              sendResponse({location: localStorage.getItem('location')});
      } 
      else if (request.method == "sync_period"){
              console.log('send to inject.js...');
              sendResponse({period: localStorage.getItem('period')});
      }
      else if (request.method == "sync_words"){
              console.log('send to inject.js...');
              sendResponse({words: JSON.parse( localStorage.getItem('words'))});
      }
      else if (request.method == "play_beep"){
         var Elem = document.createElement("audio");
          Elem.src="/src/beep.wav";
          Elem.play();
          
      }
      else
      sendResponse();
    }
  };}
);
function setWords(words) {
    localStorage.setItem('words', JSON.stringify( words ) );
};

function setPeriod(period){
  localStorage.setItem('period', period );
}


function setLocation(location){
  localStorage.setItem('location', location );
}