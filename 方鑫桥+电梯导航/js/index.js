//等待页面dom标签元素加载完毕
$(function(){
    //控制电梯导航的显示和隐藏
    //获取高度
    var toolTop = $(".recommend").offset().top;
    //定义函数(切换工具函数)
    function toggleTool(){
        //判断滚动条是否拉倒大于或则等于推荐模块的高度
        if ($(document).scrollTop() >= toolTop){
            //如果是将侧边菜单栏嵌入
            $(".fixedtool").fadeIn();
        }else{
            //如果滚动条低于推荐模块高度，将侧边导航隐藏
            $(".fixedtool").fadeOut();
        }
    }
    //重新函数调用
    toggleTool();
    //时刻监听滚动条滚动事件，然后进行检测滚动条的高度
    $(window).scroll(function(){
        //调用自定义滚动条判断函数，确定是显示还是隐藏
        toggleTool();
    });

    //当用户点击电梯导航上的选择的时候，需要让页面滚动到对应的内容区域(商品区域)，并且将被点击的选项的背景颜色切换为红色。
    //互斥锁(地狱变量flag表示页面滚动状态还是滚动结束了，当true表示滚动结束拉，当false表示还在滚动)
    var flag = true;
    //绑定电梯导航被点击事件
    $(".fixedtool li").click(function(){
        //将页面状态修改为滚动状态
        flag = false;
        //规律；菜单根内容快的位置顺序是一一对应的(根据菜单的索引，计算页面要去往的位置)
        //当前的内容区域的下标
        var index = $(this).index();
        //获取对应下标的内容与高度top值(距离顶部的位置)
        var current = $(".floor .w").eq( index ).offset().top;
        //利用动画效果实现滚动
        $("body,html").stop().animate({
            scrollTop:current   //滚动到对应距离顶部位置
        },function(){
            flag = true;     //动画结束，将页面状态修改为滚动结束
        });
        //修改侧边菜单的背景颜色(单击之后给i标签添加类名为current)
        $(this).addClass("current").siblings().removeClass();

        //当点击对应的电梯导航菜单，实现滚动到对应的分类商品区域
        //监听页面滚动事件
        $(window).scroll(function(){
            //是否需要控制侧边菜单显示显示还是隐藏
            toggleTool();

            //当一页面滚动的时候，激活对应的侧边菜单导航的选项
            if (flag){
                //遍历所有的内容区域div判断
                $(".floor .w").each(function(i,el){
                    //如果当前页面文档距离顶部的位置已经大于或则等于某个商品区域div
                    if ($(document).scrollTop() >= $(el).offset().top){
                        //将对应的菜单上背景颜色，其他踩点去除current样式
                        $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
                    }
                });
            }
        });
    });
});