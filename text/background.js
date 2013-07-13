function write_bot_cookie(data, status, xhr) {
    var json_obj = eval(data);
    chrome.storage.local.set({"bot_id": json_obj.bot_id});
};

function create_bot(groupme_url) {
    var index = groupme_url.lastIndexOf('/');
    var group_num = groupme_url.substring(index + 1);

    $.post("https://api.groupme.com/v3/bots?token=6441cfd0cde001306952124c564dcc6c",
            '{"bot": { "name": "Chrome", "group_id": "' + group_num + '"}}', write_bot_cookie);

};

chrome.browserAction.onClicked.addListener(function(info, tab) {
    var cookieExists = chrome.storage.local.get("bot_id",
                                                function(result) {
                                                    if (result) {
                                                        return true;
                                                    } else {
                                                        return false;
                                                    }
                                                });
    if (cookieExists) {
        alert("Edit");
        chrome.tabs.executeScript(tab.id, {file: "bookmarklet.js"});
    } else {
        alert("Add GroupMe");
        chrome.browserAction.setPopup({
            popup: "popup.html"
        });
        //var groupme_url = "https://web.groupme.com/groups/4974527";
        //create_bot(groupme_url);
    }
});

var selection = chrome.contextMenus.create({
    title: "TextUp: Send text",
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(function(info,tab) {
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
    $.post("https://api.groupme.com/v3/bots/post", '{"bot_id": "' + chrome.storage.local.get("bot_id") + '", "text":"(' + (j+1) + ') ' + splits[j] + '"}');
  }
  alert(big_string);
  chrome.tabs.executeScript(tab.id, {file: "bookmarklet.js"});
});

$('#textUpForm').submit(function() {
 alert("-------------------------------------");
 create_bot($('#groupMeUrl').value);
 // event.preventDefault();
});

