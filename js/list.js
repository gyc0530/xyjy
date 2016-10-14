/**
 * Created by Administrator on 2016/10/10.
 */
load();
function load() {
    var $footerUp = $("#footerUp");
    $($footerUp).bind("tap", function (ev) {
        var $target = $(ev.target).index();
        if ($target === 0) {
            window.location = "../index.html";
        } else if ($target === 1) {
            window.location = "list.html";
        } else if ($target === 2) {
            window.location = "my.html";
        } else if ($target === 3) {
            window.location = "shopCar.html";
        } else if ($target === 4) {
            window.location = "aboutUs.html";
        }
    })
}
init();
function init() {
    $.get("../list.json", function (data) {
        //console.log(data);
        var html = "";
        var controls = document.getElementById("segmentedControls");
        var contents = document.getElementById("segmentedControlContents");

        $.each(data, function (i, o) {
            //console.log(i);
            html += "<div id=\"content" + data[i].itemid + "\" class=\"mui-control-content\">" +
                "<ul class=\"mui-table-view\">" +

                "</ul>" +
                "</div>";
            // console.log(o);
        });
        contents.innerHTML += html;
        var muitable = $(".mui-table-view");
        $.each(data, function (i, o) {
            //console.log(muitable[i]);
            muitable[i].innerHTML = "";
            var html1 = "";
            for (var j = 0; j < o.itemCont.length; j++) {
                muitable[i].innerHTML += "<li  class=\"mui-table-view-cell\">" +
                    "<div id='" + o.itemCont[j].id + "' data-id=" + o.itemCont[j].id + " class='flex '>" +
                    "<div class=\"listImg\">" +
                    "<img src=\"../img/101/100/" + o.itemCont[j].img + "\" alt=\"\"/>" +
                    "</div>" +
                    "<div class=\"listDes\">" +
                    "<h3>" + o.itemCont[j].dec + "</h3>" +
                    "<span>￥:" + o.itemCont[j].price + "</span>" +
                    "<div class='span'>" +
                    "<span class='shopcart iconfont icon-jianhao'></span>" +
                    "<p class='num'>0</p>" +
                    "<span class='shopcart iconfont icon-jiahao'></span>" +
                    "</div>" +
                    "</div>" +
                    "</li>";
            }
        });
        for (var j = 0; j < data[0].itemdrink.length; j++) {
            muitable[0].innerHTML += "<li data-id=" + data[0].itemdrink[j].id + " class=\"mui-table-view-cell\">" +
                "<div class='flex'>" +
                "<div class=\"listImg\">" +
                "<img src=\"\" alt=\"\"/>" +
                "</div>" +
                "<div class=\"listDes\">" +
                "<h3>" + data[0].itemdrink[j].dec + "</h3>" +
                "<span>￥:" + data[0].itemdrink[j].price + "</span>" +
                "<div class='span'>" +
                "<span class='shopcart iconfont icon-jianhao'></span>" +
                "<p class='num'>0</p>" +
                "<span class='shopcart iconfont icon-jiahao'></span>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</li>";
        }
        /* console.log($("li").data("id"));*/
        /*console.log($("li").attr("data-id"));*/
        controls.querySelector('.mui-control-item').classList.add('mui-active');
        contents.querySelector('.mui-control-content').classList.add('mui-active');
        $(".icon-jianhao").css({display: "none"});
        $(".num").css({display: "none"});
        var $num = 0;
        var num1 = 1;
        var sum = 0;
        var off = true;
      /*  var obj= {};
        obj["a"] = "1";
        delete obj["a"];
        console.log(obj);*/
        var str =  localStorage.getItem("shopCar");
        var obj = JSON.parse(str);
        console.log(obj);
        if(obj){
            var arr = [];
            var arrNum = [];
            for(var key in obj){
                arr.push(key);
                sum+=parseInt(obj[key].count);
                cartNum = localStorage.setItem("cartNum",sum);
            }
            for(var k = 0;k<arr.length;k++){
                    $("#"+arr[k]+"").children(".listDes").children().eq(2).children().eq(0).css({display:"block"});
                    $("#"+arr[k]+"").children(".listDes").children().eq(2).children().eq(1).css({display:"block"}).html(arrNum[k]);
            }
        }else{
             $(".jianhao").css({display:"none"});
        }
        var $product_shop = $(".product_shop");
        $(".icon-jiahao").bind("tap",function(e) {
            var $target = $(e.target);
            var obj = {};
            var row1 = {};
            var $targetId = $(this).parent().parent().parent().data("id");
            var $targetName = $(this).parent().prev().prev().html();
            var $targetImg = $(this).parent().parent().parent().find(".listImg img").attr("src");
            var $targetPrice= $(this).parent().prev().html();
            //console.log($targetId);
            var shopCarObj = localStorage.getItem("shopCar");
            shopCarObj = JSON.parse(shopCarObj);
            console.log(shopCarObj);
            if(shopCarObj){
                console.log("有购物车");
                if(shopCarObj[$targetId]){
                    console.log("有购物车id");
                    shopCarObj[$targetId].count += 1;
                    $(this).prev().css({display:"block"}).addClass("block").html(shopCarObj[$targetId].count);
                    shopCarObj = JSON.stringify(shopCarObj);
                    localStorage.shopCar = shopCarObj;
                    $(this).prev().prev().css({display:"block"});
                }else{
                    console.log("无购物车id");
                    row1.productName = $targetName;
                    row1.productImg = $targetImg;
                    row1.productProduce = $targetPrice;
                    row1.count = 1;
                    shopCarObj[$targetId] = row1;
                    shopCarObj = JSON.stringify(shopCarObj);
                    localStorage.shopCar = shopCarObj;
                }
            }else{
                shopCarObj = {};
                row1.productName = $targetName;
                row1.productImg = $targetImg;
                row1.productProduce = $targetPrice;
                row1.count = 1;
                shopCarObj[$targetId] = row1;
                shopCarObj = JSON.stringify(shopCarObj);
                localStorage.shopCar = shopCarObj;
                console.log("无购物车");
            }
        });
        $(".icon-jianhao").bind("tap",function(e) {
            var $target = $(e.target);
            var obj = {};
            var row1 = {};
            var $targetId = $(this).parent().parent().parent().data("id");
            var $targetName = $(this).parent().prev().prev().html();
            var $targetImg =  $(this).parent().parent().parent().find(".listImg img").attr("src");
            var $targetPrice=  $(this).parent().prev().html();
            console.log($targetId);
            var shopCarObj = localStorage.getItem("shopCar");
            shopCarObj = JSON.parse(shopCarObj);
            console.log(shopCarObj);
            if(shopCarObj){
                console.log("有购物车");
                if(shopCarObj[$targetId]){
                    console.log("有购物车id");
                    if(shopCarObj[$targetId].count==0){
                        delete shopCarObj[$targetId];
                        shopCarObj = JSON.stringify(shopCarObj);
                        localStorage.shopCar = shopCarObj;
                    }else{
                        shopCarObj[$targetId].count -= 1;
                        shopCarObj = JSON.stringify(shopCarObj);
                        localStorage.shopCar = shopCarObj;
                    }

                }else{
                    console.log("无购物车id");
                    row1.productName = $targetName;
                    row1.productImg = $targetImg;
                    row1.productProduce = $targetPrice;
                    row1.count = 1;
                    shopCarObj[$targetId] = row1;
                    shopCarObj = JSON.stringify(shopCarObj);
                    localStorage.shopCar = shopCarObj;
                }
            }else{
                shopCarObj = {};
                row1.productName = $targetName;
                row1.productImg = $targetImg;
                row1.productProduce = $targetPrice;
                row1.count = 1;
                shopCarObj[$targetId] = row1;
                shopCarObj = JSON.stringify(shopCarObj);
                localStorage.shopCar = shopCarObj;
                console.log("无购物车");
            }
        })

    });
}
var run = true;
$(".detail").unbind("tap").bind("tap", function () {
    if (run) {
        $("#contain").css({display: "block"});
        $.get("../list.json", function (data) {
            $.each(data, function (i, o) {
                console.log(i);
            })
        });
        run = false;
    } else {
        $("#contain").css({display: "none"});
        run = true;
    }
});
$("#segmentedControls a").unbind("tap").bind("tap", function (ev) {
    ev.preventDefault();
    var $index = $(this).index();
    var cont = $(".mui-control-content");
    $(this).parent().find("a").css({background: "#eee"}).eq($index).css({background: "#fff"});
    $(".mui-control-content").hide().eq($index).show();

    $("#contain").css({display: "none"});
    run = true;
    //console.log($index);
    $(".detail").unbind("tap").bind("tap", function () {
        if (run) {
            $("#contain").css({display: "block"});
            $.get("../list.json", function (data) {
                console.log(data[$index]);
                var html = "";
                for (var i = 0; i < data[$index].itemdetail.length; i++) {
                    html += "<a class='' href=\"javascript:;\">" + data[$index].itemdetail[i] + "</a>"
                }
                $("#contain").html(html);
                /* $("#contain a").eq(0).unbind("tap").bind("tap",function(){
                 $("#contain").css({display:"none"});
                 })*/
                $("#contain a").unbind("tap").bind("tap", function () {
                    var index = $(this).index();
                    var text = $(this).html();
                    if (index == 0) {
                        $("#contain").css({display: "none"});
                        run = true;
                        init();
                    } else {
                        if ($index == 0) {
                            if (text == "饮用水") {
                                $.get("../list.json", function (data) {
                                    var muitable = $(".mui-table-view");
                                    var html1 = "";
                                    console.log(data[$index].itemdrink);
                                    muitable[$index].innerHTML = "";
                                    for (var j = 0; j < data[$index].itemdrink.length; j++) {
                                        muitable[$index].innerHTML += "<li data-id=" + data[$index].itemdrink[j].id + " class=\"mui-table-view-cell\">" +
                                            "<div class='flex'>" +
                                            "<div class=\"listImg\">" +
                                            "<img src=\"\" alt=\"\"/>" +
                                            "</div>" +
                                            "<div class=\"listDes\">" +
                                            "<h3>" + data[$index].itemdrink[j].dec + "</h3>" +
                                            "<span>￥:" + data[$index].itemdrink[j].price + "</span>" +
                                            "<div class='span'>" +
                                            "<span class='shopcart iconfont icon-jianhao'></span>" +
                                            "<p class='num'>0</p>" +
                                            "<span class='shopcart iconfont icon-jiahao'></span>" +
                                            "</div>" +
                                            "</div>" +
                                            "</div>" +
                                            "</li>";
                                    }

                                });
                                $("#contain").css({display: "none"});
                                run = true;
                            }
                        }

                    }
                })
            });
            run = false;
        } else {
            $("#contain").css({display: "none"});
            run = true;
        }
    });
});






















