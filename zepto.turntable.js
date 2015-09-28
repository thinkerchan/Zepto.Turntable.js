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
			$showArea = $(_this.args.showArea),
			$ctrlArea = $(_this.args.ctrlArea),
			$counts = $ctrlArea.children().length,
			$dots = $ctrlArea.children(),	//小圆点个数
			_ctrlArea = _this.args.ctrlArea, //缓存读取
			_radius = _this.args.radius,	//大圆半径
			_angle = 360/$counts,	//单个扇形角度
			navDotIdx=1,
			curAngle=0,
			curDot=0,
			targetDot=0,
			isLock=false;
			//设置大圆边长
			$ctrlArea.width(_radius*2);
			$ctrlArea.parent().width(_radius*2);
			$ctrlArea.height(_radius*2);
			$ctrlArea.parent().height(_radius*2);
			//给小圆点定位
			$dots.each(function(index){
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
			$dots.eq(0).addClass('active');
			//判断
			function swipes(direction){
				if(direction==="right"){
					navDotIdx+=1;
					curAngle-=_angle;
					if(navDotIdx>$counts) {
						navDotIdx=1;
					}
				} else if(direction==="left"){
					navDotIdx-=1;
					curAngle+=_angle;
					if(navDotIdx<1){
						navDotIdx=$counts;
					}
				}
			  // 每转一次
			  $ctrlArea.css({
			  	"-webkit-transform":"rotate("+curAngle+"deg)",
			  	"transform":"rotate("+curAngle+"deg)"
			  });
			  $dots.eq(navDotIdx-1).addClass("active").siblings().removeClass("active");
			}
			// 转动，这个部分需要优化
			$(document).on("touchstart",_ctrlArea,function(e){
				curDot=e.touches[0].pageX;
			},false).on("touchmove",_ctrlArea,function(e){
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
			}).on("webkitTransitionEnd",_ctrlArea,function(e){
				e.stopPropagation();
				isLock=false;
				var _index=$(_ctrlArea +' .active').index();
				$showArea.children().eq(_index).show().siblings().hide();
			});
		}
		};
		// 入口
		window.Turntable = function(arg) {
			var rolling = new Rolling(this,arg);
			return rolling.builder();
		}
	})($,window,document);