chrome.contextMenus.create({"title": "TextUp: Send", "contexts": ["selection"]});

function onClickHandler(info, tab) {


  var big_string = info.selectionText;

  var i = 0;
  var splits = [];
  while(i < big_string.length)
  {
      splits.push(big_string.substr(i, i + 150));
      i += 150;
  }

  alert(splits.length);

  for (var j = 0; j < splits.length; j++) {
    $.post("https://api.groupme.com/v3/bots/post", '{"bot_id": "7d2d271d677a378a39b232aab9", "text":"' + splits[j] + '"}');
  }
  alert(big_string); 
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

