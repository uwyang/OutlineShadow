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
      },
      {
        name: 'controller',
        factory: function(){
          return this.BubblesController.create({imagePath: '/src/main/images/butterfly2.png'});
        }
      },

      {
        name: 'imagePaths',
        factory: function(){
          return [
            '/src/main/images/moth.png',
            '/src/main/images/butterfly2.png',
          ];
        }
      },

    ],

    methods: [
      function initE(){
        //add title etc here.
      this.start(this.STOP, {data: this}).end(); 
        this.start('div').cssClass(this.myClass('left')).
          add(this.makeButtonsDiv()).add(this.controller).end();

        this.controllerDetailView = this.DetailView.create({
          data$: this.controller$,
          showActions: true,

          properties: [
            this.controller.LINE_ALPHA,
            this.controller.LINE_COLOR,
            this.controller.STEP_SIZE,
          ]


        });
        /*
        this.controllerDetailView.properties =
        [
          com.uwyang.demos.BubblesController.STEP_SIZE,
          //this.controller.LINE_ALPHA,
        ];*/
        this.start('div').
          cssClass(this.myClass('right')).
          add(this.controllerDetailView).
          end();


      },

      function makeButtonsDiv(){
        /*
        <img src="https://www.google.co.uk/images/srpr/logo3w.png" alt="beer" />
        <input type="image" src="https://www.google.co.uk/images/srpr/logo3w.png" />*/
        //var buttonsArr = [];
        var d = this.Element.create('div');
        this.imagePaths.forEach((path) =>{
          var e = this.Element.create().setNodeName('input');
          e.cssClass(this.myClass('img-button'));
          e.setAttribute('type', 'image');
          e.setAttribute('src', path);
          e.on('click', () => {
            console.log('input img clicked. ', path);
            this.controller.imagePath = path;
          }
          );
          d.add(e);
          //buttonsArr.push(e);
        });
        return d;
        //return buttonsArr;
      }
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
