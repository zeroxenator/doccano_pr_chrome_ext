'use strict';

// Add a listener to create the initial context menu items,
// context menu items only need to be created at runtime.onInstalled
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "id": "1",
    "title": "0-Go to PR page",
    "type": 'normal',
    "contexts": ['page', 'selection'],

  });
});

// A function to use as callback
function doStuffWithDom(url_link) {

  console.log('Received: ' + url_link);

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.create({url: url_link, index: tabs[0].index + 1});
    });
}

chrome.contextMenus.onClicked.addListener(function(item, tab) {
  if(item.pageUrl.includes('projects')){
    chrome.tabs.sendMessage(tab.id, {text: "get_url_text"}, doStuffWithDom);
  }
});

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.sendMessage(tab.id, {text: "get_url_text"}, doStuffWithDom);
});

chrome.commands.onCommand.addListener(function(command) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {text: "get_url_text"}, doStuffWithDom);
  });
})

function handleMessage(request, sender) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {text: "get_url_text"}, doStuffWithDom);
  });
}

chrome.runtime.onMessage.addListener(handleMessage);
