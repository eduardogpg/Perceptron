const app = new Vue({
  el: "#app",
  
  data: {
    titulo: "Perceptron",
    zoneA: {
      x1:2,
      x2:6,
      y1:2,
      y2:5
    },

    zoneB: {
      x1:1,
      x2:-5,
      y1:1,
      y2:-3
    },

    coeffient: 0,
    numberZ: 10,
    disabled: false,
    
    matrix: [],
  },

  methods: {
    run: function () {
      this.disable = true;
      
      this.generateMatrix();
      this.drawXYPlane();

      this.perceptron();

      this.disable = false;
    },

    getRadomNumber: function(min, max) {
      return Math.random() * (max - min) + min;
    },
    
    generateMatrix: function(){
      // Matriz de 3 columnas
      for(var i=0; i < this.numberZ * 2; i++) {
        
        if (i % 2 == 0){
          var x = this.getRadomNumber(this.zoneA.x1, this.zoneA.x1);
          var y = this.getRadomNumber(this.zoneA.y1, this.zoneA.y1);
          
          this.matrix[i] = [x, y, 1]; // A
        
        } else {
          var x = this.getRadomNumber(this.zoneB.x1, this.zoneB.x2);
          var y = this.getRadomNumber(this.zoneB.y1, this.zoneB.y2);

          this.matrix[i] = [x, y, 1]; // B
        }
      }

    },

    drawXYPlane: function () {

      var canvas = document.getElementById("plano");
      var ctx = canvas.getContext("2d");
      
      // 600 x 600 -> 20

      // Eje X
      ctx.moveTo(0, 300);
      ctx.lineTo(600, 300);

      // Eje Y
      ctx.moveTo(300, 0);
      ctx.lineTo(300, 600);

      // ctx.fillRect(x, y, w, h); 
      var distance = 10; // Número de espacios
      var increment = 600 / distance;
      var posX = increment;

      for(i = 0; i < distance; i ++ ){
        
        if (i != (distance / 2 ) - 1){ // Omitimos el pintado del centro
          ctx.fillRect(posX, 290, 2, 20);
        }

        posX = posX + increment;
      }

      var posY = increment;
      for(i = 0; i < distance; i ++ ){
        
        if (i != (distance / 2 ) - 1){ // Omitimos el pintado del centro
          ctx.fillRect(290, posY, 20, 2);
        }

        posY = posY + increment;
      }
      
      var centerX = 300;
      var centerY = 300;

      this.matrix.forEach(function (element) {
          
        var posX = centerX + ( element[0] * increment ) ;
        var posY = centerY + ( element[1] * increment ) ;
        
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(posX, posY, 5, 5);

        
      });

      ctx.stroke();

    },

    perceptron: function() {
      // El algoritmo debería ir aquí!
    }
  },

});
