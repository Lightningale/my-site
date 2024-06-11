
var canvas;
var gl;
var audio;
var playButton;
var program;
var program2;
var curShader=0;
var fieldOfView = Math.PI / 3; // in radians (60 degrees)
var aspect;
var near = 0.1;
var far = 100;
var renderReady=0;
var audioReady=0;
var left = -6.0;
var right = 6.0;
var ytop =6.0;
var bottom = -6.0;
//predefined color vectors
var gold=vec4(1.0,0.873,0.4,1.0);
var grey=vec4(0.2,0.2,0.2,1.0);
var bodyColor;
var white=vec4(1.0,1.0,1.0,1.0);
var red=vec4(1.0,0.2,0.2,1.0);
var blue=vec4(0.2,0.2,1.0,1.0);

var fpsCounter;
var frameCount=0;
var lightLines=[];
var lightPosition2 = vec4(100.0, 100.0, 100.0, 1.0 );
var lightPosition = vec4(0.0, 0.0, 100.0, 1.0 );

var lightAmbient = vec4(0.3, 0.3, 0.3, 1.0 );
//var lightAmbient = vec4(1.0, 1.0, 1.0, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

var materialAmbient = vec4( 1.0, 0.0, 1.0, 1.0 );
var materialDiffuse = vec4( 1.0, 0.8, 0.0, 1.0 );
var materialSpecular = vec4( 0.4, 0.4, 0.4, 1.0 );
var materialShininess = 30.0;

var ambientColor, diffuseColor, specularColor;

var modelMatrix, viewMatrix, modelViewMatrix, projectionMatrix, normalMatrix;
var modelViewMatrixLoc, projectionMatrixLoc, normalMatrixLoc;
var modelViewMatrixLoc2, projectionMatrixLoc2, normalMatrixLoc2;
var eye=vec3(0.0, 0.0, 0.0);;
var camTarget=vec3(0.0, 0.0, 0.0);
var at = vec3(0.0, 0.0, 0.0);
var up = vec3(0.0, 1.0, 0.0);

var RX = 0;
var RY = 0;
var RZ = 0;

var MS = []; // The modeling matrix stack
var TIME = 0.0; // Realtime
var dt = 0.0
var prevTime = 0.0;
var resetTimerFlag = true;
var animFlag = true;
var controller;
var eTime=-0.01;
var fpsTime=0.0;
var scaleS;//sin scale factor
var scaleC;//cos scale factor
var scaleLC=0.0;//scale of light components
var scaleLB=0.0;//scale of lightball
// These are used to store the current state of objects.
// In animation it is often useful to think of an object as having some DOF
// Then the animation is simply evolving those DOF over time.
var earthRotation = [0,0,0];
var bouncingCubePosition = [0,4,0];
var bouncyBallVelocity = 0;
var bouncyEnergyLoss = 0.9;
var gravity = -9.8;

//cuts in movie:0intro,1move limbs,2wait,3henshin,4idle,5lookup,6charge,7attack,8wait,9reset,10explode
var actorCutTime=[4.4,5.6,0.5,4.8];
var actorCutStart=[0,4.4,9,10,10.3,21,26,31.8,32,33,38,44];
var actorCut=-1;
var blendTextures = 0;

//calculate projection matrix for perspective camera
function perspective(fieldOfViewInRadians, aspect, near, far) {
    var f = 1.0 / Math.tan(fieldOfViewInRadians / 2);
    var rangeInv = 1 / (near - far);
  
    return [
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (near + far) * rangeInv, -1,
      0, 0, near * far * rangeInv * 2, 0
    ];
  }
		
// For this example we are going to store a few different textures here
var textureArray = [] ;

// Setting the colour which is needed during illumination of a surface
function setColor(c)
{
    ambientProduct = mult(lightAmbient, c);
    diffuseProduct = mult(lightDiffuse, c);
    specularProduct = mult(lightSpecular, materialSpecular);
    
    gl.uniform4fv( gl.getUniformLocation(program,
                                         "ambientProduct"),flatten(ambientProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
                                         "diffuseProduct"),flatten(diffuseProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
                                         "specularProduct"),flatten(specularProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
                                         "lightPosition"),flatten(lightPosition2) );
    gl.uniform1f( gl.getUniformLocation(program, 
                                        "shininess"),materialShininess );
}

