function initCOL(startNum){
	$("#hexTab").hide();
	var whichQuestion = startNum;
	
	

	var binArr1 = [['11000011','11100001','00001010','11100111'],['128','111','1','0'],['255','255','255','224'],['01010011','11010011','00111011','01000011']];
	
	
	var questions = ['Convert the IP Address provided below from binary to decimal. Type your answer into each octet in the IP ADDRESS IN DECIMAL area. When you are done, select the SUBMIT button to score your answer.'
,
'A computer on a classful network has the IP Address shown below. Type the Network Mask, the Network ID, and the Host ID in decimal. When you are done, select the SUBMIT button to score your answer.'
,
'Convert the subnet mask 128.111.1.0 into binary and type your answer in the SUBNET MASK IN BINARY area. Determine the NUMBER OF SUBNETS and the NUMBER OF USABLE HOSTS PER SUBNET and type your answers. When done, select the SUBMIT button to score your answers.'
,
'Convert the IP Address provided below from binary to decimal. Type your answer into each octet in the IP ADDRESS IN DECIMAL area. When you are done, select the SUBMIT button to score your answer.'
,
'A computer on a classful network has the IP Address shown below. Type the Network Mask, the Network ID, and the Host ID in decimal. When you are done, select the SUBMIT button to score your answer.'
,
'Convert the subnet mask 255.255.255.224 into binary and type your answer in the SUBNET MASK IN BINARY area. Then, determine the NUMBER OF SUBNETS and the NUMBER OF USABLE HOSTS PER SUBNET and type in your answers. When you are done, select the SUBMIT button to score your answers.'];
	
	
	
	
	switch(whichQuestion){
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
	};
	
	//place binary
	function placeBin(){
		var placeBin = 1;
			for(var i=0;i<binArr1[whichQuestion].length;i++){
				$("#b"+placeBin).val(binArr1[whichQuestion][i])
				placeBin++
			}
	}
	//place dec
	function placeDec(){
		var placeBin = 1;
			for(var i=0;i<binArr1[whichQuestion].length;i++){
				$("#a"+placeBin).val(binArr1[whichQuestion][i])
				placeBin++
			}
	}
	
	
	$("#question").html(questions[whichQuestion]);
	//$("#binaryList").val(binArr1.join(""));
	
		
}	