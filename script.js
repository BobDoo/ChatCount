$(document).ready(function(){

  $('.bring').click(function(){
    reset();
    var chat=$('.chatting').val();
    if(chat!=''){
      $('.resTb').removeClass('hide');
      $('.pholder').addClass('hide');
      var arr=bring_name();
      chat_count(arr);
    }
    var offset = $('.res').offset();
	  $('html').animate({scrollTop : offset.top}, 400);
  });

  $('.reset').click(function(){
    reset('btn');
  });
})

function reset(txt){
  $('.tb_cont').children().remove();
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