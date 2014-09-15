/* 
 * @Author: LiSnB
 * @Date:   2014-08-14 15:54:27
 * @Last Modified by:   LiSnB
 * @Last Modified time: 2014-08-14 16:09:53
 */




var foo = {
	bar: function(){
		var img = document.createElement('img');
		img.src = 'http://lixipeng.me/img/0621/4.PNG';
		img.setAttribute('alt','success');
		document.body.appendChild(img);
	}

}

document.addEventListener('DOMContentLoaded', function() {
	foo.bar()
});