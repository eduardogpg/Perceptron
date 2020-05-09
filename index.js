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
    numberZ: 100,
    disabled: false,
    
    matrix: [],
    
    rectax:0,
    rectay:0,
  },

  methods: {
    run: function () {
      this.disable = true;
      
      this.generateMatrix();
      this.perceptron()

      this.drawXYPlane();

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
      
      var centerX = canvas.width / 2;
      var centerY = canvas.height / 2;
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

      // [0,recty] [rectax,0]
      console.log(this.rectax);
      console.log(this.rectay);

      var nexPOSX = centerX + (this.rectax * distance);
      var nexPOSY = centerY - (this.rectay * distance);

      ctx.moveTo(nexPOSX, centerY);
      ctx.lineTo(centerX, nexPOSY);

      var superPOSX = (nexPOSX * 2 ) + 1
      var superPOSY = (nexPOSY * 2 ) + 1

      superPOSX = 300 - (superPOSX - 300)
      superPOSX = 300 - (superPOSY - 300)

      console.log(superPOSX);
      console.log(superPOSY);
      
      ctx.stroke();
    },

    activation: function (wi, x1, x2, y, n) {
      s = (wi[0] * x1 + (wi[1] * x2)) - wi[2];

      f = this.EvalActivacionEscalon(s);
      
      if ((y - f) != 0) {
        
        wi[0] = wi[0] + n * (y - f) * x1;
        wi[1] = wi[1] + n * (y - f) * x2;
        wi[2] = wi[2] - n * (y - f);
      
      }else {

        wi[0] = wi[0];
        wi[1] = wi[1];
        wi[2] = wi[2];

      }

      P = [wi[0], wi[1], wi[2]];
      return P;

    },

    EvalActivacionEscalon: function (x) {
      return (x >= 0) ? 1 : -1;
    },

    perceptron: function () {
      
      var weights = [Math.random(), Math.random(), Math.random()];
      
      var w1 = 0;
      var w2 = 0;
      var theta = 0;

      for (let j = 0; j < this.numberZ * 2; j++) {
        
        P = this.activation(weights, this.matrix[j][0], this.matrix[j][1], this.matrix[j][2], this.coeffient);
        
        w1 = P[0];
        w2 = P[1];
        theta = P[2];

        weights = [w1, w2, theta];
        
      }

      this.rectay = (-1 *(theta )/ w2);
      this.rectax =(-1*(theta/w1));

    }

  },

});
