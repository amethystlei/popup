var $pop=[],demos={pop0:function(){$pop[0]=$.popUp()},pop1:function(){$pop[1]=$.popUp({closeClass:"btnClose",targetPrefix:"m-popup-",aniProperties:{popUp:{background:"red"}}})},pop2:function(){$pop[2]=$.popUp({tmpl:{closeClass:"btnClose",targetClass:"m-popup"}})},pop3:function(){$pop[3]=$.popUp({shade:!1,position:"left-center",tmpl:"hahahaha <h1>shit</h1> ugly"})},pop4:function(){$pop[4]=$.popUp({autoPop:!0,position:"bottom-center",animation:{popUp:function(p){var o=p.find(".pop-content");p.css({"z-index":2}),setTimeout(function(){o.css("-webkit-transform","translateY(0)")},0)},shade:function(p){p.css({display:"block",opacity:.8})}},destory:function(p){p.find(".pop-wrapper").attr("style","")}})}};demos.pop0(),demos.pop1(),console.log($pop[0]),console.log($pop.length);var val=0;$("#pops").on("change",function(){val=$(this).val()||0}).trigger("change"),$("button").on("click",function(){$pop&&$pop.length?$pop[val].pop():alert("shit, tell the poor man~")}),$(".close").on("click",function(){$(".pop-close").trigger("click")});