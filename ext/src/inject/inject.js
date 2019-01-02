chrome.runtime.sendMessage({method: "sync_words"}, function(response) {
  console.log('sync '+response.words);
  localStorage.setItem('words', response.words);
});

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
    
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("(C) Refresh & Hunt");
		// ----------------------------------------------------------
  
  
  var setting = localStorage.getItem('words');
  var words = setting.split(",");          
          
            function testWords(){
              var found = false;
                for (var i=0;i<words.length;i++){
                  if (document.documentElement.innerHTML.indexOf(words[i])>0){
                    found = true;
                    break;
                  }
                }
              return found;
            }
  
            if (testWords()){
              alert('OK, STOP REFRESHING')
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