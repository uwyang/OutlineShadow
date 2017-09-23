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
