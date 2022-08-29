const URL ='https://script.google.com/macros/s/AKfycbwxucYVikQgWU6pjc7Ix8VlEWOyFj9odSmCcNxWf8-4PgKB3HRpGO2WjuhakuVgc8C1/exec';
let articleNum = 1;


$(document).ready(function () {
    init();
    setProgress();
});

$('input[type=text]').focusout(function(event){
    if($(this).val() == ''){
        setTip($(this));
    }
});
$('input[type=text]').keyup(function(event){
    if($(this).val() != ''){
        removeTip($(this));
}});
$('input[type=radio]').change(function(event){
    removeTip($(this));
});
$('select').change(function(event){
    removeTip($(this));
});
$('input[type=checkbox]').change(function(event){
    removeTip($(this));
});

function init(){
    $('.btn-next').click(function(e){
        checkField();
    });
    $('.btn-prev').click(function(e){
        switchArticle('prev');
    });
    $('.btn-send').click(function(e){
        checkField();
    });
    $('.btn-prev').hide();
    $('.btn-send').hide();
}

function checkField(){
    switch(articleNum){
        case 1:
            if($('input[name=nickName]').val() == ''){
                setTip($('input[name=nickName]'));
                return false;
            }
            switchArticle('next');
            break;
        case 2:
           if($('input[name=animalName1]').val() == ''){
                setTip($('input[name=animalName1]'));
                return false;
            }
            switchArticle('next');
            break;
        case 3:
            if($('select[name=wallH1]').val() == null){
                setTip($('select[name=wallH1]'));
                return false;
            }
            if($('input[name=wallM1]:checked').val() == undefined){
                setTip($('input[name=wallM1]'));
                return false;
            }
            if($('input[name=wallC1]:checked').val() == undefined){
                setTip($('input[name=wallC1]'));
                return false;
            }
            switchArticle('next');
            break;
        case 4:
            if($('input[name=doorM1]:checked').val() == undefined){
                setTip($('input[name=doorM1]'));
                return false;
            }
            if($('input[name=doorD1]:checked').val() == undefined){
                setTip($('input[name=doorD1]'));
                return false;
            }else if($('input[name=doorD1]:checked').val() == '其他'){
                if($('input[name=doorD1-7-text]') == ''){
                    setTip($('input[name=doorD1]'));
                    return false;
                }
            }
            switchArticle('next');
            break;
        case 5:
            if($('select[name=wallH2]').val() == null){
                setTip($('select[name=wallH2]'));
                return false;
            }
            if($('input[name=wallM2]:checked').val() == undefined){
                setTip($('input[name=wallM2]'));
                return false;
            }
            if($('input[name=wallC2]:checked').val() == undefined){
                setTip($('input[name=wallC2]'));
                return false;
            }
            switchArticle('next');
            break;
        case 6:
            if($('input[name=doorM2]:checked').val() == undefined){
                setTip($('input[name=doorM2]'));
                return false;
            }
            if($('input[name=doorD2]:checked').val() == undefined){
                setTip($('input[name=doorD2]'));
                return false;
            }else if($('input[name=doorD2]:checked').val() == '其他'){
                if($('input[name=doorD2-7-text]') == ''){
                    setTip($('input[name=doorD2]'));
                    return false;
                }
            }
            switchArticle('next');
            break;
        case 7:
            if($('select[name=chairNum]').val() == null){
                setTip($('select[name=chairNum]'));
                return false;
            }
            if($('input[name=doily]:checked').val() == undefined){
                setTip($('input[name=doily]'));
                return false;
            }
            switchArticle('next');
            break;
        case 8:
            if($('input[name=hillD]:checked').val() == undefined){
                setTip($('input[name=hillD]'));
                return false;
            }
            if($('select[name=hillSlope]').val() == null){
                setTip($('select[name=hillSlope]'));
                return false;
            }
            switchArticle('next');
            break;
        case 9 :
            if($('input[name=animalName2]').val() == ''){
                setTip($('input[name=animalName2]'));
                return false;
            }
            switchArticle('post');
            break;
        default:
            switchArticle('next');
    }}

