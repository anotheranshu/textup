chrome.contextMenus.create({"title": "TextUp: Send", "contexts": ["selection"]});

function onClickHandler(info, tab) {
  alert(info.selectionText);

   $.ajax({
      type: "GET",
      url: "http://twitterautomate.com/testapp/sendnotifications.php",
      data: {'variable': info.selectionText}
    }).done(function( data) {
      alert( "Request is done" );
    });
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

/*chrome.contextMenus.onClicked.addListener(function(OnClickData info, tabs.Tab tab) {
  alert(info.selectionText());
}); */
