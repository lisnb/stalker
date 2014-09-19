var server = "http://172.22.0.24/stalker-lixipeng/pagereg/stalker.php"

function Stalk() {
    var url = document.URL
    var recorded = false
    var closeImmediately = false

    var bbs = ['bbs','forum','thread'];
    var blog = ['blog'];
    var news = ['news'];
    var detail = ['html','shtml','htm']
    var keywords = {
        'bbs':bbs,
        'blog':blog,
        'news':news
    }


    function inKeywords(token,kws){
        for (var i = kws.length - 1; i >= 0; i--) {
            if(token.indexOf(kws[i])!=-1){
                return true
            }
        };
        return false
    }

    function getUrlBasedChannel(){
        var board = inKeywords(url,detail)?"":"_board"
        var channel = "other"
        for (ch in keywords){
            if (inKeywords(url,keywords[ch])){
                channel = ch
            }
        }
        if (channel!="other"){
            channel+=board
        }
        console.log("channel: "+channel)
        return channel
    }

    function initialChannel() {
        
        var selector = '$(\'input[name="channel"][value="'+ getUrlBasedChannel()+ '"]\')';
        //console.log(selector)
        //console.log($('input[name="channel"][value="'+ getUrlBasedChannel()+ '"]'))
        $('input[name="channel"][value="'+ getUrlBasedChannel()+ '"]').attr("checked","true")
    }

    function addServey() {
        var serveyhtml = [
            '<div id="stalker" class="stalkernav pinned">',
            '<p>这个网页是?<\/p>',
            '<label><input type="radio" name="channel" value="blog"><span>博客<\/span><\/label>',
            '<label><input type="radio" name="channel" value="news"><span>新闻<\/span><\/label>',
            '<label><input type="radio" name="channel" value="bbs"><span>论坛<\/span><\/label>',
            '<label><input type="radio" name="channel" value="blog_board"><span>博客索引<\/span><\/label>',
            '<label><input type="radio" name="channel" value="news_board"><span>新闻索引<\/span><\/label>',
            '<label><input type="radio" name="channel" value="bbs_board"><span>论坛索引<\/span><\/label>',
            '<label><input type="radio" name="channel" value="other"><span>其他页面<\/span><\/label>',
            '<a class="btn" id="stalkersubmit" >Submit<\/a>',
            '<\/div>'
        ]

        $('body').append(serveyhtml.join(""))
    }

    function closeStalker(){
        $("#stalker").fadeOut("slow")
    }

    function postChannel() {
        if (!recorded) {
            var channel = $('input[name="channel"]:checked').val()

            var data = {
                "channel": channel,
                "url": url
            }
            var jdata = JSON.stringify(data)
            var xhr = new XMLHttpRequest();
            xhr.open('POST', server, "true")
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    //alert(xhr.responseText);
                    recorded = true;
                    console.log(xhr.responseText)
                    $("#stalkersubmit").text("已提交")
                    setTimeout(function(){
                        $("#stalker").fadeTo("slow",closeImmediately?0:0.5)
                    },700)
                    
                }
            }
            xhr.send(jdata);
        }
    }

    function buildListener(target) {
        target.click(postChannel)
        target.mouseenter(function() {
            target.animate({
                "font-size": "+=1"
            }, "fast")
        })
        target.mouseout(function() {
            target.animate({
                "font-size": "-=1"
            }, "fast")
        })
        target.mousedown(function() {
            target.animate({
                "margin-top": "+=2px"
            })
        })
        target.mouseup(function() {
            target.animate({
                "margin-top": "-=2px"
            })
        })
    }

    addServey()
    initialChannel()
    $("#stalker").draggable()
    var submit = $("#stalkersubmit")
    buildListener(submit)

}
chrome.storage.local.get("turn",function(value){
     
        console.log("stalker:"+value.turn)
        if(value.turn !="off"){
               Stalk()
        }
    })

