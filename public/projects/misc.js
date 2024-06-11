function lerp(value1, value2, factor) {
    //clamp
    factor = Math.max(0, Math.min(factor, 1));
  
    // float
    if (typeof value1 === 'number' && typeof value2 === 'number') {
      return (1 - factor) * value1 + factor * value2;
    }
    //vecs
    else if (Array.isArray(value1) && Array.isArray(value2)) {

      if (value1.length === 3 || value1.length === 4) {
        // Interpolate each component of the vec3 or vec4.
        return value1.map((val, index) => (1 - factor) * val + factor * value2[index]);
      } 
    } 
    else {
      throw new Error('Invalid argument types for interpolation.');
    }
}
function range(val,start,end)
{
    // Calculate progression 
    let progression = (val - start) / (end - start);
    // Clamp 
    progression = Math.max(0, Math.min(progression, 1));
    return progression;
}
//generate random charging energy lines
function getRandomLine()
{
    //rotation angle
    var deg = Math.random() * 360 ;
    var w=0.02+Math.random() *0.03;
    var l=0.5+Math.random() *2;
     //rotation axis
    const axis = [
       Math.random() * 2 - 1, 
       Math.random() * 2 - 1, 
       0                      
    ];
 
     // Normalize the axis to ensure it's a unit vector
     var length = Math.sqrt(axis[0]**2 + axis[1]**2); // only x and y components contribute
     var normalizedAxis = [axis[0] / length, axis[1] / length, 0];
     var r=(Math.random()*2+0.5)*20;
     // Add the angle and normalized axis to the beams array
     return{width:w,length:l, distance:r,angle:deg, axis: normalizedAxis };
}
//fade in fade out for transformations
function easeInOut(t) 
{
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function setCamera()
{
    //1st shot, rotate around center 
    if(actorCut>=0&&actorCut<=4)
    {
        camTarget=vec3(0,lerp(1.5,0.5,range(eTime,actorCutStart[0],actorCutStart[2]-2.0)),0);
        camRadius=lerp(2,6,easeInOut(range(eTime,actorCutStart[0],actorCutStart[2]-2.0)));
        //camera height decrease
        camY=lerp(3,0,range(eTime,actorCutStart[0],actorCutStart[2]-2.0));
        //rotate around y axis
        rotY=lerp(-170,0,easeInOut(range(eTime,actorCutStart[0],actorCutStart[2]-2.0)));
        rotRad=rotY* Math.PI / 180;
        camX=camRadius*Math.sin(rotRad);
        camZ=camRadius*Math.cos(rotRad);
        eye=vec3(camX,camY,camZ);
        //console.log(eye);
    }
    else if(actorCut>=5&&actorCut<=8)
    {
        
        camTarget=vec3(0,1.7,-0.1);
        //camTarget=vec3(0,lerp(1.5,0.5,range(eTime,actorCutStart[0],actorCutStart[2]-2.0)),0);
        camRadius=lerp(1,7,easeInOut(range(eTime,actorCutStart[5],actorCutStart[7]-1.5)));
        //camera height decrease
        camY=lerp(3,-6,range(eTime,actorCutStart[5],actorCutStart[7]-2.0));
        //rotate around y axis
        rotY=lerp(-100,340,easeInOut(range(eTime,actorCutStart[5],actorCutStart[7]-1.5)));
        rotRad=rotY* Math.PI / 180;
        camX=camRadius*Math.sin(rotRad);
        camZ=camRadius*Math.cos(rotRad);
        eye=vec3(camX,camY,camZ);
        //eye = vec3(-2,-5,7);
    }
    //3rd shot, fixed view 
    else if(actorCut>=9)
    {
        eye = vec3(4,6,-11);
        camTarget=vec3(-2,-7,15);
    }
}
