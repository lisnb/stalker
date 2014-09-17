var server = "http://172.22.0.24/stalker-lixipeng/pagereg/stalker.php"

function Stalk() {
    function addServey() {
        var serveyhtml = [
            '<div id="stalker" class="nav pinned">',
            '<p>这个网页是?<\/p>',
            '<label><input type="radio" name="channel" value="blog"><span>博客<\/span><\/label>',
            '<label><input type="radio" name="channel" value="news"><span>新闻<\/span><\/label>',
            '<label><input type="radio" name="channel" value="news_board"><span>新闻索引<\/span><\/label>',
            '<label><input type="radio" name="channel" value="bbs"><span>论坛帖子<\/span><\/label>',
            '<label><input type="radio" name="channel" value="bbs_detail"><span>论坛索引<\/span><\/label>',
            '<label><input type="radio" name="channel" value="other" checked><span>其他页面<\/span><\/label>',
            '<a class="btn" id="stalkersubmit" >Submit<\/a>',
            '<\/div>' //,
            //          '<script>',
            // '$(function() {',
            // 'var elm = $("#stalker");',
            // 'var startPos = elm.offset().top;',
            // '$(window).on("scroll", function () {',
            // 'var p = $(window).scrollTop();',
            // '$(elm).css("position", ((p) > startPos) ? "fixed" : "static");',
            // '$(elm).css("top", ((p) > startPos) ? "0px" : "");',
            // '})',
            // '});',
            //          '<\/script>'
        ]
        var stalkerdiv = document.createElement('div')
        $('body').append(serveyhtml.join(""))
    }

    var recorded = false

    function postChannel() {
        if (!recorded) {
            var channel = $('input[name="channel"]:checked').val()
            var url = document.URL
            var data = {
                "channel": channel,
                "url": url
            }
            var jdata = JSON.stringify(data)
            var xhr = new XMLHttpRequest();
            xhr.open('POST', server, "true")
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    alert(xhr.responseText);
                }
            }
            xhr.send(jdata);
        }

    }

    addServey()
    $("#stalkersubmit").click(postChannel)
}

Stalk()
