// /*
// * Animations Galore!!!
// * (JS for animations goes here)
// */

// let anim = document.getElementById("jsAnimTest");
// //anim.innerHTML = "it works";
// anim.style.color = "rgb(255,50,50)";
// anim.style['font-family'] = "monospace";
// var timer;
// var pc = 0;

// function animTest1() {
//   pc = 0;
// //   console.log("pos: ("+ anim.getBoundingClientRect().x+", "+anim.getBoundingClientRect().y+")");
//   this.timer = setInterval(animHelper1, 0.01);
// }

// function animHelper1() {
//   if (pc >= 750) {
//     // base case
//     clearInterval(this.timer);
//     console.log("end "+pc+" "+timer);
//   }
//   document.getElementById("p1").value = pc/750;
//   var xColor = Math.round(pc % 256);
//   anim.style.color = "rgb(" + xColor + ", " + 0 + ", " + 0 + ")";
//   // circle
//   // var x = -Math.round(Math.cos((pc / 255) * (2 * Math.PI)) * 50) + 50;
//   // var y = Math.round(Math.sin(pc / 255 * (2 * Math.PI)) * 50);
//   var x = pc;
//   var y = 130 * Math.sin(pc/65); // function
//   var angle = Math.atan(130 / 65 * Math.cos(pc / 65)); // Math.atan of Dx of function, is the angle of the function
//   if (pc<1280) {
//     anim.style.transform =
//       "rotate(" +
//       0 +
//       "deg)" +
//       "translate(" +
//       x +
//       "px," +
//       y +
//       "px)" +
//       "rotate(" +
//       angle +
//       "rad)";
//     anim.innerHTML = "(" + x.toFixed(0) + ((Math.round(x)<10)?"\xa0\xa0":((Math.round(x)<100)?"\xa0":"")) + ", " + y.toFixed(0) + ((Math.round(Math.abs(y))<10)?"\xa0\xa0":((Math.round(Math.abs(y))<100)?"\xa0":""))+((Math.sign(y)==-1)?"":"\xa0") + ") @ " + (angle * 180 / Math.PI).toFixed(0) + ((Math.round(Math.abs(angle * 180 / Math.PI))<10)?"\xa0":"")+((Math.sign(angle * 180 / Math.PI)==-1)?"":"\xa0") + " deg";
//   } else
//     anim.style.transform = "rotate(0deg)";
//   pc += 0.5;
// }