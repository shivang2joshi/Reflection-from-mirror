/* Global Variables */
/* the developer should define variables and constants here */
/* We define a room with 3 walls, floor and ceiling */
/* We define a ball which bounces in the xy plane */
/* We define modifiable prameters : gravity, ball size, initial velocity */
/* We support draggable ball */
/* Scene Dimensions (in meters: at z = 0) */
var mySceneTLX;        /* Top Left corner X coordinate */
var mySceneTLY;        /* Top Left corner Y coordinate */
var mySceneBRX;        /* Bottom Right corner X coordinate */
var mySceneBRY;        /* Bottom Right corner Y coordinate */
var mySceneW;          /* Scene Width */
var mySceneH;          /* Scene Height */
var myCenterX;         /* Scene Center X coordinate */
var myCenterY;         /* Scene Center Y coordinate */

/* Room Variables */
var leftB;              /* Left Barrier */
var rightB;             /* Right Barrier */
var bottomB;            /* Bottom Barrier */
var topB;               /* Top Barrier */
var backB=-5.0;         /* Back Barrier */
var wallThickness;      /* Wall Thickness */

/* Room Objects */
var myFloor;            /* Floor */
var myCeiling;          /* Ceiling */
var myBack;             /* Back */
var myRight;            /* Right */
var myLeft;             /* Left */

var mirror,lampBottom,imglampBottom;
var theta, thetadefault, thetamin, thetamax, thetastep;
var PosX, Xdefault, Xmin, Xmax, Xstep;
var xPosition=-13,currentAngle=0;
var slitimgGroup;
var Ray1,Ray2,Ray3;
var reflectedRay1,reflectedRay2,reflectedRay3;
var imgRay1,imgRay2,imgRay3;
var LRay1=0,LRay2=0,LRay3=0;
var LrRay1=0,LrRay2=0,LrRay3=0;
var flashrays1;
var flashrays2;
var flashrays3;
var flashrays4;
var flashrays5;


/******************* End of Interaction functions ***********************/



//****************************************************************** */
function initialiseControlVariables()
{
    theta = "Mirror Angel";
    PosX = "Light Position";

    thetadefault = 10;
    Xdefault = -13;

    thetamin = 0;
    Xmin = -18;

    thetamax = 45;
    Xmax = -10;

    thetastep = 1;
    Xstep = 1;

    xPosition=-13;
    currentAngle = Math.abs( 10*(Math.PI/180));
}
function handletheta(newvalue)
{
    mirror.rotation.z = - newvalue*(Math.PI/180) ;
    currentAngle = Math.abs( newvalue*(Math.PI/180));
    PIErender();
}
function handleX(newvalue)
{
    xPosition = newvalue;
}

function initialiseControls()
{
    initialiseControlVariables();
    /* Create Input Panel */
    PIEaddInputSlider(theta, thetadefault, handletheta, thetamin, thetamax, thetastep);
    PIEaddInputSlider(PosX, Xdefault, handleX, Xmin, Xmax, Xstep);
}
/******************* End of GUI control objects code ***********************/








/******************* Load Experiment objects code ***********************/

