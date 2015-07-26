/**
 * @name: zepto.popUp
 * @description: 基于Zepto或jQuery的弹窗插件，支持webkit内核手机高级浏览器
 * @usage: $.popUp({opts}) => $popUpElement
 * @options:
 *      position: {String} 默认为'center' 'left-top' 左上 'top-center' 上中 'right-top' 右上 'right-center' 右中 'right-bottom' 右下 'bottom-center' 下中 'left-bottom' 左下 'left-center' 左中 'center' 居中
 *      animation: {Object || Boolean || Function } 默认为 { popUp: { duration: 300, easing: 'ease-in'}, shade: { duration: 300, easing: 'ease-in' } } false时为不采用动画; 若为Object时, 比较popUp或shade，popUp或shade为Function时，在弹窗时回调该函数，并分别传入参数$popUp对象和$shade对象；若popUp与shade也为对象时，popUp和shade的参数与Zepto的animate方法的参数一致，参考 http://zeptojs.com/#animate
 *
 *          duration: {String || Number} 默认400，动画持续时间，'fast'为200ms，'slow'为 600ms
 *          easing: {String} 默认'linear'，动画缓动效果 'ease' 'linear' 'ease-in' 'ease-out' 'ease-in-out' 'cubic-bezier(...)'
 *          complete: {Function} 默认undefined 动画完成回调函数
 *      aniProperties: {Object} 默认为 { popUp: { opacity: .8 }, shade: { opacity: .8 } } 分别定义弹窗popUp与shade遮罩层在动画时的目标样式
 *      isScrollMove: {Boolean} 默认false 是否禁用掉scroll，在弹出的时候
 *     : {String} 默认{closeClass: 'pop-close',targetClass: 'popup-wrapper',targetPrefix: ''} 如果是字符串，则直接作为弹窗内容，如果是对象
 *          closeClass: 'pop-close', 默认弹窗按钮的class
            targetClass: 'popup-wrapper', 默认弹窗的class
            targetPrefix: '' 默认弹窗class的前缀
 *      zIndex: {Number} 默认为999 设置弹窗z-index 最小为999
 *      autoPop: {Boolean} 默认为false 是否自动打开
 *      shade: {Boolean} 默认为true 显示遮罩层
 *      destory: {Boolean || Function} 默认为false 弹窗消失时的回调函数，参数为$popUp与$shade
 * @method:
 *      pop: 弹出
 *      destory: 消失
 * @return $popUp 构建的弹窗对象
 */
