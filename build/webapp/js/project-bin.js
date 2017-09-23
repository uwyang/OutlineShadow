 
//var getImageOutline = require('image-outline');
//var Image = require('htmlimage');

foam.CLASS({
  package: 'com.uwyang.demos',
  name: 'Bubbles',
  extends: 'foam.graphics.Box',

  requires: [
    'foam.physics.PhysicalCircle',
    'foam.physics.PhysicsEngine',
    'com.uwyang.demos.BubblesCollider',
    'foam.util.Timer',
    'foam.foam.graphics.Polygon',
  ],

  properties: [
    {
      name: 'timer',
      factory: function() {
        var timer = this.Timer.create();
        timer.start();
        return timer;
      }
    },
    [ 'n',          7 ],
    [ 'width',      1100 ],
    [ 'height',     1100 ],
    [ 'background', '#ccf' ],
    { name: 'engine',   factory: function() {
      var e = this.BubblesCollider.create({gravity: true});
      e.start();
      return this.onDetach(e);
    }},

    {
      name: 'points',
      factory: function(){return []; },
      postSet: function(old, nu){
        this.reStart();
      }
    }

  ],



    methods: [

      function init(){

      },

      function erase(){
        console.log('earase');
      },


      function initCView() {
        this.SUPER();
        this.canvas.erase= (()=>{});
        var image = new Image();
        image.onload = () =>  {
          
        }
        image.src = '/src/main/images/butterfly.png';

        /*
        var N = this.n;
        var arr = this.getGridPoints(N, N);
        arr.forEach((c)=> {
          this.addPoint(c); });

        this.timer.i$.sub(this.invalidated.pub);
        console.log("initCViewDone. ");
        */

      },


      function getPhysicalPoint(p, g=0.001){
          return this.PhysicalCircle.create({
            radius: 3,
            x: p.x,
            y: p.y,
            //arcWidth: 6,
            friction: 0.96,
            gravity: g,
            alpha: 0.1,
            //border: this.hsl(x/xN*100, (70+y/yN*30), 60)
          });
      },

      function getGridPoints(xN, yN, g=0.001){
        var arr = [];
        for ( var x = 0 ; x < xN ; x++ ) {
          for ( var y = 0 ; y < yN ; y++ ) {
            var c = this.PhysicalCircle.create({
              radius: 15,
              x: 400+(x-(xN-1)/2)*70,
              y: 200+(y-(yN-1)/2)*70,
              arcWidth: 6,
              friction: 0.96,
              gravity: g,
              border: this.hsl(x/xN*100, (70+y/yN*30), 60)
            });
            arr.push(c);
          }
        }
        return arr;
      },

      function addPoint(c){
        this.engine.add(c);
        this.add(c);

        this.timer.i$.sub(foam.Function.bind(function circleBoundOnWalls(c) {
          if ( c.y > 1/this.scaleY*this.height+50 ) {
            c.y = -50;
          }
          if ( c.x < 0          ) c.vx =  Math.abs(c.vx)+0.1;
          if ( c.x > this.width ) c.vx = -Math.abs(c.vx)-0.1;
        }, this, c));
      }
    ],

    actions: [
      {
        name: 'stop',
        code: function(){
          debugger;
        }
      }
    ]

});
foam.CLASS({
    package: 'com.uwyang.demos',
    name: 'BubblesMain',
    extends: 'foam.u2.Element',

    requires: [

      'foam.u2.Element',
      'com.uwyang.demos.BubblesController',
      'foam.u2.DetailView',
    ],

    properties: [
      {
        name: 'controllerDetailView',
        factory: function(controller){
          return this.DetailView.create({
            data: controller,
            showActions: true,
          });
        }
      },
      {
        name: 'controller',
        factory: function(){
          return this.BubblesController.create({imagePath: '/src/main/images/butterfly2.png'});
        }
      }
    ],

    methods: [
      function initE(){
        //add title etc here.
        this.start();
        this.end();

        this.add(this.controller);
        this.controllerDetailView.properties = [
          controller.STEP_SIZE,
          controller.LINE_ALPHA,
        ];
        this.add(this.controllerDetailView);
      }
    ],

    axioms: [
        foam.u2.CSS.create({
            code: function() {/*
                                div.com-serviceecho-workorder-schedule-CellWrapperView {
                                position: relative;
                                width: 100%;
                                height: 100%;
                                cursor: auto;

                                border-radius: 1px;
                                box-sizing: border-box;
                                -moz-box-sizing: border-box;
                                -webkit-box-sizing: border-box;
                                border: solid transparent 2px;
                                }
                             */}
        })
    ]
});
foam.CLASS({
  package: 'com.uwyang.demos',
  name: 'BubblesController',
  extends: 'foam.graphics.Box',

  requires: [
    //'foam.physics.PhysicalCircle',
    'com.uwyang.demos.Bubble',
    //'foam.physics.PhysicsEngine',
    'com.uwyang.demos.BubblesCollider',
    'com.uwyang.demos.PolygonPropagator',
    'foam.graphics.Polygon',
    'foam.util.Timer'
  ],

  properties: [
    {
      name: 'timer',
      factory: function() {
        var timer = this.Timer.create();
        timer.start();
        return timer;
      }
    },
    {
      name: 'imagePath',
      value:'/src/main/images/butterfly2.png',

    },
    [ 'width',      1000 ],
    [ 'height',     1000 ],
    [ 'background', '#ccf' ],
    { name: 'engine',   factory: function() {
      //var e = this.BubblesCollider.create({gravity: true});
      var e = this.PolygonPropagator.create({gravity: true, polygon: this.polygon, canvas: this.canvas});

      e.start();
      return this.onDetach(e);
    }},

    {
      name: 'points',
      factory: function(){return []; },
      postSet: function(old, nu){
        this.reStart();
      }
    },

    {
      name: 'bounceOnFloorOnly',
      value: false,
    },
    {
      name: 'polygon',
    },
    {
      name: 'stepSize',
      value: 5,
    },
    {
      name: 'lineAlpha',
      value: 0.01,
    }

  ],



    methods: [

      function erase(){
        console.log('earase');
      },


      function initCView() {
        this.SUPER();
        this.canvas.erase= (()=>{});
        var image = new Image();
        image.onload = () =>  {
          //this.createBubbleCollider(image);
          this.createPolygonPropagator(image);
        }
        image.src = this.imagePath;

      },

      function createBubbleCollider(image){
        var polygon = getImageOutline(image);
        // polygon is now an array of {x,y} objects. Have fun!
        var c = 0;
        polygon.forEach((p)=> {
          //if (c<=100)
           this.addPoint(this.getPhysicalPoint(p, 0.1));
           this.addPoint(this.getPhysicalPoint(p, -0.1));
         //c++;
        });

        this.timer.i$.sub(this.invalidated.pub);

        console.log("points: ", polygon.length, " added. ");
      },

      function createPolygonPropagator(image){
        var polygon = getImageOutline(image);
        // polygon is now an array of {x,y} objects. Have fun!
        var c = 0;
        var xArr =[];
        var yArr = [];
        polygon.forEach((p)=> {
          var bubblePoint = this.Bubble.create({
            radius: 1,
            x: p.x,
            y: p.y,
            //arcWidth: 6,
            //friction: 0.96,
            //gravity: 0,
            alpha: 0.1,
            vx: 0,
            vy: 0,
            invisible: true,
            //border: this.hsl(x/xN*100, (70+y/yN*30), 60)
          }
        );
          this.addPoint(bubblePoint);
          xArr.push(p.x);
          yArr.push(p.y);
           //this.addPoint(this.getPhysicalPoint(p, 0.1));
           //this.addPoint(this.getPhysicalPoint(p, -0.1));
         //c++;
        });
        xArr.push(polygon[0].x);
        yArr.push(polygon[0].y);
        this.polygon = this.Polygon.create({
          xCoordinates: xArr,
          yCoordinates: yArr,
          alpha: 0.5,
        });
        this.engine.add(this.polygon);
        this.timer.i$.sub(this.invalidated.pub);

        console.log("points: ", polygon.length, " added. ");
      },


      function getPhysicalPoint(p, g=0.001){
          return this.Bubble.create({
            radius: 3,
            x: p.x,
            y: p.y,
            //arcWidth: 6,
            friction: 0.96,
            gravity: g,
            alpha: 0.1,
            vx: 0,
            vy: 0,
            //border: this.hsl(x/xN*100, (70+y/yN*30), 60)
          });
      },

      function getGridPoints(xN, yN, g=0.001){
        var arr = [];
        for ( var x = 0 ; x < xN ; x++ ) {
          for ( var y = 0 ; y < yN ; y++ ) {
            var c = this.Bubble.create({
              radius: 15,
              x: 400+(x-(xN-1)/2)*70,
              y: 200+(y-(yN-1)/2)*70,
              arcWidth: 6,
              friction: 0.96,
              gravity: g,
              border: this.hsl(x/xN*100, (70+y/yN*30), 60)
            });
            arr.push(c);
          }
        }
        return arr;
      },

      function addPoint(c){
        this.engine.add(c);
        this.add(c);

        this.timer.i$.sub(foam.Function.bind(function circleBoundOnWalls(c) {
          if ( c.y > 1/this.scaleY*this.height+50 ) {
            c.y = -50;
          }
          if ( c.x < 0          ) c.vx =  Math.abs(c.vx)+0.1;
          if ( c.x > this.width ) c.vx = -Math.abs(c.vx)-0.1;
        }, this, c));
      }
    ],

    actions: [
      {
        name: 'debug',
        code: function(){
          debugger;
        }
      },

      {
        name: 'start',
        code: function() {
          this.timer.start();
          this.state.start(this);
        }
      },
      {
        name: 'stop',
        code: function() {
          this.timer.stop();
        }
      },
      {
        name: 'reset',
        code: function() {
          this.timer.stop();
          this.timer = undefined;
          this.currentRound = undefined;
          this.state = undefined;
          this.action = undefined;
        }
      }
    ]

});
foam.CLASS({
  package: 'com.uwyang.demos',
  name: 'BubblesCollider',
  extends: 'foam.physics.PhysicsEngine',

  documentation: 'extension of PhysicsEngine, ',

  properties: [
    {
      class: 'Boolean',
      name: 'gravity',
      value: false
    },
    {
      class: 'Float',
      name: 'gravityStrength',
      value: 1
    },
    {
      name: 'hasInteraction',
      value: false,
    }
  ],

  methods: [
    
    function updateChild(c) {
      this.SUPER(c);

      var gravity  = c.gravity;
      var friction = c.friction;

      if ( gravity && this.gravity ) {
        c.vy += gravity * this.gravityStrength;
      }

      if ( friction ) {
        c.vx = Math.abs(c.vx) < 0.001 ? 0 : c.vx * friction;
        c.vy = Math.abs(c.vy) < 0.001 ? 0 : c.vy * friction;
      }

      // Inertia
      if ( Math.abs(c.vx) > 0.001 ) c.x += c.vx;
      if ( Math.abs(c.vy) > 0.001 ) c.y += c.vy;
    }
  ],

  listeners: [
    {
      name: 'tick',
      isFramed: true,
      code: function tick() {
        if ( this.stopped_ ) return;
        this.onTick.pub();
        if (this.hasInteraction) this.detectCollisions();
        this.updateChildren();

        this.tick();
      }
    }
  ]


});
//extends from foam.physics.PhysicalCircle,
//extends from foam.graphics.Circle,
//extends from foam.graphics.Arc.

