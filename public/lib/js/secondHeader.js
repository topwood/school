// 自动滚动一屏
function scrollBanner() {
    var p = 0,
        t = 0,
        c = 0;
    return function () {
        p = $('html').scrollTop();
        if (t <= p) { //向下滚
            var height = $(window).height();
            if (t < 10 && p < height) {
                if (!c) {
                    c++;
                    $('html').animate({
                        scrollTop: height
                    }, 1000, function () {
                        c = 0;
                    })
                }
            }
            // $(window).outerHeight()

        } else { //向上滚

        }
        setTimeout(function () {
            t = p;
        }, 0);
    }

}

//二级菜单logo的颜色
var pathName = window.location.pathname;
var logoColor = "rgb(2, 88, 191)";
if (pathName.indexOf("primary") != -1) {
    logoColor = "rgb(63,176,199)";
} else if (pathName.indexOf("middle") != -1) {
    logoColor = "rgb(65,146,222)";
} else if (pathName.indexOf("kindergarten") != -1) {
    logoColor = "rgb(101,169,8)";
}

var scrollBannerProto = scrollBanner(),
    //监测导航是否到达顶部
    timer = null,
    binded = false,
    toUp = 0,
    toDown = 0;

$(window).scroll(function () {
    // 屏幕自动滚动
    // if (window.location.pathname != "/") {
    //     scrollBannerProto()
    // }

    // 中间菜单控制
    if ($(".menu-wrapper").length) {

        var topInstance = $(".menu-wrapper").offset().top;
        var topInstanceMobile = $(".mobile-menu-wrapper").offset().top;
        var scrollInstance = $(document).scrollTop();
        var top = topInstance - scrollInstance;
        var mobileTop = topInstanceMobile - scrollInstance;
        toDown = $('html').scrollTop();

        if ((top <= 0 && $(window).width() > '1024') || (mobileTop <= 0 && $(window).width() <= '1024')) {
            $('.menu-wrapper .menu-list-wrapper .nav-wrapper .first-menu .first-menu-left').css('height','0')
            $(".menu-wrapper .menu-list-wrapper").slideDown('fast')
            $(".menu-wrapper .menu-list-wrapper").addClass("menu-list-fixed");
            $(".menu-wrapper .menu-wrapper-logo").css({
                'transform': 'translateY(0)',
                '-webkit-transform': 'translateY(0)',
                '-moz-transform': 'translateY(0)',
                'transition': 'transform .25s'
            })
            if (toUp < toDown) { // 向下
                // $('.menu-wrapper .menu-list-wrapper .nav-wrapper').slideUp()
                $('.menu-wrapper .menu-list-wrapper .nav-wrapper .first-menu .first-menu-left').css('height','0')
                setTimeout(function () {

                    // $(".menu-wrapper .menu-list-wrapper").addClass("menu-list-transform");
                    // $(".menu-wrapper .menu-wrapper-logo").addClass("menu-wrapper-logo-transform");
                    $(".menu-wrapper .menu-wrapper-logo").css({
                        'transform': 'translateY(0)',
                        '-webkit-transform': 'translateY(0)',
                        '-moz-transform': 'translateY(0)',
                        'transition': 'transform .25s'
                    })

                    $(".menu-wrapper  .logo-a .icon-logo").css({
                        color: logoColor,
                        'transition': 'color .6s'
                    })
                    // $(".menu-wrapper .second-menu").addClass("second-menu-transform");
                }, 200);
            } else { // 向上
                $('.menu-wrapper .menu-list-wrapper .nav-wrapper .first-menu .first-menu-left').css('height','64px')

                // $('.menu-wrapper .menu-list-wrapper .nav-wrapper').slideDown()
                // $(".menu-wrapper .menu-list-wrapper").removeClass("menu-list-transform");
                // $(".menu-wrapper .menu-wrapper-logo").removeClass("menu-wrapper-logo-transform");
                $(".menu-wrapper .menu-wrapper-logo").css({
                    'transform': 'translateY(-56px)',
                    '-webkit-transform': 'translateY(-56px)',
                    '-moz-transform': 'translateY(-56px)',
                    'transition': 'transform .25s'
                })
                // $(".menu-wrapper .second-menu").removeClass("second-menu-transform");
                $(".menu-wrapper  .icon-logo").css({
                    color: "#fff",
                    'transition': 'color .6s'
                })
            }
            setTimeout(function () {
                toUp = toDown;
            }, 0);
        } else {
            $(".menu-wrapper .menu-list-wrapper").fadeOut('fast')
            $(".menu-wrapper .menu-list-wrapper").removeClass("menu-list-fixed");
        }
    }

    // 二级导航滚动锚点高亮
    scrollNav(scrollInstance)


});