// We are going to asynchronously load actual image files this will check if that call if an async call is complete
// You can use this for debugging
function isLoaded(im) {
    if (im.complete) {
        console.log("loaded") ;
        return true ;
    }
    else {
        console.log("still not loaded!!!!") ;
        return false ;
    }
}

// Helper function to load an actual file as a texture
// NOTE: The image is going to be loaded asyncronously (lazy) which could be
// after the program continues to the next functions. OUCH!
function loadFileTexture(tex, filename,lod)
{
	//create and initalize a webgl texture object.
    tex.textureWebGL  = gl.createTexture();
    tex.image = new Image();
    tex.image.src = filename ;
    tex.isTextureReady = false ;
    tex.image.onload = function() { handleTextureLoaded(tex,lod); }
}

// Once the above image file loaded with loadFileTexture is actually loaded,
// this funcion is the onload handler and will be called.
function handleTextureLoaded(textureObj,lod) {
	//Binds a texture to a target. Target is then used in future calls.
		//Targets:
			// TEXTURE_2D           - A two-dimensional texture.
			// TEXTURE_CUBE_MAP     - A cube-mapped texture.
			// TEXTURE_3D           - A three-dimensional texture.
			// TEXTURE_2D_ARRAY     - A two-dimensional array texture.
    gl.bindTexture(gl.TEXTURE_2D, textureObj.textureWebGL);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); // otherwise the image would be flipped upsdide down
	
	//texImage2D(Target, internalformat, width, height, border, format, type, ImageData source)
    //Internal Format: What type of format is the data in? We are using a vec4 with format [r,g,b,a].
        //Other formats: RGB, LUMINANCE_ALPHA, LUMINANCE, ALPHA
    //Border: Width of image border. Adds padding.
    //Format: Similar to Internal format. But this responds to the texel data, or what kind of data the shader gets.
    //Type: Data type of the texel data
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureObj.image);
	
	//Set texture parameters.
    //texParameteri(GLenum target, GLenum pname, GLint param);
    //pname: Texture parameter to set.
        // TEXTURE_MAG_FILTER : Texture Magnification Filter. What happens when you zoom into the texture
        // TEXTURE_MIN_FILTER : Texture minification filter. What happens when you zoom out of the texture
    //param: What to set it to.
        //For the Mag Filter: gl.LINEAR (default value), gl.NEAREST
        //For the Min Filter: 
            //gl.LINEAR, gl.NEAREST, gl.NEAREST_MIPMAP_NEAREST, gl.LINEAR_MIPMAP_NEAREST, gl.NEAREST_MIPMAP_LINEAR (default value), gl.LINEAR_MIPMAP_LINEAR.
    //Full list at: https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
	
      //Disable LOD
    if(lod==0)
    {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
    else
    {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
    }
	//Generates a set of mipmaps for the texture object.
        /*
            Mipmaps are used to create distance with objects. 
        A higher-resolution mipmap is used for objects that are closer, 
        and a lower-resolution mipmap is used for objects that are farther away. 
        It starts with the resolution of the texture image and halves the resolution 
        until a 1x1 dimension texture image is created.
        */
    gl.generateMipmap(gl.TEXTURE_2D);
	
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); //Prevents s-coordinate wrapping (repeating)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); //Prevents t-coordinate wrapping (repeating)
    gl.bindTexture(gl.TEXTURE_2D, null);
    console.log(textureObj.image.src) ;
    
    textureObj.isTextureReady = true ;
}

// Takes an array of textures and calls render if the textures are created/loaded
// This is useful if you have a bunch of textures, to ensure that those files are
// actually laoded from disk you can wait and delay the render function call
// Notice how we call this at the end of init instead of just calling requestAnimFrame like before
function waitForTextures(texs) {
    setTimeout(
		function() {
			   var n = 0 ;
               for ( var i = 0 ; i < texs.length ; i++ )
               {
                    console.log(texs[i].image.src) ;
                    n = n+texs[i].isTextureReady ;
               }
               wtime = (new Date()).getTime() ;
               if( n != texs.length )
               {
               		console.log(wtime + " not ready yet") ;
               		waitForTextures(texs) ;
               }
               else
               {
               		console.log("ready to render") ;
					render(0);
                    //renderReady=1;
               }
		},
	5) ;
}

