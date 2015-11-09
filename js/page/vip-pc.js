/**
* Author: [huyinghuan](xiacijian@163.com)
* Date: 2015.11.10
* Desc: VIP开通购买逻辑
**/
H.ready(['jquery'], function() {
	jQuery(function($) {
      var $nowCoins = $("div.vip-pc-buy #cal_nowCoins");
      var $needCoins = $("div.vip-pc-buy #cal_needCoins");
      var $buyDays = $("div.vip-pc-buy #cal_days");
      //判断米币
      var judgeCoinsEnough = function(){
        var nowCoin = parseInt($nowCoins.val()) || 0;
        var needCoins = parseInt($needCoins.val()) || 0;
        if(needCoins === 0){return;}
        //米币不足,提示
        if(nowCoin < needCoins){
          $("div.vip-pc-buy div.m-msg").show();
          return false;
        }
        $("div.vip-pc-buy div.m-msg").hide();
        return true;
        
      }
      
      $("div.vip-pc-buy .m-days").find('label').click(function(){
        
        //设置所需米币隐藏字段
        $needCoins.val($(this).data('need_coins'));
        
        //切换样式
        $(this).addClass('on')
          .siblings('label').removeClass('on')
          .find("input:radio[name=days]").attr('checked', false);
        
        //选中单选按钮
        $(this).find("input:radio[name=days]").attr('checked', true);
        $buyDays.val($(this).find("input:radio[name=days]").val())
        judgeCoinsEnough();
      });
      
      $submitForm = $("form#buygroupform_")
      
      $('div.vip-pc-buy button#editsubmit_btn').click(function(){
        //判断米币不足
        if(!judgeCoinsEnough()){return;}
        //提交表单
        var url = $submitForm.attr('action')
        var data = {
          days: $buyDays.val()
        }
        
        $submitForm.find('input').each(function(){
          data[$(this).attr('name')] = $(this).val()
        })
        
        console.log(url, data)
        
        $.post(url, data, function(){
          console.log(arguments)
        });
      });
      
	})
    
})