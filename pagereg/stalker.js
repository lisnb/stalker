/* 
 * @Author: LiSnB
 * @Date:   2014-09-16 18:40:39
 * @Last Modified by:   LiSnB
 * @Last Modified time: 2014-09-16 20:04:43
 */

var server = "http://172.22.0.24/stalker-lixipeng/pagereg/stalk.php"

chrome.runtime.onMessage.addListener(
    function(request) {
        console.log('stalker begins')
        if (request.action == "start") {
            Stalk()
        }
    })



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
            // '<script>$(".pinned").pin({ minWidth: 940 });</script>'
        ]
        $('body').append(serveyhtml.join(""))
        // var pinscript = '(function(e){"use strict";e.fn.pin=function(t){var n=0,r=[],i=false,s=e(window);t=t||{};var o=function(){for(var n=0,o=r.length;n<o;n++){var u=r[n];if(t.minWidth&&s.width()<=t.minWidth){if(u.parent().is(".pin-wrapper")){u.unwrap()}u.css({width:"",left:"",top:"",position:""});if(t.activeClass){u.removeClass(t.activeClass)}i=true;continue}else{i=false}var a=t.containerSelector?u.closest(t.containerSelector):e(document.body);var f=u.offset();var l=a.offset();var c=u.offsetParent().offset();if(!u.parent().is(".pin-wrapper")){u.wrap("<div class="pin-wrapper">")}var h=e.extend({top:0,bottom:0},t.padding||{});u.data("pin",{pad:h,from:(t.containerSelector?l.top:f.top)-h.top,to:l.top+a.height()-u.outerHeight()-h.bottom,end:l.top+a.height(),parentTop:c.top});u.css({width:u.outerWidth()});u.parent().css("height",u.outerHeight())}};var u=function(){if(i){return}n=s.scrollTop();var o=[];for(var u=0,a=r.length;u<a;u++){var f=e(r[u]),l=f.data("pin");if(!l){continue}o.push(f);var c=l.from-l.pad.bottom,h=l.to-l.pad.top;if(c+f.outerHeight()>l.end){f.css("position","");continue}if(c<n&&h>n){!(f.css("position")=="fixed")&&f.css({left:f.offset().left,top:l.pad.top}).css("position","fixed");if(t.activeClass){f.addClass(t.activeClass)}}else if(n>=h){f.css({left:"",top:h-l.parentTop+l.pad.top}).css("position","absolute");if(t.activeClass){f.addClass(t.activeClass)}}else{f.css({position:"",top:"",left:""});if(t.activeClass){f.removeClass(t.activeClass)}}}r=o};var a=function(){o();u()};this.each(function(){var t=e(this),n=e(this).data("pin")||{};if(n&&n.update){return}r.push(t);e("img",this).one("load",o);n.update=a;e(this).data("pin",n)});s.scroll(u);s.resize(function(){o()});o();s.load(a);return this}})(jQuery)'
        // var pin = document.createElement('script')
        // pin.textContent=pinscript
        // $('head').appendChild(pinscript)
    }

    function postChannel() {
        var channel = $('input[name="channel"]:checked').val()
        var url = document.URL
        var data = {
            'channel': channel,
            'url': url
        }
        var jdata = JSON.stringify(data)
        $.ajax({
            url: 'http://172.22.0.24/stalker-lixipeng/pagereg/stalker.php',
            jsonp: 'callback',
            type: 'POST',
            dataType: 'jsonp',
            data: data,
            success: function(response) {
                alert(response['url'])
            }
        })
    }

    addServey()

    function htmlScroll() {
        var top = document.body.scrollTop || document.documentElement.scrollTop;
        if (elFix.data_top < top) {
            elFix.style.position = 'fixed';
            elFix.style.top = 0;
            elFix.style.left = elFix.data_left;
        } else {
            elFix.style.position = 'static';
        }
    }

    function htmlPosition(obj) {
    	alert('hi')
        var o = obj;
        var t = o.offsetTop;
        var l = o.offsetLeft;
        while (o = o.offsetParent) {
            t += o.offsetTop;
            l += o.offsetLeft;
        }
        obj.data_top = t;
        obj.data_left = l;
    }

    var oldHtmlWidth = document.documentElement.offsetWidth;
    window.onresize = function() {
        var newHtmlWidth = document.documentElement.offsetWidth;
        if (oldHtmlWidth == newHtmlWidth) {
            return;
        }
        oldHtmlWidth = newHtmlWidth;
        elFix.style.position = 'static';
        htmlPosition(elFix);
        htmlScroll();
    }

    window.onscroll = htmlScroll;

    var elFix = document.getElementById('stalker');
    htmlPosition(elFix);

}

Stalk()
