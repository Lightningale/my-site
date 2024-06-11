//Shapes for necrozma components

//draw head
function drawHead()
{
    setColor(bodyColor);
    gTranslate(0,0.7,-0.27);

    //?act 5 rise head
    if(actorCut>=5)
    {
        gRotate(lerp(30,-120,easeInOut(range(eTime,actorCutStart[5],actorCutStart[6]))),1,0,0);//head lookup
        //?act 9 reset
        gRotate(lerp(0,120,range(eTime,actorCutStart[9],actorCutStart[10]-2)),1,0,0);//wing move down
    }

    gScale(1.3,0.9,1);
    //head structure
    gPush();
    //!
        gTranslate(0,-0.9,0.27);
        gRotate(5,1,0,0);
        
        //palate
        gPush();
            gTranslate(0,1,-0.1);
            gRotate(-90,1,0,0);
            gScale(0.5,0.8,0.4);
            drawTet();
        gPop();
        //l horn
        gPush();
            gTranslate(0.12,1.2,-0.3);
            gRotate(120,1,0,0);
            gRotate(-30,0,1,0);
            gRotate(20,0,0,1);
            gScale(0.2,0.6,0.2);
            drawTet();
        gPop();
        //r horn
        gPush();
            gTranslate(-0.12,1.2,-0.3);
            gRotate(120,1,0,0);
            gRotate(30,0,1,0);
            gRotate(-20,0,0,1);
            gScale(0.2,0.6,0.2);
            drawTet();
        gPop();
        //beakHook
        gPush();
            gTranslate(0,0.85,0.46);
            gRotate(-20,1,0,0);
            gScale(0.06,0.1,0.1);
            drawTet();
        gPop();
        //eyeL
        setColor(red);
        gPush();
            gTranslate(0.12,1.02,0.1);
            gRotate(20,0,0,1);
            gRotate(-17,0,1,0);
            gRotate(15,1,0,0);
            gScale(0.1,0.1,0.2);
            drawDiamond();
        gPop();
        //eyeR
        setColor(blue);
        gPush();
            gTranslate(-0.12,1.02,0.1);
            gRotate(-20,0,0,1);
            gRotate(17,0,1,0);
            gRotate(15,1,0,0);
            gScale(0.1,0.1,0.2);
            drawDiamond();
        gPop();
        //lower jaw
        setColor(bodyColor);
        gPush();
            gTranslate(0,0.75,-0.1);
            //?act 5 open mouth
            gRotate(lerp(-10,60,range(eTime,actorCutStart[5],actorCutStart[5]+2)),1,0,0);//open mouth
            //?act 9 reset
            gRotate(lerp(0,-70,range(eTime,actorCutStart[9],actorCutStart[10]-2)),1,0,0);//close mouth
            //gRotate(-10.0,1,0,0);//jaw rotation
            gTranslate(0,0,0.1);
            gScale(0.35,0.3,0.45);
            drawTet();
        gPop();
    gPop();
    
    /////////////////////////
    //light
    setColor(white);
    toggleADS(0);
    
    toggleFade(1);
    gPush();
    
        gPush();
            //sphere
            //!gTranslate(0,0.9,-0.27);
            gScale(scaleLC,scaleLC,scaleLC);
            //gRotate(45,0,0,1);
            gScale(0.3,0.3,0.3);
            drawSphere();
            
            //top horn
            gPush();
                gRotate(-100,1,0,0);
                gTranslate(0,0,3);
                gScale(0.5,0.7,5);
                gScale(scaleC,scaleC,scaleC);
                drawCone();
            gPop();
            //l horn
            gPush();
                gRotate(100,0,1,0);
                gTranslate(0,0,1.6);
                gScale(0.6,0.6,3);
                gScale(scaleC,scaleC,scaleC);
                drawCone();
            gPop();
            //r horn
            gPush();
                gRotate(-100,0,1,0);
                gTranslate(-0,0,1.6);
                gScale(0.6,0.6,3);
                gScale(scaleC,scaleC,scaleC);
                drawCone();
            gPop();
            //l lower horn
            gPush();
                gRotate(110,0,1,0);
                gTranslate(-0.5,-1.6,1.4);
                gRotate(40,1,0,0);
                gScale(0.15,0.15,1.0);
                gScale(scaleS,scaleS,scaleS);
                drawSphere();
            gPop();
            //r lower horn
            gPush();
                gRotate(-110,0,1,0);
                gTranslate(0.5,-1.6,1.4);
                gRotate(40,1,0,0);
                gScale(0.15,0.15,1.0);
                gScale(scaleS,scaleS,scaleS);
                drawSphere();
            gPop();
        gPop();
        //L Brow
        gPush();
            
            //eyewhite
            gTranslate(0.12,1.02,0.1);
            gTranslate(0,-0.9,0.27);
            gRotate(20,0,0,1);
            gRotate(-17,0,1,0);
            gRotate(15,1,0,0);
            gScale(0.1,0.1,0.2);
            gTranslate(0,0,0.1);
            gScale(scaleLC,scaleLC,scaleLC);
            gScale(0.4,1.6,1.6);
            drawDiamond();
            //long brow
            gTranslate(0,0,-0.5);
            gRotate(-80,0,1,0);
            gRotate(5,1,0,0);
            gTranslate(0,0,-4);
            gScale(0.3,0.5,7);
            gScale(scaleS,scaleS,scaleS);
            drawCube();
            gTranslate(0,0,-1.5);
            gScale(0.2,4,0.7);
            drawDiamond();
        gPop();
        //R brow
        gPush();
        //eyewhite
            
            gTranslate(-0.12,1.02,0.1);
            gTranslate(0,-0.9,0.27);
            gRotate(-20,0,0,1);
            gRotate(17,0,1,0);
            gRotate(15,1,0,0);
            gScale(0.1,0.1,0.2);
            gTranslate(0,0,0.1);
            gScale(scaleLC,scaleLC,scaleLC);
            gScale(0.4,1.6,1.6);
            
            drawDiamond();
            //long brow
            gTranslate(0,0,-0.5);
            gRotate(80,0,1,0);
            gRotate(5,1,0,0);
            gTranslate(0,0,-4);
            gScale(0.3,0.5,7);
            gScale(scaleS,scaleS,scaleS);
            drawCube();
            gTranslate(0,0,-1.5);
            gScale(0.2,4,0.7);
            drawDiamond();
        gPop();
    gPop();
    toggleFade(0);
}
function drawChestPlate()
{
    gTranslate(0,0,-0.8);/*
    if(actorCut==0)
    {
        gRotate(-80,1,0,0);//-80 to 0
        gTranslate(0,0,1.3);//1.3 to 0.9
    }
    else if(actorCut==1)
    {
        gRotate(-80,1,0,0);//-80 to 0
        gTranslate(0,0,1.3);//1.3 to 0.9
    }
    else
    {
        gRotate(-0,1,0,0);//-80 to 0
        gTranslate(0,0,0.9);//1.3 to 0.9
    }*/

    gRotate(lerp(-85,0,range(eTime,actorCutStart[1],actorCutStart[2]-3)),1,0,0);//-80 to 0
    gTranslate(
        0,
        lerp(-0.75,0,range(eTime,actorCutStart[1],actorCutStart[2]-3)),
        lerp(0.6,0.9,range(eTime,actorCutStart[1],actorCutStart[2]-3))
        );//1.3 to 0.9
    setColor(bodyColor);
        toggleADS(1);
        gScale(0.7,0.7,0.7);//scale chestplate here
        gPush();
            gTranslate(0,0,0);
            gScale(1,2,0.6);
            drawTet();
        gPop();
        gPush();
        //spike
        for(let i=0;i<3;i++)
        {
            gPush();
                gTranslate(0,-0.1,-1.1);
                gRotate(-5+20*i,1,0,0);
                gTranslate(0,0,1.7);
                if(i==0)
                {
                    gTranslate(0,0,0.15);
                }
                gScale(0.15,0.15,0.5);
                drawCone();
                //gScale(0.2,0.2,0.4);
                //drawTet();
            gPop();  
        }        
        gPop();
}
function drawClaw()
{
    for(let i=0;i<3;i++)
    {
        gPush();
            gRotate(-40+i*40,0,1,0);
            gTranslate(0,-0.25,0.25);
            //base
            gPush();
                gRotate(45,1,0,0);
                gScale(0.15,0.15,0.5);
                drawCylinder();
            gPop();
            //tip
            gRotate(7*Math.sin(eTime*4/Math.PI),1,0,0);//claw bend
            gTranslate(0,-0.36,0.19);
            gRotate(90,1,0,0);
            gScale(0.08,0.08,0.5);
            drawCone();
        gPop();
    }
}
function drawFoot()
{
    //light component

    setColor(white);
    toggleADS(0);
    gRotate(-15,1,0,0);
    gTranslate(0,-0.5,0);//thigh center
    gPush();
        //gTranslate(0,0.5,0);
        gScale(scaleLC,scaleLC,scaleLC);
        gScale(0.2,0.5,0.2);
        drawCube();
    gPop();
    setColor(bodyColor);
    toggleADS(1);
    gTranslate(0,-0.5,0);//move to knee joint
    gRotate(30,1,0,0);
    if(actorCut>=5&&actorCut<=6)
        gRotate(20,1,0,0);
    gRotate(5*Math.cos(eTime*4/Math.PI),1,0,0);//sway knee
    //Foot structure
    gPush();
        gTranslate(0,-0.5,0);
        gRotate(45,0,1,0);
        gScale(0.25,0.5,0.25);
        drawCube();
    gPop();
    //spike
    gPush();
        gTranslate(0,-0.5,0);
        gRotate(40,1,0,0);
        gRotate(45,0,1,0);
        gTranslate(0,0.3,0);
        gScale(0.125,0.6,0.125);
        drawCube();
    gPop();
    //claw
    gTranslate(0,-0.8,0.15);
    gRotate(15,1,0,0);
    drawClaw();
    
}
//single wing component
function drawSubWing(scale)
{
    setColor(bodyColor);
    toggleADS(1);
    gTranslate(0,0,0.8);//bone center
    gPush();
        gScale(0.08,0.08,0.8);
        drawCube();
    gPop();
    setColor(white);
    toggleADS(0);
    toggleFade(1);
    //light components
    gPush();
        gScale(scaleLC,scaleLC,scaleLC);
        //rect membrane
        gPush();
            gTranslate(0,-0.3,0.3);
            gScale(0.06,0.3,0.7);
            drawCube();
        gPop();
    
        //tet membrane 1
        gPush();
            gTranslate(0,-0.3,-0.1);
            gRotate(80,1,0,0);
            gScale(0.06,0.8,1.0*scaleS);
            drawTet();
        gPop();
        //tet membrane 2
        gPush();
            gTranslate(0,-0.35*scale,1.2);
            gRotate(60-scale*10,1,0,0);
            gScale(0.06,0.8,1.4);
            gScale(1,1,scale*scaleC);
            drawTet();
        gPop();
    gPop();
    toggleFade(0);
}