// 二级导航滚动锚点高亮
function scrollNav(scrollInstance) {
    var container = $('.allModules').children()
    var menuNav = $('.menu-wrapper .nav-detail-wrapper .second-menu-left>li')
    container.each(function (index, item) {
        var _this = $(this)
        menuNav.each(function () {
            var navThis = $(this)
            if (_this.offset().top < scrollInstance + 60 && _this.attr('data-component') == navThis.attr('id')) {
                navThis.find('a').css('color', logoColor)
                navThis.siblings().find('a').css('color', '#999')
            }
        })
    })
}


//二级菜单锚点跳转
function hashFun(ele) {
    var domEle = '[data-component="' + ele + '"]';
    var page = document.querySelector(domEle);
    page && page.scrollIntoView({
        behavior: "smooth"
    });
}

function chromePage(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    if (userAgent.indexOf("Firefox") > -1) {
        window.location.href = '/prompt'
    } 
    
}

//
function cookie(name, value, options){
    /// <summary> 设置获取删除三位一体(以后肢解)
        ///	@example cookie('the_cookie', 'the_value').
        /// @desc Set the value of a cookie.

        /// @example cookie('the_cookie', 'the_value', {expires: 7, path: '/', domain: 'jquery.com', secure: true}).
        /// @desc Create a cookie with all available options.

        /// @example cookie('the_cookie', 'the_value');
        /// @desc Create a session cookie.

        /// @example cookie('the_cookie', null);
        /// @desc Delete a cookie by passing null as value.

        /// @example cookie('the_cookie');
        /// @desc Get the value of a cookie.
    /// </summary>
    /// <param name="name" type="String">key</param>
    /// <param name="value" type="String">value</param>
    /// <param name="options" type="Object"> {expires: 7, path: '/', domain: 'jquery.com', secure: true}</param>
    /// <returns type="String">Get有返回值[没有返回null]</returns>
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].replace(/(^\s*)|(\s*$)/g, "");
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
}

