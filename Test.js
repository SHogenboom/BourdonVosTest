        var posX= 10;
        var posY = 10;
        var sizeCirckel = 5;
        var distance = posX + sizeCirckel;

        var canvasWidth = (distance * 3) + sizeCirckel;
        var canvasHeight = (distance * 3) + sizeCirckel;
        
        document.getElementById("myCanvas").width = canvasWidth;
        document.getElementById("myCanvas").height = canvasHeight;

        var verticalCirckles = 3;
        var horizontalCirckles = 3;
        
for (i = 0; i < verticalCirckles; i++) {
        
    for (x = 0; x < horizontalCirckles; x++) {
        
        if (x == 0) {
            posXstart = posX;
        } 
        
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.arc(posX,posY,sizeCirckel,0,2*Math.PI);
        ctx.stroke();
        ctx.fillstyle = "black";
        ctx.fill();
              
         posX = posX + distance;     
    } // END HORIZONTAL LOOP
    
    posX = posXstart;
    posY = posY + distance;

 } // END VERTICAL LOOP    

    
   /* var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(25,25,5,0,2*Math.PI);
    ctx.stroke();
    */
    
    /*
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    var img = document.getElementById("testImage");
    ctx.drawImage(img,1,1,50,50);
    */
    
  /*  function stimuliChange() {
        var c=document.getElementById("myCanvas");
        var ctx=c.getContext("2d");
        ctx.moveTo(0,0);
        ctx.lineTo(50,50);
        ctx.stroke();
    }
*/



    
    
    
    

    