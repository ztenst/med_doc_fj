angular.module('controller',[])
.controller('quanList',function($scope,Api) {
    Api.getVideoList().then(function(obj) {
        return obj.data.data;
    }).then(function(data) {
        $scope.data = data;
    })
})
.controller('quanDetail',function($scope,$stateParams,Api) {
    var id = $stateParams.id;
    Api.getVideoInfo({
        id : id
    }).then(function(obj) {
        return obj.data.data;
    }).then(function(data) {
        $scope.data = data;
    });
})
.controller('themeList',function($scope,$stateParams,Api) {
    var id = $stateParams.id;
    var param = id ? {
        vid : id
    } : {
        sort : 1
    };
    Api.getTopicList(param).then(function(obj) {
        return obj.data.data;
    }).then(function(data) {
        $scope.data = data;
        console.log(data);
    })
})
.controller('themeDetail',function($scope,$stateParams,Api) {
    var id = $stateParams.cid;
    $scope.global = {
        last_comment_id : -1,
        last_second_id : -1,
        isFinished : false,
        sort : 1
    }
    $scope.topic = {
        id : id
    };
    //获得主题详情
    Api.getTopicInfo({
        id : id
    }).then(function(obj) {
        return obj.data.data;
    }).then(function(data) {
        $scope.data = data;
        $scope.global.isFinished = true;
    })

    getCommentList();
    function getCommentList(){
        //获取评论列表
        Api.getCommentList({
            id : id,
            sort : $scope.global.sort
        }).then(function(obj) {
            return obj.data.data;
        }).then(function(data) {
            $scope.comment = data;
            resize();
        });
    }

    //设置热度
    $scope.fn_setSort = function(sort) {
        $scope.global.sort = sort;
        getCommentList();
    }
    function resize(){
        //$(['ui-scroll']).getNiceScroll().resize();
    }
    //设置id
    $scope.fn_setIds = function(x,y) {
        var second_id = x.id;
        var comment_id = y && y.id;
        var global = $scope.global;
        if(x.openComment && second_id == global.second_id && comment_id == global.comment_id){
            x.openComment = false;
        }else{
            x.second_id = second_id;
            x.comment_id = comment_id;
            x.openComment = true;
            if(y){
                x.touser = '@' + y.namea + ' ';
                x.reply = x.touser;
            }else{
                x.reply = '';
                x.touser = '';
            }
            global.comment_id = comment_id;
            global.second_id = second_id;
        }
        resize();
    }
    //发布评论
    $scope.fn_addComment = function(_x) {
        var x = angular.copy(_x);
        x.reply = x.reply.replace(x.touser,'');
        Api.addComment({
            content : x.reply,
            image : x.image,
            major_id : x.id,
            comment_id : x.comment_id,
            uid : 2045,
            second_id : x.second_id
        }).then(function(obj) {
            //刷新评论列表
            console.log(obj);
            getCommentList();
        })
    }
    //显示主题
    $scope.fn_showTopicComment = function() {
        if($scope.topic.isTopicComment){
            $scope.topic.isTopicComment = false;
        }else{
            $scope.topic.isTopicComment = true;
        }
        resize();
    }
    //评论主题
    $scope.fn_addTopicComment = function() {
        var topic = $scope.topic;
        Api.addComment({
            content : topic.content,
            image : topic.image,
            major_id : topic.id,
        }).then(function(obj) {
            resetTopic();
            getCommentList();
        })
    };

    function resetTopic(){
        $scope.topic = {
            id : id
        };
    }
    //对评论点赞
    $scope.fn_zan = function(x) {
        Api.addPraise({
            aid : x.id,
            uid : 2045
        }).then(function(obj) {
            console.log(obj);
        })
    }

})
.controller('themeWrite',function($scope,Api,$stateParams,$state) {
    var id = $stateParams.id;
    $scope.write = {
        uid : 2045,
        mid : id
    };
    $scope.fn_addTopic = function(){
        Api.addTopic($scope.write).then(function(obj) {
            alert(obj.data.msg);
            $state.go('detail',{
                id : id
            },{
                'location' : 'replace',
                'reload' : true
            })
        })
    };
})
