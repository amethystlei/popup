var $pop = [];

var demos = {
    /*------------
      简单使用
     ------------*/
    pop0: function() {
        $pop[0] = $.popUp();
    },

    /*------------
      自定义动画属性
     ------------*/
    pop1: function() {
        $pop[1] = $.popUp({
               closeClass: 'btnClose',
               targetPrefix: 'm-popup-',
            // 自定义弹窗的背景色
            aniProperties: {
                popUp: {
                    background: 'red'
                }
            }
        });
    },

    /*------------
      自定义弹窗内容0
     ------------*/
    pop2: function() {
        $pop[2] = $.popUp({
            closeClass: 'btnClose',
            targetClass: '2',
            position: 'top-left'

        });
    },

    /*------------
      自定义弹窗内容1
     ------------*/
    pop3: function() {
        $pop[3] = $.popUp({
            shade: false,   // 不显示遮罩层
            position: 'center-left',    // 位置为“左中”
            closeClass: 'btnClose',
            targetClass: '3'
        });
    },

    /*------------
      自定义动画函数
     ------------*/
    pop4: function() {
        $pop[4] = $.popUp({
            autoPop: true,  // 自动打开
            position: 'bottom-center',  // 位置为“下中”
            closeClass: 'btnClose',
            targetClass: '4'
        });
    }
};

// demos.pop0();
// demos.pop1();
for (var item in demos) {
    demos[item]();
}
console.log($pop[0]);
console.log($pop.length);

    var val = 0;
    $('#pops').on('change', function() {
        val = $(this).val() || 0;
    }).trigger('change');

    $('button').on('click', function() {
        if ($pop && $pop.length) {
            $pop[val].pop();
        } else {
            alert('shit, tell the poor man~');
        }
    });

    $('.close').on('click', function() {
        $('.pop-wrapper')[0].style = '';
    });
