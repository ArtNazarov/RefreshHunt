chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("(C) Refresh & Hunt");
		// ----------------------------------------------------------
  var words = [
  'Яндекс Маркет. Ранжирование. Релевантность',
  'Кластеризация', 
  'Определение тематики фразы'];
  
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
	}
	}, 3000);
});