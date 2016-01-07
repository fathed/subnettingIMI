function subnetting(){


///whAt are we doing? a check on learning or an excersize?

var type = 0;


$(".btns").click(function(){
	var thisID = $(this).attr('id');
	
	switch(thisID){
		case 'exce':
			setUp(0)
		break;
		case 'col':
			setUp(1)
		break;
	}
	
	});

function setUp(e){
	if(e == 0){
		$("#checkOnLearning").hide();
	}else{
				$("#checkOnLearning").show();
		$("#splash").hide();

		initCOL(Math.floor(Math.random() * 4) + 1)
	}
}
 setUp(type)

	var currDecVal = 1;
	
	var placeHex = 1;
	var currBin = 1;
	var aa = '';
	var bb = '';
	var cc = '';
	var dd = '';


	/*
	allow to randomly ask these quesitons
	*/

	
	
	
	
	
		
	
	
	

	

	
	//set up binary
/*	for(var i=0;i<binArr1.length;i++){
		$("#a"+currDecVal).val(ConvertBinToDec(binArr1[i]))
		currDecVal++
	}
	
	//place binary
	for(var i=0;i<binArr1.length;i++){
		$("#b"+placeBin).val(binArr1[i])
		placeBin++
	}
	
	//place hx
	for(var i=0;i<binArr1.length;i++){
		$("#c"+placeHex).val(ConvertToHex($("#a"+placeHex).val()))
		placeHex++
	}*/
		
		
		
		/*
		allow this to be a reference/conversion tool and a check on learning tool
		check against the binary number to see if the ip address is correct.
		*/
		
		
		
		var dec1Answer = '';
		var dec2Answer = '';
		var dec3Answer = '';
		var dec4Answer = '';
		
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
			$("#b1").val(ConvertBinToDec($("#a1").val()));	
			$("#b2").val(ConvertBinToDec($("#a2").val()));	
			$("#b3").val(ConvertBinToDec($("#a3").val()));	
			$("#b4").val(ConvertBinToDec($("#a4").val()));
		}
		
		
		
		///check to see if the decimal is correct
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
		
		
		
		$("#answer").click(function(){
			getDecAnswer()
			$("#response").html();
		})
		
		
		
		
		
	$("#checker").click(function(){
		aa = $("#a1").val();	
		bb = $("#a2").val();	
		cc = $("#a3").val();	
		dd = $("#a4").val();
		
		
		
	/*	for(var i=0;i<4;i++){
			$("#binaryList").val(ConvertToBin($("#a"+currBin).val()));
			currBin++
		}*/
	
		///hexidecimal
/*		$("#c1").val(ConvertToHex(aa));	
		$("#c2").val(ConvertToHex(bb));	
		$("#c3").val(ConvertToHex(cc));	
		$("#c4").val(ConvertToHex(dd));
		*/
		
		//if decimal exists
/*		$("#a1").val(ConvertToHex(ConvertToDec(aa)));	
		$("#a2").val(ConvertToHex(ConvertToDec(bb)));	
		$("#a3").val(ConvertToHex(ConvertToDec(cc)));	
		$("#a4").val(ConvertToHex(ConvertToDec(dd)));*/
		//if we dont start with an ip address
		
		
		
		
		
		retrieveDecimal()
		retrieveHexFromDec()
		if($("#b1").val()== ""){
			retrieveBinFromDec()
		}
	});
	
	
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









