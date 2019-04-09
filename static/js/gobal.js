    // 页面跳转
    function goTo(obj, pash) {
        obj.$router.push({ path: pash })
    }
    // 加载中特效
    function show_load(obj, text) {
        obj.$vux.loading.show({ text: text })
    }
    // 关闭特效
    function hide_load(obj) {
        obj.$vux.loading.hide()
    }

    function request(obj, url, data, res) {
        obj.Http.post(url, data).then(res => {
            console.log(res.data);
            obj.$vux.loading.hide()
            if (res.data.code == 1) {
                if (res) return res
            }
        })
    }
    /* 判断img格式*/
    function imgFormat(img) {
        let imgUrl = "http://hzgxczamdgzh.app.xiaozhuschool.com"
            // console.log(img);
        if (img) {
            return img.substring(0, 4) == 'http' ? img : (imgUrl + img)
        } else {
            return (imgUrl + "../img/noImg.jpg")
        }
    }
    // 获取连接的参数
    function getUrl(name, explode, url) {
        var param = window.location.search.substr(1);
        if (url) {
            if (explode) {
                param = url.substr(url.indexOf(explode) + 1);
            } else {
                param = url.substr(url.indexOf('?') + 1);
            }
        } else {
            if (explode) {
                param = window.location.href.substr(window.location.href.indexOf(explode) + 1);
            }
        }
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = param.match(reg);
        if (r != null) return unescape(r[2]);
        return '';
    }
    // 日期格式化
    function format(time, ff) {
        if (time.length == 10) time = time * 1000
        time = new Date(time)
        var year = time.getFullYear()
        var month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
        var date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
        var hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
        var minute = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
        var second = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()
        if (ff == 'Y-m-d') {
            return year + '-' + month + '-' + date
        } else if (ff == 'Y-m-d H:i:s') {
            return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
        } else if (ff == 'Y-m-d H:i') {
            return year + '-' + month + '-' + date + ' ' + hour + ':' + minute
        } else if (ff == 'Y.m.d') {
            return year + '.' + month + '.' + date
        } else if (ff == 'Y.m.d H:i:s') {
            return year + '.' + month + '.' + date + ' ' + hour + ':' + minute + ':' + second
        } else if (ff == 'Y.m.d H:i') {
            return year + '.' + month + '.' + date + ' ' + hour + ':' + minute
        }
    }
    // 存储数据
    function setData(name, arr) {
        return localStorage.setItem(name, JSON.stringify(arr));
    }

    function getData(name) {
        return JSON.parse(localStorage.getItem(name)) || '';
    }

    function clearData(name) {
        return localStorage.removeItem(name);
    }
    //判断身份证格式是否正确
    function checkIdCode(value) {
        var value = $.trim(value);
        var userCardreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        var taiwanreg = /^[A-Z][0-9]{9}$/; //台湾
        var xianggangreg = /^[A-Z][0-9]{6}\([0-9A]\)$/; //香港
        var aomenreg = /^[157][0-9]{6}\([0-9]\)$/; //澳门
        //return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
        return (userCardreg.test(value) || taiwanreg.test(value) || xianggangreg.test(value) || aomenreg.test(value));
    }
    //判断手机或者电话号码格式
    function checkMobileAndTel(value) {
        return /^(13[0-9]|14[5-9]|15[012356789]|16[6]|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(value);
    };
    //校验密码：只能输入6-20个字母、数字、下划线
    function isPasswd(value) {
        return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(value);
    }
    //银行卡校验
    function checkBank(value) {
        return /^(\d{16}|\d{19})$/.test(value);
    }
    var dlctipbox = {
        success: function(msg) {
            var str = '<section id="dlctipbox_mask" onclick="dlctipbox.clear()" style="width: 100%;height: 100%;position: fixed;background: rgba(0,0,0,0.4);top: 0;left: 0;"></section>' +
                '<div id="dlctipbox_success" class="flex flex-column bw border-r4" style="width: 6rem;height: 3.8rem;position: fixed;top: 50%;left: 50%;margin-top: -1.9rem;margin-left: -3rem;">' +
                '<img src="../img/success.png" style="width: 1rem;height: 1rem;"/>' +
                '<p class="font16 col3 mt20">' + (msg ? msg : '网络异常，请刷新') + '</p>' +
                '</div>';
            $(document.body).append(str);
            $('body').on('click', '#dlctipbox_mask', function() { dlctipbox.clear(); });
        },
        error: function(msg) {
            var str = '<section id="dlctipbox_mask" onclick="dlctipbox.clear()" style="width: 100%;height: 100%;position: fixed;background: rgba(0,0,0,0.4);top: 0;left: 0;"></section>' +
                '<div id="dlctipbox_success" class="flex flex-column bw border-r4" style="width: 6rem;height: 3.8rem;position: fixed;top: 50%;left: 50%;margin-top: -1.9rem;margin-left: -3rem;">' +
                '<img src="../img/error.png" style="width: 1rem;height: 1rem;"/>' +
                '<p class="font16 col3 mt20 plr24">' + (msg ? msg : '网络异常，请刷新') + '</p>' +
                '</div>';
            $(document.body).append(str);
            $('body').on('click', '#dlctipbox_mask', function() { dlctipbox.clear(); });
        },
        clear: function() {
            $('#dlctipbox_success,#dlctipbox_mask,#dlctipbox_confirm,#dlctipbox_tip,#dlctipbox_loading').remove();
        },
        confirm: function(msg, callback, cancelcall) {
            showMask();
            var str = '<section id="dlctipbox_confirm" class="flex flex-column bw border-r4" style="z-index:9999;width: 6rem;height: 3.8rem;position: fixed;top: 50%;left: 50%;margin-top: -1.9rem;margin-left: -3rem;">' +
                '<div class="msg font16 col3">' + (msg ? msg : "网络异常，请刷新") + '</div>' +
                '<div class="btn_bar" style="margin-top: .9rem;">' +
                '<button class="font16 col9 border-r4 confirm_btn" style="width: 1.6rem;line-height: .6rem;border: 1px solid #dadada;background: transparent;" data-btn="1">取消</button>' +
                '<button class="font16 colw bgc1 border-r4 confirm_btn" style="width: 1.6rem;line-height: .6rem;margin-left: .8rem;" data-btn="2">确定</button>' +
                '</div>' +
                '</section>';
            $(document.body).append(str);
            $('body').on('click', '.confirm_btn', function() {
                if ($(this).data('btn') == 2) {
                    if (callback) {
                        callback();
                    }
                } else {
                    if (cancelcall) {
                        cancelcall();
                    }
                }
                hideMask();
                $('#dlctipbox_confirm').remove();
            });
        },
        tip: function(msg) {
            var str = '<section id="dlctipbox_mask" onclick="dlctipbox.clear()" style="width: 100%;height: 100%;position: fixed;background: rgba(0,0,0,0.4);top: 0;left: 0;"></section>' +
                '<section id="dlctipbox_tip" class="bw border-r4" style="width: 6rem;height: 2.5rem;position: fixed;top: 50%;left: 50%;margin-top: -1.9rem;margin-left: -3rem;">' +
                '<div class="flex" style="padding: 0 .45rem;height: .94rem;">' +
                '<div class="line_x" style="height: 1px;flex: 1;background: #dadada;"></div>' +
                '<span style="padding: 0 .16rem;" class="font15 col3">提示</span>' +
                '<div class="line_x" style="height: 1px;flex: 1;background: #dadada;"></div>' +
                '</div>' +
                '<div style="padding: 0 .45rem;font-size: .28rem;color: #333;margin-top: .3rem;" class="tac">' + (msg ? msg : '网络异常，请刷新') + '</div>' +
                '</section>';
            $(document.body).append(str);
            $('body').on('click', '#dlctipbox_mask', function() { dlctipbox.clear() });
        },
        loading: function(msg) {
            var msg = msg ? msg : '加载中...';
            var str = '<div style="background: rgba(0,0,0,0.6);width: 2rem;z-index:999999;height: 2rem;position: fixed;left: 50%;top: 50%;margin-left: -1rem;margin-top: -1rem;" class="flex flex-column" id="dlctipbox_loading">' +
                '<div class="loadEffect">' +
                '<span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>' +
                '</div>' +
                '<p style="color: #fff;font-size: .28rem;margin-top: .1rem;">' + msg + '</p>' +
                '</div>';
            $(document.body).append(str);
        },
        show: function(msg, position, duration, keep) {
            if (!keep) this.clear();
            var msg = msg ? msg : '网络异常，请刷新';
            if (!msg) {
                var m = document.getElementById('tooltipbox_show_div');
                var d = 0.2;
                m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
                m.style.opacity = '0';
                setTimeout(function() {
                    try { document.body.removeChild(m); } catch (e) {}
                }, d * 1000);
                return;
            }
            if (position != 'bottom' && position != 'middle' && position != 'top') {
                position = 'bottom';
            }

            duration = isNaN(duration) ? 1000 : duration;
            var m = document.createElement('div');
            m.id = 'tooltipbox_show_div';
            m.innerHTML = msg;
            var css = "width:60%; font-size:14px;min-width:150px; background:#000; opacity:0.7; min-height:35px; overflow:hidden; color:#fff; line-height:35px; text-align:center; border-radius:5px; position:fixed; left:20%; z-index:999999;";
            if (position == 'top') {
                css += "top:10%; ";
            } else if (position == 'bottom') {
                css += "bottom:10%; ";
            } else if (position == 'middle') {
                css += "top:50%;margin-top:-18px;";
            }
            m.style.cssText = css;
            document.body.appendChild(m);
            if (duration != 0) {
                setTimeout(function() {
                    var d = 0.2;
                    m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
                    m.style.opacity = '0';
                    setTimeout(function() {
                        try { document.body.removeChild(m); } catch (e) {}
                    }, d * 1000);
                }, duration);
            }
        },
        alert: function(msg, callback, data, keep) {
            if (!keep) this.clear();
            var msg = msg ? msg : '网络异常，请刷新';
            var html = '<div id="tooltipbox_alert" style="z-index:999999997;"><div class="layer" style="height: 100%; width: 100%; background: rgba(0,0,0,0.4); position: fixed; top: 0px; left: 0px; z-index: 999999998; display: none;"></div><div class="tips" style="min-height: 120px; min-width: 250px; background: #fff; position: fixed; top: 50%; left: 50%; z-index: 999999999; margin: -100px -146px; display: none; border-radius:3px; border:1px solid rgba(255,255,255,0.6); padding:20px 20px 10px 20px;"><div class="title" style="min-height:90px; min-width:250px; font-size:16px; color:#676767;">';
            html += msg;
            html += '</div><div class="sub" style="min-height:30px; min-width:250px;"><nav data-action="ok" style="min-height:30px; width:auto; padding:0px 10px; margin:0px 2px; font-size:16px; line-height:30px; float:right; color:#5e7199; cursor:pointer;">确定</nav>';
            html += '</div></div></div>';

            if ($('#tooltipbox_tip').length > 0) {
                $('#tooltipbox_tip').remove();
            }
            var div = $(html);
            $(document.body).append(div);
            $('.layer', div).fadeIn(100);
            $('.tips', div).fadeIn(100);

            div.find('nav').unbind('click').click(function() {

                var action = $(this).data('action');
                if (action == 'ok') {
                    if (callback) {
                        callback(data);
                    }
                    div.remove();
                }
            });
        }
    };