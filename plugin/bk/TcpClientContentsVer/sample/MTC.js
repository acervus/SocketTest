// XPath 作成時、基底となる CLASS名(デフォルト fasthelp5) 
var ROOT_CLASSES = ["FhDialog", "CustomerList", "CustomerDetailFrame","MasterMaintenance"];

// マスタの 基底とする ボタンクラス名 (上の ROOT_CLASSES + SUB_ROOT_CLASSES で一意にする)
var SUB_ROOT_CLASSES = ["fhSaveButton","fhRemoveButton","fhsaveAndContinueButton","fhSearchButton","fhClearButton","fhCreateButton",
                        "FhPager",
						"pagingFirst","pagingPrev","pagingNext","pagingLast",
						"FhReqPagerDgrid","dgrid-scroller",
						"dijitTabContainerTopChildWrapper dijitVisible"];

// 基底となるCLASS名 探索時、何階層上の 親ノードまで探索するか 
//const SEARCH_ROOT_CLASS_MAXIMUM = 5;

//クリック時に出力する
var TESTCASE_CLICK = "waitAndClick(By.xpath(\"#XPATH#\"));";
//入力クリア時に出力する
var TESTCASE_CLEAR = "waitAndClear(By.xpath(\"#XPATH#\"));";
//入力時に出力する
var TESTCASE_SENDKEY = "waitAndSendKey(By.xpath(\"#XPATH#\"),\"#INPUTTEXT#\");";
//画面表示等で一時的に待機する俊樹出力する
var TESTCASE_WAIT = "wait(2000);"

const BASE_XPATH = "//#TAG#[contains(@class,'#CLASSNAME#')]";
var BASE_XPATH_NAME = "//#TAG#[@name='#BASENAME#']";
var BASE_XPATH_POPUP = "//#TAG#[@dijitpopupparent='#WIDGETID#']";

// 置換用定数
var REPLACE_TAG = "#TAG#";
var REPLACE_XPATH = "#XPATH#";
var REPLACE_CLASSNAME = "#CLASSNAME#";
var REPLACE_INPUTTEXT = "#INPUTTEXT#";
var REPLACE_WIDGETID = "#WIDGETID#";
var REPLACE_NAME = "#BASENAME#";

// (コンボボックス用)クリックした部品の  widgetId を取得する
var baseWidgetId = "";

/**
 * 以下部品ごとに クリックされた時にソースを出力するイベントを貼り付ける
 */
// ボタン
$(document).on('click','span.dijitButton',
	function(event){	
		// イベントのタイプで出力するソースを決める
		var eventType = event.type;
		// XPathを取得する
		var XPath = createXpath($(this), "", false);($(this), "", null);
		// テストケースを出力する
		exportTestCase(XPath, eventType, $(this));
	}
);

// タブ
$(document).on('click','div.dijitTab',
	function(event){	
		// イベントのタイプで出力するソースを決める
		var eventType = event.type;
		// XPathを取得する
		var XPath = createXpath($(this), "", false);($(this), "", null);
		// テストケースを出力する
		exportTestCase(XPath, eventType, $(this));
	}
);
//タブ - [×]ボタン は自動生成無理。 閉じるイベントが発生すると dom が消え去るので、 XPath が作れない
//$(document).on('click','span.dijitTabCloseButton',
//	function(event){	
//		// イベントのタイプで出力するソースを決める
//		var eventType = event.type;
//		// XPathを取得する
//		var XPath = createXpath($(this), "", false);($(this), "", null);
//		// テストケースを出力する
//		exportTestCase(XPath, eventType, $(this));
//	}
//);

// データグリッド行選択
$(document).on('click','div.dgrid-row',
	function(event){	
		// イベントのタイプで出力するソースを決める
		var eventType = event.type;
		// XPathを取得する
		var XPath = createXpath($(this), "", false);($(this), "", null);
		// テストケースを出力する
		exportTestCase(XPath, eventType, $(this));
	}
);

//ドロップダウンボタン
$(document).on('click','span.dijitDropDownButton',
	function(event){
		// イベントのタイプで出力するソースを決める
		var eventType = event.type;
		// XPathを取得する
		var XPath = createXpath($(this), "", false);
		//ポップアップ選択用にidを取得する
		baseWidgetId = getWidgetid($(this));		
		
		// テストケースを出力する
		exportTestCase(XPath, eventType, $(this));
	}
);

