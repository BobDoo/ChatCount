$(document).ready(function(){
  today_date();

  $('.bring').click(function(){
    reset();
    var chat=$('.chatting').val();
    if(chat!=''){
      $('.resTb').removeClass('hide');
      $('.pholder').addClass('hide');
      var arr=bring_name();
      chat_count(arr);
    }
  });

  $('.reset').click(function(){
    reset('btn');
  });

})

function reset(txt){
  $('.tb_cont').html("");
  $('.resTb').addClass('hide');
  $('.pholder').removeClass('hide');
  if(txt=='btn'){
    $('.chatting').val("");
  }
}

function bring_name(){
  var chatTxt=$('.chatting').val();

  var lastPos;
  var name;
  var nameArr=[];
  var count=0;
  chatArr=chatTxt.split('\n');
  for(i=0; i<chatArr.length; i++){
    if(chatArr[i].substr(0,1)!='['){
      continue;
    }
    
    lastPos=chatArr[i].indexOf(']');
    if(lastPos>0 && lastPos<15){
      name=chatArr[i].substr(0,lastPos+1);  
    }

    count=0;
    for(j=0; j<nameArr.length; j++){
      if(name==nameArr[j]){
        count++;
      }
    }
    if(count==0){
      nameArr.push(name);
    }
  }
  return nameArr;
}

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

function chat_count(arr){
  var chatTxt=$('.chatting').val();
  var chatCnt=0;
  var resArr=[];

  for(i=0; i<arr.length; i++){
    chatCnt=count_txt(chatTxt,arr[i]);
    inArr=[arr[i], chatCnt];
    resArr.push(inArr);
  }
  
  var total=0;
  for(var i=0; i<resArr.length; i++){
    total+=resArr[i][1];
  }
  
  var rank=0;
  var rankArr=new Array(resArr.length);
  for(var i=0; i<resArr.length; i++){
    rank=0;
    for(var j=0; j<resArr.length; j++){
      if(resArr[i][1]<resArr[j][1]) rank++;
    }
    for(var j=0; j<rankArr.length; j++) {
      if(rankArr[j]==rank) rank++;
    }
    resArr[i].push((resArr[i][1]/total*100).toFixed(2));
    rankArr[rank]=resArr[i];
  }

  //console.log(rankArr);
  var innerHtml='';
  for(i=0; i<rankArr.length; i++){
    innerHtml='';
    innerHtml+="<tr>";
    innerHtml+="<td>";
    innerHtml+=i+1;
    innerHtml+="</td>";
      for(j=0; j<rankArr[i].length; j++){
        innerHtml+="<td>";
        innerHtml+=rankArr[i][j];
        if(j==2) innerHtml+=" %";
        innerHtml+="</td>";
      }
    innerHtml+="</tr>";
    $('.tb_cont').append(innerHtml);
  }
  innerHtml='';
  innerHtml+="<tr>";
  innerHtml+="  <td></td>";
  innerHtml+="  <td>합계</td>";
  innerHtml+="  <td>"+total+"</td>";
  innerHtml+="  <td>100 %</td>";
  innerHtml+="</tr>";
  $('.tb_cont').append(innerHtml);
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