/*global Zepto*/
;(function($, win, doc, undefined) {
    function popUp(opts) {
        var closeClass = 'pop-close',
            targetClass = 'wrapper',
            targetPrefix = 'pop-',
            animation = {
                popUp: {
                    duration: 300,
                    easing: 'ease-in'
                },
                shade: {
                    duration: 300,
                    easing: 'ease-in'
                }
            },
            aniProperties = {
                popUp: {
                    opacity: 1
                },
                shade: {
                    opacity: 0.5
                }
            },
            settings = $.extend({
                position: 'center',
                animation: animation,
                aniProperties: aniProperties,
                isScrollMove: false,
                closeClass: closeClass,
                targetClass: targetClass,
                targetPrefix: targetPrefix,
                zIndex: 2,
                autoPop: false,
                shade: true,
                destory: false
            }, opts),
            defaultCSS = '',
            $shade = $('#shade'),
            $body = $(doc.body).prepend('<style>' + generateStyle(defaultCSS, settings) + '</style>'),
            $popUp, 
            $targetClass, 
            $closeClass, 
            $prefix = '',
            $content;

        if (settings.shade && !$shade.length) {
            $shade = $('<div id="shade" class="shade" style=""></div>').appendTo($body);
        }

        if (settings.targetPrefix) {
            $prefix = settings.targetPrefix;
        }
        if (settings.closeClass) {  
            $closeClass = settings.closeClass;
        }
        if (settings.targetClass) {
            $targetClass = $prefix + settings.targetClass;
            
        }
        $content = $prefix + 'content';
        $('.' + $content).addClass('pop-content');
        $('.' + $targetClass).addClass('pop-wrapper');
        console.log($('.' + $targetClass).css());

        $popUp = $('.'+$targetClass).appendTo($body);

        $.extend($popUp, {
            pop: function() {
                if (settings.animation) {
                    if ($.isFunction(settings.animation.popUp)) {
                        settings.animation.popUp($popUp);
                    } else {
                        $popUp.css({display: '-webkit-box', 'z-index': settings.zIndex || 2})
                            .animate( $.extend(aniProperties.popUp, settings.aniProperties.popUp), $.extend(animation.popUp, settings.animation.popUp) );
                    }

                    if ($.isFunction(settings.animation.shade) && settings.shade) {
                        settings.animation.shade($shade);
                    } else {
                        $shade.css({display: 'block'})
                            .animate( $.extend(aniProperties.shade, settings.aniProperties.shade), $.extend(animation.shade, settings.animation.shade));
                    }

                    if (!settings.isScrollMove) {
                        $(win).on('scroll,touchmove', eventHandler);
                    }
                } else {
                    if (settings.shade) {
                        $shade.show();
                    }
                    $popUp.css({display: '-webkit-box', 'z-index': settings.zIndex || 999, opacity: 1});
                }


            },
            destroy: function() {
                $shade.attr('style', '');
                $popUp.css('display', 'none');
                $('.pop-wrapper').css('display', 'none');
                if (!settings.isScrollMove) {
                    $(win).off('scroll,touchmove', eventHandler);
                }

                if (settings.destory && $.isFunction(settings.destory)) {
                    settings.destory($popUp, $shade);
                }
            }
        });

        $popUp.on('click', function(e) {
            if (!$(e.target).closest('.' + $content).length || 
                e.target.className === $closeClass) {
                $popUp.destroy();
            }
        });

        if (settings.autoPop) {
            $popUp.pop();
        }

        return $popUp;
    }

    function eventHandler(e) {
        e.preventDefault();
    }

    function generateStyle(src, opts) {
        src += '.';
        var prefix = '';

        if (opts.targetPrefix) {
            prefix = opts.targetPrefix;
        }
        src += prefix + opts.targetClass + '{';
        switch(opts.position) {
            case 'left-top':
                src += prefixStyle('box-align: start;') + '} .'+prefix+'content{ margin-right: auto; }';
                break;
            case 'top-center':
                src += prefixStyle('box-align: start;') + '} .'+prefix+'content{ margin-right: auto; margin-left: auto; }';
                break;
            case 'right-top':
                src += prefixStyle('box-align: start;') + '} .'+prefix+'content{ margin-left: auto; }';
                break;
            case 'right-center':
                src += prefixStyle('box-align: center;') + '} .'+prefix+'content{ margin-left: auto; }';
                break;
            case 'right-bottom':
                src += prefixStyle('box-align: end;') + '} .'+prefix+'content{ margin-left: auto; }';
                break;
            case 'bottom-center':
                src += prefixStyle('box-align: end;') + '} .'+prefix+'content{ margin-right: auto; margin-left: auto; }';
                break;
            case 'left-bottom':
                src += prefixStyle('box-align: end;') + '} .'+prefix+'content{ margin-right: auto; }';
                break;
            case 'left-center':
                src += prefixStyle('box-align: center;') + '} .'+prefix+'content{ margin-right: auto; }';
                break;
            default:
                src += prefixStyle('box-align: center;') + '} .'+prefix+'content{ margin-left: auto; margin-right: auto;}';
                break;
        }

        return src;
    }

    function prefixStyle(ori) {
        return '-webkit-' + ori + '-ms-' + ori + '-moz-' + ori + '-o-' + ori;
    }

    $.extend($, {
        popUp: popUp
    });
})(Zepto || jQuery, window, document);

