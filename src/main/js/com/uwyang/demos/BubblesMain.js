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

            //'/src/main/images/cherry1.png',
            '/src/main/images/cherry2.png',
            '/src/main/images/feather1.png',
            '/src/main/images/feather2.png',
            '/src/main/images/stag.png',
            //'/src/main/images/batwings.png',
            '/src/main/images/cat.png',
            '/src/main/images/hummingbird.png',

            '/src/main/images/girl1.png',
          ];
        }
      },

    ],

    methods: [
      function initE(){
        //add title etc here.
      this.start(this.STOP, {data: this}).end();
        this.start('div').cssClass(this.myClass('left')).
          add(this.makeButtonsDiv()).add(this.controller).cssClass(this.myClass('controller')).end();

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
          start(this.SAVE, {data: this}).end().
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
              ^controller{
                  overflow: scroll;
                  max-width: 1000px;
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
      {
        name: 'save',
        label: 'Save Image', 
        code: function(){
          if (!this.controller || !this.controller.canvas) return;
          var imageDownloadLink = this.controller.canvas.el().toDataURL("image/png").replace("image/png", "image/octet-stream");
          // here is the most important part because if you dont replace you will get a DOM 18 exception.
          window.location.href=imageDownloadLink; // it will save locally
        }
      }
    ],
});
