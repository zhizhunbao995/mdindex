#!/usr/bin/env node

var marked 		= require('marked');
var fs 				= require("fs")
var hl 				= require("highlight.js");
var argv 			= process.argv.slice(2)
var workUrl 	= process.cwd();
var markUrl 	= workUrl + "/"+argv[0]
var renderer 	= new marked.Renderer();
var cssFile 	= "hljs.css default.css ocean.css tree.css tree.js".split(" ");
var markName 	= markUrl.match(/\/([^\/]*?)\.md$/)



if(!fs.existsSync(markUrl)){
	console.log("Unknow File")
	return
}else{
	if (!fs.statSync(markUrl).isFile()) {
		console.log("Not File")
		return
	}
}
if (!markName) {
	console.log("File Not Markdown")
	return
}else{
	markName = markName[1]
}
cssFile.forEach(function(path){
	var _src = "default/"+path;
	var copySrc = workUrl + '/MdDefault/'
	var _dst = copySrc + path;

	fs.exists(copySrc,function(exists){
		if (exists) {
			copyFile( _src, _dst );
		}else{
			fs.mkdir( copySrc, function(){
	        copyFile( _src, _dst );
	    })		
		}
	})
})
function copyFile(src, dst ){
	var readable = fs.createReadStream( src );

  var writable = fs.createWriteStream( dst );  

  readable.pipe( writable );
}
renderer.code = function(code, lang) {
    // console.log(code, lang)
    var language = lang && (' language-' + lang) || '';
    return '<pre class="prettyprint hljs' + language + '">' + '<code>' + hl.highlightAuto(code).value + '</code>' + '</pre>';
};
var fileContent = fs.readFileSync(markUrl, 'utf8');

// 使用 MarkdownJS 模块把源文件转换为 HTML 源代码
marked(fileContent, { renderer: renderer }, function(err, content) {
    if (err) throw err;
    // console.log(content);
    var fileHtml = "<!DOCTYPE html><html><head>\
	  <title></title><meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\">\
	  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\">\
	  <link rel=\"stylesheet\" type=\"text/css\" href=\"MdDefault/hljs.css\">\
	  <link rel=\"stylesheet\" type=\"text/css\" href=\"MdDefault/default.css\">\
	  <link rel=\"stylesheet\" type=\"text/css\" href=\"MdDefault/ocean.css\">\
	  <link rel=\"stylesheet\" type=\"text/css\" href=\"MdDefault/tree.css\">\
	  <script src=\"MdDefault/tree.js\"></script>\
	</head>\
	<body><div id='preview-contents' class='note-content'>" + content + "</div></body></html>"
    fs.writeFileSync(markName+'.html', fileHtml);
});
// // 保存