function drawTail()
{
    //toggleADS(1);
    toggleFade(1);
    gPush();
        
        gTranslate(0,-1.6,-0.5);//1st segment root
        gScale(scaleLC,scaleLC,scaleLC);
        gPush();
            gScale(0.4,0.4,0.4);
            drawSphere();
        gPop();
        //1st segment
        gRotate(40,1,0,0);//tail bending
        gRotate(15*Math.cos(eTime*1.5),0,0,1);//tail swaying
        gTranslate(0,-0.6,0);//move to tail center
        gPush();
            gScale(0.32,0.6,0.32);
            drawCube();
        gPop();
        //spike
        gPush();
            gRotate(180,1,0,0);
            gTranslate(0,0,0.3);
            gScale(0.4,0.4,0.7);
            drawTet();
        gPop();
        //2nd segment
        gTranslate(0,-0.5,0);//move to tail center
        gRotate(5,1,0,0);//tail bending
        gRotate(15*Math.cos(eTime*1.5),0,0,1);//tail swaying
        gTranslate(0,-0.6,0);//move to tail center
        gPush();
            gScale(0.3,0.5,0.3);
            drawCube();
        gPop();
        //spike
        gPush();
            gRotate(180,1,0,0);
            gTranslate(0,0,0.3);
            gScale(0.3,0.3,0.8);
            drawTet();
        gPop();
        //3rd segment
        gTranslate(0,-0.5,0);//move to segment root
        gRotate(5,1,0,0);//tail bending
        gRotate(10*Math.cos(eTime*1.5),0,0,1);//tail swaying
        gTranslate(0,-0.6,0);//move to tail center
        gPush();
            gRotate(100,1,0,0);
            gScale(0.5,0.6,2);
            drawTet();
        gPop();
        //spike
        gPush();
            gRotate(180,1,0,0);
            gTranslate(0,0,0.3);
            gScale(0.3,0.3,0.8);
            drawTet();
        gPop();

    gPop();
    toggleFade(0);
}
//full wing
function drawWing()
{
    
    gRotate(110,0,1,0);
    gRotate(10,0,0,1);
    //first bone
    drawSubWing(1);

    //second bone
    gTranslate(0,0,0.75);//1st bone tip
    //?act5
    gRotate(lerp(0,-40,range(eTime,actorCutStart[5],actorCutStart[6])),1,0,1);//wing move up
    //?act 9 reset
    gRotate(lerp(0,40,range(eTime,actorCutStart[9],actorCutStart[10])),1,0,0);//wing move down
    //?act2
    gRotate(lerp(-120,0,range(eTime,actorCutStart[1],actorCutStart[2]-1)),0,1,0);//-80 to 0
    gRotate(-10,1,0,0);//bone rotation

    drawSubWing(2);

    //claw
    gTranslate(0,0,0.75);//move to 2nd bone tip
    gRotate(-90,0,0,1);//claw face dir
    gRotate(-40,0,1,0);//claw spin dir
    gTranslate(0,0,0);
    //draw claw
    setColor(bodyColor);
    toggleADS(1);
    gPush();
        drawClaw();
    gPop();
}
//draw all limbs on one side
function drawLimbs()
{
    //draw l top wing
    gPush();
        //gTranslate(0.4,0.45,-0.25);
        gTranslate(
            lerp(0.3,0.4,range(eTime,actorCutStart[1],actorCutStart[2]-3)),
            lerp(0.4,0.45,range(eTime,actorCutStart[1],actorCutStart[2]-3)),
            lerp(-0.1,-0.25,range(eTime,actorCutStart[1],actorCutStart[2]-3))
        );
        //?act 5 charging
        gRotate(lerp(0,10,range(eTime,actorCutStart[5],actorCutStart[6])),0,0,1);//wing move up
        //?act 9 reset
        gRotate(lerp(0,-10,range(eTime,actorCutStart[9],actorCutStart[10])),0,0,1);//wing move down
        //?act1
        gRotate(lerp(30,0,range(eTime,actorCutStart[1],actorCutStart[2]-3)),1,0,0);//
        gRotate(lerp(40,0,range(eTime,actorCutStart[1],actorCutStart[2]-3)),0,1,0);//
        gRotate(lerp(-50,0,range(eTime,actorCutStart[1],actorCutStart[2]-3)),0,0,1);//
        gRotate(10,0,0,1);
        if(actorCut==4||actorCut>=9)
            gRotate(10*lerp(0,Math.sin(eTime*4/Math.PI),range(eTime,actorCutStart[4],actorCutStart[4]+0.2)),0,0,1);//flap wing
        gScale(0.7,0.7,0.7);
        drawWing();
    gPop();
    //draw l low wing
    gPush();
        
        gTranslate(
            lerp(0.1,0.8,range(eTime,actorCutStart[1],actorCutStart[2]-2)),
            lerp(-0.6,-1.2,range(eTime,actorCutStart[1],actorCutStart[2]-2)),
            -0.25);
        
        //?act 5 charging
        gRotate(lerp(0,10,range(eTime,actorCutStart[5],actorCutStart[6])),0,0,1);//wing move up
        //?act 9 reset
        gRotate(lerp(0,-10,range(eTime,actorCutStart[9],actorCutStart[10])),0,0,1);//wing move down
        //?act1
        gRotate(lerp(-80,0,range(eTime,actorCutStart[1],actorCutStart[2]-2)),0,0,1);//-80 to 0
        gRotate(lerp(50,0,range(eTime,actorCutStart[1],actorCutStart[2]-2)),0,1,0);//
        if(actorCut==4||actorCut>=9)
            gRotate(10*lerp(0,Math.sin(eTime*4/Math.PI),range(eTime,actorCutStart[4],actorCutStart[4]+0.2)),0,0,1);//flap wing
        //gScale(1.2,1.2,1.2);
        drawWing();
    gPop();
    //draw l foot
    gPush();
    //gScale(-1,1,1);
        //gTranslate(0.6,-1.1,-0.25);
        gTranslate(
            lerp(1.1,0.6,range(eTime,actorCutStart[1],actorCutStart[2]-1)),
            lerp(1.4,-1.1,range(eTime,actorCutStart[1],actorCutStart[2]-1)),
            lerp(-0.05,-0.25,range(eTime,actorCutStart[1],actorCutStart[2]-1)),);
        gRotate(lerp(40,10,range(eTime,actorCutStart[1],actorCutStart[2]-1)),0,1,0);
        drawFoot();
    gPop();
}
function drawNecrozma()
{
    setColor(bodyColor);
    toggleADS(1);
    gPush();
        gTranslate(0,-1.2,-0.2);//move to pelvis
        //drawSphere();
        //?act5, charging
        gRotate(lerp(10,-10,range(eTime,actorCutStart[5],actorCutStart[6])),1,0,0);//body move back
        //?act7 attack
        gRotate(lerp(0,160,easeInOut(range(eTime,actorCutStart[7],actorCutStart[8]))),1,0,0);//body move back
        //?act9 reset stance
        gRotate(lerp(0,-160,easeInOut(range(eTime,actorCutStart[9],actorCutStart[10]-2.0))),1,0,0);//body move back
        gTranslate(0,1.2,0.2);
        //draw body
        gPush();
            gTranslate(0,-0.2,-0.25);
            gScale(0.6,1.3,0.6);
            drawTet();
        gPop();
        //draw head
        gPush();
            gTranslate(0,lerp(-0.4,0.7,range(eTime,actorCutStart[1],actorCutStart[2]-3)),0);//1.3 to 0.9
            drawHead();
        gPop();
        //draw chestplate
        gPush();
            drawChestPlate();
        gPop();
        
        gPush();
            drawLimbs();
            gScale(-1,1,1);//mirror limbs over yz plane
            drawLimbs();
        gPop();


        //light components
        setColor(white);
        toggleADS(0);
        //toggleFade(1);
        //torso
        gPush();
            gScale(scaleLC,scaleLC,scaleLC);//make the light body parts appear
            gPush();
                gTranslate(0,-0.35,-0.3);
                gRotate(90,1,0,0);
                gScale(0.3,0.3,1);
                drawCube();
                //neck
                gTranslate(0,0.1,-1.2);
                gRotate(180,1,0,0);
                gScale(0.75,0.75,1);
                drawCone();
                gScale(0.5,0.5,0.3);
                drawCube();
            gPop();
            gPush();
                gTranslate(0,-1.4,-0.4);
                gRotate(90,1,0,0);
                gScale(0.9,0.9,0.9);
                drawTet();
            gPop();
            //tail
            gPush();
                drawTail();
            gPop();
        gPop();

    gPop();
}