// This will use an array of existing image data to load and set parameters for a texture
// We'll use this function for procedural textures, since there is no async loading to deal with
function loadImageTexture(tex, image) {
	//create and initalize a webgl texture object.
    tex.textureWebGL  = gl.createTexture();
    tex.image = new Image();

	//Binds a texture to a target. Target is then used in future calls.
		//Targets:
			// TEXTURE_2D           - A two-dimensional texture.
			// TEXTURE_CUBE_MAP     - A cube-mapped texture.
			// TEXTURE_3D           - A three-dimensional texture.
			// TEXTURE_2D_ARRAY     - A two-dimensional array texture.
    gl.bindTexture(gl.TEXTURE_2D, tex.textureWebGL);

	//texImage2D(Target, internalformat, width, height, border, format, type, ImageData source)
    //Internal Format: What type of format is the data in? We are using a vec4 with format [r,g,b,a].
        //Other formats: RGB, LUMINANCE_ALPHA, LUMINANCE, ALPHA
    //Border: Width of image border. Adds padding.
    //Format: Similar to Internal format. But this responds to the texel data, or what kind of data the shader gets.
    //Type: Data type of the texel data
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texSize, texSize, 0, gl.RGBA, gl.UNSIGNED_BYTE, image);
	
	//Generates a set of mipmaps for the texture object.
        /*
            Mipmaps are used to create distance with objects. 
        A higher-resolution mipmap is used for objects that are closer, 
        and a lower-resolution mipmap is used for objects that are farther away. 
        It starts with the resolution of the texture image and halves the resolution 
        until a 1x1 dimension texture image is created.
        */
    gl.generateMipmap(gl.TEXTURE_2D);
	
	//Set texture parameters.
    //texParameteri(GLenum target, GLenum pname, GLint param);
    //pname: Texture parameter to set.
        // TEXTURE_MAG_FILTER : Texture Magnification Filter. What happens when you zoom into the texture
        // TEXTURE_MIN_FILTER : Texture minification filter. What happens when you zoom out of the texture
    //param: What to set it to.
        //For the Mag Filter: gl.LINEAR (default value), gl.NEAREST
        //For the Min Filter: 
            //gl.LINEAR, gl.NEAREST, gl.NEAREST_MIPMAP_NEAREST, gl.LINEAR_MIPMAP_NEAREST, gl.NEAREST_MIPMAP_LINEAR (default value), gl.LINEAR_MIPMAP_LINEAR.
    //Full list at: https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); //Prevents s-coordinate wrapping (repeating)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); //Prevents t-coordinate wrapping (repeating)
    gl.bindTexture(gl.TEXTURE_2D, null);

    tex.isTextureReady = true;
}

// This just calls the appropriate texture loads for this example adn puts the textures in an array
function initTexturesForExample() {
    textureArray.push({}) ;
    loadFileTexture(textureArray[textureArray.length-1],"stars.jpg",0) ;
    textureArray.push({}) ;
    loadFileTexture(textureArray[textureArray.length-1],"earth4k.jpg",0) ;
    textureArray.push({}) ;
    loadFileTexture(textureArray[textureArray.length-1],"sun.jpg",0) ;
}

// Turn texture use on and off
function toggleTextureBlending(option) {
    //blendTextures = (blendTextures + 1) % 2
	gl.uniform1i(gl.getUniformLocation(program, "blendTextures"), option);
}
// Turn bloom on and off
function toggleFade(n) {
    
	gl.uniform1i(gl.getUniformLocation(program, "fade"), n);
}
// Turn ADS on and off
function toggleADS(n) {
    
	gl.uniform1i(gl.getUniformLocation(program, "ads"), n);
}
// Set brightness factor
function setBrightness(n) {
    
	gl.uniform1i(gl.getUniformLocation(program, "brightness"), n);
}
function updateFps() {

  
    // Update FPS every 2 seconds
    if (fpsTime > 2.0) {
      let fps = frameCount / fpsTime ;
      fpsCounter.textContent = `FPS: ${Math.round(fps)}`; // Display the FPS
      console.log("fps:",fps);
      frameCount = 0; // Reset the frame counter
      fpsTime=0;
    }
  }
  
