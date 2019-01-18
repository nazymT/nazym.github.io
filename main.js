
class ProgressBar{
    constructor(){
        this.x = 150;
        this.y = 150;
        this.r = 80;
        this.startAngle = 0;
        this.endAngle = 359.9;
    }
    setValue(input){

        if(input==100)
           this.endAngle = this.endAngle;
        else
          this.endAngle = (360*input)/100;  
        var start = polarToCartesian(this.x, this.y, this.r, this.endAngle);
        var end = polarToCartesian(this.x, this.y, this.r, this.startAngle);
    
        var largeArcFlag = this.endAngle - this.startAngle <= 180 ? "0" : "1";
    
        var d = [
            "M", start.x, start.y, 
            "A", this.r, this.r, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");
        document.getElementById("arc").setAttribute("d", d);
    }
    setMode(type,flag){
        if(type == 'animated'){
              if(flag == 'yes'){
                console.log('yes');
                document.getElementById("progress-bar").classList.add('progress-bar');
              }else{
                document.getElementById("progress-bar").classList.remove('progress-bar');
              }
         }        
    }
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  var inputValue = document.getElementById("angle").value;// get the initial value from input
  let p = new ProgressBar();
  p.setValue(inputValue);
  
 function handleValue(){// evert time when input changes value handled 
    var inputValue = document.getElementById("angle").value;
    let progress = new ProgressBar();
    if(inputValue > -1 && inputValue < 101){
      progress.setValue(inputValue)
    }
  }

  function animateProgressBar(value){// switch for animation 
    let progress = new ProgressBar();
    if(value.checked){
        progress.setMode('animated','yes');
    }else{
        progress.setMode('animated','');
    }
  }

  function hideProgressBar(value){ // switch for hideness
    if(value.checked){
       document.getElementById("arc").style.display = 'none';
    }else{  
        document.getElementById("arc").style.display = 'flex';
    }
  }