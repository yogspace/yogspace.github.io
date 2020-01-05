/* 
Hier habe ich das mit dem Faktor ausprobiert, 
ab wann die Platformen despawned werden sollen
*/

var factor = [];

function mousePressed() {
  for (i = 0; i < 1000; i++) {
    factor.push(i);

    if (factor[i] * 50 === 500) {
      console.log(factor.length);
    }
  }
}
