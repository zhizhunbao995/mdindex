document.addEventListener( "DOMContentLoaded", function(){
		window.tree = {
			root:"目录",
			children:[]
		};
		var treeRoot = findHtag()
		
		function findTree(tagName,treeNode){
				var current = parseInt(tagName.match(/\d/)[0]);
				var first = document.getElementsByTagName(tagName);	
				var len = first.length;

				while(len--){
					var ele = first[len];
							treeNode.children[len] = {}
							treeNode.children[len].root = ele.innerHTML;
							treeNode.children[len].id = ele.id
							treeNode.children[len].tag = ele.tagName.toLocaleLowerCase()
							treeNode.children[len].children = []
					nextClass(ele,treeNode.children[len]);
				}
		}
		function findHtag(){
			var hstr = "h6 h5 h4 h3 h2 h1".split(" ")
					len = hstr.length;
					while(len--){
						var ish = document.getElementsByTagName(hstr[len])
						if (ish.length) {
							return ish[0].tagName.toLocaleLowerCase()
						}
					}
				return ""
		}
		function nextClass(ele,rootobj){
			var classTag = parseInt(ele.tagName.toLocaleLowerCase().match(/\d+/)[0])
			var next = ele.nextSibling;
			while(next){
				if(next.nodeType != 1){
					next = next.nextSibling
					continue;
				}
				if (next.tagName.toLocaleLowerCase() == ("h"+classTag)) {
					return ele
				}
				if (next.tagName.toLocaleLowerCase() == ("h"+(classTag+1))) {
					/*
						* 深度递归
					*/
						var nodeObj = {
							root:next.innerHTML,
							id:next.id,
							ele:next,
							tag:next.tagName.toLocaleLowerCase(),
							children:[]
						}
						rootobj.children.push(nodeObj)
						// nextClass(next,nodeObj)
				}
				next = next.nextSibling
			}
		}
		
		function treeList(obj) {
	    function treeCreat(obj) {
	        var html = "<div class='item'>";
	        var hasChild = obj.children && obj.children.length
	        if (obj.root) {
	            html = html + "<a href=\"#"+obj.id+"\" class=\"tit "+(hasChild?"haschild":"")+"\">"+obj.root+"</a>"
	        }
	        if (hasChild) {
	        		html = html + "<section class=\"children\">"
		            for (var i = 0; i < obj.children.length; i++) {
		                html = html + treeCreat(obj.children[i]) + "</div>\n"
		            };
	            html = html + "</section>"
	        }
	        return html;
	    }
	    return treeCreat(obj) + "</div>"
		}
		findTree(treeRoot,tree)
		var domTree = document.createElement("div");
				domTree.style.cssText = "overflow:auto;padding-right:10px;position:fixed;left:0px;top:0px;background:#efefef;width:200px;border-right:1px solid #333;height:100%"
				domTree.innerHTML = treeList(tree);
				domTree.id = "TREE"
		document.body.appendChild(domTree)


}
, false );