window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );
    fpsCounter = document.getElementById('fpsCounter');
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.5, 0.5, 1.0, 1.0 );
    aspect = canvas.width / canvas.height; 
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vs_base", "fs_base" );
    program2 = initShaders( gl, "vs_base", "fs_2" );

    gl.useProgram( program );
    

    setColor(materialDiffuse);
	
	// Initialize some shapes, note that the curved ones are procedural which allows you to parameterize how nice they look
	// Those number will correspond to how many sides are used to "estimate" a curved surface. More = smoother
    Cube.init(program);
    Cylinder.init(20,program);
    Cone.init(20,program);
    Sphere.init(36,program);
    Cube.init(program2);
    Cylinder.init(20,program2);
    Cone.init(20,program2);
    Sphere.init(36,program2);
    Tetrahedron.init(program);
    Tetrahedron.init(program2);

    // Matrix uniforms
    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    normalMatrixLoc = gl.getUniformLocation( program, "normalMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );
    //For second program
    modelViewMatrixLoc2 = gl.getUniformLocation( program2, "modelViewMatrix" );
    normalMatrixLoc2 = gl.getUniformLocation( program2, "normalMatrix" );
    projectionMatrixLoc2 = gl.getUniformLocation( program2, "projectionMatrix" );
    // Lighting Uniforms
    gl.uniform4fv( gl.getUniformLocation(program, 
       "ambientProduct"),flatten(ambientProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, 
       "diffuseProduct"),flatten(diffuseProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, 
       "specularProduct"),flatten(specularProduct) );	
    gl.uniform4fv( gl.getUniformLocation(program, 
       "lightPosition"),flatten(lightPosition) );
    gl.uniform1f( gl.getUniformLocation(program, 
       "shininess"),materialShininess );
	
    for(let i=0;i<50;i++)
    {
        lightLines.push(getRandomLine());
    }
	// Helper function just for this example to load the set of textures
    initTexturesForExample() ;
    
    waitForTextures(textureArray);
    /*
    audio = document.getElementById("bgm");
    playButton = document.getElementById('playButton');
    //playBGM();
    playButton.addEventListener('click', function() {
        if (renderReady === 1) {
            // Start the audio
            audio.play();
            prevTime=0;
            eTime=0;
            actorCut=-1;
            audio.currentTime=0;
            // Start the WebGL rendering
            render(0);
        } else {
            // Optionally handle the case where textures are not yet ready
            console.log('still loading.');
        }
    });*/
}

// Sets the modelview and normal matrix in the shaders
function setMV() {
    modelViewMatrix = mult(viewMatrix,modelMatrix);
    normalMatrix = inverseTranspose(modelViewMatrix);
    if(curShader==0)
    {
        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix) );
        gl.uniformMatrix4fv(normalMatrixLoc, false, flatten(normalMatrix) );
    }
    
    else
    {
        
        gl.uniformMatrix4fv(modelViewMatrixLoc2, false, flatten(modelViewMatrix) );
        gl.uniformMatrix4fv(normalMatrixLoc2, false, flatten(normalMatrix) );
    }
    
}

// Sets the projection, modelview and normal matrix in the shaders
function setAllMatrices() {
    if(curShader==0)
    {
        gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix) );
    }
    else
    {
        gl.uniformMatrix4fv(projectionMatrixLoc2, false, flatten(projectionMatrix) );
    }
    
    setMV();   
}

// Draws a 2x2x2 cube center at the origin
// Sets the modelview matrix and the normal matrix of the global program
// Sets the attributes and calls draw arrays
function drawCube() {
    setMV();
    Cube.draw();
}

// Draws a sphere centered at the origin of radius 1.0.
// Sets the modelview matrix and the normal matrix of the global program
// Sets the attributes and calls draw arrays
function drawSphere() {
    setMV();
    Sphere.draw();
}