$(function () {
    // chromePage()
    // 登录
    $.post({
        url: "/ifLogin",
        data: '', //传参
        type: "GET",
        dataType: "json",
        success: function (currentUser) {
            if (currentUser.ifLogin) {
                $('.ygHeader  .header-right .userMsg,#mobile-news-menu .userMsg,#second-mobile-news-menu .userMsg ').css('display','inline-block')
                $('.ygHeader  .header-right .notUser').hide()
                $('.ygHeader  .header-right .userMsg .userName').html(currentUser.data.userName)
                // currentUser.data.avatar = ''
                if (currentUser.data.avatar) {
                    $('.ygHeader  .header-right .userMsg .userImgBox .userImgdefault').hide();
                    $('#mobile-news-menu .userAndLang .userMsg .userImgdefault,#second-mobile-news-menu .userMsg .userImgdefault').hide()
                    $('.ygHeader  .header-right .userMsg .userImg').css('background', 'url(' + currentUser.data.avatar + ') no-repeat center center/cover')
                    $('#mobile-news-menu .userAndLang .userMsg .userImg,#second-mobile-news-menu .userMsg .userImg').css('background', 'url(' + currentUser.data.avatar + ') no-repeat center center/cover')
                } else {
                    $('.ygHeader  .header-right .userMsg .userImg').hide()
                    $('#mobile-news-menu .userAndLang .userMsg .userImg,#second-mobile-news-menu .userMsg .userImg').hide()

                    $('.ygHeader  .header-right .userMsg .userImgBox .userImgdefault').html('<i class="iconfont icon-style">&#xe62f;</i>')
                    $('#mobile-news-menu .userAndLang .userMsg .userImgdefault,#second-mobile-news-menu .userMsg .userImgdefault').html('<i class="iconfont icon-style">&#xe62f;</i>')

                }
                $('#mobile-news-menu .person,#second-mobile-news-menu .person').hide()
            } else {
                $('.ygHeader  .header-right .notUser').css('display','inline-block')
                $('.ygHeader  .header-right .userMsg').hide()
                $('#mobile-news-menu .person,#second-mobile-news-menu .person').css('display','inline-block')
                $('#mobile-news-menu .userAndLang .userMsg .userImg,#second-mobile-news-menu .userMsg').hide()
            }
        }
    })

    // 用户信息显示隐藏
    $('.ygHeader .header-right .userMsg,#mobile-news-menu .userMsg .userImgBox,#mobileMenu #second-mobile-news-menu .userMsg .userImg').on('click', function () {
        event.stopPropagation();
        var isShow = $('.ygHeader .header-right .userMsg .selectTips').css('display')
        var isHeight = $('#mobile-news-menu .userMsg .selectTips').css('display')
        var liHeight = 0
        if (isShow == 'none') {
            isShow = 'block'
        } else {
            isShow = 'none'
        }

        if (isHeight == 'none') {
            isHeight = 'block';
            liHeight = 'auto'
        } else {
            isHeight = 'none'
            liHeight = '0px'
        }

        $('.ygHeader .header-right .userMsg .selectTips').css('display', isShow)
        $('#mobile-news-menu .userMsg .selectTips,#second-mobile-news-menu .userMsg .selectTips').css('display', isHeight)
        $('#mobile-news-menu .userMsg .selectTips li,#second-mobile-news-menu .userMsg .selectTips li').css('height', liHeight)
    })


    $(document).click(function () {
        $('.ygHeader .header-right .userMsg .selectTips').hide();
        // $('#mobile-news-menu .userMsg .selectTips,#mobileMenu .userMsg .selectTips').css('max-height', 0)

    });

    var pathName = window.location.pathname;
    var liList = $(".first-menu-left li");
    for (var i = 0; i < liList.length; i++) {
        if ($(liList[i]).attr("data-url") == pathName) {
            $(liList[i]).addClass("active");
            $(liList[i]).siblings().removeClass("active");
        }
    }

    // 鼠标hover变主题色
    $(".ygMenu .header-menu li").on('mouseover', function () {

        var attr = $(this).find('a').attr('key')

        // hoverColor = '#0258bf'
        // if (attr == '/kindergarten') {
        //     hoverColor = '#6cc542'
        // }else if (attr == '/primary') {
        //     hoverColor = '#00cbf4'
        // }else if (attr == '/middle') {
        //     hoverColor = '#3b97ec'
        // }else if (attr == '/senior') {
        //     hoverColor = '#2458ec'
        // }else{
        //     hoverColor = '#0258bf'
        // }

        $(this).find('a').css('color', '#fff')
        if (attr == pathName) {
            $(this).find('a').css({'color': '#fff'})
        }
    })
    $(".ygMenu .header-menu li").on('mouseout', function () {
        var attr = $(this).find('a').attr('key')
        $(this).find('a').css('color', 'rgba(255,255,255,0.7)')
        if (attr == pathName) {
            $(this).find('a').css({'color': '#fff'})
        }
    })

    // 中间菜单 二级导航 hover
    $('.menu-list-wrapper .second-menu-left li').on('mouseover',function(){
        if ($(this).find('a').css('color') !== logoColor) {
            $(this).find('a').css('color','#666')
        }
    })
    $('.menu-list-wrapper .second-menu-left li').on('mouseout',function(){
        if ($(this).find('a').css('color') !== logoColor) {
            $(this).find('a').css('color','#999')
        }
    })

    //根据不同的路径显示选中状态
    var currentMenu = $(".ygMenu .header-menu li a");
    for (var i = 0; i < currentMenu.length; i++) {

        if ($(currentMenu[i]).attr("key") == pathName) {
            $(currentMenu[i]).css({
                // color: logoColor,
                color: '#fff',
                'font-weight': 'bold'
            })
        } else {
            $(currentMenu[i]).css({
                color: 'rgba(255,255,255,0.7)',
                'font-weight': 'normal'
            })
        }
    }




    if (pathName.indexOf("/detail") != -1) {
        $('.ygHeader .topCover').hide()
    }

    //根据不同的学段显示不同的二级菜单颜色
    if (pathName.indexOf("primary") != -1) {//小学
        $('body').removeClass('').addClass('primaryCommon')
        $(".ygMenu .ygHeader .ygLogo .icon-logo").html("&#xe636;");
    } else if (pathName.indexOf("middle") != -1) {//中学
        $('body').removeClass('').addClass('middleCommon')
        $(".ygMenu .ygHeader .ygLogo .icon-logo").html("&#xe636;");
    } else if (pathName.indexOf("kindergarten") != -1) {//幼儿园
        $('body').removeClass('').addClass('kindGarten')
        $(".ygMenu .ygHeader .ygLogo .icon-logo").html("&#xe637;");
        $(".menu-wrapper .menu-wrapper-logo .icon-logo").html("&#xe637;");
        $('#mobile-news-menu .logo i').html('&#xe637;')
        $('#second-mobile-news-menu .logo i').html('&#xe637;')

        // 幼儿园页面字号调整
        // $('.ygMenu .header-menu > li > a , .first-menu .first-menu-left>li>a , .menu-list-wrapper .second-menu-left>li>a').css('font-size', '18px')
        // $('.ygMenu .menu-list > li').css('margin-left', '0')
        // $('#mobile-news-menu .userMsg .userImg').css('margin-top', '-8px')

    } else if (pathName.indexOf("senior") != -1) {
        $('body').removeClass('').addClass('seniorCommon')
    } else {
        //默认
        $('body').removeClass('').addClass('commonColor')
        $(".ygMenu .ygHeader .ygLogo .icon-logo").html("&#xe636;");
        $(".menu-wrapper .menu-list-transform .logo-a .icon-logo").css({
            color: '#0258bf'
        })
    }

    //中英文切换
    $("#changLanguageButton , #changLanguageButtonMobile").on("click", function () {
        // var cok = "csrfToken=MkRtO_FPBHmxMlUjHjT6U3ow; UM_distinctid=16e1164b5d33d8-07fc7266a87c96-123e6a5a-13c680-16e1164b5d46bb; TS4_lang=zh-cn; lang=zh-cn; lang.sig=8Yrypg-j40rbFqIQn6xj99nGaiSoYtwbMqWXVDYCYT8; lang=en; CNZZDATA1261257612=202496846-1571983750-%7C1572519684";
        // var lang = document.cookie.indexOf("lang") != -1 && document.cookie.split("lang=")[1];
        // var lang = cok.indexOf("lang") != -1 && cok.split("lang=")[1];
        // console.log(lang,'cok')
        // var langCode = lang.indexOf("zh") != -1 ? "en" : "zh-cn";
        // console.log(langCode,'langCode')
        var langCode = cookie('lang')==='en'?'zh-cn':'en';
        window.sendCZC(['_trackEvent', 'switchLanguage', langCode]);
        $.ajax({
            type: 'get',
            url: '/switchLanguage',
            data: {
                "lang": langCode
            },
            success: function (data) {
                if (data.code == 200) {
                    window.location.reload();
                }
            },
            error: function (error) {
                console.log("提示：系统错误！");
            }
        })
    })

    

    //中英文图标的切换
    var liMargin = $('.ygHeader .menu-list>li')
    if (document.cookie && cookie('lang')==='zh-cn') {
        $("#changLanguageButton .iconInnerText").html("&#xe625;");
        $("#changLanguageButtonMobile").html('<i class="iconfont iconInnerText">&#xe625;</i>');
        $('.ygHeader .header-right .userMsg .selectTips .accountSet').html('账号设置')
        $('.ygHeader .header-right .userMsg .selectTips .exit').html('退出')
        $('.ygHeader .header-right .userMsg .selectTips .application').html('应聘信息')
        $('.ygHeader .header-right .userMsg .selectTips .admissionApply').html('入学申请')
        liMargin.css('margin','0 1.5vw')
    } else {
        $("#changLanguageButton .iconInnerText").html("&#xe62d;");
        $("#changLanguageButtonMobile").html('<i class="iconfont iconInnerText">&#xe62d;</i>');
        $('.ygHeader .header-right .userMsg .selectTips .accountSet').html('Set up your account')
        $('.ygHeader .header-right .userMsg .selectTips .exit').html('Exit')
        $('.ygHeader .header-right .userMsg .selectTips .application').html('Application Information')
        $('.ygHeader .header-right .userMsg .selectTips .admissionApply').html('Admissions')
        liMargin.css('margin','0 0.95vw')
    }

    // 机器人在招生页面显示
    // if (pathName.indexOf("/recruit_students") != -1) {
    //     $('.yungu-robot').show()
    // }else{
    //     $('.yungu-robot').hide()
    // }
    //机器人的调用
    var closeEyes = 'https://yungu-xiaozhao.oss-cn-hangzhou.aliyuncs.com/yungu-website/76859456751740020robot2.png',
        openEyes = 'https://yungu-xiaozhao.oss-cn-hangzhou.aliyuncs.com/yungu-website/16620698708864090robot3.png',
        closeModal = 'https://yungu-xiaozhao.oss-cn-hangzhou.aliyuncs.com/yungu-website/48547106294033760robot1.png',
        mobileOpenEyes = 'https://yungu-xiaozhao.oss-cn-hangzhou.aliyuncs.com/yungu-website/10421128092241360mobileRobot2.png',
        mobileCloseModal = 'https://yungu-xiaozhao.oss-cn-hangzhou.aliyuncs.com/yungu-website/55760314025528660mobileRobot1.png';
    if ($(window).width() <= '768') {
        $('.yungu-robot .robot img').attr('src', mobileOpenEyes)
    }
    $('.yungu-robot .robot').on('mouseover', function () {
        $(this).find('img').attr('src', openEyes)
    })
    $('.yungu-robot .robot').on('mouseout', function () {
        $(this).find('img').attr('src', closeEyes)
    })

    $(".yungu-robot .robot").on('click', function () {

        if ($(".yungu-robot-window").css("display") == "none") {
            $(".yungu-robot-window").css({
                'display': 'inline-block'
            });
            if ($(window).width() <= '768') {
                $(this).find('img').attr('src', mobileCloseModal)
            } else {
                $(this).find('img').attr('src', closeModal)
            }

        } else {
            $(".yungu-robot-window").css({
                'display': 'none'
            });
            if ($(window).width() <= '768') {
                $(this).find('img').attr('src', mobileOpenEyes)
            } else {
                $(this).find('img').attr('src', openEyes)
            }

        }

    })

    // 移动端头部一级菜单显示隐藏
    var mo = function (e) {
        e.preventDefault()
    };
    $('#mobile-news-menu .list').on('click', function () {
        $('#mobile-news-menu .sliderMenu').css({
            'left': '0',
        })
        $('#mobile-news-menu .opacity').css('display', 'block')
        document.body.style.overflow = 'hidden';
        document.addEventListener("touchmove", mo, false); //禁止页面滑动
    })
    $('#mobile-news-menu .opacity').on('click', function () {
        $('#mobile-news-menu .sliderMenu').css('left', '-75%')
        $('#mobile-news-menu .opacity').css('display', 'none')
        document.body.style.overflow = ''; //出现滚动条
        document.removeEventListener("touchmove", mo, false);
    })

    // 移动端中间一级菜单显示隐藏
    $('#second-mobile-news-menu .list').on('click', function () {
        $('#second-mobile-news-menu .sliderMenu').css({
            'left': '0',
        })
        $('#second-mobile-news-menu .opacity').css('display', 'block')
        document.body.style.overflow = 'hidden';
        document.addEventListener("touchmove", mo, false); //禁止页面滑动
    })
    $('#second-mobile-news-menu .opacity').on('click', function () {
        $('#second-mobile-news-menu .sliderMenu').css('left', '-75%')
        $('#second-mobile-news-menu .opacity').css('display', 'none')
        document.body.style.overflow = ''; //出现滚动条
        document.removeEventListener("touchmove", mo, false);
    })

    // 移动端二级导航锚点跳转显示隐藏
    $('.mobile-menu-wrapper .nav-detail-wrapper .second-menu-mobile').on('click', function (event) {
        event.stopPropagation();
        // $('.mobile-menu-wrapper .nav-detail-wrapper .secondSlideMenu').show()
        var display = $('.mobile-menu-wrapper .nav-detail-wrapper .secondSlideMenu').css('display');
        if (display == 'none') {
            display = 'block';
        } else {
            display = 'none';
        }
        $('.mobile-menu-wrapper .nav-detail-wrapper .secondSlideMenu').css('display', display);

    })

    $(document).click(function () {
        $(".mobile-menu-wrapper .nav-detail-wrapper .secondSlideMenu").hide();
    });

    //  当前菜单页面变蓝色
    $('.mobile-news-menu .sliderMenu .menuType').on('click', function () {
        $(this).find('aLink').css('color', '#0258bf')
    })

    var menuType = $('.mobile-news-menu .sliderMenu .menuType')
    menuType.each(function () {
        if ($(this).find('.aLink').attr('key') == window.location.pathname) {
            $(this).find('.aLink').css('color', '#0258bf')
        }
    })

    // 详情页面导航
    if (window.location.pathname == "/news/detail") {
        $('#mobile-news-menu .firstMenu').hide()
        $('#mobile-news-menu .firstLogo').hide()
        $('#mobile-news-menu .detailTitle').each(function () {
            if ($(this).text().length > 8) {
                $(this).text($(this).text().substring(0, 8));
                $(this).html($(this).html() + '...')
            }
        })
        $('#mobile-news-menu .detailBack').on('click', function () {
            // history.back(-1)
            window.location.href = document.referrer;
        })
    } else {
        $('#mobile-news-menu .detailTitle').hide();
        $('#mobile-news-menu .detailBack').hide();
    }

    // 登录页面跳转
    var hrefNow = window.location.href;
    $('.ygMenu .ygHeader .header-right .yg-login,#mobile-news-menu .person,#second-mobile-news-menu .person').on('click', function () {
        window.sendCZC(['_trackEvent', 'usercenter', 'login']);
        window.location.href = '/login?backUrl=' + hrefNow;
    })

    // 账号设置
    $('.ygHeader  .header-right .userMsg .selectTips .accountSet,#mobile-news-menu .userMsg .selectTips .accountSet,#mobileMenu .userMsg .selectTips .accountSet').on('click', function () {
        window.location.href = '/login?backUrl=' + hrefNow;
    })

    // 退出登录
    $('.ygHeader  .header-right .userMsg .selectTips .exit,#mobile-news-menu .userMsg .selectTips .exit,#mobileMenu .userMsg .selectTips .exit').on('click', function () {
        var origin = window.location.origin;
        var callBackUrl = origin + '/loginOutCallBack?backUrl=' + hrefNow;
        callBackUrl = encodeURIComponent(callBackUrl);
        window.location.href = window.OSLOGIN_HOST + '/api/os/cas/osLogout?service=' + callBackUrl;
    })

    // 我的申请
    $('.ygHeader  .header-right .userMsg .selectTips .application,#mobile-news-menu .userMsg .selectTips .application,#mobileMenu .userMsg .selectTips .application').on('click', function () {
        window.location.href = window.OSLOGIN_HOST + '/cas/loginMsg#/recruitment';
    })

    // 入学申请
    $('.ygHeader  .header-right .userMsg .selectTips .admissionApply,#mobile-news-menu .userMsg .selectTips .admissionApply,#mobileMenu .userMsg .selectTips .admissionApply').on('click', function () {
        window.location.href = '/apply/admission/list';
    })

    // 各个页面banner底部cover切换
    var pageList = window.mockDate.pageList,
        imageCover = $('.recruitSwipe  .bannerCover .coverImg'),
        imageCoverMobile = $('.recruitSwipe .bannerCover .coverImgMobile'),
        imageFooter = $('.yg-know-more .yg-footer .yg-footer-cover'),
        imageFooterMobile = $('.yg-know-more .yg-footer .yg-footer-cover-mobile ')

    imageFooter.attr('src', pageList[0].footerImg);
    imageFooterMobile.attr('src', pageList[0].footerImgMobile)
    for(var i=0; i<pageList.length; i++){
        if (window.location.pathname.indexOf(pageList[i].pathname) > -1){
            imageCover.attr('src', pageList[i].bannerCover);
            imageCoverMobile.attr('src', pageList[i].bannerCoverMobile);
            imageFooter.attr('src', pageList[i].footerImg);
            imageFooterMobile.attr('src', pageList[i].footerImgMobile)
        }
    }
    // pageList.map((item, index) => {
    //     if (window.location.pathname.indexOf(item.pathname) > -1) {
    //         imageCover.attr('src', item.bannerCover);
    //         imageCoverMobile.attr('src', item.bannerCoverMobile);
    //         imageFooter.attr('src', item.footerImg);
    //         imageFooterMobile.attr('src', item.footerImgMobile)
    //     }
    // })


    // 移动端rem布局
    // 监听页面大小变化
    isNeedRem();
    $(window).resize(function (e) {
        isNeedRem()
    })
    //是否设置rem
    function isNeedRem() {
        var nowClientWidth = $(window).width();
        var htmlFontSize = $('html').css('font-size');
        if (nowClientWidth <= 1024) {
            rem();
        } else {
            $('html').css('font-size', 'unset')
        }
    }
    //添加rem
    function rem() {
        var fontSize = $(window).width() / 3.75 + 'px';
        $('html').css('font-size', fontSize)
    }


})
