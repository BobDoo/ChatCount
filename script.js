$(document).ready(function(){
  today_date();

  $('.bring').click(function(){
    chat_count();
  });
})

function today_date(){
  // 오늘 날짜 가져오기
  var date=new Date();
  var month=date.getMonth()+1;
  var day=date.getDate();
  var yi=date.getDay();

  // 월요일이면 금요일로 변경, 나머지는 전날로 변경
  if(yi==1){
    day=day-3;
    yi=5;
  }else{
    day=day-1;
    yi=yi-1;
  }

  // 요일 텍스트로 변환
  var week=new Array('일', '월', '화', '수', '목', '금', '토');
  var yiTxt=week[yi];

  // 출력
  var dayTxt=month+'/'+day+'('+yiTxt+')'
  $('.date').html(dayTxt);
}

function chat_count(){
  var chatTxt=$('.chatting').val();

  var doo='[밥두]';
  var boo='[핀업 박보라 93]';
  var tae='[핀업 박태희 95]';
  var sin='[핀업 강신웅 96]';

  var dooNum=count_txt(chatTxt, doo);
  var booNum=count_txt(chatTxt, boo);
  var taeNum=count_txt(chatTxt, tae);
  var sinNum=count_txt(chatTxt, sin);
  var total=dooNum+booNum+taeNum+sinNum;

  $('.chatDoo').html(dooNum);
  $('.perDoo').html((dooNum/total*100).toFixed(2));

  $('.chatBoo').html(booNum);
  $('.perBoo').html((booNum/total*100).toFixed(2));

  $('.chatTae').html(taeNum);
  $('.perTae').html((taeNum/total*100).toFixed(2));

  $('.chatSin').html(sinNum);
  $('.perSin').html((sinNum/total*100).toFixed(2));

  $('.tot').html(total);
  $('.perTot').html((total/total*100).toFixed(2));
  // 지분율 계산

}

function count_txt(text , searchChar){
  var count=0;
  var pos = text.indexOf(searchChar);

  while (pos !== -1) {
    count++;
    pos = text.indexOf(searchChar, pos + 1);
  }
  return count;
}