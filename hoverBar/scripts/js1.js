(function($) {
    $(function() {
            var myPlayer = $("#myPlayer")[0],
                $playOrPause = $("#play_or_pause"),
                $previousSong = $("#previous_song"),
                $next_song = $("next_song"),
                $pbar0 = $("#pbar_0"),
                $pbar1 = $("#pbar_1"),
                $pbar2 = $("#pbar_2"),
                $pbarDot=$("#pbar_dot"),
                $duration = $("#duration"),
                $currentTime;
            $playOrPause.click(function() {
                // 播放键和暂停键功能设定；
                if (myPlayer.paused) {
                    myPlayer.play();
                    $playOrPause.removeClass("play")
                                .addClass("pause");
                } else {
                    myPlayer.pause();
                    $playOrPause.removeClass("pause")
                                .addClass("play");
                }
            });

            // 播放时播放条及播放时间的效果；
            myPlayer.oncanplaythrough = function() { //readystate==4时能完整播放音乐；


            };

            var isInitial = 0, //0代表没有初始化，1代表初始化过；
                timer1;
            myPlayer.addEventListener("play", function() { //歌曲播放时触发事件；
                var currentTime,
                    curTime,
                    duration = myPlayer.duration, //歌曲总时间
                    dura;
                dura = timeFormat(duration);
                if (isInitial == 0) {
                    $duration.html("<em id=\"currentTime\">00:00</em>/" + dura);
                    isInitial++;
                }
                $currentTime = $("#currentTime");
                timer1 = setInterval(function() {
                    curTime= myPlayer.currentTime; //歌曲当前时间；
                    currentTime = timeFormat(curTime);
                    console.log(percentage(curTime/duration));
                    $pbar2.css({"width":percentage(curTime/duration)});
                    $currentTime.text(currentTime);
                    if(currentTime==dura){  //当音乐到结尾时，清除计时器timer1；
                			isInitial = 0;                    
                			clearInterval(timer1);
                			timer1 = null;
                    }
                }, 500);
            });

            myPlayer.addEventListener("pause", function() {
                if (!myPlayer.ended) {
                    clearInterval(timer1);  
                }
                	//暂停时清除计时器防止播放时间闪跳及优化性能
            })

            myPlayer.addEventListener("ended", function() { //歌曲播放完成时触发，使暂停键变成播放键；
                $playOrPause.removeClass("pause")
                                .addClass("play");


            })

            // $pbarDot.drag(dragHandler,$pbarDot,$pbar0);
 // 在进度条被拖动时，播放时间也跟着变化；
    function dragHandler(e){
        // console.log($pbar2.offset().left);
        console.log(e.target);
        return false;
    }

        }) //$(document).ready();

    // 定义drag方法用来添加拖拽进度条事件处理；
    jQuery.fn.extend({
        drag:function(func,dragObj,containerObj){
                dragObj.mousedown(function(e){
                     containerObj.on("mousemove",func)
                        });                
                dragObj.mouseup(function(e){
                     containerObj.off("mousemove",func)
                        })}
    });




})(jQuery);




// 定义一个函数格式化时间为标准格式00:00；
function timeFormat(time) {
    var output, minute, second;
    minute = Math.floor(time / 60);
    second = Math.ceil(time % 60);
    if (minute < 10) {
        minute = "0" + minute;
    }
    if (second < 10) {
        second = "0" + second;
    }
    output = minute + ":" + second;
    return output;
}

// 定义一个函数使其把小数变成百分数；
	function percentage(number){
		return ((number*100).toFixed(2)+"%");
	}

