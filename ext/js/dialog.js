document.forms[0].onsubmit = function(e) {
    e.preventDefault(); // Prevent submission
    var words = document.getElementById('words').value.split("\n");
    
    var uiPeriod = document.getElementById('period');
    var period = uiPeriod[uiPeriod.selectedIndex].value;
    
    var url = document.getElementById("location").value;
    
    chrome.runtime.getBackgroundPage(function(bgWindow) {
      // sync values with inject.js storage
        bgWindow.setWords(words);
        bgWindow.setPeriod(period);
        bgWindow.setLocation(url);
        console.log('Options saved');
        window.close();     // Close dialog
    });
};

document.addEventListener("DOMContentLoaded", function(){
  // set UI values from localStorage
  console.log( JSON.parse( localStorage.getItem('words') ));
   document.getElementById('words').value = JSON.parse( localStorage.getItem('words') ).join("\n");
   switch(parseInt(localStorage.getItem('period'))){
     case 25000 : { document.getElementById('period').selectedIndex = 1; break; }
     case 60000 : { document.getElementById('period').selectedIndex = 2; break; }
     case 300000 : { document.getElementById('period').selectedIndex = 3; break; }
     default :
     {
       document.getElementById('period').selectedIndex = 0; break;
     }
   };
   document.getElementById("location").value = localStorage.getItem("location");
});