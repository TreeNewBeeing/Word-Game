

angular.module('todoApp',[]).controller('blocksController',function($interval){
	
	// declare variables
	var blocks  = this;
	this.finish = 'none';
	this.wordLength = 14;
	this.currentTime = 0;
	this.blocksb = [
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
	this.addChar = function(block){
		block.done=!block.done;
		var a = true;
		angular.forEach(blocks.blocksb, function(block1){
			if(blocks.stdtext){
				if(!block1.done){
					if(blocks.stdtext.indexOf(block1.text)>=0){
						a = false;
					}
				}else{
					if(blocks.stdtext.indexOf(block1.text)<0){
						a = false;
					}
				}
			}
		});
		if(a){
			blocks.finish = 'block';
			$interval.cancel(blocks.timer);

		}else{
			blocks.finish = 'none';
		}

	};


	// bind with start game button
	this.play = function(){
		
		// reset
		blocks.currentTime = 0;
		blocks.finish = 'none';
		blocks.stdtext = '';
		angular.forEach(this.blocksb, function(block){
			block.done = false;
		});

		// randomize the gaming word
		for(var i=0;i<blocks.wordLength;i++){
			var idx = Math.ceil(Math.random()*(blocks.blocksb.length-1));
			blocks.stdtext+=blocks.blocksb[idx].text;
		}

		// clear timer
		$interval.cancel(blocks.timer);

		// set timer
		blocks.timer = $interval(function(){
			blocks.currentTime+=10;
			var time = new Date(blocks.currentTime);
			blocks.stringTime = (time.getMinutes()<10?'0'+time.getMinutes() :  time.getMinutes())
						 		+':'+
						 		(time.getSeconds()<10?'0'+time.getSeconds() : time.getSeconds())
						 		+':'+
						 		(time.getMilliseconds()<100?'0'+ 
						 		(time.getMilliseconds()<10?'0'+time.getMilliseconds(): time.getMilliseconds())
						 		: time.getMilliseconds());
		},1);
		
	};

	



});
