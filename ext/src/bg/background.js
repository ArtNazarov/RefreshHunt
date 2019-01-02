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
      
      if (request.method == "sync_words"){
              console.log('send to inject.js...');
              sendResponse({words: localStorage.getItem('words')});
      }
      else
      sendResponse();
    }
  };}
);
function setWords(words) {
    localStorage.setItem('words', words);
};