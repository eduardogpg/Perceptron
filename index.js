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
      for(var i=0; i < this.numberZ * 2; i=i+2) {
        
          var x = this.getRadomNumber(this.zoneA.x1, this.zoneA.x2);
          var y = this.getRadomNumber(this.zoneA.y1, this.zoneA.y2);
          
          this.matrix[i] = [x, y, -1]; // A
         
          var x = this.getRadomNumber(this.zoneB.x1, this.zoneB.x2);
          var y = this.getRadomNumber(this.zoneB.y1, this.zoneB.y2);

          this.matrix[i+1] = [x, y, 1]; // B
      }

    },

    drawXYPlane: function () {
      
      var canvas = document.getElementById("plano");
      var ctx = canvas.getContext("2d");
      
      // Limpia el plano cartesiano!
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Eje X
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);

      // Eje Y
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);

      // ctx.fillRect(x, y, w, h); 
      var distance = 15; // Número de espacios
      var increment = canvas.width / distance;
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
      var contador = 0;

      this.matrix.forEach(function (element) {
        
        ctx.fillStyle = "#FF0000";
        
        if (contador % 2 != 0) {
          ctx.fillStyle = "#008000";
        }

        posX = centerX + (element[0] * increment);
        posY = centerY - (element[1] * increment);

        ctx.fillRect(posX, posY, 5, 5);
        
        contador = contador + 1;
        
      });

      ctx.stroke();

    },

    perceptron: function() {
      // El algoritmo debería ir aquí!
    }
  },

});
