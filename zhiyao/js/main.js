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
     
     (function() {
         var cache_td_ws = [];
         //thead tbody
         $('.chart-table .table-tbody').find('tr:first td').each(function() {
             var w = $(this).width();
             cache_td_ws.push(w);
         })
         $('.chart-table .table-thead').find('th').each(function(i,v) {
             $(this).width(cache_td_ws[i]);
         });
     })();
});