var helpContent;
function initialiseHelp()
{
    helpContent="";
    helpContent = helpContent + "<h2>Flash Light Reflaction in Mirror experiment help</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shows how rays are being reflected at Simple Mirror.</p>";
    helpContent = helpContent + "<h3>Animation control</h3>";
    helpContent = helpContent + "<p>The top line has animation controls. There are two states of the experiment.</p>";
    helpContent = helpContent + "<h3>The setup stage</h3>";
    helpContent = helpContent + "<p>The initial state is setup stage. In this stage, you can see a control window at the right. You have access to TWO sliders.</p>";
    helpContent = helpContent + "<p>You can control the following:</p>";
    helpContent = helpContent + "<ul>";
    helpContent = helpContent + "<li>Mirror Angle : &nbsp;&nbsp;:&nbsp;Controls the Angle of Mirror (Default is 10 degree with Y-axis).</li>";
    helpContent = helpContent + "<li>Light Position : &nbsp;&nbsp;:&nbsp;Controls the X position of Flash Lamp.</li>";
    helpContent = helpContent + "</ul>";
    helpContent = helpContent + "<p>Once you setup the experiment, you can enter the animation stage by clicking the start button</p>";
    helpContent = helpContent + "<h3>The animation stage</h3>";
    helpContent = helpContent + "<p>In the animation stage, the rays will propagate through 3 Slits and will be reflected according to  the laws of physics.</p>";
    helpContent = helpContent + "<p>You can pause and resume the animation by using the pause/play nutton on the top line</p>";
    helpContent = helpContent + "<p>You can slow down and speed up the animaion by uing the speed control buttons</p>";
    helpContent = helpContent + "<h2>Happy Experimenting</h2>";
    PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo()
{
    infoContent =  "";
    infoContent = infoContent + "<h2>Mirror Reflection experiment concepts</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>The experiment shows a flash light which will reflect at the mirror.</p>";
    infoContent = infoContent + "<h3>Passing through Stages</h3>";
    infoContent = infoContent + "<p>When Light arrive at Slits the three narrow rays will only pass as Shown..</p>";
    infoContent = infoContent + "<p>Afterwords At the time of arriving at the mirror, the rays will reflect according to Snail's Laws of reflection at Simple Mirror Which is demondtrated in Experiment.</p>";
    infoContent = infoContent + "<h2>Happy Experimenting</h2>";
    PIEupdateInfo(infoContent);
}

function initialiseScene()
{
    /* Initialise Scene Variables */
    mySceneTLY = 12;
    mySceneTLX = -22;
    mySceneBRX = 22;
    mySceneBRY = -12;
    mySceneW   = (mySceneBRX - mySceneTLX);
    mySceneH   = (mySceneTLY - mySceneBRY);
    myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
    myCenterY  = (mySceneTLY + mySceneBRY) / 2.0;

}

function initialiseOtherVariables()
{
    /* Initialise variables */
    wallThickness = 0.20;

    /* Barriers */
    leftB=mySceneTLX;
    rightB=mySceneBRX;
    bottomB=mySceneBRY;
    topB=mySceneTLY;
}

function initialiseRoom()
{
    var geometry = new THREE.BoxGeometry( mySceneW * 2, wallThickness, 100);
    var material = new THREE.MeshLambertMaterial( {color: 0xffffff} );
    myFloor  = new THREE.Mesh( geometry, material );
    // myFloor.lookAt(new THREE.Vector3(0,1,0));
    myFloor.position.set(myCenterX, bottomB - (wallThickness / 2), 0.0);
    myFloor.receiveShadow = true;
    PIEaddElement(myFloor);
    /* Ceiling */
    geometry = new THREE.BoxGeometry( mySceneW * 2, wallThickness, 100 );
    material = new THREE.MeshLambertMaterial({color: 0xffffff} );
    myCeiling = new THREE.Mesh( geometry, material );
    myCeiling.position.set(myCenterX, topB+(wallThickness/2), 0.0);
    myFloor.receiveShadow = true;
    PIEaddElement(myCeiling);
    /* Left */
    geometry = new THREE.BoxGeometry( wallThickness, mySceneH * 2, 100 );
    material = new THREE.MeshLambertMaterial( {color: 0xaa0000} );
    myLeft = new THREE.Mesh( geometry, material );
    myLeft.position.set(leftB-(wallThickness/2), myCenterY, 0.0);
    myLeft.receiveShadow = true;
    PIEaddElement(myLeft);
    /* Right */
    geometry = new THREE.BoxGeometry( wallThickness, mySceneH * 2, 100 );
    material = new THREE.MeshLambertMaterial( {color: 0xaa0000} );
    myRight = new THREE.Mesh( geometry, material );
    myRight.position.set(rightB+(wallThickness/2), myCenterY, 0.0);
    myRight.receiveShadow = true;
    PIEaddElement(myRight);
    // Back *
    // material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, map: texture } );
    // geometry = new THREE.PlaneBufferGeometry( mySceneW * 2, mySceneH * 2 );
    geometry = new THREE.BoxGeometry( mySceneW * 2, mySceneH * 2, wallThickness );
    material = new THREE.MeshLambertMaterial( {color: 0x000000} );
    myBack = new THREE.Mesh( geometry, material );
    myBack.receiveShadow = true;
    myBack.position.set(myCenterX,myCenterY,-10);
    PIEaddElement(myBack);

}









function loadExperimentElements()
{


  var geometry;
  var material;
  var loader;
  var texture;

    PIEsetExperimentTitle("Flashlight Reflection Through Slits");
    PIEsetDeveloperName("Shivang Joshi");

    /* initialise help and info content */
    initialiseHelp();
    initialiseInfo();

    /* initialise Scene & Room */
    initialiseScene();
    initialiseOtherVariables();
    initialiseRoom();

    /***************** Major Axis ******************/
    var axisgeometry = new THREE.Geometry();
    axisgeometry.vertices.push(new THREE.Vector3(-20,0,0),new THREE.Vector3(20,0,0));
    var axismaterial = new THREE.LineBasicMaterial({color:0xffffff});
    var axis = new THREE.Line(axisgeometry,axismaterial);
    PIEaddElement(axis);
    /******************************************* */


    /*----------------Lamp starts-----------------*/
    var lampBottomGeom = new THREE.CylinderGeometry(0.5, 0.5, 1, 12);
    lampBottom = new THREE.Mesh(lampBottomGeom, new THREE.MeshPhongMaterial({color: "grey", shininess: 0}));
    lampBottom.position.set(-15, 0, 0);
    PIEaddElement(lampBottom);

    var lampBulbGeom = new THREE.SphereGeometry(1.3, 32, 24);
    lampBulbGeom.translate(0, 1.5, 0);
    lampBulb = new THREE.Mesh(lampBulbGeom, new THREE.MeshPhongMaterial({color: "white", shininess: 5000}));
    lampBottom.add(lampBulb);
    /*----------------Lamp ends-----------------*//////

    /*----------------Slits starts-----------------*/
    
    var plateg = new THREE.PlaneBufferGeometry(5,4);
    //var slit2g = new THREE.PlaneBufferGeometry(3,0.1);
    //var slit3g = new THREE.PlaneBufferGeometry(3,0.1);
    var plateMaterial = new THREE.MeshBasicMaterial({color: 0x111111, side: THREE.DoubleSide});
    
    var plate = new THREE.Mesh(plateg,plateMaterial);
    plate.rotation.y = (Math.PI)/2;
    plate.position.y = 2.5;
    plate.position.x = -8;
    
    var slit1g = new THREE.PlaneBufferGeometry(3,0.1);
    var slit2g = new THREE.PlaneBufferGeometry(3,0.1);
    var slit3g = new THREE.PlaneBufferGeometry(3,0.1);
    var slitMaterial = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.DoubleSide});
    
    var slit1 = new THREE.Mesh(slit1g,slitMaterial);
    slit1.rotation.y = (Math.PI)/2;
    slit1.position.y = 2;
    slit1.position.x = -8;
    var slit2 = new THREE.Mesh(slit2g,slitMaterial);
    slit2.rotation.y = (Math.PI)/2;
    slit2.position.y = 2.2;
    slit2.position.x = -8;
    var slit3 = new THREE.Mesh(slit3g,slitMaterial);
    slit3.rotation.y = (Math.PI)/2;
    slit3.position.y = 2.4;
    slit3.position.x = -8;
    
    var slitGroup = new THREE.Group();
    slitGroup.add(plate);
    slitGroup.add(slit1);
    slitGroup.add(slit2);
    slitGroup.add(slit3);
    PIEaddElement(slitGroup);
    /*plate.add(slit1);
    plate.add(slit2);
    plate.add(slit3);
    PIEaddElement(plate);*/

    /*----------------Slit ends-----------------*/

    /***************** Mirror **********************/
    var material;
    material = new THREE.LineBasicMaterial({color: "#808080",  linewidth: 50});
    var geometry1 = new THREE.Geometry();
    geometry1.vertices.push(
            new THREE.Vector3( myCenterX, myCenterY+5, 0),
            new THREE.Vector3( myCenterX, myCenterY-5, 0)
          );
    mirror= new THREE.Line( geometry1, material );
    mirror.rotation.z = - 10*(Math.PI/180) ;
    PIEaddElement(mirror);
    /**************** end of mirror *************** */



    /**************** Image ********************* */
    // Bulb Image .............
    var imglampBottomGeom = new THREE.CylinderGeometry(0.5, 0.5, 1, 12);
    imglampBottom = new THREE.Mesh(imglampBottomGeom, new THREE.MeshPhongMaterial({color: "grey", shininess: 0}));
    imglampBottom.position.set((-1)*xPosition*(Math.cos(2*currentAngle)), xPosition*(Math.sin(2*currentAngle)), 0);
    //PIEaddElement(imglampBottom);

    var imglampBulbGeom = new THREE.SphereGeometry(1.3, 32, 24);
    imglampBulbGeom.translate(0, 1.5, 0);
    imglampBulb = new THREE.Mesh(imglampBulbGeom, new THREE.MeshPhongMaterial({color: "white", shininess: 5000}));
    imglampBottom.add(imglampBulb);

    // Slit Image..............
    
    var imgplate = new THREE.Mesh(plateg,plateMaterial);
    imgplate.rotation.y = (Math.PI)/2;
    imgplate.position.y = 2.5;
    //imgplate.position.x = 8;
   
    var imgslit1 = new THREE.Mesh(slit1g,slitMaterial);
    imgslit1.rotation.y = (Math.PI)/2;
    imgslit1.position.y = 2;
    //imgslit1.position.x = 8;
    var imgslit2 = new THREE.Mesh(slit2g,slitMaterial);
    imgslit2.rotation.y = (Math.PI)/2;
    imgslit2.position.y = 2.2;
    //imgslit2.position.x = 8;
    var imgslit3 = new THREE.Mesh(slit3g,slitMaterial);
    imgslit3.rotation.y = (Math.PI)/2;
    imgslit3.position.y = 2.4;
    //imgslit3.position.x = 8;
    
    slitimgGroup = new THREE.Group();
    slitimgGroup.add(imgplate);
    slitimgGroup.add(imgslit1);
    slitimgGroup.add(imgslit2);
    slitimgGroup.add(imgslit3); 
    slitimgGroup.position.set(8*(Math.cos(2*currentAngle)), (-8)*(Math.sin(2*currentAngle)), 0);
    //PIEaddElement(slitimgGroup);    
    /**************** Img End ******************** */



    /*************** RAYS Start ****************** */
    var dir = new THREE.Vector3( 1, 0, 0 );
    //normalize the direction vector (convert to vector of length 1)
    dir.normalize();
    var origin = new THREE.Vector3( -8, 2, 0 );
    var length = 0;
    var hex = 0xffff00;
    Ray1 = new THREE.ArrowHelper( dir, origin, length, hex, 0.2 ,0.2 );
    Ray2 = new THREE.ArrowHelper( dir, new THREE.Vector3( -8, 2.2, 0 ), length, hex, 0.2 ,0.2 );
    Ray3 = new THREE.ArrowHelper( dir, new THREE.Vector3( -8, 2.4, 0 ), length, hex, 0.2 ,0.2 );
    PIEaddElement(Ray1);
    PIEaddElement(Ray2);
    PIEaddElement(Ray3);

    //reflected rays
    var dir2 = new THREE.Vector3( (-1)*Math.cos(2*currentAngle), 1*Math.sin(2*currentAngle), 0 );
    reflectedRay1 = new THREE.ArrowHelper( dir2, new THREE.Vector3( 2.0*Math.sin(currentAngle), 2.0*Math.cos(currentAngle), 0 ), 0, hex, 0 ,0 );
    reflectedRay2 = new THREE.ArrowHelper( dir2, new THREE.Vector3( 2.2*Math.sin(currentAngle), 2.2*Math.cos(currentAngle), 0 ), 0, hex, 0 ,0 );
    reflectedRay3 = new THREE.ArrowHelper( dir2, new THREE.Vector3( 2.4*Math.sin(currentAngle), 2.4*Math.cos(currentAngle), 0 ), 0, hex, 0 ,0 );
    
    PIEaddElement(reflectedRay1);
    PIEaddElement(reflectedRay2);
    PIEaddElement(reflectedRay3);
    PIErender();

    //image rays
    var dir3 = new THREE.Vector3( (1)*Math.cos(2*currentAngle), 1*Math.sin(2*currentAngle), 0 );
    imgRay1 = new THREE.ArrowHelper( dir3, new THREE.Vector3( 2.0*Math.sin(currentAngle), 2.0*Math.cos(currentAngle), 0 ), 0, 0xaec4e8, 0 ,0 );
    imgRay2 = new THREE.ArrowHelper( dir3, new THREE.Vector3( 2.2*Math.sin(currentAngle), 2.2*Math.cos(currentAngle), 0 ), 0, 0xaec4e8, 0 ,0 );
    imgRay3 = new THREE.ArrowHelper( dir3, new THREE.Vector3( 2.4*Math.sin(currentAngle), 2.4*Math.cos(currentAngle), 0 ), 0, 0xaec4e8, 0 ,0 );
    PIEaddElement(imgRay1);
    PIEaddElement(imgRay2);
    PIEaddElement(imgRay3);
    /***************************************************************************** */

    /********************** Flash light rays ************************************ */

    var orig = new THREE.Vector3(xPosition,2.2,0);
    var angle= -Math.PI/9;

        flashrays1=new THREE.ArrowHelper(new THREE.Vector3(Math.cos(angle),Math.sin(angle),0),orig,0,0xffff00,0.2,0.2);
        PIEaddElement(flashrays1);
        angle += (Math.PI)/18;

        flashrays2=new THREE.ArrowHelper(new THREE.Vector3(Math.cos(angle),Math.sin(angle),0),orig,0,0xffff00,0.2,0.2);
        PIEaddElement(flashrays2);
        angle += (Math.PI)/18;
    
        
        flashrays3=new THREE.ArrowHelper(new THREE.Vector3(Math.cos(angle),Math.sin(angle),0),orig,0,0xffff00,0.2,0.2);
        PIEaddElement(flashrays3);
        angle += (Math.PI)/18;
    
        
        flashrays4=new THREE.ArrowHelper(new THREE.Vector3(Math.cos(angle),Math.sin(angle),0),orig,0,0xffff00,0.2,0.2);
        PIEaddElement(flashrays4);
        angle += (Math.PI)/18;
    
        flashrays5=new THREE.ArrowHelper(new THREE.Vector3(Math.cos(angle),Math.sin(angle),0),orig,0,0xffff00,0.2,0.2);
        PIEaddElement(flashrays5);
    
    /***************************************************************************** */

    initialiseControls();
    PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);

}
/******************* End of Load Experiment objects code ***********************/

    

