console.log("Reading Now");
$(function(){
	 $("#button1").click(function(){
		 console.log("Buttonイベント");
     });
	//バックグラウンドからのメッセージを受け取るリスナー
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	    if (request.name === "sendMessageTest") {
	        var response = {data: "receiveMessage"};
	        $("#message").text("メッセージを受信しました");
	        sendResponse(response);
	    }
	});
});
