'use strict';

angular.module('myApp.signUp', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signUp', {
    templateUrl: 'signUp/signUp.html',
    controller: 'SignUpController'
  });
}])

.controller('SignUpController', ['$scope', '$http', function(scope, http) {

  scope.emailExists = "false";

  scope.defaultValues = {firstName: "", lastName: "", email: "", password: ""};

  //scope.listUsers = [{firstName: "Jean", lastName: "Doe", email: "jeandoe@gmail.com", password: "12dmmtg2"}];
  http.get('users/users.json').then(function(data){
    scope.listUsers = data.data;
  }
  );
  scope.reset = function(){
    scope.user = angular.copy(scope.defaultValues);
  };

  scope.saveUser = function(){

    var chars;
    chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMENOPQRSTUVWXYZ1234567890';
    var pass = "";

    for (var j=0; j<8; j++) {
       var i;
       i = Math.floor(Math.random() * chars.length);
       pass += chars.charAt(i);
    }

    var res;
    res = false;
    res = scope.listUsers.some(function(value) {
          return value.email === scope.user.email;
        }
    );

    if (!res){
      scope.user.password = pass;
      scope.listUsers.push({firstName: scope.user.firstName, lastName: scope.user.lastName, email: scope.user.email, password: scope.user.password});
      http.post('users/users.json', scope.listUsers).then(function(data){

         scope.message = data;
      });
    } else {
      scope.emailExists = "true";
      scope.message = "This email address is already registered.";
    }

   // scope.user = angular.copy(scope.defaultValues);


  };


}]);