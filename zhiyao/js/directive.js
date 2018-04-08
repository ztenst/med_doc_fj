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
.directive('uiUpload',function() {
    return {
        scope : {
            'image' : '='
        },
        link : function(scope,element,attr) {
            var domain = 'oofuaem2b.bkt.clouddn.com';
            var uploader = Qiniu.uploader({
                runtimes: 'html5,flash,html4',      // 上传模式，依次退化
                browse_button: element[0],         // 上传选择的点选按钮，必需
                // 在初始化时，uptoken，uptoken_url，uptoken_func三个参数中必须有一个被设置
                // 切如果提供了多个，其优先级为uptoken > uptoken_url > uptoken_func
                // 其中uptoken是直接提供上传凭证，uptoken_url是提供了获取上传凭证的地址，如果需要定制获取uptoken的过程则可以设置uptoken_func
                // uptoken : '<Your upload token>', // uptoken是上传凭证，由其他程序生成
                uptoken_url: CONFIG.host + '/api/image/qnUpload',         // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
                // uptoken_func: function(file){    // 在需要获取uptoken时，该方法会被调用
                //    // do something
                //    return uptoken;
                // },
                get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
                // downtoken_url: '/downtoken',
                // Ajax请求downToken的Url，私有空间时使用，JS-SDK将向该地址POST文件的key和domain，服务端返回的JSON必须包含url字段，url值为该文件的下载地址
                unique_names: true,              // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
                // save_key: true,                  // 默认false。若在服务端生成uptoken的上传策略中指定了sava_key，则开启，SDK在前端将不对key进行任何处理
                domain: domain,     // bucket域名，下载资源时用到，必需
                max_file_size: '100mb',             // 最大文件体积限制
                flash_swf_url: CONFIG.staticPath + './js/plupload/js/Moxie.swf',  //引入flash，相对路径
                max_retries: 3,                     // 上传失败最大重试次数
                dragdrop: true,                     // 开启可拖曳上传
                drop_element: 'container',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                chunk_size: '4mb',                  // 分块上传时，每块的体积
                auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
                //x_vars : {
                //    查看自定义变量
                //    'time' : function(up,file) {
                //        var time = (new Date()).getTime();
                          // do something with 'time'
                //        return time;
                //    },
                //    'size' : function(up,file) {
                //        var size = file.size;
                          // do something with 'size'
                //        return size;
                //    }
                //},
                init: {
                    'FilesAdded': function(up, files) {
                        plupload.each(files, function(file) {
                            // 文件添加进队列后，处理相关的事情
                        });
                    },
                    'BeforeUpload': function(up, file) {
                           // 每个文件上传前，处理相关的事情
                    },
                    'UploadProgress': function(up, file) {
                           // 每个文件上传时，处理相关的事情
                    },
                    'FileUploaded': function(up, file, res) {
                        var data = $.parseJSON(res);
                        var pic = 'http://' + domain + '/' + data.key;
                        scope.image = pic;
                        scope.$apply();
                    },
                    'Error': function(up, err, errTip) {
                           //上传出错时，处理相关的事情
                    },
                    'UploadComplete': function() {
                           //队列文件处理完毕后，处理相关的事情
                    }
                }
            });
        }
    }
})
.directive('uiPreview',function() {
    return {
        scope : {
            image : '='
        },
        link : function(scope,element,attr) {
           element.click(function() {
               $.fancybox.open([
                    {
                        src  : scope.image,
                        opts : {
                        }
                    },
                ], {
                    loop : false
                }); 
           })
        }
    }
});
