console.log("Reading Now");
$(function(){
	//受信したテキストをクリア
	 $("#clear").click(function(){
		 $("#receiveMessage").val("");
     });
	//バックグラウンドからのメッセージを受け取るリスナー
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	    if (request.name === "sendMessageTest") {
	        var response = {data: "receiveMessage"};
	        $("#receiveMessage").val(request.message);
	        sendResponse(response);
	    }
	});
	//送信テキストをサーバ側に送信
	$("#send").click(function(){
		var message = $("#sendMessage").val();
		chrome.runtime.sendMessage({
		    name: "sendMessageTestToServer",
		    message: message
		  },
		  function (response) {
			  console.log(response);
		  }
		);
    });
});
