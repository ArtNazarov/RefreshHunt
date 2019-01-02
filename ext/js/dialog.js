document.forms[0].onsubmit = function(e) {
    e.preventDefault(); // Prevent submission
    var words = document.getElementById('words').value;
    chrome.runtime.getBackgroundPage(function(bgWindow) {
        bgWindow.setWords(words);
        window.close();     // Close dialog
    });
};

document.addEventListener("DOMContentLoaded", function(){
  console.log( localStorage.getItem('words') );
   document.getElementById('words').value = localStorage.getItem('words');
});