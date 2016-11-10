DWCAppModule.controller('jobIndexController', ['$scope','jobsFactory','$cookies', '$location', '$routeParams', function($scope, $cookies ,jobsFactory, $location, routeParams) {
/*
  THIS INDEX METHOD ACCESSES THE JobS FACTORY AND RUNS THE JobS INDEX.
  WE MIGHT RE USE INDEX A FEW TIMES, SO TO MINIMIZE REPETITION WE SET IT AS A VARIABLE.
*/
  var logged_in_user = $cookies.get('logged_user');
  $scope.firstName = $cookies.get("firstName");
  $scope.userLevel = $cookies.get("userLevel");
  $scope.lastName = $cookies.get("lastName");
  $scope.emailAddress = $cookies.get("emailAddress");
  console.log(firstName, userLevel, lastName, emailAddress,  "these are the cookie values");
  if(!logged_in_user){
    $location.url('/staff/login')
  }

  $scope.index = function(){
      jobsFactory.getAllJobs(function(returnedData){
          $scope.jobs = returnedData;
      });
  };
  $scope.delete = function(job_id){
      jobsFactory.deleteJob(job_id, function(){
      });
      $scope.index();
  };
  $scope.index();

  $scope.logout = function(){
		$cookies.remove('logged_user');
		$location.url('/staff/login');
	}
/*
  OUR $scope.create function goes here <-- $scope because we need to access this method
  with ng-submit or ng-click (from the form in the previous assignment).
  Want to all of the jobs when we get back?  We can re-run index.
*/

}]);
