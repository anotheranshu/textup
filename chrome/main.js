function editClickHandler(info, tab) {
    alert(tab.id);
    document.body.setAttribute('contentEditable','true');
    // executeScript(null, {code:"document.body.style.backgroundColor='red'"});
}

function sendClickHandler(info, tab) {
    $.ajax({
      type: "GET",
      url: "http://twitterautomate.com/testapp/sendnotifications.php",
      data: {'variable': info.selectionText}
    }).done(function( data) {
      alert( "Request is done" );
    });
};

var all = chrome.contextMenus.create({
    title: "TextUp: Edit before texting",
    contexts: ["page"],
    onclick: editClickHandler
});

var selection = chrome.contextMenus.create({
    title: "TextUp: Send text",
    contexts: ["selection"],
    onclick: sendClickHandler
});

contextMenuUpdate(false);

chrome.browserAction.onClicked.addListener(function(tab) {
    alert("hey");
    chrome.tabs.executeScript(tab.id, {file: "bookmarklet.js"})
});
