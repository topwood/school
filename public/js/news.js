//查询列表的时候 有两个参数
// 类型 和 关键字
//确认，这个接口到底怎么传
// 请求新闻列表数据

var arr = [],
    a = 1,
    classification_id = $("#classification_id").val(),
    page = 1,
    inputVal = '',
    timeValue = '';

function getnewsDate(arr) {
    var listContent = "",
        newest = '',
        isTop = '',
        uname = '',
        rightImg = '';

    for (var i = 0; i < arr.length; i++) {
        if (arr[i].latest === 1) {
            newest = '<span class="newest">最新</span>'
        }else {
            newest = '<span></span>'
        }
        if(arr[i].is_top === 1){
            isTop = '<span class="isTop">置顶</span>'
        }else{
            isTop = '<span></span>'
        }
        if (arr[i].image_url) {
            rightImg = arr[i].image_url
        } else {
            rightImg = '../public/img/news.png'
        }

        if (arr[i].uname == null) {
            uname = '云谷学校'
        }else{
            uname = arr[i].uname
        }

        // listContent += '<div class="new-list-content"><div class="leftImg"><img src="' + rightImg + '" /></div><div class="rightTips"><p class="tipsTitle">'
        listContent += '<div  class="new-list-content" isBlank=' + arr[i].is_new_window +  ' listId="' + arr[i].id + ' "><div class="leftImg" style="background:url(' + rightImg + ') no-repeat center center/cover"></div><div class="rightTips"><p class="tipsTitle">'
        listContent += '<span class="title">' + arr[i].title + '</span>' + newest + isTop + '</p><p class="tipsContent">' + arr[i].describe + '</p>';
        listContent += '<p class="tipsMsg"><span class="detailMsg">' + uname + '</span>'
        listContent += '<span class="detailMsg">' + arr[i].update_time + '</span>'
        listContent += '<span class="detailMsg">' + arr[i].click + '</span></p></div></div>';


    }

    return listContent;

}



function getMobileNewsDate(arr) {
    var mobileListContent = "",
        newest = '';
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].latest === 1) {
            newest = '<span class="newest">最新</span>'
        } else {
            newest = '<span></span>'
        }

        if(arr[i].is_top === 1){
            isTop = '<span class="isTop">置顶</span>'
        }else{
            isTop = '<span></span>'
        }

        if (arr[i].image_url) {
            rightImg = arr[i].image_url
        } else {
            rightImg = '../public/img/news.png'
        }
        mobileListContent += '<div class="newBox" isBlank=' + arr[i].is_new_window +  ' listId="' + arr[i].id + '"><div class="leftImg" style="background:url(' + rightImg + ') no-repeat center center/cover"></div><div class="rightMsg"> <p class="newTitle"><span class="title">' + arr[i].title + '</span>';
        mobileListContent += newest + isTop + '</p><p class="newMsg"><span class="newTime"><span class="headImg"><img src="../public/img/logo.png" /></span>';
        mobileListContent += '<span class="detailMsg">' + arr[i].update_time + '</span></span><span class="view"><span class="headImg"><img src="../public/img/logo.png" /></span>'
        mobileListContent += '<span class="detailMsg">' + arr[i].click + '</span></span></p></div></div>'
    }
    return mobileListContent;
}

