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
      value:'/src/main/images/moth.png',
      postSet: function(old, nu){
        if (!this.canvas) return;
        if (old.toLowerCase() !== nu.toLowerCase() ){
          this.resetCanvas();
        }
      }

    },
    [ 'width',      1000 ],
    [ 'height',     1000 ],
    [ 'background', '#ccf' ],
    { name: 'engine',   factory: function() {
      //var e = this.BubblesCollider.create({gravity: true});
      var e = this.PolygonPropagator.create({
        gravity: true,
        polygon: this.polygon,
        canvas: this.canvas,
        stepSize: this.stepSize,
        lineRGBA: this.lineRGBA,
      });

      e.start();
      return this.onDetach(e);
    }},

    {
      name: 'points',
      factory: function(){return []; },
      postSet: function(old, nu){
        //this.reStart();
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
        viewa: { class: 'foam.u2.FloatView', precision: 1, onKey: true },
        viewb: { class: 'foam.u2.RangeView', step: 1, maxValue: 100, onKey: true }
      },
    {
      name: 'lineAlpha',
      class: 'Float',
      view: {
        class: 'foam.u2.view.DualView',
        viewa: { class: 'foam.u2.FloatView', precision: 3, onKey: true },
        viewb: { class: 'foam.u2.RangeView', step: 0.005, maxValue: 1,minValue: 0,  onKey: true }
      },
      value: 0.01,
      postSet: function(){
        this.updateLineRGBA();
      }
    },
    {
      name: 'lineColor',
      class: 'Color',
      postSet: function(old, nu){
        if (!nu) return;
        this.updateLineRGBA();
      }
    },
    {
      name: 'lineRGBA',

    },
    {
      name: 'stopped',
    }


  ],



    methods: [

      function erase(){
        console.log('earase');
      },

      function updateLineRGBA(){
        var c = this.hexToRgb(this.lineColor);
        //want: color: 'rgba(0,0,0,0.02)',
        var str = "rgba(" + c.r + ", " + c.g + ", " + c.b + ", " + this.lineAlpha + ")";
        console.log("new color", str);
        this.lineRGBA = str;
      },



      function initCView() {
        this.SUPER();
        //this.stopped$ = this.engine.stopped_$;
        this.canvas.style.position = "absolute";
        this.canvas.erase= (()=>{});
        var image = new Image();
        image.onload = () =>  {
          //this.createBubbleCollider(image);
          this.createPolygonPropagator(image);
        }
        image.src = this.imagePath;

      },

      function resetCanvas(){
          this.canvas.el().width = this.canvas.el().width;
          var image = new Image();
          image.src = this.imagePath;
          image.onload = () =>  {
            //this.createBubbleCollider(image);
            this.createPolygonPropagator(image);
          }
          this.engine.tick();
          this.engine.stopped_ = true;


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
        this.clearProperty('polygon');
        this.clearProperty('engine');

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
          stepSize: this.stepSize,
        });
        this.engine.add(this.polygon);
        //this.timer.i$.sub(this.invalidated.pub);

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
        /*
        this.timer.i$.sub(foam.Function.bind(function circleBoundOnWalls(c) {
          if ( c.y > 1/this.scaleY*this.height+50 ) {
            c.y = -50;
          }
          if ( c.x < 0          ) c.vx =  Math.abs(c.vx)+0.1;
          if ( c.x > this.width ) c.vx = -Math.abs(c.vx)-0.1;
        }, this, c));
        */
      },

      function setSettings(){
        this.engine.stepSize = this.stepSize;
        this.engine.lineRGBA = this.lineRGBA;
      },



      function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
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
          this.engine.stopped_ = false;
          this.engine.tick();
        }
      },
      {
        name: 'stop',
        code: function() {
          this.engine.stopped_ = true;
        }
      },
      {
        name: 'reset',
        code: function() {
          this.resetCanvas();
        }
      },
      {
        name: 'set',
        /*
        isEnabled: function(stopped){
          return stopped;
        },*/
        label: 'SET',
        code: function(){
          this.setSettings();
        }
      }

    ]

});