//arcWidth: borderWidth,
//color: string of '#00000',
//border

//there's also polygon.
/*
foam.CLASS({
  package: 'foam.graphics',
  name: 'Polygon',
  extends: 'foam.graphics.CView',

  documentation: 'A CView for drawing a polygon.',

  properties: [
    { class: 'Array', of: 'Float', name: 'xCoordinates' },
    { class: 'Array', of: 'Float', name: 'yCoordinates' },
    { class: 'String', name: 'color', value: '#000' },
    { class: 'Float', name: 'lineWidth', value: 1 }
  ],
*/

//from CView: removeAllChildren

// you can use remove in PhysicsEngine to remove the chilren, without removing from CView.
//you can also set bounceOnWalls of the engine to true.


foam.CLASS({
  package: 'com.uwyang.demos',
  name: 'Bubble',
  extends: 'foam.physics.PhysicalCircle',

  documentation: 'CView for a physical circle.',

  properties: [
    {
      name:'invisible',
      value: false,
    }

  ],

  methods: [

    function paintSelf(x) {
      if (this.invisible){
        return;
      }else {
        this.SUPER(x);
      }
    },



  ]
});
foam.CLASS({
  package: 'com.uwyang.demos',
  name: 'PolygonPropagator',
  extends: 'foam.physics.PhysicsEngine',

  documentation: 'Apply when shapes are shifting',

  topics: [ 'onTick' ],

  requires: [

    'foam.graphics.Polygon',
  ],

  properties: [
    {
      class: 'Boolean',
      name: 'stopped_',
      value: true,
      hidden: true
    },
    {
      name: 'stepSize',
      value: 3,
    },
    {
      name: 'polygon',
    },
    {
      name: 'canvas',
    }

  ],

  methods: [

    function updateChildren() {
      var cs = this.children;

      var xArr =[], yArr =[];
      cs.forEach((c) => {
        this.updateChild(c);
        if (c.x >=20 || c.y >=20){
          xArr.push(c.x);
          yArr.push(c.y);
        }
      });
      xArr.push(cs[0].x);
      yArr.push(cs[0].y);
      //this.remove(this.polygon);
      this.polygon = this.Polygon.create({
        xCoordinates: xArr,
        yCoordinates: yArr,
        color: 'rgba(0,0,0,0.02)',
      });
      this.polygon.paintSelf(this.canvas.context);
      //this.add(this.polygon);
    },

    function updateChild(c) {
        c.x += Math.random()*this.stepSize - this.stepSize/2;
        c.y += Math.random()*this.stepSize - this.stepSize/2;
    },

  ],

  actions: [

  ],

  listeners: [
    {
      name: 'tick',
      isFramed: true,
      code: function tick() {
        if ( this.stopped_ ) return;
        this.onTick.pub();
        //this.detectCollisions();
        this.updateChildren();
        this.tick();
      }
    }
  ]
});
