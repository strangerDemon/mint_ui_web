# mint_ui_web

app 程序内的外部 web 页面。页面太复杂或者为了统一 android、ios 部分功能一起实现
以下为一个根据后台传回来的 json，再根据动态创建的 demo（input ， date，radio ，
checklist，uploadImage ）

安卓端使用 ProgressWebView 加载页面 eg:webview.loadUrl("https://www.baidu.com")

如果原生不能开打系统照相机、相册请重载 setWebChromeClient

ProgressWebView webview = (ProgressWebView) findViewById(R.id.topicEditWebView);

//webview 的设置 
WebSettings webSettings = webview.getSettings(); 

// 允许 js 交互
webSettings.setJavaScriptEnabled(true); 
webview.addJavascriptInterface( this,"bridge");

//js 交互函数
@JavascriptInterface
public void clickOnJsOfClose(){
    finish();
}

//重载 setWebChromeClient
webview.setWebChromeClient(new WebChromeClient() {
    @Override
    public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback, FileChooserParams fileChooserParams) {
    }
);

list:

![image](https://github.com/strangerDemon/mint_ui_web/blob/master/gif/list.gif)

table:

![image](https://github.com/strangerDemon/mint_ui_web/blob/master/gif/table2.gif)
