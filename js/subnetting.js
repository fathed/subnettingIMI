var type = 0;//zero starts with the menu
var currDecVal = 1;
var placeHex = 1;
var currBin = 1;
var aa = '';
var bb = '';
var cc = '';
var dd = '';
var dec1Answer = '';
var dec2Answer = '';
var dec3Answer = '';
var dec4Answer = '';
var whichQuestion = 0;

var binArr1 = [
['11000011','11100001','00001010','11100111'],
['128','111','240','123'],
['128','111','1','0'],
['01010011','11010011','00111011','01000011'],
['128','240','155','0'],
['255','255','255','224'],
['121','120','90','170'],
['199','220','25','10'],
['133','245','125','105'],
['192','168','50','0/26'],
['126','0','0','0/14']
];
	








var questions = [
'Convert the IP Address provided below from binary to decimal. Type your answer into each octet in the IP ADDRESS IN DECIMAL area. When you are done, select the SUBMIT button to score your answer.',


'A computer on a classful network has the IP Address shown below. Type the Network Mask, the Network ID, and the Host ID in decimal. When you are done, select the SUBMIT button to score your answer.',


'Convert the subnet mask 128.111.1.0 into binary and type your answer in the SUBNET MASK IN BINARY area. Determine the NUMBER OF SUBNETS and the NUMBER OF USABLE HOSTS PER SUBNET and type your answers. When done, select the SUBMIT button to score your answers.',

'Convert the IP Address provided below from binary to decimal. Type your answer into each octet in the IP ADDRESS IN DECIMAL area. When you are done, select the SUBMIT button to score your answer.',


'A computer on a classful network has the IP Address shown below. Type the Network Mask, the Network ID, and the Host ID in decimal. When you are done, select the SUBMIT button to score your answer.',


'Convert the subnet mask 255.255.255.224 into binary and type your answer in the SUBNET MASK IN BINARY area. Then, determine the NUMBER OF SUBNETS and the NUMBER OF USABLE HOSTS PER SUBNET and type in your answers. When you are done, select the SUBMIT button to score your answers.',

'Below is a network drawing showing two personal computers on the network. The IP Address for another computer on the same network is 121.120.90.170. Determine the first usable IP address in the network and assign it to the PC on the left. Determine the last usable IP address in the network and assign it to the PC on the right. When you are done, select the SUBMIT button to score your answers.',


'Below is a network drawing showing two personal computers on the network. The IP Address for another computer on the same network is 199.220.25.10. Determine the first usable IP address in the network and assign it to the PC on the left. Determine the last usable IP address in the network and assign it to the PC on the right. When you are done, select the SUBMIT button to score your answers.',


'Below is a network drawing showing two personal computers on the network. The IP Address for another computer on the same network is 133.245.125.105. Determine the first usable IP address in the network and assign it to the PC on the left. Determine the last usable IP address in the network and assign it to the PC on the right. When you are done, select the SUBMIT button to score your answers.',


'Below is a network drawing showing two subnets. The IP Address for the network is 192.168.50.0/26. Determine the first three usable IP addresses for the first subnet and assign them to the subnet components on the left. Apply the first three usable IP addresses for the second subnetwork and complete the subnet on the right. When you are done, select the SUBMIT button to score your answers.',

'Below is a network drawing showing two subnets. The IP Address for the network is 126.0.0.0/14. Determine the first three usable IP addresses for the first subnet and assign them to the subnet components on the left. Apply the first three usable IP addresses for the second subnetwork and complete the subnet on the right. When you are done, select the SUBMIT button to score your answers.'];







//the switch for the cbt type
function version(e){
	switch(e){
		case 'exce':
			setUp(0);
		break;
		case 'col':
			setUp(1);
		break;
	}
}


function subnetting(){
	//will i do th excersize or the quiz
	$(".btns").click(function(){
		var thisID = $(this).attr('id');
		version(thisID);
	});

		
		
	///check to see if the decimal is correct
	$("#answer").click(function(){
		getDecAnswer();
		$("#response").html();
	
	})
		
	
		
		
	$("#checker").click(function(){
		aa = $("#a1").val();	
		bb = $("#a2").val();	
		cc = $("#a3").val();	
		dd = $("#a4").val();
		retrieveBinFromDec();
		
		retrieveHexFromDec();
		
		if($("#b1").val()== ""){
			retrieveBinFromDec();
		}else{
			//retrieveBinFromDec();
		}
		getSubnetMask();
		
		//$("#checkOnLearning").append(addComputers($("#numComps").val()));
	});
	
	
	//type is the mode we are in
	setUp(type);
	
	
}



