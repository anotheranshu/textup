chrome.contextMenus.create({"title": "Text", "contexts": ["selection"]});

function onClickHandler(info, tab) {
  alert(info.selectionText);
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

/*chrome.contextMenus.onClicked.addListener(function(OnClickData info, tabs.Tab tab) {
  alert(info.selectionText());
}); */
