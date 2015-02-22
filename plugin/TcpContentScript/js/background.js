console.log("Reading Now");
//ChromeAppからのメッセージを受け取るリスナー
chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
    if (request.name === "sendMessageTest") {
        var response = {data: "receiveMessage"};
        sendResponse(response);
        // contentScriptに送信
//        chrome.runtime.sendMessage({name: "sendMessageTest"}, function(response) {
//    		console.log(response);
//        });
//        chrome.runtime.sendMessage(chrome.runtime.id,{name: "sendMessageTest"}, function(response) {
//        	console.log(response);
//		});
        // アンアクティブのタブに送信(デバッグウィンドウを開いている場合はこちらに入る)
        chrome.tabs.query({active: true, currentWindow: false}, function(tabs) {
        	var param = {name: "sendMessageTest", message:request.message};
        	for(var i=0; i<tabs.length; i++){
        		chrome.tabs.sendMessage(tabs[i].id, param, function(response) {
            		console.log(response);
            	});
        	}
        });
//        // アクティブのタブに送信
//        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//        	var param = {name: "sendMessageTest", message:request.message};
//        	for(var i=0; i<tabs.length; i++){
//        		chrome.tabs.sendMessage(tabs[i].id, param, function(response) {
//            		console.log(response);
//            	});
//        	}
//        });
    }
});
//ChromeAppからのメッセージを受け取るリスナー
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
	  if (request.name === "sendMessageTestToServer") {
		  sendMessageToApp(request.message);
	  }
  }
);

/**
 * メッセージをAppに送信します
 *
 * @param text
 */
function sendMessageToApp(message) {
	var param = {name: "sendMessageTestToServer", message:message};
	chrome.runtime.sendMessage("eccbbhiiahcgdiamjeilehpkmhdenbkb", param, function(response) {
 		console.log(response);
	});
}