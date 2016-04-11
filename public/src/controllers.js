angular.module('ContactsApp')
    .controller('ListController', function ($scope, Contact, $location) {
        $scope.contacts = Contact.query();
        $scope.fields = ['ticker', 'earnings', 'news', 'accumLoss'];

        $scope.sort = function (field) {
            $scope.sort.field = field;
            $scope.sort.order = !$scope.sort.order;
        };

        $scope.sort.field = 'ticker';
        $scope.sort.order = false;

        $scope.show = function (id) {
            $location.url('/contact/' + id);
        };
    })
    .controller('NewController', function ($scope, Contact, $location) {
        $rootScope.PAGE = "new";
        $scope.contact = new Contact({
            ticker: ['', 'text'],
            itype: ['', 'text'],
            position: ['', 'text'],
            earnings: ['', 'date'],
            news: ['', 'url'],
            accumLoss: ['', 'text'],
            secondLevelStrength: ['', 'text'],
            hover: ['', 'text']
        });

        $scope.save = function () {
            if ($scope.newContact.$invalid) {
                $scope.$broadcast('record:invalid');
            } else {
                $scope.contact.$save();
                $location.url('/contacts');
            }
        };
   
        
    }).controller('SingleController', function ($scope, $location, Contact, $routeParams) {
        console.log("$routeParams.id="+$routeParams.id);
        $scope.contact = Contact.get({ id: parseInt($routeParams.id, 10) }); 
        $scope.delete = function () {
            $scope.contact.$delete();
            $location.url('/contacts');
        };
    });
