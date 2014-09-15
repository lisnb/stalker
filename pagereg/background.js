/* 
* @Author: LiSnB
* @Date:   2014-08-14 17:34:22
* @Last Modified by:   LiSnB
* @Last Modified time: 2014-08-14 17:47:55
*/

var url="window.location.href";


function getUrl(tabId, changeInfo, tab){

	// alert("xixixixixi");
	url = tab.url;
	// alert(url);
}

chrome.tabs.onUpdated.addListener(getUrl);