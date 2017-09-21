var app = angular.module('todoApp',[]);

app.controller('blocksController',function($scope,$interval){
	
	// declare variables
	$scope.finish = 'none';
	$scope.wordLength = 14;
	$scope.currentTime = 0;
	$scope.blocksb = [
	{text:'a', done:false},
	{text:'n', done:false},
	{text:'g', done:false},
	{text:'t', done:false},
	{text:'y', done:false},
	{text:'f', done:false},
	{text:'3', done:false},
	{text:'c', done:false},
	{text:'7', done:false},
	{text:'u', done:false},
	{text:'4', done:false},
	{text:'z', done:false},
	{text:'w', done:false},
	{text:'r', done:false},
	{text:'o', done:false}
	];

	// bind with every character key
	$scope.addChar = function(block){
		block.done=!block.done;
		var a = true;
		angular.forEach($scope.blocksb, function(block1){
			if($scope.stdtext){
				if(!block1.done){
					if($scope.stdtext.indexOf(block1.text)>=0){
						a = false;
					}
				}else{
					if($scope.stdtext.indexOf(block1.text)<0){
						a = false;
					}
				}
			}
		});
		if(a){
			$scope.finish = 'block';
			$interval.cancel($scope.timer);

		}else{
			$scope.finish = 'none';
		}

	};



	// bind with start game button
	$scope.easyPlay = function(){
		$scope.easy = true;
		$scope.play();
	}

	$scope.hardPlay = function(){
		$scope.easy = false;
		$scope.play();
	}

	$scope.play = function(){
		
		// reset
		$scope.currentTime = 0;
		$scope.finish = 'none';
		$scope.stdtext = '';
		angular.forEach($scope.blocksb, function(block){
			block.done = false;
		});

		// randomize the gaming word
		for(var i=0;i<$scope.wordLength;i++){
			var idx = Math.ceil(Math.random()*($scope.blocksb.length-1));
			$scope.stdtext+=$scope.blocksb[idx].text;
		}

		// clear timer
		$interval.cancel($scope.timer);

		// set timer
		$scope.timer = $interval(function(){
			$scope.currentTime+=10;
			var minute = Math.floor($scope.currentTime/60/1000);
			var second = Math.floor($scope.currentTime%(60*1000)/1000);
			var millisecond = $scope.currentTime%(1000);
			$scope.stringTime = 	(minute<10?'0'+minute:minute)
						+':'+
						(second<10?'0'+second:second)
						+':'+
						(millisecond<100?'0'+ 
						 		(millisecond<10?'0'+millisecond:millisecond):millisecond);
		},10);
		
	};
});

app.filter('easyMode',function(){
	return function(text){
		if(text){
			var unique = '';

			for(var i=0; i<text.length; i++){

				var a = false;
				for(var j=0; j<unique.length; j++){
					if(text[i]==unique[j]){
						a = true;
						break;
					}
				}

				if(!a){
					unique+=text[i];
				}
			}
		}
		
		return unique;
	}
});


