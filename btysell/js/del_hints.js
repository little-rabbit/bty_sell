    // 删除提示框


    /*
    *根据当前页面与滚动条位置，设置提示对话框的Top与Left
    */
    function showDialog() {
        var objW = $(window); //当前窗口
        var objC = $(".dialog"); //对话框
        var brsW = objW.width();
        var brsH = objW.height();
        var sclL = objW.scrollLeft();
        var sclT = objW.scrollTop();
        var curW = objC.width();
        var curH = objC.height();
        //计算对话框居中时的左边距
        var left = sclL + (brsW - curW) / 2;
        //计算对话框居中时的上边距
        var top = sclT + (brsH - curH) / 2;
        //设置对话框在页面中的位置
        objC.css({ "left": left, "top": top });

        $('body').addClass('ovfHiden'); //使网页不可滚动
    }

    $(window).resize(function() {//页面窗口大小改变事件
        if (!$(".dialog").is(":visible")) {
            return;
        }
        showDialog(); //设置提示对话框的Top与Left
    });

    $("body").scroll(function() {
    	if (!$(".dialog").is(":visible")) {
            return;
        }
        showDialog(); //设置提示对话框的Top与Left
	});

    $("#Button3").click(function() {//注册取消按钮点击事件
        $(".dialog").fadeOut(150);
        $(".mask").fadeOut(100);
        $('html,body').removeClass('ovfHiden'); //使网页恢复可滚
    })

    $(".mask").click(function() {//点击背景弹框消失
        $(".dialog").fadeOut(150);
        $(".mask").fadeOut(100);
        $('html,body').removeClass('ovfHiden'); //使网页恢复可滚
    })

    // 取消订单提示
    $(".cancel_order").click(function() { //注册删除按钮点击事件
        $(".mask").fadeIn(100); //显示背景色
        showDialog(); //设置提示对话框的Top与Left
        $(".dialog").fadeIn(150); //显示提示对话框
    })

    $("#cancel_btn").click(function() {//注册确定按钮点击事件
        $(".dialog").fadeOut(150);
        $(".mask").fadeOut(100);
        $('body').removeClass('ovfHiden'); //使网页恢复可滚
        /*这里写确定后的要执行的事件*/


    });


    // 删除地址提示
    $(".add_remove").click(function() { //注册删除按钮点击事件
        $(".mask").fadeIn(100); //显示背景色
        showDialog(); //设置提示对话框的Top与Left
        $(".dialog").fadeIn(150); //显示提示对话框
    })

    $("#remove_add").click(function() {//注册确定按钮点击事件
        $(".dialog").fadeOut(150);
        $(".mask").fadeOut(100);
        $('body').removeClass('ovfHiden'); //使网页恢复可滚

    	/*这里写确定后的要执行的事件*/

    });


	// 点击确定删除收藏夹商品
   /* $(".favorite_del_btn").click(function()*/
    function deleteEnshrine(id){ 
		var s_index = $(this).parent().index();

        $(".mask").fadeIn(100); 
        showDialog(); 
        $(".dialog").fadeIn(150); 

        $("#remove_sc").click(function() {
        	$(".favorite_list li").eq(s_index).remove();
	        $(".dialog").fadeOut(150);
	        $(".mask").fadeOut(100);
	        $('body').removeClass('ovfHiden'); 

	    	/*这里写确定后的要执行的事件*/
	        $.ajax({
				type : "post",
				url : pro+"/person/delEnshrine?pro_id=" + id,
				async : false,
				success : function(data){
					if(data == "0"){
						/*alert("取消成功");*/
						location.reload();
					}else{
						alert("删除失败");
					}
				}
			});
			return false;
	    });
    };


    // 删除订单

    $(".order_del_btn").click(function() { 

        $(".mask").fadeIn(100); 
        showDialog(); 
        $(".dialog").fadeIn(150);

        $("#del_order_btn").click(function() {
            $(".dialog").fadeOut(150);
            $(".mask").fadeOut(100);
            $('body').removeClass('ovfHiden'); 

            /*这里写点击确定后的要执行的事件*/

        });
    });