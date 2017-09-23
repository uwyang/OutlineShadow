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
