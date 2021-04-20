

function normalize(v,vmin,vmax,tmin, tmax){
    const nv = Math.max(Math.min(v,vmax), vmin);
    const dv = vmax-vmin;
    const pc = (nv-vmin)/dv;
    const dt = tmax-tmin;
    const tv = tmin + (pc*dt);
    return tv;
}

Seabed = function(rad,h,rS,hS,a,sC,color,xP,yP,zP){
    //the seabed is rotated cylinder
    const geometry = new THREE.CylinderGeometry(rad,rad,h,rS,hS);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Pi/2));
    geometry.mergeVertices();
    const length = geometry.vertices.length;
    this.bumps = [];
    //add some bumps for more realism
    for(let i=0; i<length; i++){
        const v = geometry.vertices[i];

        this.bumps.push({x : v.x,
                        y : v.y,
                        z : v.z, 
                        ang: Math.random()*Pi*2,
                        amp: Math.random()*a,
                        speed: sC + Math.random()*sC});
    }

    const material = new THREE.MeshPhongMaterial({ 
        color: color,
        transparent:true,
        opacity:.99,
        flatShading:true,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.receiveShadow = true;
    this.mesh.position.set(xP,yP,zP);
}

Seabed.prototype.moveBumps = function (step){
    const verts = this.mesh.geometry.vertices;
    const length = verts.length;
    
    for (let i=0; i<length; i++){
        const v = verts[i];
        const vprops = this.bumps[i];
        v.x = vprops.x + Math.cos(vprops.ang)*vprops.amp;
        v.y = vprops.y + Math.sin(vprops.ang)*vprops.amp;
        vprops.ang += vprops.speed;
    }

    this.mesh.geometry.verticesNeedUpdate=true;
    seabed.mesh.rotation.z += step;
}



// Water = function(gN,mN,d){
//     // water collects all of the different thing that can be swimming in it
//     this.mesh = new THREE.Object3D();
//     this.objects = [];
//     const step = Pi*2 / gN;
//     let angle , object , type,offset,depth;
//     let alpha,beta,r;//,diameter = 240;

//     for(let j = 0; j < gN; j++){
//         angle = step*j;
//         offset = (Pi/16)*(Math.random()*0.4 + 0.8); // put the next object on random place

//         alpha = step*j;
        
//         r = d/2*Math.random();


//         for(let i = 0; i  < mN; i++){

//             beta = step*j*i;
            
//             type = Math.floor(Math.random()*30); //choose the type of the object, it can be bottle, can or fish
//             if(type<8) {
//                 offset = (Pi/4)*(Math.random()*0.4 - 0.8);
//                 if(type<3) object = new Bottle(shapes.bottle.radius, shapes.bottle.height, shapes.bottle.segments,shapes.bottle.scale,shapes.bottle.colors);
//                 else object = new Can(shapes.can.radius, shapes.can.height,shapes.can.segments, shapes.can.colors);

//                 object.mesh.rotation.z= Math.random()*Pi*2;
//             }
//             else {
//                 offset = (Pi/8)*(Math.random()*0.4 - 0.8);
//                 object = new Fish(shapes.fish.radius,shapes.fish.height,shapes.fish.segments);
//                 object.mesh.rotation.z = angle + offset;
//             }

//             object.mesh.position.x= r*Math.sin(alpha)*Math.cos(beta)
//             object.mesh.position.y= r*Math.sin(alpha)*Math.sin(beta)
//             // object.mesh.position.z= r*Math.cos(alpha)
//             object.mesh.position.z= 110

//             // object.angle = angle + offset;
//             // object.offset =  offset;
//             // object.angle =2*Pi*i/25 -  Math.random()*.3;
//             // object.angleCopy = object.angle;
//             // object.distance =  700 +50 + Math.random()*50;
//             // object.offset = Math.random()*350;

//             object.angle =2*Pi*i/25 -  Math.random()*.3;
//             object.angleCopy = object.angle;
//             object.distance = 700 + 50 + Math.random()*50;
//             object.offset = Math.random()*350;
//             object.mesh.rotation.y = Math.random()*Pi;
//             object.mesh.rotation.z = Math.random()*Pi;
//             object.mesh.position.z= 110;
//             // object.mesh.position.y =object.offset - shapes.seabed.height + Math.sin(object.angle)*object.distance;
//             // object.mesh.position.x = Math.cos(object.angle)*object.distance;

//         //     trash.angle =2*Pi*i/n -  Math.random()*.3;
//         // trash.angleCopy = trash.angle;
//         // trash.distance = d + 50 + Math.random()*50;
//         // trash.offset = Math.random()*350;
//         // trash.mesh.rotation.y = Math.random()*Pi;
//         // trash.mesh.rotation.z = Math.random()*Pi;
//         // trash.mesh.position.z= z;
        


//             this.objects.push(object);
//             this.mesh.add(object.mesh);

//         }      
//     }
// }

Water = function(){
    //this is where all the tires are stored
    this.mesh = new THREE.Object3D();
    this.elements = [];
}


Water.prototype.spawnTrash = function(d,z,n){
    //putting tires around the seabed
    let angle , trash , type,offset;

    let r = 100, alpha,beta;
    for(let i=0; i<n; i++){
        type = Math.floor(Math.random()*30); //choose the type of the object, it can be bottle, can or fish

        // if(type<8) {
        //     offset = (Pi/4)*(Math.random()*0.4 - 0.8);
        //     if(type<3) trash = new Bottle(shapes.bottle.radius, shapes.bottle.height, shapes.bottle.segments,shapes.bottle.scale,shapes.bottle.colors);
        //     else trash = new Can(shapes.can.radius, shapes.can.height,shapes.can.segments, shapes.can.colors);
        // }
        // else {
        //     offset = (Pi/8)*(Math.random()*0.4 - 0.8);
        //     trash = new Fish(shapes.fish.radius,shapes.fish.height,shapes.fish.segments);
        //     trash.mesh.rotation.z = angle + offset;
        // }
        
        // offset = (Pi/8)*(Math.random()*0.4 - 0.8);
        trash = new boxTrash(10,10,10);
        // trash.mesh.rotation.z = angle + offset;
         

        trash.angle =2*Pi*i/n -  Math.random()*.3;
        trash.angleCopy = trash.angle;
        trash.distance = d + 50 + Math.random()*50;
        trash.offset = Math.random()*350;
        trash.mesh.rotation.y = Math.random()*Pi;
        trash.mesh.rotation.z = Math.random()*Pi;
        trash.mesh.position.z= z;
        // trash.mesh.position.y =trash.offset - shapes.seabed.height + Math.sin(trash.angle)*trash.distance;
        // trash.mesh.position.x = Math.cos(trash.angle)*trash.distance;

        alpha = trash.angle * Math.random()*.4;
        beta = Math.random()*.2;

        trash.mesh.position.x= r*Math.sin(alpha)*Math.cos(beta)
        trash.mesh.position.y= r*Math.sin(alpha)*Math.sin(beta)
        // trash.mesh.position.x = Math.cos(trash.angle)*trash.distance;
        this.mesh.add(trash.mesh);  
        this.elements.push(trash);
    }
}

Water.prototype.rotateTrash = function(step,scale){
    //we rotate all of the tires and in the same time we are checking if there is a collision
    //between one of the tires and the jellyfish
    for(let i = 0; i <this.elements.length; i++){
        const singleTrash = this.elements[i];
        singleTrash.angle+=step;
        singleTrash.mesh.position.y= singleTrash.offset - shapes.seabed.height*.95 + Math.sin(singleTrash.angle)*(singleTrash.distance) ;
        singleTrash.mesh.position.x = Math.cos(singleTrash.angle)*(singleTrash.distance);
        singleTrash.mesh.scale.set(scale,scale,scale);
        // const diffPos = jellyfish.mesh.position.clone().sub(singleTrash.mesh.position.clone());
        const diffPos = waterfish.position.clone().sub(singleTrash.mesh.position.clone());
        const d = diffPos.length();

        if(d<2*shapes.tire.outerR*params.tsize + params.jsize*4){
            crashSpeedX2 = 120*diffPos.x / (d);
            crashSpeedY2= 120*diffPos.y / (d);
            crash2= i;

            // console.log('ccc',d,2*shapes.tire.outerR*params.tsize + params.jsize*4)
        }
        if(crash2 == i && crashSpeedX2!=0){
            singleTrash.mesh.position.y= singleTrash.offset - shapes.seabed.height*.95 + Math.sin(singleTrash.angle )*(singleTrash.distance) - jellyDisplacementY2/10;
            singleTrash.mesh.position.x= Math.cos(singleTrash.angle)*(singleTrash.distance) - jellyDisplacementX2/5 ;
        }
    }
}

Water.prototype.hide = function(){
    //we're hiding the tires which are outside the camera view
    for(let i = 0; i <this.elements.length; i++){
        if(this.elements[i].mesh.position.y<-50) this.elements[i].mesh.visible = false;
        else  this.elements[i].mesh.visible = true;
    }
}

boxTrash = function(w,h,d){
    //the fish is created with three cones
    this.mesh = new THREE.Object3D();
    this.mesh.name = "boxTrash";

    const color = 0xfffff* Math.random()

    var geometry = new THREE.BoxGeometry( w,h,d );
    var material = new THREE.MeshPhongMaterial( {color: color} );
    var cube = new THREE.Mesh( geometry, material );


    this.mesh.add(cube);

    // const geomHead =  new THREE.ConeGeometry( r, h*8/15, seg);
    // const material = new THREE.MeshPhongMaterial({ color:new THREE.Color("rgb(255,"+ Math.floor(95 + Math.random()*100) +","+ (Math.floor(Math.random()*20))+")"),});
    // const head = new THREE.Mesh(geomHead, material);
    // head.castShadow = true;
    // head.receiveShadow = true;
    // this.mesh.add(head);
    
    // const geomBody = new THREE.ConeGeometry(r, h, seg);
    // const body = new THREE.Mesh(geomBody,material);
    // body.rotation.x= Pi;
    // body.position.y-=h*.77;
    // body.castShadow= true;
    // body.receiveShadow = true;
    // this.mesh.add(body);

    // const geomTail = new THREE.ConeGeometry(r/2, h*7/15, seg/3);
    // const tail = new THREE.Mesh(geomTail,material);
    // tail.position.y-=h*4/3;
    // tail.castShadow = true;
    // tail.receiveShadow = true;
    // this.mesh.add(tail);
}



Fish = function(r,h,seg){
    //the fish is created with three cones
    this.mesh = new THREE.Object3D();
    this.mesh.name = "fish";

    const geomHead =  new THREE.ConeGeometry( r, h*8/15, seg);
    const material = new THREE.MeshPhongMaterial({ color:new THREE.Color("rgb(255,"+ Math.floor(95 + Math.random()*100) +","+ (Math.floor(Math.random()*20))+")"),});
    const head = new THREE.Mesh(geomHead, material);
    head.castShadow = true;
    head.receiveShadow = true;
    this.mesh.add(head);
    
    const geomBody = new THREE.ConeGeometry(r, h, seg);
    const body = new THREE.Mesh(geomBody,material);
    body.rotation.x= Pi;
    body.position.y-=h*.77;
    body.castShadow= true;
    body.receiveShadow = true;
    this.mesh.add(body);

    const geomTail = new THREE.ConeGeometry(r/2, h*7/15, seg/3);
    const tail = new THREE.Mesh(geomTail,material);
    tail.position.y-=h*4/3;
    tail.castShadow = true;
    tail.receiveShadow = true;
    this.mesh.add(tail);
}

const Bottle = function(r,h,seg,sc,colors){
    //the bottle is created with cylinders
    //material simulates transparency 
    this.mesh= new THREE.Object3D();
    const type = Math.floor(Math.random()*3 );
    const materialLiquid = new THREE.MeshPhongMaterial({color: colors[2*(type)], transparent: true, opacity: .6, flatShading:true,});
    const materialLabel = new THREE.MeshPhongMaterial({color: colors[2*(type) + 1], transparent: true,opacity: .7 , flatShading:true,});
    const geometryBody = new THREE.CylinderGeometry(r,r,h,seg,seg);
    const body = new THREE.Mesh(geometryBody, materialLiquid);
    this.mesh.add(body);

    const geometryLabel = new THREE.CylinderGeometry(r,r,h*.4,seg,seg,0, Pi/4);
    const label = new THREE.Mesh(geometryLabel, materialLabel);
    label.position.y+=h/10;
    this.mesh.add(label);

    const geometryNeck = new THREE.CylinderGeometry(r/3, r, h*.6, seg, seg);
    const neck = new THREE.Mesh(geometryNeck, materialLiquid);
    neck.position.y+=h*.8;
    this.mesh.add(neck);
        
    const geometryCap = new THREE.CylinderGeometry(r*.4, r*.4, 3*h/20,seg,seg);
    const cap = new THREE.Mesh(geometryCap, materialLabel);
    cap.position.y+=h*1.2;
    this.mesh.add(cap);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.scale.set(sc,sc,sc);
}

const Can = function(r,h,seg,colors){
// using the same approach as for the bottle
    this.mesh= new THREE.Object3D();
    const type = Math.floor(Math.random()*3 );
    const materialLiquid = new THREE.MeshPhongMaterial({color: colors[2*(type)], transparent: true, opacity: .6, flatShading:true,});
    const materialLabel = new THREE.MeshPhongMaterial({color: colors[2*(type) + 1], transparent: true, opacity: .7 , flatShading:true,});
    const geometryBody = new THREE.CylinderGeometry(r,r,h,seg,seg);
    const body = new THREE.Mesh(geometryBody, materialLiquid);
    this.mesh.add(body);

    const geometryLabel = new THREE.CylinderGeometry(r,r,h*.7,seg,seg,0, Pi/4);
    const label = new THREE.Mesh(geometryLabel, materialLabel);
    label.position.y+=h/40;
    this.mesh.add(label);

    const geometryCap = new THREE.CylinderGeometry(r*.9, r, h/20, seg, seg);
    const topCap = new THREE.Mesh(geometryCap, materialLiquid);
    topCap.position.y+=h*.525;
    this.mesh.add(topCap);

    const bottomCap = new THREE.Mesh(geometryCap, materialLiquid);
    bottomCap.rotation.x+=Pi;
    bottomCap.position.y-=h*.525;
    this.mesh.add(bottomCap);
        
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

}

const Tire = function(iR,oR,rS,tS,sc){
    //the tire is createt of two toruses with different radius
    this.mesh = new THREE.Object3D();
    const materialBody = new THREE.MeshPhongMaterial({color: 0x080808, flatShading:true,});
    const geometryBody = new THREE.TorusGeometry( oR, iR, rS, tS );

    const body = new THREE.Mesh(geometryBody,materialBody);

    const materialPattern= new THREE.MeshPhongMaterial({color: 0x191414, flatShading:true,})
    const geometryPattern = new THREE.TorusGeometry( oR*1.01, iR, rS, tS, Pi/16);
    geometryPattern.openEnded=true;

    for(let i=0; i<16; i++){
        const pattern = new THREE.Mesh(geometryPattern, materialPattern);
        pattern.rotation.z+=i*Pi/8;
        this.mesh.add(pattern);
    }
    this.displX = 0;
    this.displY = 0;
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.scale.set(sc,sc,sc);
    this.mesh.add(body);
}

TrashHolder = function(){
    //this is where all the tires are stored
    this.mesh = new THREE.Object3D();
    this.elements = [];
}

TrashHolder.prototype.spawnTrash = function(d,z,n){
    //putting tires around the seabed
    for(let i=0; i<n; i++){
        const trash = new Tire(shapes.tire.innerR,shapes.tire.outerR,shapes.tire.rSegments,shapes.tire.tSegments,1);
        trash.angle =2*Pi*i/n -  Math.random()*.3;
        trash.angleCopy = trash.angle;
        trash.distance = d + 50 + Math.random()*50;
        trash.offset = Math.random()*350;
        trash.mesh.rotation.y = Math.random()*Pi;
        trash.mesh.rotation.z = Math.random()*Pi;
        trash.mesh.position.z= z;
        trash.mesh.position.y =trash.offset - shapes.seabed.height + Math.sin(trash.angle)*trash.distance;
        trash.mesh.position.x = Math.cos(trash.angle)*trash.distance;
        this.mesh.add(trash.mesh);  
        this.elements.push(trash);
    }
}

TrashHolder.prototype.rotateTrash = function(step,scale){
    //we rotate all of the tires and in the same time we are checking if there is a collision
    //between one of the tires and the jellyfish
    for(let i = 0; i <this.elements.length; i++){
        const singleTrash = this.elements[i];
        singleTrash.angle+=step;
        singleTrash.mesh.position.y= singleTrash.offset - shapes.seabed.height*.95 + Math.sin(singleTrash.angle)*(singleTrash.distance) ;
        singleTrash.mesh.position.x = Math.cos(singleTrash.angle)*(singleTrash.distance);
        singleTrash.mesh.scale.set(scale,scale,scale);
        // const diffPos = jellyfish.mesh.position.clone().sub(singleTrash.mesh.position.clone());
        const diffPos = waterfish.position.clone().sub(singleTrash.mesh.position.clone());
        const d = diffPos.length();

        

        if(d<2*shapes.tire.outerR*params.tsize + params.jsize*4){
            crashSpeedX = 120*diffPos.x / (d);
            crashSpeedY = 120*diffPos.y / (d);
            crash = i;

            // console.log('ccc',d,2*shapes.tire.outerR*params.tsize + params.jsize*4)
        }
        if(crash == i && crashSpeedX!=0){
            singleTrash.mesh.position.y= singleTrash.offset - shapes.seabed.height*.95 + Math.sin(singleTrash.angle )*(singleTrash.distance) - jellyDisplacementY/10;
            singleTrash.mesh.position.x= Math.cos(singleTrash.angle)*(singleTrash.distance) - jellyDisplacementX/5 ;
        }
    }
}

TrashHolder.prototype.hide = function(){
    //we're hiding the tires which are outside the camera view
    for(let i = 0; i <this.elements.length; i++){
        if(this.elements[i].mesh.position.y<-50) this.elements[i].mesh.visible = false;
        else  this.elements[i].mesh.visible = true;
    }
}

const JellyFish = function() {
    //the jellyfish body is created with some dark magic and hand written parameters
    
    this.mesh = new THREE.Object3D();
    
    const points = [];
    points.push(new THREE.Vector2(0, -12));
    points.push(new THREE.Vector2(0.5, -12));
    points.push(new THREE.Vector2(1.5, -11.75));
    points.push(new THREE.Vector2(2.5, -11.5));    
    points.push(new THREE.Vector2(3.5, -11));
    for ( let i = 0; i < 12; i+=2.25 ) points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
    points.push(new THREE.Vector2(0, 11));
    

    const geomBody = new THREE.LatheBufferGeometry( points , 8 ,0, Pi*2);
    const material = new THREE.MeshPhongMaterial({color:0xf7a0a0, flatShading:true, transparent:true, opacity:.8});
    const body = new THREE.Mesh(geomBody, material);
    const geomInside = new THREE.SphereGeometry(10,8,8);
    const materialIn = new THREE.MeshPhongMaterial({color:0xfF90a0, flatShading:true, side:THREE.DoubleSide});
    const inside = new THREE.Mesh(geomInside, materialIn);
    inside.scale.set(.5,.9,1);
    inside.position.x-= 5.25;
    this.mesh.add(inside);
    body.rotation.z = Pi/2;
    body.castShadow = true;
    body.receiveShadow = true;
    this.mesh.add(body);
};

const TentaclePart = function(){
    //the tentacles are made of multiple little spheres
    const geometry = new THREE.SphereGeometry( 2, 6, 6);
    const material = new THREE.MeshPhongMaterial({color: 0xfF90a0, flatShading:true, opacity:.65, transparent:true});
    this.xpos=0;
    this.ypos=0;
    this.oldxpos=0;
    this.oldypos=0;
    this.mesh= new THREE.Mesh(geometry,material);

}

TentaclePart.prototype.movePart = function(){
    this.oldxpos=this.mesh.position.x;
    this.oldypos=this.mesh.position.y;
    this.mesh.position.x=this.xpos;
    this.mesh.position.y=this.ypos;

}

const Tentacle = function(n,o,f){
    this.n=n;
    this.offset = o;
    this.firstOff = f;
    this.mesh = new THREE.Object3D();
    this.parts = [];
    for (let i = 0; i < n; i ++) {
        const part = new TentaclePart();
        part.mesh.position.x = -i*o;
        part.xpos=i;
        part.ypos=part.mesh.position.y;
        this.mesh.add(part.mesh);
        this.parts.push(part);
    }
}
Tentacle.prototype.moveTentacle = function (){
    //when we move the jellyfish each tentacle follow it
    //each tentacle part is following the last state of the part infront of it
    // const targetX = jellyfish.mesh.position.x;
    // const targetY = jellyfish.mesh.position.y;
    const targetX = waterfish.position.x;
    const targetY = waterfish.position.y;
    const t = this.parts[0];
    t.xpos = targetX-this.firstOff;
    t.ypos = targetY ;
    t.movePart();
    for(let i=1; i<this.n; i++){
        const a = this.parts[i-1];
        const b = this.parts[i];
        b.xpos = a.oldxpos-(i+1)*.3;
        b.ypos = a.oldypos;
        b.movePart();
    }
}
