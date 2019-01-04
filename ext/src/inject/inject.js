chrome.runtime.sendMessage({method: "sync_words"}, function(response) {
  console.log('sync '+response.words);
  localStorage.setItem('words', JSON.stringify(response.words));
});

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
    
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("(C) Refresh & Hunt");
		// ----------------------------------------------------------
  
  console.log( localStorage.getItem('words') );
  var words = JSON.parse( localStorage.getItem('words') );
  console.log(words);
          
            function testWords(){
              var found = false;
              var index = -1;
                for (var i=0;i<words.length;i++){
                  if (document.documentElement.innerHTML.indexOf(words[i])>0){
                    found = true;
                    console.log('Найдено:'+words[i]);
                    index = i;
                    break;
                  }
                }
              return { found : found, index : index };
            }
            var searchResults = testWords();
            if (searchResults.found){
             
              var notice = 'Найдено '+words[searchResults.index];
              
              chrome.runtime.sendMessage({method: "play_beep", notice : notice}, function(response) {
              console.log('Play beep');
              alert(notice);
              });
              
            }
              else
            {
              setTimeout( ()=>{
                document.location.reload(true);
            }, 25000);
            }
        };
	
          
        }, 3000);
  
  
  
  
});