// this comment will not be part of any markdown file

//./readme.md:start
//md: # import 
import {
    O_number_normalized
} 
from "./mod.js"
// from "https://deno.land/x/O_number_normalized/mod.js"
//md: ## create instance
let o_number_normalized = new O_number_normalized();
console.log(o_number_normalized)

//md: ## convert radains to degrees
//md: from now on `o_number_normalized.n` is the master normalized number ( between 0.0 and 1.1)
//md: <br>
//md: if you want 180 degrees as radians you can do
// we want to convert 180 degrees to radians 
o_number_normalized.n_degrees = 180;
// now we can read out radians 
console.log(o_number_normalized.n_radians) // 3.1415 is the same as n_tau/2 or 360/2
console.log(o_number_normalized.n) // 0.5 (1/2)
console.log(o_number_normalized.n_hours) // 12 (24/2)
// console.log(o_number_normalized)

//md: ## modulo formats
//md: to also display a number as hours:minutes:seconds we can access the _modulo formats
var f_update = function(n_countdown){
    if(n_countdown > 0){
        window.setTimeout(function(){
            o_number_normalized.n_seconds +=1;
            console.log(
                `\n hh:mm:ss`,
                `\n ${o_number_normalized.n_hours_modulo}:${o_number_normalized.n_minutes_modulo}:${o_number_normalized.n_seconds_modulo}`,
                `\n n_hours: ${o_number_normalized.n_hours}`,
                `\n n_minutes: ${o_number_normalized.n_minutes}`,
                `\n n_seconds: ${o_number_normalized.n_seconds}`,
            )
            f_update(n_countdown-1);
        },1000)
    }
}
f_update(61)
// console.log(o_number_normalized._a_o_number_normalized_config)
// md: # adding custom formats 
o_number_normalized._a_o_number_normalized_config.push(
    {
        s_name: "n_inch", 
        n_max: 1./2.54, 
        n_min: 0,
        n_modulo_divisor : 1./2.54, 
    },
)
o_number_normalized.n_inch = 10.;
console.log(
    `inch:centimeter`
)
console.log(
    `${o_number_normalized.n_inch_per_centimeter}:${o_number_normalized.n}`
)
//./readme.md:end