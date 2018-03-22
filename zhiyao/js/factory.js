angular.module('factory',[])
.factory('Api',function($http) {
    return {
        //视频列表
        'getVideoList' : function(data) {
            var url = '/api/index/getVideoList';
            return $http.get(url,{
                'params' : data
            });
        },
        //视频详情
        'getVideoInfo' : function(data) {
            var url = '/api/index/getVideoInfo';
            return $http.get(url,{
                'params' : data
            })
        },
        //主题列表
        'getTopicList' : function(data) {
            var url = '/api/index/getTopicList';
            return $http.get(url,{
                'params' : data
            })
        },
        //主题详情
        'getTopicInfo' : function(data) {
            var url = '/api/index/getTopicInfo';
            return $http.get(url,{
                'params' : data
            })
        },
        //新增主题
        'addTopic' : function(data) {
            var url = '/api/index/addTopic';
            return $http.post(url,data);
        },
        //点赞
        'addPraise' : function(data) {
            var url = '/api/index/addPraise';
            return $http.post(url,data);
        },
        //增加点击量
        'addHits' : function(data) {
            var url = '/api/index/addHits';
            return $http.post(url,data);
        },
        //评论列表
        'getCommentList' : function(data) {
            var url = '/api/index/getCommentList';
            return $http.get(url,{
                'params' : data
            })
        },
        //新增评论
        'addComment' : function(data) {
            var url = '/api/index/addComment';
            return $http.post(url,data);
        }
    }
})
.factory('myInterceptor', function($q) {
    window.CONFIG = window.CONFIG || {};
    var domain = CONFIG.host || 'http://doc.madridwine.cn';
    var staticPath = CONFIG.staticPath || '';
    var interceptor = {
    'request': function(config) {
        if(config.url.slice(1,4) === 'api'){
            config.url = domain + config.url;
        }
        if(config.url.slice(0,3) === 'tpl'){
            config.url = staticPath + config.url;
        }
    // 成功的请求方法
    return config; // 或者 $q.when(config);
    },
    'response': function(response) {
    // 响应成功
    return response; // 或者 $q.when(config);
    },
    'requestError': function(rejection) {
    // 请求发生了错误，如果能从错误中恢复，可以返回一个新的请求或promise
    return response; // 或新的promise
    // 或者，可以通过返回一个rejection来阻止下一步
    // return $q.reject(rejection);
    },
    'responseError': function(rejection) {
    // 请求发生了错误，如果能从错误中恢复，可以返回一个新的响应或promise
    return rejection; // 或新的promise
    // 或者，可以通过返回一个rejection来阻止下一步
    // return $q.reject(rejection);
    }
    };
    return interceptor;
})