// 请求新闻列表
function getData(page, classification_id, inputVal,timeValue) {
    a++
    $.post({
        url: "/news/list",
        data: {
            page: page,
            pageSize: 10,
            classification_id: classification_id,
            search: inputVal,
            time:timeValue
        },
        type: "GET",
        dataType: "json",
        success: function (data) {
            var keyWord = data.data.search;
            arr = data.data.newsList;
            if (!arr || !arr.length) {
                return
            }
            //getnewsDate(arr)
            //getMobileNewsDate(arr)
            $(".mobile-news-list .newList").append(getMobileNewsDate(arr));
            $(".newListBox .new-list-center").append(getnewsDate(arr));
            a = 1;
            // 新闻标题超出部分省略号显示
            $('.new-list .new-list-center .new-list-content .rightTips .tipsTitle .title').each(function () {
                if ($(this).text().length > 40) {
                    $(this).text($(this).text().substring(0, 40));
                    $(this).html($(this).html() + '...')
                }

                // 模糊查询标题部分关键字高亮
                if ($(this).html().indexOf(keyWord) > -1) {
                    var replaceText = $(this).html().replace(new RegExp(keyWord, 'g'), '<font color="#0258bf">' + keyWord + '</font>')
                    $(this).html(replaceText)
                }

            })

            // 模糊查询新闻简介部分关键字高亮
            $('.new-list .new-list-center .new-list-content .rightTips .tipsContent').each(function () {
                if ($(this).html().indexOf(keyWord) > -1) {
                    var replaceText = $(this).html().replace(new RegExp(keyWord, 'g'), '<font color="#0258bf">' + keyWord + '</font>')
                    $(this).html(replaceText)
                }
            })

            // 移动端新闻标题字数控制
            $(".mobile-news-list .newList .newBox .rightMsg .newTitle .title").each(function () {
                if ($(this).text().length > 26) {
                    $(this).text($(this).text().substring(0, 26));
                    $(this).html($(this).html() + '...')
                }

                // 模糊查询标题部分关键字高亮
                if ($(this).html().indexOf(keyWord) > -1) {
                    var replaceText = $(this).html().replace(new RegExp(keyWord, 'g'), '<font color="#0258bf">' + keyWord + '</font>')
                    $(this).html(replaceText)
                }
            })


            // 新闻最新标签英文切换
            if (document.cookie && document.cookie.indexOf("zh-cn") > -1) {
                $('.new-list .newListBox .new-list-center .new-list-content .newest').html('最新')
            } else {
                $('.new-list .newListBox .new-list-center .new-list-content .newest').html('newest')
            }

        },
        error: function () {
            a = 1;
        }
    })
}