//チェックボックス
$(document).on('click','input:checkBox',
	function(event){	
		// イベントのタイプで出力するソースを決める
		var eventType = event.type;
		// XPathを取得する
		var XPath = createXpath($(this), "", false);
		// テストケースを出力する
		exportTestCase(XPath, eventType, $(this));
	}
);

//ラジオ
$(document).on('click','input:radio',
	function(event){	
		// イベントのタイプで出力するソースを決める
		var eventType = event.type;
		// XPathを取得する
		var XPath = createXpath($(this), "", false);
		// テストケースを出力する
		exportTestCase(XPath, eventType, $(this));
	}
);

//テキスト入力
$(document).on('click','input.dijitInputInner:text',
	function(event){	
		// イベントのタイプで出力するソースを決める
		var eventType = "input";
		// XPathを取得する
		var XPath = createXpath($(this), "", false);
		// テストケースを出力する
		exportTestCase(XPath, eventType, $(this));
	}
);

//テキストエリア入力
$(document).on('click','textarea',
	function(event){	
		// イベントのタイプで出力するソースを決める
		var eventType = "input";
		// XPathを取得する
		var XPath = createXpath($(this), "", false);
		// テストケースを出力する
		exportTestCase(XPath, eventType, $(this));
	}
);

//セレクトボックス(clickはイベントがバ部リングしないようなので、mousedownで代用)
$(document).on('mousedown','div.dijitButtonText',
	function(event){	
		// イベントのタイプで出力するソースを決める
		var eventType = event.type;
		// XPathを取得する
		var XPath = createXpath($(this), "", false);
		//ポップアップ選択用にidを取得する
		baseWidgetId = getWidgetid($(this));	
		// テストケースを出力する
		exportTestCase(XPath, eventType, $(this));
	}
);
$(document).on('mousedown',"input[value='▼ ']",
	function(event){	
		// イベントのタイプで出力するソースを決める
		var eventType = event.type;
		// XPathを取得する
		var XPath = createXpath($(this), "", false);
		//ポップアップ選択用にidを取得する
		baseWidgetId = getWidgetid($(this));	
		// テストケースを出力する
		exportTestCase(XPath, eventType, $(this));
	}
);

// コンボボックスの中身選択
$(document).on('mousedown',"tr.dijitMenuItem",
	function(event){	
		// イベントのタイプで出力するソースを決める
		var eventType = event.type;
		// XPathを取得する
		var XPath = createXpath($(this), "", false);
		// テストケースを出力する
		exportTestCase(XPath, eventType, $(this));
	}
);

// カレンダーの中身選択
$(document).on('mousedown',"td.dijitCalendarEnabledDate",
	function(event){	
		// イベントのタイプで出力するソースを決める
		var eventType = event.type;
		// XPathを取得する
		var XPath = createXpath($(this), "", false);
		// テストケースを出力する
		exportTestCase(XPath, eventType, $(this));
	}
);
$(document).on('mousedown',"th.dijitCalendarArrow",
	function(event){	
		// イベントのタイプで出力するソースを決める
		var eventType = event.type;
		// XPathを取得する
		var XPath = createXpath($(this), "", false);
		// テストケースを出力する
		exportTestCase(XPath, eventType, $(this));
	}
);
$(document).on('mousedown',"div.dijitCalendarMonthLabel",
	function(event){	
		// イベントのタイプで出力するソースを決める
		var eventType = event.type;
		// XPathを取得する
		var XPath = createXpath($(this), "", false);
		// テストケースを出力する
		exportTestCase(XPath, eventType, $(this));
	}
);


//テストケース用のソースをログに出力する
function exportTestCaseClear(XPath, eventType, dom) {
	if(eventType == "input"){		
		var inputVal = dom.val();
		// 入力が空の場合は Clear コマンドを送る
		testCase = TESTCASE_SENDKEY.replace(REPLACE_XPATH,XPath);
		testCase = testCase.replace(REPLACE_INPUTTEXT,inputVal);		
	}
	console.info(testCase);		
}

