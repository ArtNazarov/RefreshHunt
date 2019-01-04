document.forms[0].onsubmit = function(e) {
    e.preventDefault(); // Prevent submission
    var words = document.getElementById('words').value.split("\n");
    chrome.runtime.getBackgroundPage(function(bgWindow) {
        bgWindow.setWords(words);
        window.close();     // Close dialog
    });
};

document.addEventListener("DOMContentLoaded", function(){
  console.log( JSON.parse( localStorage.getItem('words') ));
   document.getElementById('words').value = JSON.parse( localStorage.getItem('words') ).join("\n");
});