function setTip(dom){
    let template = $('#template01');
    let node = $('#Template01').html();
    if(dom.closest('.main-group').find('.tip').length == 0){
        dom.closest('.main-group').append(node);
        dom.closest('.main-group').addClass('bdr');
    }   
}

function removeTip(dom){
    dom.closest('.main-group').find('.tip').remove();
    dom.closest('.main-group').removeClass('bdr');
}

function switchArticle(situation){   
    switch(situation){
        case 'next':
            if(articleNum<10){
                $('nav').hide();
                gsap.to('#article'+articleNum,{
                    duration:1,
                    x:$('.container').width()*-1,
                    onComplete:backToCenter,
                    onCompleteParams:[articleNum, situation]
                });
                articleNum++;
                console.log(articleNum);
                $('#article'+articleNum).show();
                gsap.to('#article'+articleNum, {duration:0,x:$('.container').width()});
                gsap.to('#article'+articleNum, {duration:1,x:0});
                setProgress();
            }
            break;
        case 'prev':
            if(articleNum>1){
                $('nav').hide();
                gsap.to('#article'+articleNum,{
                    duration:1,
                    x:$('.container').width(),
                    onComplete:backToCenter,
                    onCompleteParams:[articleNum, situation]
                });
                articleNum--;
                console.log(articleNum);
                $('#article'+articleNum).show();
                gsap.to('#article'+articleNum, {duration:0,x:$('.container').width()*-1});
                gsap.to('#article'+articleNum, {duration:1,x:0});
                setProgress();
            }
            break;
        case 'post':
            gsap.to('#article'+articleNum,{
                duration:1,
                x:$('.container').width(),
                onComplete:backToCenter,
                onCompleteParams:[articleNum, situation]
            });
            postData();
            break;
    }
}

function backToCenter(oldNum, situation){
    $('#article'+oldNum).hide();
    gsap.to('#article'+oldNum, {duration:0,x:0});
    $('nav').show();
    switch(situation){
        case 'next':
            $('nav').show();
            $('.btn-next').show();
            $('.btn-prev').show();
            if(articleNum == 9){
                $('.btn-next').hide();
                $('.btn-send').show();
            }
            if(articleNum == 10){
                $('nav').hide();
            }
            break;
        case 'prev':
            $('nav').show();
            $('.btn-next').show();
            $('.btn-prev').show();
            if(articleNum == 1){
                $('.btn-prev').hide();
            }
            if(articleNum <= 9){
                $('.btn-send').hide();
            }
            break;
        case 'pose':
            $('nav').hide();
    }
}

function setProgress(){
    let w = Math.floor((articleNum/9)*100);
    $('.progress-bar').css('width',w+'%');
}

function postData(){
    let params = {};
    $('.cover').css('display','grid');
    params.method = 'write1';
    params.nickName = $('input[name=nickName]').val();
    params.animalName1 = $('input[name=animalName1]').val();
    params.animalName2 = $('input[name=animalName2]').val();
    //radio
    params.wallM1 = $('input[name=wallM1]:checked').val();
    params.wallC1 = $('input[name=wallC1]:checked').val();
    params.doorM1 = $('input[name=doorM1]:checked').val();
    params.wallM2 = $('input[name=wallM2]:checked').val();
    params.wallC2 = $('input[name=wallC2]:checked').val();
    params.doorM2 = $('input[name=doorM2]:checked').val();
    params.doily = $('input[name=doily]:checked').val();
    params.hillD = $('input[name=hillD]:checked').val();
    //select
    params.wallH1 = $('select[name=wallH1]').val();
    params.wallH2 = $('select[name=wallH2]').val();
    params.chairNum = $('select[name=chairNum]').val();
    params.hillSlope = $('select[name=hillSlope]').val();
    //checkbox
    let ary = [];
    $('input[name=doorD1]:checked').each(function(index, el){
        if($(this).val() == '其他'){
            ary.push($(this).val()+': '+$('input[name=doorD1-7-text]').val());
        }else{
            ary.push($(this).val());
        }
    })
    params.doorD1 = JSON.stringify(ary);
    //checkbox
    let ary2 = [];
    $('input[name=doorD2]:checked').each(function(index, el){
        if($(this).val() == '其他'){
            ary2.push($(this).val()+': '+$('input[name=doorD2-7-text]').val());
        }else{
            ary2.push($(this).val());
        }
    })
    params.doorD2 = JSON.stringify(ary2);


    $.post(URL, params, function(data){
		if(data.result == 'sus'){
            templatePush(params);
            switchArticle('next');
            $('.cover').css('display','none');
		}else{
			alert("送出失敗，請檢查後再次嘗試"+data);
            $('.cover').css('display','none');
		}
	}).fail(function(data){
		alert("送出失敗"+data);
	});

    console.log(params);
}

