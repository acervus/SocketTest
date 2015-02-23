■プラグインインストール手順
    ①Chromeから以下URLを開きます。
   chrome://settings/
    ②「拡張機能」を選択します。
    ③開いた画面に、以下二つのプラグインをDrag&Dropします。
   TcpBackgroundScript.crx
   TcpContentScript.crx

   以上の操作でプラグインのインストールは完了です。

■動作確認手順
   ①プロジェクトに配置した以下のHTMLファイルを開きます。
     ※URL例:http://localhost/SocketTest/html/test.html
   ②池田さんサンプルを開き、<listen>ボタンをクリックします。
   ③Chromeから以下URLを開き、Tcp Background Script をクリックします。
  chrome://apps/

   以上で、池田さんツールと、chromeプラグイン間でソケット通信が開始されます。

■開発手順
    ①Chromeから以下URLを開きます。
   chrome://settings/
    ②「拡張機能」を選択します。
    ③<パッケージ化されていない拡張機能を読み込む>をクリックします。
    ④SocketTestプロジェクト下の、以下2つのフォルダを指定して読み込みます。
   TcpBackgroundScript
   TcpContentScript
    
   こちらの手順でプラグインをインストールすると、コードの修正が即座に反映されるようになります。
 