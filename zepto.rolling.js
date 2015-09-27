;(function($,window,document,undefined) {
	var Rolling = function(ele,obj){
		this.$element = ele;
		this.defaults = {};
		this.args = $.extend({}, this.defaults, obj);
	}
	Rolling.prototype = {
		consturctor:Rolling,
		builder:function(){
			var	_this=this,
			_counts = $(_this.args.ctrlArea).children().length,
			_dots = $(_this.args.ctrlArea).children(),	//小圆点个数
			_radius = _this.args.radius,
			_angle = 360/_counts,	//单个扇形角度
			navDotIdx=1,
			curAngle=0,
			curDot=0,
			targetDot=0,
			isLock=false;
				//设置大圆边长
				$(_this.args.ctrlArea).width(_radius*2);
				$(_this.args.ctrlArea).parent().width(_radius*2);
				$(_this.args.ctrlArea).height(_radius*2);
				$(_this.args.ctrlArea).parent().height(_radius*2);
				//给小圆点定位
				$(_dots).each(function(index){
					$(this).css({
						'width':_this.args.sideLen,
						'height':_this.args.sideLen,
						'marginLeft':-0.5*_this.args.sideLen,
						'marginTop':-0.5*_this.args.sideLen,
						'position':'absolute',
						'top':'50%',
						'left':'50%',
						'-webkit-transform':'rotate('+index*_angle+'deg) translateY('+ (-_radius)+'px);',
						'transform':'rotate('+index*_angle+'deg) translateY('+ (-_radius)+'px);'
					})
				});
				//默认第一个小圆加active
				_dots.eq(0).addClass('active');
				//判断
				function swipes(direction){
					console.log('swiping...');
					if(direction==="right"){
						navDotIdx+=1;
						curAngle-=_angle;
						if(navDotIdx>_counts) {
							navDotIdx=1;
						}
					} else if(direction==="left"){
						navDotIdx-=1;
						curAngle+=_angle;
						if(navDotIdx<1){
							navDotIdx=_counts;
						}
					}
				  // 每转一次
				  $(_this.args.ctrlArea).css({
				  	"-webkit-transform":"rotate("+curAngle+"deg)",
				  	"transform":"rotate("+curAngle+"deg)"
				  });
				  _dots.eq(navDotIdx-1).addClass("active").siblings().removeClass("active");
				}
				// 转动，这个部分需要优化
				$(_this.args.ctrlArea).bind("touchstart",function(e){
					curDot=e.touches[0].pageX;
				},false).bind("touchmove",function(e){
					e.preventDefault();
					e.stopPropagation();
					if(isLock) return;
					targetDot=e.touches[0].pageX;
					if(targetDot-curDot>0){
						swipes("left");
						isLock=true;
					} else if(targetDot-curDot<0){
						swipes("right");
						isLock=true;
					}
				}).bind("webkitTransitionEnd",function(e){
					e.stopPropagation();
					isLock=false;
					var _index=$(_this.args.ctrlArea +' .active').index();
					$(_this.args.showArea).children().eq(_index).show().siblings().hide();
				});
			}
		};
		// 入口
		window.Turntable = function(arg) {
			var rolling = new Rolling(this,arg);
			return rolling.builder();
		}
	})($,window,document);