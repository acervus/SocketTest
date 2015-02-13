chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
	console.log("メッセージ受け取り");
	//★ここに★ 表示しているサイトのベースカラーを変更する処理を記述する。
	if (request.greeting == "hello"){
		sendResponse({farewell: "goodbye"});
	} else {
		//★ここ重要★ レスポンスがない場合でも、必ず空のオブジェクトを返す。
		sendResponse({}); // snub them.
	}
);