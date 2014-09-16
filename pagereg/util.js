function postChannel() {
        var channel = $('input[name="channel"]:checked').val()
        var url = document.URL
        var data = {
        	'channel':channel,
        	'url':url
        }
        var jdata = JSON.stringify(data)
        $.ajax({
        	url:'http://172.22.0.24/stalker-lixipeng/pagereg/stalker.php',
        	jsonp:'callback',
        	type:'POST',
        	dataType:'jsonp',
        	data:data,
        	success:function(response){
        		alert(response['url'])
        	}
        })
    }