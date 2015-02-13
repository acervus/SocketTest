/**
 * Project : SocketTest
 * File : ClientMain.java
 * Date : 2015/02/14 kyou
 *
 * Copyright 2015 TechMatrix Corporation, Inc. All rights reserved.
 */
package tcpechoclient;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.net.SocketException;

/**
 * <code>ClientMain</code>クラスはソケット通信を行うクライアント側のクラスです。
 * <p>
 * 
 * @author kyou
 */
public class ClientMain {
	public static void main(String[] args) throws IOException {
		String server = "localhost";
		int servPort = 3000;
		byte[] data = "Hello, Net world".getBytes();
		byte[] msg = new byte[data.length];
		// クライアントソケットの作成
		Socket socket = new Socket(server, servPort);
		System.out.println("サーバとの接続を確立。");
		InputStream in = socket.getInputStream();
		OutputStream out = socket.getOutputStream();
		out.write(data); // サーバに文字列を送付
		System.out.println("送信：" + new String(data));
		// サーバからの返信を受信
		int totalBytesRcvd = 0;
		int bytesRcvd;
		while (totalBytesRcvd < data.length) { // 全文を受信するまでloop
			if ((bytesRcvd = in.read( // 引数は読込データ、Offset、読込データ長
					msg, totalBytesRcvd, data.length - totalBytesRcvd)) == -1) {
				throw new SocketException("接続遮断");
			}
			totalBytesRcvd += bytesRcvd;
		} // while end
		System.out.println("受信：" + new String(msg));
		socket.close();
	}
}
