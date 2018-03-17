jQuery(document).ready(function($) {
    var ws = [270,240,220,200,180];
    $('.filter-select-list').each(function() {
        $(this).find('.j-select').each(function(i) {
            $(this).selectmenu({
                width : ws[i]
            })
        })
    });

    var sidebarmin = $('.sidebar-min');
    var sidebarextend = $('.sidebar-extend');
     $('.more',sidebarmin).click(function() {
        sidebarmin.addClass('dn');
        $('.sidebar-extend').removeClass('dn');
    });
     $('.close',sidebarextend).click(function() {
         sidebarextend.addClass('dn');
         sidebarmin.removeClass('dn');
     })

     $('.filter-select-list').each(function() {
         var self = $(this);
         var items = self.find('.filter-select-item');
         items.each(function() {
             var self = $(this);
             self.find('.add').click(function() {
                 self.next().removeClass('dn');
             });
             self.find('.del').click(function() {
                 //这里修改了 两种方案
                 //self.hide().nextAll().hide();
                 self.addClass('dn').appendTo(self.parent());
                 resizewidth(self.parent());
             });
         });
     });

     function resizewidth(p){
        p.find('.j-select').each(function(i) {
            $(this).selectmenu('option','width',ws[i]);
        })
     }
     
     //(function() {
         //var cache_td_ws = [];
         ////thead tbody
         //$('.chart-table .table-tbody').find('tr:first td').each(function() {
             //var w = $(this).width();
             //cache_td_ws.push(w);
         //})
         //$('.chart-table .table-thead').find('th').each(function(i,v) {
             //$(this).width(cache_td_ws[i]);
         //});
     //})();

     (function() {
        var $main = $('.news-side');
        if($main.length == 0) return;

        
        //$main.height($(window).height());
        var w = $main.width();
        var h = $main.height();
        var wh = $(window).height();
        $main.css('max-height',wh);
        var st = $main.offset().top;
        var $footer = $('.footer');
        var footer_st = $footer.offset().top - wh;
        $(window).scroll(function() {
            var ws = $(window).scrollTop();
            if(ws > footer_st && h > wh){
                var diff = ws-footer_st;
                $main.removeClass('isfixedTop').addClass('isfixedBottom');
                $main.css('bottom',diff);
                $main.width(w);
            }else if(ws > st){
                $main.addClass('isfixedTop').removeClass('isfixedBottom');
                $main.width(w);
            }
            else{
                $main.removeClass('isfixedTop').removeClass('isfixedBottom');
                $main.width('40%');
            }
        });

        $main.niceScroll({
            nativeparentscrolling:false,
            cursorcolor: "#ccc",//#CC0071 光标颜色
            cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
            touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
            cursorwidth: "5px", //像素光标的宽度
            cursorborder: "0", // 	游标边框css定义
            cursorborderradius: "5px",//以像素为光标边界半径
            autohidemode: true//是否隐藏滚动条
        });
     })();

});
