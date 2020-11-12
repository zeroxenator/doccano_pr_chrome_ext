'use strict';

// Add a listener to create the initial context menu items,
// context menu items only need to be created at runtime.onInstalled
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "title": "0-Go to PR page",
    "type": 'normal',
    "contexts": ['selection'],

  });
});

chrome.contextMenus.onClicked.addListener(function(item, tab) {
  var res = item.selectionText.replace(/[\[\]']+/g, "").split(" ");

  var params = res[0].split("-");
  var project = params[0];
  var pull_no = params[1];

  var comment_id = res[1];

  let url =
    'https://github.com/'+project+'/pull/'+pull_no+'#discussion_r'+comment_id;

  chrome.tabs.create({url: url, index: tab.index + 1});
});