/******************* Reset Experiment code ***********************/

/**
 * This function resets the position of all experiment elements to their default values.
 * <p>
 * This is called during initial document load.
 * This is also be called by the system provided reset button.
 * <p>
 * Apart from the position, this should also reset all variables which can be controlled by the user.
 * This function will also clear any output variables/graphs
 */
function resetExperiment()
{
    /* initialise Other Variables */
    initialiseOtherVariables();

    mirror.rotation.z = -10*(Math.PI/180) ;
    currentAngle=10;
    xPosition=-13;
    
    /* Reset Wall position */
    /* Floor */
    myFloor.position.set(myCenterX, bottomB - (wallThickness / 2), 0.0);
    /* Ceiling */
    myCeiling.position.set(myCenterX, topB+(wallThickness/2), 0.0);
    /* Left */
    myLeft.position.set(leftB-(wallThickness/2), myCenterY, 0.0);
    /* Right */
    myRight.position.set(rightB+(wallThickness/2), myCenterY, 0.0);
    /* Back */
    myBack.position.set(myCenterX, myCenterY, backB - (wallThickness / 2));

    slitimgGroup.visible = false;
    imglampBottom.visible = false;

    LRay1=0;LRay2=0;LRay3=0;
    LrRay1=0;LrRay2=0;LrRay3=0;

    Ray1.setLength(LRay1,0,0);
    Ray2.setLength(LRay2,0,0);
    Ray3.setLength(LRay3,0,0);

        flashrays1.setLength(LrRay1,0,0);
        flashrays2.setLength(LrRay1,0,0);
        flashrays3.setLength(LrRay1,0,0);
        flashrays4.setLength(LrRay1,0,0);
        flashrays5.setLength(LrRay1,0,0);

    reflectedRay1.setLength(0,0,0);
    reflectedRay2.setLength(0,0,0);
    reflectedRay3.setLength(0,0,0);

    imgRay1.setLength(0,0,0);
    imgRay2.setLength(0,0,0);
    imgRay3.setLength(0,0,0);

    offsettime1=0;
    offsettime2=0;
    offsettime3=0;
    majoroffset=0;
    PIErender();


} 

