angular.module('myApp',['ui.router','controller','directive','factory','filter','ct.ui.router.extras'])
    .config(function($httpProvider,$stateProvider,$urlRouterProvider,$sceDelegateProvider) {
        // Use x-www-form-urlencoded Content-Type
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        /**
        * The workhorse; converts an object to x-www-form-urlencoded serialization.
        * @param {Object} obj
        * @return {String}
        */ 
        var param = function(obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
              
            for(name in obj) {
              value = obj[name];
                
              if(value instanceof Array) {
                for(i=0; i<value.length; ++i) {
                  subValue = value[i];
                  fullSubName = name + '[' + i + ']';
                  innerObj = {};
                  innerObj[fullSubName] = subValue;
                  query += param(innerObj) + '&';
                }
              }
              else if(value instanceof Object) {
                for(subName in value) {
                  subValue = value[subName];
                  fullSubName = name + '[' + subName + ']';
                  innerObj = {};
                  innerObj[fullSubName] = subValue;
                  query += param(innerObj) + '&';
                }
              }
              else if(value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }
              
            return query.length ? query.substr(0, query.length - 1) : query;
        };

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function(data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
        $httpProvider.interceptors.push('myInterceptor');

        $urlRouterProvider.otherwise('/quan');

        $sceDelegateProvider.resourceUrlWhitelist(['*']);

        $stateProvider.state('quan',{
            sticky:true,
            url : '/quan',
            views : {
                'quanList@' : {
                    templateUrl : 'tpl/main-quanList.html',
                    controller : 'quanList'
                }
            }
        })
        .state('quan.detail',{
            url : '/detail?id',
            views : {
                'quanDetail@' : {
                    templateUrl : 'tpl/main-quanDetail.html',
                    controller : 'quanDetail'
                },
                'themeList@' : {
                    templateUrl : 'tpl/side-themeList.html',
                    controller : 'themeList'
                }
            }
        })
        .state('quan.detail.themedetail',{
            url : '/themedetail?cid',
            views : {
                'themeDetail@' : {
                    templateUrl : 'tpl/side-themeDetail.html',
                    controller : 'themeDetail'
                }
            }
        })
        .state('quan.detail.themewrite',{
            url : '/themewrite',
            views : {
                'themeWrite@' : {
                    templateUrl : 'tpl/side-themeWrite.html',
                    controller : 'themeWrite'
                }
            }
        })
   })
    .run(function($rootScope,$timeout,$state,$window) {
        $rootScope.is_view_show = function(view) {
            return $state.current.views && !!$state.current.views[view];
        };
        $rootScope.is_showDetail = function() {
            return $state.includes('quan.detail');
        }
        $rootScope.fn_back = function() {
            $window.history.back();
        }
        $rootScope.is_showThemeWrite = function() {
            return $state.is('quan.detail');
        };
    });
angular.bootstrap(document,['myApp']);
