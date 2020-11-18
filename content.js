function get_github_link(){
  var elems = document.getElementsByClassName('text scrollable');

  for (var i = 0, l = elems.length; i < l; i++) {
    var text = elems[i].innerText;
    var idx = text.indexOf("]", text.indexOf("]") + 1);
    text = text.substring(0, idx+1)
    text = text.replace('\n', ' ');

    var res = text.replace(/[\[\]']+/g, "").split(" ");

    var params = res[0].split("-");
    var pull_no = params.pop();
    var project = params.join('-');

    var comment_id = res[1];

    let url =
      'https://github.com/'+project+'/pull/'+pull_no+'#discussion_r'+comment_id;

    return url;
  }
}

// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    if (msg.text === 'get_url_text') {
      let url_text = get_github_link();
      sendResponse(url_text);
    }
});

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded',afterDOMLoaded);
} else {
    afterDOMLoaded();
}

function afterDOMLoaded(){
  var elems = document.getElementsByClassName('card-content');
  for (var i = 0, l = elems.length; i < l; i++) {
    elems[i].insertAdjacentHTML('afterbegin', '<div><button type="button" id="github-button" class="button"><span class="icon"><i class="fab fa-github-square"></i></span></button></div><hr>');
    document.getElementById("github-button").addEventListener("click", function() {
      chrome.runtime.sendMessage({msg: "github-button"});
    });
  }
}
