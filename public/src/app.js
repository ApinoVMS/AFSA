angular.module('ContactsApp', [])
    .run(function ($rootScope) {
        var maMsg= "Hello Arni, its app.js-$r00t[e]Scope.message";
        console.log(maMsg);
        $rootScope.message = maMsg;
         
    });