function getSubnetMask(){

		

		retrieveBinFromDec();
		checkCDIR($("#a5").val());//check CDIR
		checkBetween($("#a1").val())//get subnet mask
		
		
		for(var i=0;i<checkBetween($("#a1").val()).length;i++){
			//console.log(checkBetween($("#a1").val())[i]);
			var t = Number(i) + 1;
			$("#d"+t).val(checkBetween($("#a1").val())[i]);
			
		}
		if($("#a5").val() != ""){
				$("#d4").val(checkCDIR($("#a5").val()));
			}else{
				$("#d4").val('0');
			}
			
			
			retrieveBinFromSubnetMask();
			getHostID();
}




function checkBetween(c){
	var answer = [];
	if(c >= 0 && c <= 127){
		answer = [255,0,0,0];
	}else if(c >= 128 && c <= 191){
		answer = [255,255,0,0];
	}else if(c >= 192 && c <= 224){
		answer = [255,255,255,0];
	}
	return answer;
}



function checkCDIR(e){
	var answer = '';
	
	
	
	
	//1
	if(e == 24){
		answer = 0;
	}
	//2
	else if(e == 25){
		answer = 128;
	}
	//4
	else if(e == 26){
		answer = 192;
	}
	//8
	else if(e == 27){
		answer = 224;
	}
	//16
	else if(e == 28){
		answer = 240;
	}
	//32
	else if(e == 29){
		answer = 248;
	}
	//64
	else if(e == 30){
		answer = 252;
	}
	//128
	else if(e == 31){
		answer = 254;
	}
	//256
	else if(e == 32){
		answer = 255;
	}
	return answer;
}

/*
network address and broadcast address

broadcast address is the very last and network address is the first - both unusable
*/


function addComputers(totalNum){
	var comp = '';
	for(var i =0; i<totalNum;i++){
		comp += '<table id="comTab'+ totalNum +'">';
		comp += '<tr>';
		comp += '<td colspan="7">Subnet Mask in:</td>';
		comp += '</tr>';
		comp += '<tr>';
		comp += '<td><input type="text" class="textfield" id="d'+ i+ '"></td>';
		comp += '<td class="centerDot">.</td>';
		comp += '<td><input type="text" class="textfield" id="d'+ i+ '"></td>';
		comp += '<td class="centerDot">.</td>';
		comp += '<td><input type="text" class="textfield" id="d'+ i+ '"></td>';
		comp += '<td class="centerDot">.</td>';
		comp += '<td><input type="text" class="textfield" id="d'+ i+ '"></td>';
		comp += '</tr>';
		comp += ' </table>	<br><br>';
	}
	return comp;
}



function getHostID(e){
	
	//b4
	var thebin = $("#e4").val();
	var res = thebin.split("");
	
	var placeVal = [128,64,32,16,8,4,2,1];
	
	var totalVal = 0;
	for(var i=0;i<res.length;i++){
		if(res[i] == 1){
			//totalVal += totalVal + Number(res[i])+ Number(placeVal[i]);
			totalVal = Number(placeVal[i]);
		}
	}
	
	
	
	//256 is the max so i divide the place the last one is against the place value
	var loopCount = 256 / totalVal;
	var loopNum1 = 0;
	var loopNum2 = 0;
	if(totalVal> 0 ){
		for(var t = 0;t<loopCount;t++){
			if(loopNum2 >= totalVal -1 ){
				loopNum1 = loopNum1 + totalVal;
				loopNum2 = totalVal + loopNum2;
			}else{
				loopNum2 = totalVal + loopNum2 -1;
			}
			
			
			console.log(t+" place: "+loopNum1 + " - "+loopNum2)
		}
	}
	$("#subnets").val(loopCount)
	$("#hosts").val(totalVal)
	
}
 








//not every row in the table is useful for every question. this shuts off the ones that arent needed
function showHideTableItems(e){
	switch(e){
		case 0:
			/*$("#binTab").show();
			$("#subNet").hide();
			$("#nmTab").hide();
			$("#nidTab").hide();
			$("#hidTab").hide();*/
		break;
		case 1:
			/*$("#binTab").hide();
			$("#subNet").hide();
			$("#nmTab").show();
			$("#nidTab").show();
			$("#hidTab").show();*/
		break;	
		case 2:
			/*$("#binTab").show();
			$("#subNet").show();
			$("#nmTab").hide();
			$("#nidTab").hide();
			$("#hidTab").hide();*/
		break;
		case 3:
			/*$("#binTab").show();
			$("#subNet").show();
			$("#nmTab").hide();
			$("#nidTab").hide();
			$("#hidTab").hide();*/
		break;
	}
}