/******************* End of Reset Experiment code ***********************/

/******************* Update (animation changes) code ***********************/

/**
 * This function updates the location of all experiment elements during each animation frame.
 * <p>
 * The function receives both animation time as well as the dt (time difference) from last call.
 * This function is expected to implement the laws of physics to update the position.
 * This function will also update any output variables/graphs
 * <p>
 * Important Note : Boundary Events
 * <p>
 * During any physics simulation you will reach a boundary event.
 * In our case, the boundary even is the ball hitting any of the walls.
 * The boundary event typically changes the sign of velocity/acceleration.
 * The boundary event is most likely to happen in the middle of the two calls.
 * The library allows the experiment to change the simulation time by processing partial time.
 * This function can call a library function with the time remaining to be processed before exiting.
 * <p>
 * @param  t       The time in milliseconds elapsed since the beginning of animation cycle
 * @param  dt      The time in milliseconds elapsed since the last acll to this function
 */



var offsettime1=0;
var offsettime2=0;
var offsettime3=0;
var majoroffset=0;

function updateExperimentElements(t, dt)
{
    //line.geometry.setDrawRange(0,drawCount+(t%1000));
    //line.geometry.attributes.position.needsUpdate = true;

    lampBottom.position.set(xPosition,0,0);

    if(LrRay1 < (-1)*xPosition - 8)
    {
        LrRay1 = t/1000;
        flashrays1.setLength(LrRay1,0.2,0.2);
        flashrays2.setLength(LrRay1,0.2,0.2);
        flashrays3.setLength(LrRay1,0.2,0.2);
        flashrays4.setLength(LrRay1,0.2,0.2);
        flashrays5.setLength(LrRay1,0.2,0.2);
        majoroffset=t;
    }

    if(t > majoroffset)
    {   
        if(LRay1 < 8 + 2*Math.tan(currentAngle))
        {
            LRay1=(t-majoroffset)/1000;
            Ray1.setLength(LRay1,0.2,0.2);
            offsettime1=t;
        }
        else
        {   
            Ray1.setLength(LRay1,0,0);
            reflectedRay1.position.x = 2*Math.tan(currentAngle);
            reflectedRay1.setLength((t-offsettime1)/1000,0.2,0.2);
            reflectedRay1.setDirection(new THREE.Vector3( - Math.cos(2*currentAngle), Math.sin(2*currentAngle), 0 ));
            if(LrRay2*Math.cos(currentAngle)+(2.2*Math.tan(currentAngle))<(-1)*xPosition)
                imgRay1.setLength((t-offsettime1)/1000,0.2,0.2);
            imgRay1.setDirection(new THREE.Vector3(Math.cos(2*currentAngle), -Math.sin(2*currentAngle), 0 ));
            imgRay1.position.x = 2*Math.tan(currentAngle);
        }
        if(LRay2 < 8 + 2.2*Math.tan(currentAngle))
        {
            LRay2=(t-majoroffset)/1000;
            Ray2.setLength(LRay2,0.2,0.2);
            offsettime2=t;
        }
        else
        {
            Ray2.setLength(LRay2,0,0);
            reflectedRay2.position.x = 2.2*Math.tan(currentAngle);
            reflectedRay2.setLength((t-offsettime2)/1000,0.2,0.2);
            reflectedRay2.setDirection(new THREE.Vector3( - Math.cos(2*currentAngle), Math.sin(2*currentAngle), 0 ));
            if(LrRay2*Math.cos(currentAngle)+(2.2*Math.tan(currentAngle))<(-1)*xPosition)
                    imgRay2.setLength((t-offsettime1)/1000,0.2,0.2);
            imgRay2.setDirection(new THREE.Vector3(Math.cos(2*currentAngle), -Math.sin(2*currentAngle), 0 ));
            LrRay2=(t-offsettime2)/1000;
            imgRay2.position.x = 2.2*Math.tan(currentAngle);
        }
        if(LRay3 < 8 + 2.4*Math.tan(currentAngle))
        {
            LRay3=(t-majoroffset)/1000;
            Ray3.setLength(LRay3,0.2,0.2);
            offsettime3=t;
        }
        else
        {
            Ray3.setLength(LRay3,0,0);
            reflectedRay3.position.x = 2.4*Math.tan(currentAngle);
            reflectedRay3.setLength((t-offsettime3)/1000,0.2,0.2);
            reflectedRay3.setDirection(new THREE.Vector3( - Math.cos(2*currentAngle), Math.sin(2*currentAngle), 0 ));
            if(LrRay2*Math.cos(currentAngle)+(2.2*Math.tan(currentAngle))<(-1)*xPosition)
                    imgRay3.setLength((t-offsettime1)/1000,0.2,0.2);
            imgRay3.setDirection(new THREE.Vector3(Math.cos(2*currentAngle), -Math.sin(2*currentAngle), 0 ));
            imgRay3.position.x = 2.4*Math.tan(currentAngle);
        }

        if(LrRay2*Math.cos(currentAngle)+(2.2*Math.tan(currentAngle))>=8)
        {
            slitimgGroup.position.set(8*(Math.cos(2*currentAngle)), (-8)*(Math.sin(2*currentAngle)), 0);
            slitimgGroup.rotation.z = -2*currentAngle;
            slitimgGroup.visible = true;
            PIEaddElement(slitimgGroup);
        }
        
        if(LrRay2*Math.cos(currentAngle)+(2.2*Math.tan(currentAngle))>=(-1)*xPosition)
        {
            imglampBottom.position.set((-1)*xPosition*(Math.cos(2*currentAngle)), xPosition*(Math.sin(2*currentAngle)), 0);
            imglampBottom.rotation.z = -2*currentAngle;
            imglampBottom.visible = true;
            PIEaddElement(imglampBottom);
        }
        
    }

    PIErender();
}

/******************* Update (animation changes) code ***********************/
