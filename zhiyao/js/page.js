var myApp = angular.module('myApp',['ui.router','controller','directive','factory','filter'])
.run(function($rootScope) {
    console.log('helloWorld');
})
angular.bootstrap(document,['myApp']);