$(function () {

    // 全局二级菜单隐藏
    $(".menu-wrapper").hide(); 

    var menuInput = $(".new-list .new-menu-list .menuInputBox .menuInput")
    menuInput.val('')

    // 中英文切换
    var langChange = window.mockDate.zhCn;
    var menuType = $('.new-list .newList .new-menu-list .first-menu'),
        mobileMenuType = $('.mobile-news-list .menuList .firstMenu');
    if (document.cookie && document.cookie.indexOf("zh-cn") < 0) {
        langChange = window.mockDate.enLang
    }
    for(var i=0;i<langChange.newsType.length;i++){
        menuType.eq(i).find('.menuType').html(langChange.newsType[i].name)
        mobileMenuType.eq(i).find('.word').html(langChange.newsType[i].mobileName);
    }
    // langChange.newsType.map((item, index) => {
    //     menuType.eq(index).find('.menuType').html(item.name)
    //     mobileMenuType.eq(index).find('.word').html(item.mobileName);
    // })
    $('.new-list .new-list-noDate .haveNoDate').html(langChange.isHaveDate)
    $('.mobile-news-list .no-data .noData').html(langChange.isHaveDate)
    menuType.first().find('.allType').html(langChange.allTypeSecond)
    mobileMenuType.first().find('.allType').html(langChange.allTypeSecond)


    // 新闻类型
    $.post({
        url: "/categories",
        data: '', //传参
        type: "GET",
        dataType: "json",
        success: function (dataList) {
            var dataList = dataList && dataList.data
            for(var i=0;i < dataList.length;i++){
                var childrenStr = JSON.stringify(dataList[i].children);
                var liList = "<li class='xiala' childrenList='" + childrenStr + "' dataId=" + dataList[i].id + "><a class='type'>" + dataList[i].title + "</a></li>";
                $('.new-list .first-menu').first().find('.second-menu').append(liList)
                $('.mobile-news-list .firstMenu').first().find('.second-menu').append(liList)
                defaultNews(dataList[i].id, dataList[i].title,dataList)
            }
            // dataList.data.map((item, index) => {
            //     var childrenStr = JSON.stringify(item.children);
            //     var liList = "<li class='xiala' childrenList='" + childrenStr + "' dataId=" + item.id + "><a class='type'>" + item.title + "</a></li>";
            //     $('.new-list .first-menu').first().find('.second-menu').append(liList)
            //     $('.mobile-news-list .firstMenu').first().find('.second-menu').append(liList)
            //     defaultNews(item.id, item.title,dataList.data)
            // })
        }
    })

    // 新闻列表
    
    getData(page, classification_id, inputVal,timeValue)
    
    // 关于课程下拉菜单渲染
    function getChilden(childrenList) {
        // $('.new-list .first-menu').first().find('.second-menu').on('click',function(){
        var courseList = $('.new-list .first-menu').eq(1).find('.second-menu'),
            courseListMobile = $('.mobile-news-list .menuList .firstMenu').eq(1).find('.second-menu');
        if (childrenList && childrenList.length) {
            courseList.html('')
            courseListMobile.html('')
            for(var i=0;i<childrenList.length;i++){
                var liList = "<li class='xiala' dataId=" + childrenList[i].id + "><a class='type'>" + childrenList[i].title + "</a></li>";
                courseList.append(liList)
                courseListMobile.append(liList)
            }
            // childrenList.map((e, index) => {
            //     var liList = "<li class='xiala' dataId=" + e.id + "><a class='type'>" + e.title + "</a></li>";
            //     courseList.append(liList)
            //     courseListMobile.append(liList)
            // })
        } else {
            courseList.html('')
            courseListMobile.html('')

        }
        // })

    }

    // 切换新闻类型请求新闻列表
    function changeFirstMenuName(value) {
        var typeHtml = $(event.target).parents('.first-menu').find('.menuType')
        if (value) {
            $(event.target).parents('.first-menu').siblings().eq(0).find('.menuType').html('关于课程')
        }
        if ($(event.target).html() == "全部类型") {
            typeHtml.html('新闻类型')
            $('.new-list .new-list-center .new-menu-list .aboutCourse').hide()
            $('.mobile-news-list .menuList .aboutCourse').hide()

            
        } else {
            typeHtml.html($(event.target).html())
            $('.new-list .new-list-center .new-menu-list .aboutCourse').show()
            $('.mobile-news-list .menuList .aboutCourse').show()

        }
        $(event.target).parent('.xiala').siblings().find('.type').css('color', '#333')
        $(event.target).css('color', '#0258bf')
        classification_id = $(event.target).parent('.xiala').attr('dataId');
        page = 1;
        $(".newListBox .new-list-center").html('');
        $(".mobile-news-list .newList").html('');
        getData(page, classification_id, inputVal,timeValue)
    }

    // 从一级页面跳链到新闻页面 显示菜单跳过banner
    if (classification_id && classification_id != 0) {
        $('html,body').scrollTop($('.new-banner').innerHeight())
    }

    

    // 点击新闻类型事件
    $('.new-list .first-menu').first().find('.second-menu').on('click', function () {
        var defaultValue = true;
        var childrenString = $(event.target).parent('.xiala').attr('childrenList');
       
        var childrenList = childrenString ? JSON.parse(childrenString) : '';
            
        changeFirstMenuName(defaultValue) // 切换新闻类型请求新闻列表
        getChilden(childrenList) // 关于课程下拉菜单渲染

    })

    // 移动端点击新闻类型进行筛选
    $('.mobile-news-list .menuList .newsType .second-menu').on('click', function () {
        $('.mobile-news-list .menuList .aboutCourse').find('.word').html('课程')
        $('.mobile-news-list .menuList .uploadTime').find('.word').html('时间')

        var typeHtml = $(event.target).parents('.firstMenu').find('.word')
        if ($(event.target).html() == "全部类型") {
            typeHtml.html('新闻')
            $('.mobile-news-list .menuList .aboutCourse').hide()
        } else {
            typeHtml.html($(event.target).html())
            $('.mobile-news-list .menuList .aboutCourse').show()
        }

        classification_id = $(event.target).parent('.xiala').attr('dataId');
        page = 1;
        $(".mobile-news-list .newList").html('');
        getData(page, classification_id, inputVal,timeValue);
        var childrenString = $(event.target).parent('.xiala').attr('childrenList'),
            childrenList = childrenString ? JSON.parse(childrenString) : '';
            
        getChilden(childrenList) // 关于课程下拉菜单渲染
    })

    // 点击关于课程
    $('.new-list .aboutCourse,.mobile-news-list .menuList .aboutCourse').find('.second-menu').on('click', function () {
        changeFirstMenuName()
    })

    // 筛选发布时间
    $('.new-list .uploadTime,.mobile-news-list .menuList .uploadTime').find('.second-menu').on('click',function(){
        
        timeValue = $(event.target).parents('.xiala').attr('timeValue')
        $(event.target).parent('.xiala').siblings().find('.type').css('color', '#333')
        $(event.target).css('color','#0258bf')

        page = 1;
        $(".newListBox .new-list-center").html('');
        $(".mobile-news-list .newList").html('');
        getData(page, classification_id, inputVal,timeValue)
        
    })


    

    // 轮播属性配置
    var newSwiper = new Swiper('.swiper-container', {
        loop: true, // 循环模式选项
        autoplay: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    })

    // 视频播放
    $('.new-banner .swiper-container .swiper-wrapper .swiper-slide .new-banner-center .new-banner-btn').on('mouseover', function () {
        //视频播放
        $(this).find($(".vedio")).on("click", function () {
            var $parent = $(this).parents('.swiper-slide')
            var showVideo = $parent.find($('.back-video'));
            showVideo.trigger('play')
            showVideo.siblings(".pause-button").css({
                "display": "block"
            });
            newSwiper.autoplay.stop();
            showVideo.siblings(".pause-button").on('click', function () {
                showVideo.trigger('pause');
                newSwiper.autoplay.start();
                showVideo.siblings(".pause-button").css("display", "none");
            })
            showVideo.onended = function () {
                showVideo.siblings(".pause-button").css("display", "none");
                newSwiper.autoplay.start();
            }
        });
    })


    // 二级菜单显示隐藏
    $(".new-list .new-menu-list .first-menu").on('mouseover', function () {
        $(this).siblings().removeClass("drowpDawn");
        $(this).addClass('drowpDawn');
        $(this).find(".icon").html('<i class="iconfont">&#xe60a;</i>');
        // $(this).find(".menuType").css('color','#0258bf')
        $(this).siblings().find(".icon").html('<i class="iconfont">&#xe6c1;</i>');

    })

    $(".new-list .new-menu-list").on('mouseout', function () {
        $(this).find('.first-menu').removeClass('drowpDawn');
        $(this).find('.icon').html('<i class="iconfont">&#xe6c1;</i>');

    })
    $(".mobile-news-list .menuList .firstMenu").on('click', function () {
        if ($(this).hasClass("drowpDawn")) {
            $(this).removeClass('drowpDawn');
            $(this).find('.icon').html('<i class="iconfont">&#xe6c1;</i>');
        } else {
            $(this).addClass('drowpDawn');
            $(this).find(".icon").html('<i class="iconfont">&#xe60a;</i>');
        }
        $(this).siblings().removeClass("drowpDawn");
        $(this).siblings().find(".icon").html('<i class="iconfont">&#xe6c1;</i>');
    })


    // input 获取焦点
    menuInput.on('focus', function () {
        $(this).css('border', '1px solid #0258bf')
    })
    // input 鼠标悬停border高亮
    menuInput.on('mouseover', function () {
        $(this).css('border', '1px solid #0258bf')
    })
    // input 鼠标移出
    menuInput.on('mouseout', function () {
        $(this).css('border', '1px solid #eaeaea')
    })
    // input实时监听模糊查询
    menuInput.on("input", function (event) {
        inputVal = $(this).val()
        if (inputVal == '') {
            page = 1;
            $(".newListBox .new-list-center").html('');
            getData(page, classification_id, inputVal,timeValue)
        }
    })

    // 键盘回车，input搜索框触发
    $(".new-list .new-menu-list .menuInputBox .search").on('click', function () {
        page = 1;
        $(".newListBox .new-list-center").html('');
        getData(page, classification_id, inputVal,timeValue)
        // timer && clearTimeout(timer);
        // timer = setTimeout(function () {
        //     $(".newListBox .new-list-center").html('');
        //     getData(page, classification_id, inputVal)
        // }, 800)
    })

    menuInput.keypress(function (e) {
        if (e.which == 13) {
            page = 1;
            $(".newListBox .new-list-center").html('');
            getData(page, classification_id, inputVal,timeValue)
        }
    })




    // 移动端适配Input
    $(".mobile-news-list .searchInput .input").on("input", function (evevt) {
        inputVal = $(this).val()

        if (inputVal == '') {
            page = 1;
            $(".mobile-news-list .newList").html('');
            getData(page, classification_id, inputVal,timeValue)
        }
        // timer = setTimeout(function () {
        //     $(".mobile-news-list .newList").html('');
        //     getData(page, classification_id, inputVal)
        // }, 800)
        if ($(this).val()) {
            $(".mobile-news-list .searchInput .search").css("display", "none")
        } else {
            $(".mobile-news-list .searchInput .search").css("display", "block")
        }
    })

    $("#mobileInput").keypress(function (e) {
        var code = e.keyCode;
        if (code == 13) {
            e.preventDefault();
            page = 1;
            $(".mobile-news-list .newList").html('');
            getData(page, classification_id, inputVal,timeValue)
        }
    })







    // 监听滚轮
    $(window).scroll(function () {
        // pc端菜单固定头部
        var topInstance = $(".new-list").offset().top,

            scrollInstance = $(document).scrollTop(),
            top = topInstance - scrollInstance;

        if (top <= 0) {
            $(".new-list .newList").addClass("menu-list-fixed");
        } else {
            $(".new-list .newList").removeClass("menu-list-fixed");
        }

        var topInstanceMobile = $(".mobile-news-list").offset().top,
            topMobile = topInstanceMobile - scrollInstance;
        if (topMobile <= 0) {
            $(".mobile-news-list .menuList").addClass("menu-list-fixed");
            if (!binded) {

                $(window).scroll(function () {
                    var afterScrollInstance = $(document).scrollTop();
                    if (scrollInstance < afterScrollInstance) {
                        //向上
                        $(".mobile-news-list .menuList").addClass("menu-list-transform");
                    };
                    if (scrollInstance > afterScrollInstance) {
                        //向下
                        $(".mobile-news-list .menuList").removeClass("menu-list-transform");
                    };
                })
            }
            binded = true;
        } else {
            $(".mobile-news-list .menuList").removeClass("menu-list-fixed");
        }


        // 懒加载
        // PC
        var intanceMobile = document.documentElement.offsetHeight - window.innerHeight;
        var intance = document.documentElement.offsetHeight - window.scrollY - window.innerHeight;
        if (intance <= 300 && document.documentElement.offsetWidth > 768) {
            if (a === 1) {
                page++;
                getData(page, classification_id, inputVal,timeValue)

            }
        }

        // 移动懒加载
        var nodeH = $('.mobile-news-list .no-data').offset().top,
            windowH = $(window).height();
        if (nodeH < (windowH + scrollInstance) && nodeH > scrollInstance) {
            if (a === 1) {
                page++;
                getData(page, classification_id, inputVal,timeValue)

            }
        }

        // 回到顶部按钮显示控制
        var scrollTop = $(document).scrollTop();
        if (scrollTop > 410) {
            $(".new-list  .goTop").css("display", "block")
        } else {
            $(".new-list  .goTop").css("display", "none")
        }

    })
    //回到顶部
    $(".new-list  .goTop").click(function () {
        // $(window).scrollTop(0);
        $('html,body').animate({
            scrollTop: 0
        }, 300)
        // return false
    })

    // 点击跳转详情
    $('#listCenter').on('click', function (e) {
        var dataBox = $(e.target),
            newsListId = '';
        if (!dataBox.hasClass('new-list-content')) {
            dataBox = dataBox.parents('.new-list-content')
        }
        newsListId = dataBox.attr('listId')
        isBlank = dataBox.attr('isBlank')
        
        if (isBlank == 1) {
            window.open("/news/detail?id=" + newsListId);       
        }else{
            window.location.href = "/news/detail?id=" + newsListId;
        }
    })

    $('#listCenterMobile').on('click', function (e) {
        var dataBox = $(e.target),
            newsListId = '';
        if (!dataBox.hasClass('newBox')) {
            dataBox = dataBox.parents('.newBox')
        }
        newsListId = dataBox.attr('listId')
        isBlank = dataBox.attr('isBlank')
        if (isBlank == 1) {
            window.open("/news/detail?id=" + newsListId);       
        }else{
            window.location.href = "/news/detail?id=" + newsListId;
        }
        // window.location.href = "/news/detail?id=" + newsListId;
    })

    // 从一级页面跳链到新闻页面 对应的类型高亮
    function defaultNews(id, title , titleList) {
        
        if (classification_id && classification_id != 0) {
            $('.new-list .new-list-center .new-menu-list .aboutCourse').show()
            $('.mobile-news-list .menuList .aboutCourse').show()
        }
        for( var i=0 ; i<titleList.length ; i++){
            var childList = titleList[i].children;
            
            if (classification_id == titleList[i].id) {
                getChilden(childList) // 关于课程下拉菜单渲染
                $('.new-list .new-list-center .new-menu-list .first-menu').first().find('.menuType').html(titleList[i].title)
                $('.mobile-news-list .menuList .newsType').find('.word').html(titleList[i].title)
                $('.new-list .new-list-center .new-menu-list .first-menu .second-menu .all a').css('color', '#333')
                $('.new-list .new-list-center .new-menu-list .newsType .second-menu li[dataId = ' + titleList[i].id + ']').find('.type').css('color', '#0258bf')
            }
            for(var j=0; j<childList.length ; j++){
                if (classification_id == childList[j].id) {
                    getChilden(childList) // 关于课程下拉菜单渲染

                    $('.new-list .new-list-center .new-menu-list .first-menu').first().find('.menuType').html(titleList[i].title)
                    $('.mobile-news-list .menuList .newsType').find('.word').html(titleList[i].title)


                    $('.new-list .new-list-center .new-menu-list .first-menu .second-menu .all a').css('color', '#333')

                    $('.new-list .new-list-center .new-menu-list .newsType .second-menu li[dataId = ' + titleList[i].id + ']').find('.type').css('color', '#0258bf')

                    $('.new-list .new-list-center .new-menu-list .aboutCourse').find('.menuType').html(childList[j].title)
                    $('.mobile-news-list .menuList .aboutCourse').find('.word').html(childList[j].title)
                    $('.new-list .new-list-center .new-menu-list .aboutCourse .second-menu li[dataId = ' + childList[j].id + ']').find('.type').css('color', '#0258bf')

                }
            }
        }


    }



})