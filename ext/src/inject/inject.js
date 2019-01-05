


/*
 * Takes in an array of consecutive TextNodes and returns a document fragment with `word` highlighted
 */
function highlight_text_nodes($nodes, word) {
    if (!$nodes.length) {
        return;
    }

    var text = '';

    // Concatenate the consecutive nodes to get the actual text
    for (var i = 0; i < $nodes.length; i++) {
        text += $nodes[i].textContent;
    }

    var $fragment = document.createDocumentFragment();

    while (true) {
        // Tweak this if you want to change the highlighting behavior
        var index = text.toLowerCase().indexOf(word.toLowerCase());

        if (index === -1) {
            break;
        }

        // Split the text into [before, match, after]
        var before = text.slice(0, index);
        var match = text.slice(index, index + word.length);
        text = text.slice(index + word.length);

        // Create the <mark>
        var $mark = document.createElement('mark');
        $mark.className = 'found';
        $mark.appendChild(document.createTextNode(match));

        // Append it to the fragment
        $fragment.appendChild(document.createTextNode(before));
        $fragment.appendChild($mark);
    }

    // If we have leftover text, just append it to the end
    if (text.length) {
        $fragment.appendChild(document.createTextNode(text));
    }

    // Replace the nodes with the fragment
    $nodes[0].parentNode.insertBefore($fragment, $nodes[0]);

    for (var i = 0; i < $nodes.length; i++) {
        var $node = $nodes[$nodes.length - i - 1];
        $node.parentNode.removeChild($node);
    }
}


/*
 * Highlights all instances of `word` in `$node` and its children
 */
function highlight($node, word) {
    var $children = $node.childNodes;
    var $current_run = [];

    for (var i = 0; i < $children.length; i++) {
        var $child = $children[i];

        if ($child.nodeType === Node.TEXT_NODE) {
            // Keep track of consecutive text nodes
            $current_run.push($child);
        } else {
            // If we hit a regular element, highlight what we have and start over
            highlight_text_nodes($current_run, word);
            $current_run = [];

            // Ignore text inside of our <mark>s
            if ($child.nodeType === Node.ELEMENT_NODE && $child.className !== 'found') {
                highlight($child, word);
            }
        }
    }

    // Just in case we have only text nodes as children
    if ($current_run.length) {
        highlight_text_nodes($current_run, word);
    }
}

/*
 * Removes all highlighted <mark>s from the given node
 */
function unhighlight($node) {
    var $marks = [].slice.call($node.querySelectorAll('mark.found'));

    for (var i = 0; i < $marks.length; i++) {
        var $mark = $marks[i];

        // Replace each <mark> with just a text node of its contents
        $mark.parentNode.replaceChild(document.createTextNode($mark.childNodes[0].textContent), $mark);
    }
}

/* SYNC OPTIONS */

chrome.runtime.sendMessage({method: "sync_words"}, function(response) {
  console.log('sync words '+JSON.stringify(response.words));
  localStorage.setItem('words', JSON.stringify(response.words));
});

chrome.runtime.sendMessage({method: "sync_period"}, function(response) {
  console.log('sync period '+response.period);
  localStorage.setItem('period', response.period);
});

chrome.runtime.sendMessage({method: "sync_location"}, function(response) {
  console.log('sync location '+response.location);
  localStorage.setItem('location', response.location);
});


/* MAIN */
 var url = localStorage.getItem("location");

 console.log('Current location:'+document.location.href);
 console.log('Allowed location:'+url);
if (url === document.location.href){ 

chrome.extension.sendMessage({}, function(response) {
 
  

  
  
	var readyStateCheckInterval = setInterval(function() {
    
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("(C) Refresh & Hunt");
		// ----------------------------------------------------------
  
 
  
  console.log( localStorage.getItem('words') );
  var words = JSON.parse( localStorage.getItem('words') ) || ['something'];
  console.log(words);
  var period = localStorage.getItem('period');
  if (period<25000){period=25000};
  console.log(period);

    
            function testWords(){
              var found = false;
              var index = -1;
              var list = [];
                for (var i=0;i<words.length;i++){
                  if (document.documentElement.innerHTML.indexOf(words[i])>0){
                    found = true;
                    console.log('Найдено:'+words[i]);
                    index = i;
                    list.push(words[i]);
                  }
                }
              return { found : found, index : index, list : list };
            }
            var searchResults = testWords();
            if (searchResults.found){
              console.log(searchResults.list);
              var notice = 'Найдено '+searchResults.list.join("\n");
              for (var i=0;i<searchResults.list.length;i++){
                highlight(document.getElementsByTagName("body")[0], searchResults.list[i]); 
                };
              
              
              chrome.runtime.sendMessage({method: "play_beep", notice : notice}, function(response) {
              console.log('Play beep');
              
              alert(notice);
              });
              
            }
              else
            {
              console.log('reload after ' + period +  ' millisec');
              setTimeout( ()=>{
                console.log('reloading');
                document.location.reload(true);
            }, period);
            }
        };
	
          
        }, 3000);
  
 
  
  
}); 

console.log('location ok');

 } else { console.log('NOT ALLOWED!'); };