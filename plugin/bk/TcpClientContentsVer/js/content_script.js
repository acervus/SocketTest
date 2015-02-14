console.log("Reading Now");
$(function(){
	 $("#button1").click(function(){
		 console.log("Buttonイベント");
     });
});
//window.onload = function() {
//	button.addEventListener('click', function(evt){
//		console.log("Buttonイベント");
//	}, false);
//	console.log("コンテンツ.js読み込み");
//	//タブを作成
//	chrome.tabs.create({
//	    url: "test.html"
//	});
//	 
//	//バックグラウンドからのメッセージを受け取るリスナー
//	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//	    if (request.name === "sendMessageTest") {
//	        var response = {data: "receiveMessage"};
//	        sendResponse(response);
//	    }
//	});
//}