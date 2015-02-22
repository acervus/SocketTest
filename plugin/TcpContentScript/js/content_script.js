console.log("Reading Now");
$(function(){
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
