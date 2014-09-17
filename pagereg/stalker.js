var server = "http://172.22.0.24/stalker-lixipeng/pagereg/stalker.php"

function Stalk() {
    var url = document.URL
    var recorded = false

    function initialChannel() {
        var bbs = ['bbs'];
        var blog = ['blog'];
        var news = ['news'];
        var selector = '';
        for (var i = bbs.length - 1; i >= 0; i--) {
            if (url.indexOf(bbs[i]) != -1) {
                if (url.indexOf('.html') != -1) {
                    $('input[name="channel"][value="bbs"]').attr("checked", "true")
                } else {
                    $('input[name="channel"][value="bbs_board"]').attr("checked", "true")
                }
                return
            }
        };
        for (var i = blog.length - 1; i >= 0; i--) {
            if (url.indexOf(blog[i]) != -1) {
                if (url.indexOf('.html') != -1) {
                    $('input[name="channel"][value="blog"]').attr("checked", "true")
                } else {
                    $('input[name="channel"][value="blog_board"]').attr("checked", "true")
                }
                return
            }
        };
        for (var i = news.length - 1; i >= 0; i--) {
            if (url.indexOf(news[i]) != -1) {
                if (url.indexOf('.html') != -1) {
                    $('input[name="channel"][value="news"]').attr("checked", "true")
                } else {
                    $('input[name="channel"][value="news_board"]').attr("checked", "true")
                }
                return
            }
        };
        $('input[name="channel"][value="other"]').attr("checked", "true")
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
                    $("#stalker").fadeOut("slow")
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

Stalk()