// テストケース用のソースをログに出力する
function exportTestCase(XPath, eventType, dom) {	
	var testCase = "";
	
	if(eventType == "click" || eventType == "mousedown"){
		testCase = TESTCASE_CLICK.replace(REPLACE_XPATH,XPath);
	} else if(eventType == "input"){		
		var inputVal = dom.val();
		
		// 入力の場合は事前にクリア用の テストケースを出力
		var testCaseClear = "";
		var xPathTemp = XPath;
		testCaseClear = TESTCASE_CLEAR.replace(REPLACE_XPATH,xPathTemp);
		console.info(testCaseClear);
		
		// 入力用の テストケースを出力
		testCase = TESTCASE_SENDKEY.replace(REPLACE_XPATH,XPath);
		testCase = testCase.replace(REPLACE_INPUTTEXT,inputVal);		
	}
	console.info(testCase);	
}

//XPathを取得する
function createXpath(dom, XPath, hasSubRootClassFlg) {
	
	// dom の全クラスを取得する
	var classes = getClasses(dom);
	// 取得したクラス名に 基底クラス が含まれていればクラス名が返される (含まれない場合は null が返る)
	var baseClass = checkContainRootClass(classes);
	
	// 取得したクラス名に ボタンクラス が含まれていればクラス名が返される (含まれない場合は null が返る)
	var subRootClass = checkContainSubRootClass(classes);
	
	// (ポップアップ用)dom の dijitpopupparent を取得する
	var popupparent = dom.attr("dijitpopupparent");	
	// dom のタグ名を取得
	var tagName = dom.get(0).tagName;
	
	// サブルートクラスが決まっていない時のみ処理を行う
	if(!hasSubRootClassFlg){
		// 部品の nameを取得する	(含まれない場合は null が返る)
		var baseName = dom.attr("name");
		// baseNameが取得できたらそれを XPath に設定
		if(baseName){
			XPath = BASE_XPATH_NAME + XPath;
			// タグ名 を置換
			XPath = XPath.replace(REPLACE_TAG, tagName);
			// name を置換
			XPath = XPath.replace(REPLACE_NAME, baseName);
			// サブルートクラスが決定し、以降は 基底 クラスが見つかるまでXPath を生成しない
			hasSubRootClassFlg = true;
		}
	}
	
	if(popupparent && popupparent == baseWidgetId){
		// (ポップアップ用処理)dijitpopupparentと直前にクリックした部品のid(baseWidgetId)が一致した場合、一致した dijitpopupparent でXPathを作る
		XPath = BASE_XPATH_POPUP + XPath;
		// タグ名を置換
		XPath = XPath.replace(REPLACE_TAG, tagName);
		// dijitpopupparentを置換
		XPath = XPath.replace(REPLACE_WIDGETID, popupparent);
		
		return XPath;
	} else if(baseClass){
		// 基底クラスが含まれているかをチェックする		
		// ベースとなるノードが見つかった場合
		XPath = BASE_XPATH + XPath;		
		// タグ名を置換
		XPath = XPath.replace(REPLACE_TAG, tagName);		
		// クラス名を置換
		XPath = XPath.replace(REPLACE_CLASSNAME, baseClass);
		
		return XPath;		
	} else if(subRootClass){
		// 基底となるノードが見つかった場合
		XPath = BASE_XPATH + XPath;		
		// タグ名を置換
		XPath = XPath.replace(REPLACE_TAG, tagName);		
		// クラス名を置換
		XPath = XPath.replace(REPLACE_CLASSNAME, subRootClass);
		
		// サブルートクラスが決定し、以降は 基底 クラスが見つかるまでXPath を生成しない
		hasSubRootClassFlg = true;
		
		var perentDom = dom.parent();		
		// 引き続き親タグをたどっていき、 基底クラスを探しに行く
		if (perentDom) {
			// 親ノードが見つかるまで再帰呼出し
			return arguments.callee(perentDom, XPath, hasSubRootClassFlg);
		}		
	} else if(dom.parent() == null || tagName == "HTML") {
		// 親ノードが無い場合(一番上の要素まで探索した場合)
		return "/" + XPath;	
	} else {
		var perentDom = dom.parent();
		// サブルートクラスが決まっていない時のみで XPath を生成する
		if(!hasSubRootClassFlg){				
			// １つ上の親ノードから見て、自分は何番目の要素なのか
			var domIndex = perentDom.children(tagName).index(dom);
			// XPathは 1 から始まるので + 1する
			domIndex = domIndex + 1;		
			XPath = "/" + tagName + "[" + domIndex + "]" + XPath;
		}
		// 親ノードが見つかるまで再帰呼出し
		return arguments.callee(perentDom, XPath, hasSubRootClassFlg);
	}	
}