function templatePush(params){
    result = detectParams(params);
    let $template = $('#Template02');
    let $node = $template.html();
    $node = $node.replace('NICKNAME',params.nickName);
    $node = $node.replace('ANI_NAME1',params.animalName1);
    $node = $node.replace('ANI_NAME2',params.animalName2);
    $node = $node.replace('WALLH1',params.wallH1);
    $node = $node.replace('WALLM1',result[0]);
    $node = $node.replace('WALLC1',result[1]);
    $node = $node.replace('DOORM1',result[2]);
    $node = $node.replace('DOORD1',params.doorD1.replace(/\[|]|"|其他:/g,'').replace(/\,/g,'、'));
    $node = $node.replace('WALLH2',params.wallH2);
    $node = $node.replace('WALLM2',result[3]);
    $node = $node.replace('WALLC2',result[4]);
    $node = $node.replace('DOORM2',result[5]);
    $node = $node.replace('DOORD2',params.doorD2.replace(/\[|]|"|其他:/g,'').replace(/\,/g,'、'));
    $node = $node.replace('CHAIR_NUM',params.chairNum);
    $node = $node.replace('DOILY',params.doily);
    $node = $node.replace('DOILY_MEANING',result[6]);
    $node = $node.replace('HILLD',params.hillD);
    $node = $node.replace('HILLSLOPE',params.hillSlope);
    $('#article10').append($node);
}

function detectParams(params){
    let result = [];
    switch(params.wallM1){
        case '金屬':
            result.push("難以打破");
            break;
        case '水泥':
            result.push("很堅固");
            break;
        case '磚頭':
            result.push("有一定的強度");
            break;
        case '石頭':
            result.push("有機會擊破");
            break;
        case '木頭':
            result.push("輕易可打破");
            break;
    }
    switch(params.wallC1){
        case '非常容易':
            result.push("很容易信任他人");
            break;
        case '有點難爬':
            result.push("需要一點時間信任陌生人");
            break;
        case '超級難爬':
            result.push("無法輕易相信他人");
            break;
    }
    switch(params.doorM1){
        case '金屬':
            result.push("難以打破");
            break;
        case '水泥':
            result.push("很堅固");
            break;
        case '磚頭':
            result.push("有一定的強度");
            break;
        case '石頭':
            result.push("有機會擊破");
            break;
        case '木頭':
            result.push("輕易可打破");
            break;
    }
    switch(params.wallM2){
        case '金屬':
            result.push("難以打破");
            break;
        case '水泥':
            result.push("很堅固");
            break;
        case '磚頭':
            result.push("有一定的強度");
            break;
        case '石頭':
            result.push("有機會擊破");
            break;
        case '木頭':
            result.push("輕易可打破");
            break;
    }
    switch(params.wallC2){
        case '非常容易':
            result.push("很容易信任他人");
            break;
        case '有點難爬':
            result.push("需要一點時間信任陌生人");
            break;
        case '超級難爬':
            result.push("無法輕易相信他人");
            break;
    }
    switch(params.doorM2){
        case '金屬':
            result.push("難以打破");
            break;
        case '水泥':
            result.push("很堅固");
            break;
        case '磚頭':
            result.push("有一定的強度");
            break;
        case '石頭':
            result.push("有機會擊破");
            break;
        case '木頭':
            result.push("輕易可打破");
            break;
    }
    switch(params.doily){
        case '正著放':
            result.push("較為保守");
            break;
        case '斜著放':
            result.push("思想創新");
            break;
    }

    return result;
}