// Draws a cylinder along z of height 1 centered at the origin
// and radius 0.5.
// Sets the modelview matrix and the normal matrix of the global program
// Sets the attributes and calls draw arrays
function drawCylinder() {
    setMV();
    Cylinder.draw();
}

// Draws a cone along z of height 1 centered at the origin
// and base radius 1.0.
// Sets the modelview matrix and the normal matrix of the global program
// Sets the attributes and calls draw arrays
function drawCone() {
    setMV();
    Cone.draw();
}
function drawTet() {
    setMV();
    Tetrahedron.draw();
}
function drawDiamond() {
    gPush();
    gTranslate(0,0,0.33);
    drawTet();
    gTranslate(0,0,-0.66);
    gRotate(180,0,1,0);
    drawTet();
    gPop();
}

// Draw a Bezier patch
function drawB3(b) {
	setMV() ;
	b.draw() ;
}

// Post multiples the modelview matrix with a translation matrix
// and replaces the modeling matrix with the result
function gTranslate(x,y,z) {
    modelMatrix = mult(modelMatrix,translate([x,y,z]));
}

// Post multiples the modelview matrix with a rotation matrix
// and replaces the modeling matrix with the result
function gRotate(theta,x,y,z) {
    modelMatrix = mult(modelMatrix,rotate(theta,[x,y,z]));
}

// Post multiples the modelview matrix with a scaling matrix
// and replaces the modeling matrix with the result
function gScale(sx,sy,sz) {
    modelMatrix = mult(modelMatrix,scale(sx,sy,sz));
}

// Pops MS and stores the result as the current modelMatrix
function gPop() {
    modelMatrix = MS.pop();
}

// pushes the current modelViewMatrix in the stack MS
function gPush() {
    MS.push(modelMatrix);
}



