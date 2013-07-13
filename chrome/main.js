function write_bot_cookie(data, status, xhr) {
  var json_obj = eval(data);
  chrome.storage.local.set({"bot_id": json_obj.bot_id});
};

function create_bot(groupme_url) {
  var index = groupme_url.lastIndexOf('/');
  var group_num = groupme_url.substring(index + 1);

  $.post("https://api.groupme.com/v3/bots?token=6441cfd0cde001306952124c564dcc6c", '{"bot": { "name": "Chrome", "group_id": "' + group_num + '"}}', write_bot_cookie );
};

function editClickHandler(info, tab) {
    alert(tab.id);
    document.body.setAttribute('contentEditable','true');
};

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
    $.post("https://api.groupme.com/v3/bots/post", '{"bot_id": "' + chrome.storage.local.get("bot_id") + '", "text":"(' + (j+1) + ') ' + splits[j] + '"}');
  }
  alert(big_string); 
};

var all = chrome.contextMenus.create({
    title: "TextUp: Edit before texting",
    contexts: ["page"],
    onclick: editClickHandler
});

var selection = chrome.contextMenus.create({
    title: "TextUp: Send text",
    contexts: ["selection"],
    onclick: onClickHandler
});

$('#groupMeUrl').keypress(function(event) {
 alert("hey!");
 if (event.which === 13) {
   create_bot($('#groupMeUrl').value);
 }

 event.preventDefault();
});

$('#textUpForm').submit(function() {
 alert("-------------------------------------");
 create_bot($('#groupMeUrl').value);
 event.preventDefault();
});
