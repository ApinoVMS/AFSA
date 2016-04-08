angular.module('ContactsApp')
    .controller('ListController', function ($scope, Contact) {
        $scope.contacts = Contact.query();
        $scope.fields = ['ticker', 'news'];

        $scope.sort = function (field) {
            $scope.sort.field = field;
            $scope.sort.order = !$scope.sort.order;
        };

        $scope.sort.field = 'ticker';
        $scope.sort.order = false;
        
    });
