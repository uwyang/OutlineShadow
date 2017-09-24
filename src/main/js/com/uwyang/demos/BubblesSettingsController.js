foam.CLASS({
    package: 'com.uwyang.demos',
    name: 'BubblesSettingsController',
    extends: 'foam.u2.Element',

    requires: [

      'foam.u2.Element',
      'com.uwyang.demos.BubblesController',
      'foam.u2.DetailView',
    ],

    properties: [
      {
        name: 'controllerDetailView',
      },

    ],

    methods: [
      function initE(){
        //add title etc here.
      this.start(this.STOP, {data: this}).end();

        this.controllerDetailView = this.DetailView.create({
          data$: this.controller$,
          showActions: true,

          properties: [
            this.controller.LINE_ALPHA,
            this.controller.LINE_COLOR,
            this.controller.STEP_SIZE,
          ]

        });
        this.start('div').
          cssClass(this.myClass('')).
          add(this.controllerDetailView).
          end();


      },

    ],

    axioms: [
        foam.u2.CSS.create({
            code: function() {/*
              ^left{
                float:left;
                display: in-line;
              }
                ^right{
                  height:100%;
                  background:blue;
                  float:right;
                }
                ^img-button{
                width: 100px;
              }
              ^buttons{
              display: in-line;

            }
                             */}
        })
    ],

    actions: [
      {
        name: 'debug',
        code: function(){
          debugger;
        }
      },
    ],
});
