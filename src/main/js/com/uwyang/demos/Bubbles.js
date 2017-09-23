
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
