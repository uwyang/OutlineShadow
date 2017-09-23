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
        this.start('div').add(this.controller).end(); 
        this.controllerDetailView = this.DetailView.create({
          data$: this.controller$,
          showActions: true,
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

          (this.makeButtons()).forEach((b)=> {
            this.add(b);
          });

      },

      function makeButtons(){
        /*
        <img src="https://www.google.co.uk/images/srpr/logo3w.png" alt="beer" />
        <input type="image" src="https://www.google.co.uk/images/srpr/logo3w.png" />*/
        var buttonsArr = [];
        this.imagePaths.forEach((path) =>{
          var e = this.Element.create().setNodeName('input');
          e.cssClass(this.myClass('img-button'));
          e.setAttribute('type', 'image');
          e.setAttribute('src', path);
          e.on('click', () => {
            console.log('input img clicked. ', path); }
          );
          buttonsArr.push(e);
        });
        return buttonsArr;
      }
    ],

    axioms: [
        foam.u2.CSS.create({
            code: function() {/*
                ^right{
                  height:100%;
                  background:blue;
                  float:right;
                }
                ^img-button{
                width: 100px;
              }
                             */}
        })
    ]
});
