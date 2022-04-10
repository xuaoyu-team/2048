
    	var animation = {
    		tasks:[], 
    		timer:null,
			times:10, 
			interval:1000/60,
			add:function(obj, top, left){
				
				
				if(this.timer){
					return false;
				}
				if(! obj){
					return false;
				}
				
				
				var t = (top - obj.offsetTop)/this.times;
				var l = (left - obj.offsetLeft)/this.times;
				
				
				var task = {
					topStep:t,
					leftStep:l,
					element:obj,	
					step:function(){
						var t = this.element.offsetTop;
						this.element.style.top = (t+ this.topStep )+"px";
						var l = this.element.offsetLeft;
						this.element.style.left = (l+ this.leftStep )+"px";		
					},
					clear:function(){
						this.element.style.top = "";
						this.element.style.left = "";
					}
				};
				this.tasks[this.tasks.length]=task; 
				return true;
			},
    		start:function(callback){
    			
    			if(this.timer){
    				return false;
    			}

				
				if(this.tasks.length==0){
					if(callback){
						callback();
					}
					return false;	
				}
				
				
				if(callback){
					this.callback = callback;
				}
				this.timer = setInterval(function(){
					
					
					
					for(var i=0; i<animation.tasks.length; i++){
						var task = animation.tasks[i];
						task.step();
					}
					
					animation.times--;
					if(animation.times < 0){
						animation.stop();
					}
				}, this.interval);
				return true;
    		},
    		stop: function(){
    			if(this.timer){
    				window.clearInterval(this.timer);
    				this.timer=null;
    				this.times=10;
    				
    			}
    			
    			
    			if(this.callback){
    				this.callback();
    			}
				for(var i=0; i<this.tasks.length; i++){
					var task = this.tasks[i];
					task.clear();
				}    			
				this.tasks = [];
    		},
    		callback:null 
    	};