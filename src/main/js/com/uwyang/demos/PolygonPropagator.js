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
      if (!cs || !cs.length) return;

      var xArr =[], yArr =[];
      cs.forEach((c) => {
        if (!c) return; 
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
