/* 
 * @Author: LiSnB
 * @Date:   2014-08-14 16:46:34
 * @Last Modified by:   LiSnB
 * @Last Modified time: 2014-09-15 20:57:13
 */


document.addEventListener('DOMContentLoaded', function() {
	var xhr = new XMLHttpRequest();
	// xhr.open("GET", "localhost/pagereg/mark.php?url=baidu", true);
	var url = chrome.extension.getBackgroundPage().url;
	// alert(url);
	xhr.open('GET',"http://172.22.0.24/wde-ie-label/Tristor/pagereg/mark.php?url="+url,"true")
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			// alert(xhr.responseText);
			document.getElementById("mark").innerText = xhr.responseText;
		}
	}
	xhr.send();
});