$("#checkOnLearning").show();
		$("#splash").hide();
//basic init
function setUp(e){
	
	if(e == 0){
		//$("#checkOnLearning").hide();
	}else{
		$("#checkOnLearning").show();
		$("#splash").hide();
		//initCOL(9);
		var t = Math.floor(Math.random() * 11)
		//console.log(t)
		initCOL(t)
	}
} 
 
/*function getSubnetMask(){
	console.log(checkBetween(5));
	console.log(checkCDIR(29));
	
}*/
 
 

function retrieveDecimal(){
	$("#a1").val(ConvertBinToDec($("#b1").val()))
	$("#a2").val(ConvertBinToDec($("#b2").val()))
	$("#a3").val(ConvertBinToDec($("#b3").val()))
	$("#a4").val(ConvertBinToDec($("#b4").val()))
}

function retrieveHexFromDec(){
	$("#c1").val(ConvertToHex($("#a1").val()));	
	$("#c2").val(ConvertToHex($("#a2").val()));	
	$("#c3").val(ConvertToHex($("#a3").val()));	
	$("#c4").val(ConvertToHex($("#a4").val()));
}

function retrieveBinFromDec(){
	$("#b1").val(ConvertToBin($("#a1").val()));	
	$("#b2").val(ConvertToBin($("#a2").val()));	
	$("#b3").val(ConvertToBin($("#a3").val()));	
	$("#b4").val(ConvertToBin($("#a4").val()));
}

function retrieveBinFromSubnetMask(){
	$("#e1").val(ConvertToBin($("#d1").val()));	
	$("#e2").val(ConvertToBin($("#d2").val()));	
	$("#e3").val(ConvertToBin($("#d3").val()));	
	$("#e4").val(ConvertToBin($("#d4").val()));
}

/*
to get the correct decimal I actually convert and compare to what is in the text field.
*/
function getDecAnswer(){
	var decAnswer = [],curr=1,cl = '';
	$(".textfield").removeClass( 'right' );
	$(".textfield").removeClass( 'wrong' );

	for(var i=0;i<4;i++){
		decAnswer[i] = ConvertBinToDec($("#b"+curr).val())
		
		if(decAnswer[i] == $("#a"+curr).val()){
			cl = 'right'
		}else{
			cl = 'wrong'
		}
		$("#a"+curr).addClass( cl );
		curr++;
	}
	
}


//whih question from the array - it is random
function chooseQuestion(e){
	switch(e){
		case 0:
			placeBin();
		break;
		case 1:
			placeDec();
		break;
		case 2:
			placeDec();
		break;
		case 3:
			placeBin();
		break;
		case 4:
			placeDec();
		break;
		case 5:
			placeDec();
		break;
		case 6:
			placeDec();
		break;
		case 7:
			placeDec();
		break;
		case 8:
			placeDec();
		break;
		case 9:
			placeDec();
		break;
		case 10:
			placeDec();
		break;
		case 11:
			placeDec();
		break;
	};	
}


function initCOL(startNum){
	//$("#hexTab").hide();
	whichQuestion = startNum;
	showHideTableItems(startNum);
	chooseQuestion(startNum);

	$("#question").html(questions[whichQuestion]);
	//$("#binaryList").val(binArr1.join(""));
}	

//place binary
function placeBin(){
	var placeBin = 1;
	for(var i=0;i<binArr1[whichQuestion].length;i++){
		$("#b"+placeBin).val(binArr1[whichQuestion][i])
		placeBin++;
	}
}
//place dec
function placeDec(){
	var placeBin = 1;
	for(var i=0;i<binArr1[whichQuestion].length;i++){
		$("#a"+placeBin).val(binArr1[whichQuestion][i])
		placeBin++;
	}
}

function ConvertToHex(numberValue){
	var decNumber = Number(numberValue);
	var hexNumber = decNumber.toString(16).toUpperCase();
	return hexNumber;
}
function ConvertToBin(e){
	var decNumber = Number(e);
	var binaryNumber = decNumber.toString(2).toUpperCase();
	return binaryNumber;
}
function ConvertToDec(hexNumber){
	var decNumber = parseInt(hexNumber,16);
	return decNumber;
}
function ConvertBinToDec(binaryNumber){
	var decNumber = parseInt(binaryNumber, 2);
	return decNumber;
}

