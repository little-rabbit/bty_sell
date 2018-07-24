	// 购物车dom操作

	//定义全局变量
	var i=0;

	//金额总和
	var money=0;

	//计算合计价格
	var cart_money=new Object();

	//全部商品ID
	var cart_id=new Object();
	//备份商品ID，用于全选后去掉全选又再次全选
	var cart_id_copy=new Object();


   var noX = 0;  /* 没选中时点击加减计算数量  */
   var allThis = $(".commodity_list_term .select em"); /*底部全选*/
		/* 减  */
		function reduceMod(e,totalH,mod,noX){
			var tn = e.siblings().find(".qu_su").text(); /* 当前选中商品  */
			var tn1 = e.siblings().find(".zi").text(); /* 商品数量  */
			if(mod != 2){
				var Total = parseFloat(totalH) - (tn*tn1);	/* 总价格减该商品总数价格  */
	  			$("#total_price b").text(Total.toFixed(2));
			}else{
				/* 合计加单价-1 */
				var Total = parseFloat(totalH) - parseFloat(tn);	/* 总价格减该商品总数价格  */
	  			$("#total_price b").text(Total.toFixed(2));
			}
			
		};
		/* 加  */
		function plusMod(e,totalH,mod){
			var tn = e.siblings().find(".qu_su").text(); /* 当前选中商品  */
			var tn1 = e.siblings().find(".zi").text(); /* 商品数量  */
			if(mod != 2){
				var Total = parseFloat(totalH)+(tn*tn1);	/* 总价格加上该商品总数价格  */
	  			$("#total_price b").text(Total.toFixed(2));
			}else{
				/* 合计加单价+1 */
				var Total = parseFloat(totalH)+(parseFloat(tn)+(noX-1));	/* 总价格加上该商品总数价格  */
	  			$("#total_price b").text(Total.toFixed(2));
			}
			
		};
		/*全选该店商品价格 加*/
		function commodityPlusMod(e,totalH){
			var qu = e.parents(".commodity_list").find(".pitch_on").parent().find(".qu_su");
		var quj = e.parents(".commodity_list").find(".pitch_on").parent().find(".zi");
		var Total = 0;
		var erTotal = true;
		/* 该商品全部金额  */
		for(var i=0; i<qu.length; i++)
			{
				var n = qu.eq(i).text();
				var n1 = quj.eq(i).text();
				/*合计价格*/
				if(erTotal){
					Total = parseFloat(totalH) +(parseFloat(n)*parseFloat(n1));
					if(Total < 0)
						Total=0;
					erTotal = false;
				}else{
					Total = parseFloat(Total) + (parseFloat(n)*parseFloat(n1));
					if(Total < 0)
						Total=0;
				}
			}
		$("#total_price b").text(Total.toFixed(2)); /* 合计金额  */
		};
		var plus;
		/*全选商品价格 减*/
		function commodityReduceMod(e,totalH){
			var qu = e.parents(".commodity_list").find(".pitch_on").parent().find(".qu_su");
		var quj = e.parents(".commodity_list").find(".pitch_on").parent().find(".zi");
		var Total = 0;
		
		var erTotal = true;
		/* 该商品全部金额  */
		for(var i=0; i<qu.length; i++)
			{
				var n = qu.eq(i).text();
				var n1 = quj.eq(i).text();
				/*合计价格*/
				if(erTotal){
					Total = parseFloat(totalH) - (parseFloat(n)*parseFloat(n1));
					plus = parseFloat(n)*parseFloat(n1);
					if(Total < 0)
						Total=0;
					erTotal = false;
				}else{
					Total = parseFloat(Total) - (parseFloat(n)*parseFloat(n1));
					plus = parseFloat(n)*parseFloat(n1);
					if(Total < 0)
						Total=0;
				}
				
			}
		$("#total_price b").text(Total.toFixed(2)); /* 合计金额  */
		return plus;
		};
		/*全部商品价格*/
		function commodityWhole(){
			/* 合计金额  */
		var je = $(".commodity_box .select .qu_su"); /* 全部商品单价  */
		var je1 = $(".commodity_box .select .zi");  /* 全部商品数量  */
		var TotalJe = 0;
		for(var i=0; i<je.length; i++)
		{
			var n = je.eq(i).text();
			var n1 = je1.eq(i).text();
			TotalJe = TotalJe + (parseFloat(n)*parseFloat(n1));
			
		}
		$("#total_price b").text(TotalJe.toFixed(2)); /* 合计金额  */
		};

		//选择结算商品
		
		$(".commodity_list_term em").click(function(){
			var su = $(this).attr("aem");
			var carts_id=$(this).attr("cart_id");
			var totalH = $("#total_price b").text(); /* 合计金额  */
			if(su == 0){
				/* 单选商品  */
				if($(this).hasClass("pitch_on")){
					/*去底部全选*/
					$("#all_pitch_on").removeClass("pitch_on");
					$(this).removeClass("pitch_on");
					reduceMod($(this),totalH);
					cart_id[carts_id]="";
					delete cart_id[carts_id];
				}else{
					$(this).addClass("pitch_on");
					var n = $(this).parents("ul").children().find(".pitch_on");
					var n1 = $(this).parents("ul").children();
					plusMod($(this),totalH,0,noX);
					cart_id[carts_id]="";
					/*商品全部选中时*/
					var fot = $(".commodity_list_term .pitch_on");
					var fot1 = $(".commodity_list_term em");
					if(fot.length == fot1.length)
					$("#all_pitch_on").addClass("pitch_on");
				}
			}else{
				/* 全选该店铺  */
				if($(this).hasClass("pitch_on")){
					/*去底部全选*/
					$("#all_pitch_on").removeClass("pitch_on");
					$(this).removeClass("pitch_on");
					$(this).parent().siblings("ul").find("em").removeClass("pitch_on");
					commodityReduceMod($(this),totalH);
					delete cart_id[carts_id];
				}else{
					commodityReduceMod($(this),totalH);

					$(this).addClass("pitch_on");
					
					$(this).parent().siblings("ul").find("em").addClass("pitch_on");
					
					if(plus != NaN && plus != undefined){
						totalH = parseFloat(totalH)-parseFloat(plus);
					}
					
					commodityPlusMod($(this),totalH);
				cart_id[carts_id]="";
				}
			}

			
			//计算选择数值
			number();
			// 启动按钮
			selected();
		});	
		
		var bot = 0;
		
