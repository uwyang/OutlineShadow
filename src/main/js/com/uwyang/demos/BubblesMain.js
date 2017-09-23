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
          this.controller.STEP_SIZE,
          this.controller.LINE_ALPHA,
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
