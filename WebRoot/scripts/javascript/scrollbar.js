	function Resize()
	{
	     var winHeight=document.body.clientHeight; 
		 
		 if(winHeight>=0)
		 document.getElementById("divID").style.height=(winHeight-0)+"px";
		 else 
		 document.getElementById("divID").style.height="0px";
		 
	}