function render(timestamp) {

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    setCamera();
    MS = []; // Initialize modeling matrix stack
	
	// initialize the modeling matrix to identity
    modelMatrix = mat4();
    
    // set the camera matrix
    viewMatrix = lookAt(eye, camTarget, up);
   
    // set the projection matrix
    //projectionMatrix = ortho(left, right, bottom, ytop, near, far);
    projectionMatrix = perspective(fieldOfView, aspect, near, far);
    
    // set all the matrices
    setAllMatrices();
    
	if( animFlag )
    {
		// dt is the change in time or delta time from the last frame to this one
		// in animation typically we have some property or degree of freedom we want to evolve over time
		// For example imagine x is the position of a thing.
		// To get the new position of a thing we do something called integration
		// the simpelst form of this looks like:
		// x_new = x + v*dt
		// That is the new position equals the current position + the rate of of change of that position (often a velocity or speed), times the change in time
		// We can do this with angles or positions, the whole x,y,z position or just one dimension. It is up to us!
		dt = (timestamp - prevTime) / 1000.0;
		prevTime = timestamp;
        eTime+=dt;
        fpsTime+=dt;
        frameCount++; // Increment the frame counter
        updateFps();
        //switch to new cut
        if(eTime>=actorCutStart[actorCut+1])
        {
            if(actorCut==actorCutStart.length-2)
            {
                //audio.currentTime=0;
                //audio.play();
                eTime=0;
            }
                
            actorCut=(actorCut+1)%(actorCutStart.length-1);
        }
        scaleS=1.0+0.1*Math.sin(eTime*5);
        scaleC=1.0+0.1*Math.cos(eTime*5);
	}
	
	// We need to bind our textures, ensure the right one is active before we draw
	//Activate a specified "texture unit".
    //Texture units are of form gl.TEXTUREi | where i is an integer.
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, textureArray[0].textureWebGL);
	gl.uniform1i(gl.getUniformLocation(program, "texture1"), 0);
	
	gl.activeTexture(gl.TEXTURE1);
	gl.bindTexture(gl.TEXTURE_2D, textureArray[2].textureWebGL);
	gl.uniform1i(gl.getUniformLocation(program, "texture2"), 1);
	
    scaleLC=lerp(0.0,1.0,range(eTime,actorCutStart[3],actorCutStart[4])),
    bodyColor=lerp(grey,gold,range(eTime,actorCutStart[3],actorCutStart[4])),
    //draw scene
	gPush();
	{
        
        gl.useProgram(program);
        curShader=0;
        toggleFade(0);

        //Draw space skybox
		gPush();
            toggleADS(0);
            setColor(white);
            gScale(30,30,30);
            gRotate(90,1,0,0);
			toggleTextureBlending(1);
            gRotate(eTime*2,0,0,1);
            drawSphere();
			toggleTextureBlending(0);
        gPop();

        //draw light particles
        if(actorCut>=1&&actorCut<=3)
        {
            gPush();
            gTranslate(0,1,0);
            //speed and numbers of particles
            var particleFactor=lerp(0,lightLines.length,Math.pow(range(eTime,actorCutStart[1]-1,actorCutStart[3]),2))
            //console.log("factor:",particleFactor);
            for(let i=0;i<particleFactor;i++)
            {  
                gPush();
                    gRotate(lightLines[i].angle,lightLines[i].axis[0],lightLines[i].axis[1],0);
                    gTranslate(0,0,lightLines[i].distance*0.15);
                    gScale(0.01,0.01,0.01);
                    drawCube();
                    lightLines[i].distance-=dt*Math.pow(particleFactor*0.2,2);
                    if(lightLines[i].distance<=0)
                        lightLines[i]=getRandomLine();
                gPop();
            }
            gPop();
        }
        //circle bursts
        if(actorCut==3)
        {
            var factor=100*(eTime-actorCutStart[3]);
            gPush();
                gTranslate(0,1,-0.3);
                gRotate(-90,0,1,0);
                gRotate(45,1,0,0);
                gScale(factor,factor,0.2);
                drawCylinder();
            gPop();
            gPush();
                gTranslate(0,1,-0.3);
                gRotate(90,0,1,0);
                gRotate(45,1,0,0);
                gScale(factor,factor,0.2);
                drawCylinder();
            gPop();
        }

        //Draw necrozma
        gPush();
            gTranslate(0,1,0);
            gScale(0.5,0.5,0.5);
            drawNecrozma();
        gPop();
		//Draw Earth
        toggleADS(1);
        toggleFade(0);
		gPush();
            //change the binded texture to Earth
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, textureArray[1].textureWebGL);
            earthRotation[2] = earthRotation[2] - 10*dt;
            
            //earth at bottom
            //gTranslate(0,-10,0);
            //gRotate(180,0,1,0);
		    //earth at front
            gTranslate(0,-10,22.5);
            gPush();
                gRotate(90,1,0,0);
                gRotate(-eTime+40,0,0,1);
                gScale(16,16,16);
                //toggleTextureBlending(1);
                setColor(white);
                toggleTextureBlending(2);
                gl.uniform1f(gl.getUniformLocation(program, "blendFactor"), lerp(0,1.0,Math.pow(range(eTime,actorCutStart[10],actorCutStart[10]+4),7)));
                //setColor(vec4(0.0,0.0,0.0,1.0));
                drawSphere();
            gPop();
			toggleTextureBlending(0);
            gPush();
            toggleADS(0);
            for(let i=0;i<lightLines.length;i++)
            {
                gPush();
                    gRotate(lightLines[i].angle,lightLines[i].axis[0],lightLines[i].axis[1],0);
                    beamLength=100*range(eTime,actorCutStart[10]+1.0+0.2*i,actorCutStart[10]+1.5+0.2*i)
                    gTranslate(0,0,beamLength);
                    gScale(0.5,0.5,beamLength);
                    drawCube();

                gPop();
            }
            toggleFade(1);
            let expScale=lerp(15,32,Math.pow(range(eTime,actorCutStart[10]+3.5,actorCutStart[10]+5),3));
            gScale(expScale,expScale,expScale);
            drawSphere();
            gPop();
		gPop(); 
        //draw lightball
        if(actorCut>=5&&actorCut<=9)
        {
            drawLightball(timestamp);
        }


	}
	gPop();
    if( animFlag )
        window.requestAnimFrame(render);
}
