angular.module('directive',[])
.directive('uiScroll',function() {
    return {
        link : function(scope,element,attr) {
            //var wh = $(window).height();
            //element.css('max-height',wh);
            //element.niceScroll({
                //cursorwidth:12,
                //cursoropacitymin:0.4,
                //cursorcolor:'#6e8cb6',
                //cursorborder:'none',
                //cursorborderradius:4,
                //autohidemode:'leave',
                //preservenativescrolling : false
            //})
            //$(window).resize(function() {
                //var wh = $(window).height();
                //element.css('max-height',wh);
                //element.getNiceScroll().resize();
            //})
        }
    }
})