function drawLightball(timestamp)
{
    gPush();
    gTranslate(0,1.7,-0.1);//head center
    gl.useProgram(program2);
    curShader=1;
    gl.uniform1f(gl.getUniformLocation(program2, "uTime"), timestamp);
    //setAllMatrices();
    //gl.disable(gl.DEPTH_TEST); 
    //?act 5 - 6 charging process
    var r=lerp(0.4,1.0,Math.pow(range(eTime,actorCutStart[5],actorCutStart[6]),2));
    var scaleCharge=lerp(0,0.5,Math.pow(range(eTime,actorCutStart[5],actorCutStart[6]),2));
    var distFactor;
    r+=lerp(0.0,9.0,Math.pow(range(eTime,actorCutStart[6],actorCutStart[7]),0.7));
    scaleCharge+=lerp(0.0,8.5,Math.pow(range(eTime,actorCutStart[6],actorCutStart[7]),0.7));
    var angle=lerp(-50,100,easeInOut(range(eTime,actorCutStart[5],actorCutStart[6])));
    var angleRad=angle * Math.PI / 180;
    var z=r * Math.cos(angleRad);
    var y=r * Math.sin(angleRad);
    gTranslate(0,y,z);//lightball center of charging. final value(0,9,0)
    //?act 5 to 6 draw charging energy
    if(actorCut>=5&&actorCut<=6)
    {
        for(let i=0;i<lerp(1,lightLines.length,Math.pow(range(eTime,actorCutStart[5],actorCutStart[6]),2));i++)
        {
            gPush();
                gRotate(lightLines[i].angle,lightLines[i].axis[0],lightLines[i].axis[1],0);
                gTranslate(0,0,lightLines[i].distance);
                width=lerp(0.001,lightLines[i].width,Math.pow(range(eTime,actorCutStart[5],actorCutStart[6]),2));
                gScale(width,width,lightLines[i].length);
                drawCube();
                lightLines[i].distance-=dt*70;
                if(lightLines[i].distance<=r)
                    lightLines[i]=getRandomLine();
            gPop();
        }
    }
    //-------------lightball launched-------------------
    //-------------distancing-----------------
    if(actorCut>=7&&actorCut<=8)//front view
    {
        
        gTranslate(
            0,
            lerp(0,-100,range(eTime,actorCutStart[7],actorCutStart[9])),
            lerp(0,40,range(eTime,actorCutStart[7],actorCutStart[9]))
        );
        distFactor=lerp(1,0.1,Math.pow(range(eTime,actorCutStart[7],actorCutStart[9]),1/8));
        gScale(distFactor,distFactor,distFactor);
    }
    if(actorCut==9)//back view
    {
        gTranslate(
            1.71,
            lerp(-10,-13.9,range(eTime,actorCutStart[9],actorCutStart[10])),
            lerp(5,8.24,range(eTime,actorCutStart[9],actorCutStart[10]))
        );
        distFactor=lerp(0.4,0.005,Math.pow(range(eTime,actorCutStart[9],actorCutStart[10]),1/2));
        gScale(distFactor,distFactor,distFactor);
    }

    //--------------scaling------------------------------
    //?act6, charging
    gScale(scaleCharge,scaleCharge,scaleCharge);
    drawSphere(1);

    gPop();  
}