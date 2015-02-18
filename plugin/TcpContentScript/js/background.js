console.log("Reading Now");
//バックグラウンドからのメッセージを受け取るリスナー
chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
    if (request.name === "sendMessageTest") {
        var response = {data: "receiveMessage"};
        sendResponse(response);
        // contentScriptに送信
        chrome.runtime.sendMessage({name: "sendMessageTest"}, function(response) {
    		console.log(response);
		});
        chrome.runtime.sendMessage(chrome.runtime.id,{name: "sendMessageTest"}, function(response) {
    		console.log(response);
		});
        chrome.tabs.query({active: true, currentWindow: false}, function(tabs) {
        	for(var i=0; i<tabs.length; i++){
        		chrome.tabs.sendMessage(tabs[i].id, {name: "sendMessageTest"}, function(response) {
            		console.log(response);
            	});
        	}
        });
    }
});
