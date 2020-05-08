const app = new Vue({
  el: "#app",
  
  data: {
    titulo: "Perceptron",
    zoneA: {
      x1:0,
      x2:0,
      y1:0,
      y2:0
    },

    zoneB: {
      x1:0,
      x2:0,
      y1:0,
      y2:0
    },

    coeffient: 0,
    numberZ: 0,
    disabled: false,
    
    matrix: [],
  },

  methods: {
    run: function () {
      this.disable = true;
      
      this.generateMatrix();
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

          // Esto es lo que tú tienes
          // x = (zonaB.x1 + (zonaA.B2-zonaA.B1))*Math.random();
          // y = (zonaB.y1 + (zonaA.B2-zonaA.B1))*Math.random();

          this.matrix[i] = [x, y, 1]; // B
        }
      }

      this.console(this.matrix);

    },

    perceptron: function() {
      // El algoritmo debería ir aquí!
    }
  },

});
