src = "https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"

var myApp = angular.module('myModule', ["ngRoute", 'ngResource'])

myApp.config(function ($routeProvider) {
    $routeProvider

        .when("/getUser", {
            templateUrl: "html/getUser.html",
            controller: "getUserController"
        })
        .when("/addUser", {
            templateUrl: "html/addUser.html",
            controller: "addUserController"
        })
        .when("/updateUser", {
            templateUrl: "html/updateUser.html",
            controller: "updateUserController"
        })
        .when("/delUser", {
            templateUrl: "html/delUser.html",
            controller: "delUserController"
        })

});

myApp.controller("getUserController", function ($scope, $http) {
    
    $scope.name = null;
    $scope.getUser = function getUser() {
        $scope.p1 = "Name";
        $scope.p2 = "Number"
        $scope.p3 = "City"
        var data = {
            name: $scope.name
        };
        $http.get('/api/dir/all', JSON.stringify(data))
                .then(function (response) {
                    if (response.data != null) {
                        console.log(response.data)
                        $scope.user = response.data[0]
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
    }

})

myApp.controller('addUserController', function ($scope, $http) {


    $scope.name = null;
    $scope.tel = null;
    $scope.city = null;

    $scope.addUser = function () {
        var data = {
            tel: $scope.tel,
            name: $scope.name,
            city: $scope.city,
        }

        if (data.name != undefined || data.name != null) {

            $http.post('/api/dir/new', JSON.stringify(data))
                .then(function (response) {
                    if (response.data != null) {
                        $scope.msg = "User added successfully"
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }
})

myApp.controller("updateUserController", function ($scope, $http) {

    $scope.name = null;
    $scope.city = null;
    $scope.tel = null;

    $scope.updateUser = function () {
        var data = {
            name: $scope.name,
            city: $scope.city,
            tel: $scope.tel
        }

        if (data.name != undefined || data.name != undefined) {
            $http.put('/api/dir/update', JSON.stringify(data))
                .then(function (response) {
                    if (response.data != null) {
                        $scope.msg = "User's info updated successfully"
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }
}

)

myApp.controller("delUserController", function ($scope, $http) {
    $scope.name = null;
    
    $scope.delUser = function () {
        var data = {
            name: $scope.name
        }

        if (data.name != null || data.name != undefined) {
            $http.delete('/api/dir/del', JSON.stringify(data))
                .then(function (response) {
                    if (response.data != null) {
                        $scope.msg = response.data
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }
})



myApp.controller("homeController", function ($scope, $location) {

    $scope.getUser = function getUser() {
        $location.path("/getUser");
    }
    $scope.addUser = function addUser() {
        $location.path("/addUser");
    }
    $scope.updateUser = function update() {
        $location.path("/updateUser")
    }
    $scope.delUser = function delUser() {
        $location.path("/delUser");
    }

})