//widgetidを取得する
function getWidgetid(dom) {
	// 現在の dom の widgetid を取得する
	var widgetid = dom.attr("widgetid");
	
	// widgetid が含まれていなければ親クラスを探しに行く
	if(widgetid) {
		return widgetid;
	} else if (dom.parent()) {
		return arguments.callee(dom.parent());
	} else {
		return null;
	}
}


// 対象の dom のクラスを配列で取得する
function getClasses(dom) {
	var domClasses = dom.attr("class");
	// クラスがない場合はそのまま帰る
	if(domClasses == null){
		return null;
	}
	return domClasses.split(" ");
}

// クラスの配列に 基底クラス が含まれているかチェックする 
function checkContainRootClass(classes) {
	for ( var i in classes ) {
		for ( var j in ROOT_CLASSES ) {
			//if(classes[i].indexOf(ROOT_CLASSES[j]) != -1){
			// Pane系は 勝手にクラス名のあとに "NoGutter" が付くので、それも比較対象にする
			var noGutterClass = ROOT_CLASSES[j] + "NoGutter";
			if(classes[i] === ROOT_CLASSES[j] ||
				classes[i] === noGutterClass){
				return classes[i];
			}
		}	
	}
	return null;
}

// クラスの配列に サブ基底クラス が含まれているかチェックする
function checkContainSubRootClass(classes) {	
	for ( var j in SUB_ROOT_CLASSES ) {
		// 比較する SUB_ROOT_CLASSES が複数の場合は、全て一致する必要がある	
		var subClasses = SUB_ROOT_CLASSES[j].split(" ");
		var subClassesLength = subClasses.length;
		var matchCount = 0;
		for ( var i in classes ) {
			if(subClassesLength <= 1){
				if(classes[i] === SUB_ROOT_CLASSES[j]){
					return SUB_ROOT_CLASSES[j];
				}
			} else {
				// 比較する SUB_ROOT_CLASSES が複数の場合は、全て一致する必要がある
				for (var k in subClasses) {
					if(classes[i] === subClasses[k]){
						matchCount++;
						// classes に含まれるすべてのクラスが、SUB_ROOT_CLASSESに存在している場合のみ返す
						if(matchCount === subClassesLength){
							return SUB_ROOT_CLASSES[j];
						}					
					}
				}								
			}			
		}	
	}
	return null;
}


/**
 * メモ
 */
//$(document).on('click',"table.dijitSelect",
//function(event){	
//	// イベントのタイプで出力するソースを決める
//	var eventType = event.type;
//	// 対象の dom と  イベント を渡してテストケースを出力する
//	exportTestCase($(this), eventType);
//}
//);
//$(document).on('click',"td.dijitDownArrowButton",
//function(event){
//// イベントのタイプで出力するソースを決める
//var eventType = event.type;
//// 対象の dom と  イベント を渡してテストケースを出力する
//exportTestCase($(this), eventType);
//});


//$("input[value='▼ ']").live('click',function(event){	
//// イベントのタイプで出力するソースを決める
//var eventType = event.type;
//// 対象の dom と  イベント を渡してテストケースを出力する
//exportTestCase($(this), eventType);
//});

//$(document).on('mouseover',"input[value='▼ ']",
//function(event){	
//	// イベントのタイプで出力するソースを決める
//	var eventType = event.type;
//	// 対象の dom と  イベント を渡してテストケースを出力する
//	exportTestCase($(this), eventType);
//}
//);
//
//$(document).on('mouseup',"input[value='▼ ']",
//function(event){	
//	// イベントのタイプで出力するソースを決める
//	var eventType = event.type;
//	// 対象の dom と  イベント を渡してテストケースを出力する
//	exportTestCase($(this), eventType);
//}
//);
//
//$(document).on('mousedown',"input[value='▼ ']",
//function(event){	
//	// イベントのタイプで出力するソースを決める
//	var eventType = event.type;
//	// 対象の dom と  イベント を渡してテストケースを出力する
//	exportTestCase($(this), eventType);
//}
//);

//現段階では使わない部品
//アコーディングボタン
//$(document).on('click','div.dijitAccordionTitle',
//	function(event){	
//		// イベントのタイプで出力するソースを決める
//		var eventType = event.type;
//		// XPathを取得する
//		var XPath = createXpath($(this), "", false);
//		// テストケースを出力する
//		exportTestCase(XPath, eventType, $(this));
//		// アコーディング を推した後は必ず wait する
//		console.info(TESTCASE_WAIT);
//	}
//);