//		产品数量计算
		function number() {
			var num=0;
			// 	for(var key in cart_id){
				// 	num++;
				// }
			num = $(".commodity_list_term .pitch_on").length;
				//将选择的放入到计算里面
				$("#confirm_cart").html("结算("+num+")");
		}
		
//		全选函数
		function fnAllCheck(){
			if($(".commodity_list_term li").length>0){

			if(bot == 0){
				$("#all_pitch_on").addClass("pitch_on");
				allThis.removeClass("pitch_on");
				allThis.addClass("pitch_on");
				/*总价格*/
				commodityWhole();
				bot = 1;
				//重新加入属性对象
				for(var key in cart_id_copy){
					cart_id[key]="";
				}
			}else{
				$("#all_pitch_on").removeClass("pitch_on");
				allThis.removeClass("pitch_on");
				$("#total_price b").text("0");
				bot = 0;
				//移除全部对象
				for(var key in cart_id){
					delete cart_id[key];
				}
			}
			}else{
				return false;
			}

			//计算选择数值
			number();
			//计算总价格
			commodityWhole();
			// 启动按钮
			selected();
		}
		
		fnAllCheck();
		/* 点击底部全选按钮  */
		$(".all_check").click(function(){
			fnAllCheck();
		});
		
		/* 编辑商品  */
		var topb = 0;
		$("#rem_s").click(function(){
			
			if(topb == 0){
				$(this).text("完成");
				$(".total_amount").hide(); /* 合计  */
				$("#confirm_cart").hide(); /* 结算  */
				$("#confirm_cart1").show(); /* 删除 */
				$(".commodity_list_term li em").show();
				$(".commodity_list li .div_center").css({"width":"4.3rem"});
				$(".div_right").hide();
				$(".settlement .settle_box .all_check").show();
				$(".settlement .total_amount").css({"margin":0});
				allThis.removeClass("pitch_on"); /* 取消所有选择  */
				$("#all_pitch_on").removeClass("pitch_on"); /* 取消所有选择  */
				topb = 1;
			}else{
				topb = 0;
				$(this).text("编辑");
				$(".total_amount").show(); /* 合计  */
				$("#confirm_cart").show(); /* 结算  */
				$("#confirm_cart1").hide(); /* 删除 */
				$(".div_right").show();
				$(".commodity_list_term li em").hide();
				$(".commodity_list li .div_center").css({"width":"5rem"});
				$(".settlement .settle_box .all_check").hide();
				$(".settlement .total_amount").css({"margin-left":"136px"});
				fnAllCheck();
			}
			// 启动按钮
			selected();
		});
	/* 加减  */

	// 判断是否有商品被选中
	function selected(){
		var paynum = $(".commodity_list_term .pitch_on").length;
		
		if(paynum>0){
			$("#confirm_cart").removeClass("disabled");
			$("#confirm_cart1").removeClass("disabled");
		}else{
			$("#confirm_cart").addClass("disabled");
			$("#confirm_cart1").addClass("disabled");
		}
	}
	
	function reducew(obj){
		//减
		var $this = $(obj);
		var totalH = $("#total_price b").text(); /* 合计金额  */
		var ise = $this.siblings("span").text(); /*产品数量*/
		var gc_id = $this.siblings("input").val();
		if(noX <= 0){
			noX = 0;
		}else{
			noX--;
		};
		
		if(parseInt(ise) <= 1){
			$this.siblings("span").text("1");
		}else{
			var n =parseInt(ise)-1;
			$this.siblings("span").text(n);
			if($this.parent().parent().children("em").hasClass("pitch_on")){
				var mo = $this.parent().parent().children("em");
				reduceMod(mo,totalH,2,noX);
				noX=0;
			}
			
		}
		var proId=$this.parents("li").attr('id');
		var proCont=$this.siblings("span").text();
	      $.ajax({
				type : "post",
				url : pro + "/shop/upCount?proId=" + proId + "&count=" + proCont,
				async : false,
				success : function(data) {
					if (data == "1") {
						alert("更改数量成功")
						location.reload();
					}
				}
			});
	};
	
	function plusw(obj){
		//加
		var $this = $(obj);
		var totalH = $("#total_price b").text(); /* 合计金额  */
		var ise = $this.siblings("span").text();
		var gc_id = $this.siblings("input").val();
		var n =parseInt(ise)+1;
		noX++;
		
		$this.siblings("span").text(n);
		if($this.parent().parent().children("em").hasClass("pitch_on")){
			var mo = $this.parent().parent().children("em");
			plusMod(mo,totalH,2,noX);
			noX=0;
		}
		var proId=$this.parents("li").attr('id');
		var proCont=$this.siblings("span").text();
	      $.ajax({
				type : "post",
				url : pro + "/shop/upCount?proId=" + proId + "&count=" + proCont,
				async : false,
				success : function(data) {
					if (data == "0") {
						location.reload();
					}
				}
			});
	}
	
	
	 //删除购物车商品
	function big_cart_remove(){
		var prochecked=$(".commodity_list_term .pitch_on");
		var checkedId= "";
		for(var i=0;i<prochecked.length;i++){
			var aId=prochecked.eq(i).attr("id");
			checkedId += aId+",";  	
		}
		$(".commodity_list_term .pitch_on").parent().remove();
		$("#confirm_cart").html("结算("+"0"+")");
		commodityWhole();
		$(this).removeClass("pitch_on");
		allThis.removeClass("pitch_on");
		$("#total_price b").text("0");
		bot = 0;
		//删除后取消商品选中状态
		//$("#all_pitch_on").removeClass("pitch_on");
		// 启动按钮
		selected();
		$.ajax({
			type : "post",
			url : pro+"/shop/allRemovePro?checkedId="+checkedId,
			async : false,
			success : function(data){
				if(data == '1'){
					alert("删除订单失败！");
				}else if(data == '0'){
					location.reload();
				}
			}
		});
	} 
	
	// 点击确定 删除购物车商品
    $("#remove_cart_pro").click(function() {//注册确定按钮点击事件
        big_cart_remove();
        $(".dialog").hide(100);
        $(".mask").hide();
        $('body').removeClass('ovfHiden'); //使网页恢复可
    });

    $("#confirm_cart1").click(function() { //注册删除按钮点击事件
        var paynum = $(".commodity_list_term .pitch_on").length;

        if(paynum > 0){
        	$(".mask").show(); //显示背景色
            showDialog(); //设置提示对话框的Top与Left
            $(".dialog").show(); //显示提示对话框
		}else{
			return false;
		}
    })