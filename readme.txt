■プラグインインストール手順
    ①Chromeから以下URLを開きます。
   chrome://settings/
    ②「拡張機能」を選択します。
    ③開いた画面に、以下二つのプラグインをD&Dします。
   TcpBackgroundScript.crx
   TcpContentScript.crx

   以上の手順でプラグインをインストールは完了です。

■動作確認手順
   ①プロジェクトに配置した以下のHTMLファイルを開きます。
     ※URL例:http://localhost/SocketTest/html/test.html
   ②池田さんサンプルを開き、<listen>ボタンをクリックします。
   ③Chromeから以下URLを開き、Tcp Background Script をクリックします。
  chrome://apps/

   以上で、池田さんツールと、test.html間でソケット通信が確率されます。
   一点注意事項として、池田さんツール→test.htmlにメッセージを送信する際は、chromeのDeveloper Toolsを開いていないと動きません。
   ※こちらは、chromeのタブにメッセージを送信する、以下の記述({active: true, currentWindow: false})によるものです。
       パラメーターを見た感じ、{active: true, currentWindow: true}でうまくいきそうなのですが、ダメでした。リファレンスを確認します。

-------------------------
  // アンアクティブのタブに送信
  chrome.tabs.query({active: true, currentWindow: false}, function(tabs) {
       	var param = {name: "sendMessageTest", message:request.message};
       	for(var i=0; i<tabs.length; i++){
       		chrome.tabs.sendMessage(tabs[i].id, param, function(response) {
           		console.log(response);
           	});
       	}
  });
-------------------------

■開発手順
    ①Chromeから以下URLを開きます。
   chrome://settings/
    ②「拡張機能」を選択します。
    ③<パッケージ化されていない拡張機能を読み込む>をクリックします。
    ④SocketTestプロジェクト下の、以下2つのフォルダを指定して読み込みます。
   TcpBackgroundScript
   TcpContentScript
    
   こちらの手順でプラグインをインストールした場合、コードの反映が即座に反映されるようになります。
 