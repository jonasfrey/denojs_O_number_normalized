
import {N_TAU} from "https://deno.land/x/math_constants@0.1/mod.js"

class O_prop{
    constructor(s_name_original, s_name_prefix_private = "_"){
        this._s_name_original = ""
        this.s_name_private = ""
        this.s_name_public = ""
        this.b_s_name_original_is_private = false
        this.s_name_prefix_private = s_name_prefix_private
        this.s_name_original = s_name_original
    }

    set s_name_original(value){
        
        if(typeof value !== 'symbol'){

            var n_index_of_prefix = value.indexOf(this.s_name_prefix_private)
        
            if(n_index_of_prefix == 0){
                this.s_name_public = value.substring(this.s_name_prefix_private.length)
                this.s_name_private = value
                this.b_s_name_original_is_private = true
            }else{
                this.s_name_public = value
                this.s_name_private = this.s_name_prefix_private + value
                this.b_s_name_original_is_private = false
            }
            this._s_name_original = value
        }

    }
}
class O_number_normalized_config { 
    constructor(
        
        s_name = null,
        n_max = null,
        n_min = null,
        n_modulo_divisor_before_parseint = null,
        
    ){
        this.s_name = s_name
        this.n_max = n_max
        this.n_min = n_min
        this.n_modulo_divisor_before_parseint = n_modulo_divisor_before_parseint
        if(typeof s_name === "object"){
            for(var s_prop in s_name){
                this[s_prop] = s_name[s_prop]
            }
        }
    }
}
class O_number_normalized{

    constructor(){
        this.s_separator = "_"
        this.s_prefix_private_prop_name = "_"
        this.n = 0; 
        this._n = 0; 
        this.s_suffix_modulo = "_modulo"
        // this.o = {}
        
        this._a_o_number_normalized_config = [
            new O_number_normalized_config({
                s_name: "n_radians", 
                n_max: N_TAU, 
                n_min: 0,
                n_modulo_divisor : N_TAU,
            }),
            new O_number_normalized_config({
                s_name: "n_degrees", 
                n_max: 360, 
                n_min: 0,
                n_modulo_divisor_before_parseint : 360, 
            }),
            new O_number_normalized_config({
                s_name: "n_hours", 
                n_max: 24, 
                n_min: 0,
                n_modulo_divisor_before_parseint : 24, 
            }),
            new O_number_normalized_config({
                s_name: "n_minutes", 
                n_max: 24*60, 
                n_min: 0,
                n_modulo_divisor_before_parseint : 60, 
            }),
            new O_number_normalized_config({
                s_name: "n_seconds", 
                n_max: 24*60*60, 
                n_min: 0,
                n_modulo_divisor_before_parseint : 60, 
            }),
            new O_number_normalized_config({
                s_name: "n_percentage", 
                n_max: 100,
                n_min: 0,
                n_modulo_divisor_before_parseint : 100, 
            }),
        ]
        var self= this
        this.handler = {
            apply( object, o_this, a_argument ){
                // console.log("apply was called")
                // console.log(object, o_this, a_argument)
            },
            get(object, s_prop, value){
                // if(s_prop == "o"){
                //     var o = {}

                //     for(var o_number_normalized_config of self.a_o_number_normalized_config){
                //         o[o_number_normalized_config.s_name] = self._n * o_number_normalized_config.n_max - o_number_normalized_config.n_min;
                //         o[o_number_normalized_config.s_name+"_modulo"] = parseInt(o[o_number_normalized_config.s_name] % o_number_normalized_config.n_modulo_divisor_before_parseint)
                //     }
                //     return o
                // }
                // console.log(arguments); 
                // Deno.exit()
                var o_prop = new O_prop(s_prop, self.s_prefix_private_prop_name)

                if(o_prop.s_name_public.indexOf(self.s_suffix_modulo) != -1){
                    var a_parts = o_prop.s_name_public.split(self.s_separator)
                    a_parts.pop()
                    var s_config_name = a_parts.join(self.s_separator)
                    var o_config = self._a_o_number_normalized_config.filter(o=> o.s_name == s_config_name)[0]
                    if(!o_config){
                        // console.error(`${self}.a_o_number_normalized_config must contain an instance of ${O_number_normalized_config} with the property s_name='${s_config_name}'`) 
                        // throw new 'asdf';
                        return Reflect.get(object, o_prop.s_name_private)
                    }
                    
                    var val = Reflect.get(object, new O_prop(s_config_name, self.s_prefix_private_prop_name).s_name_private); 
                    val = val % o_config.n_modulo_divisor_before_parseint
                    if(s_config_name != "n_seconds"){
                        val = parseInt(val)
                    }
                    return val
                }
                return Reflect.get(object, o_prop.s_name_private)

            },
            set(object, s_prop, value, object_proxy){
                var o_prop = new O_prop(s_prop, self.s_prefix_private_prop_name)

                // if(o_prop.b_s_name_original_is_private){
                //     // do stuff
                //     console.warn("you should not set a private property")
                //     // Reflect.set(object, s_prop, value)
                // }
                // if(!o_prop.b_s_name_original_is_private){
                //     // do stuff
                // }

                if(o_prop.s_name_public != "n"){
                    if(o_prop.s_name_public.indexOf(self.s_suffix_modulo) != -1){
                        var a_parts = o_prop.s_name_public.split(self.s_separator)
                        a_parts.pop()
                        var s_config_name = a_parts.join(self.s_separator)

                        var n_degrees_normalized = object_proxy.n_degrees_modulo / (360)
                        var n_hours_normalized = object_proxy.n_hours_modulo / (24)
                        var n_minutes_normalized = object_proxy.n_minutes_modulo / (24*60)
                        var n_seconds_normalized = object_proxy.n_seconds_modulo / (24*60*60)
                        
                        if(s_config_name == "n_hours"){
                            var n_normalized = 
                                value/24 +
                                n_minutes_normalized + 
                                n_seconds_normalized
                        }
                        if(s_config_name == "n_minutes"){
                            var n_normalized = 
                                n_hours_normalized +
                                value/(24*60) + 
                                n_seconds_normalized
                        }
                        if(s_config_name == "n_seconds"){
                            var n_normalized = 
                                n_hours_normalized +
                                n_minutes_normalized + 
                                value/(24*60*60)
                        }
                        if(s_config_name == "n_degrees"){
                            var n_normalized = 
                                value / (360)+
                                n_minutes_normalized + 
                                n_seconds_normalized
                        }
                        
                        if(n_normalized){
                            return Reflect.set(object_proxy, "n", n_normalized)
                        }
                    }else{
                        var s_config_name = o_prop.s_name_public
                    }
                    
                    var o_config = self._a_o_number_normalized_config.filter(o=> o.s_name == s_config_name)[0]
                    if(!o_config){
                        console.error(`${self}.a_o_number_normalized_config must contain an instance of ${O_number_normalized_config} with the property s_name='${s_config_name}'`)
                    }
                    if(o_config){
                        var n_normalized = value / o_config.n_max
                        // debugger
                        return Reflect.set(object_proxy, "n", n_normalized)
                        // object.n = n_normalized
                    }
                }
                if(o_prop.s_name_public == "n"){
                    for(var n_index_a_o_number_normalized_config in self._a_o_number_normalized_config){
                        var o_config = self._a_o_number_normalized_config[n_index_a_o_number_normalized_config]
                        Reflect.set(object, self.s_prefix_private_prop_name+o_config.s_name, value * o_config.n_max)

                    }
                }
                return Reflect.set(object, o_prop.s_name_private, value)

            }
        }

        return new Proxy(this, this.handler)
    }

}

export {
    O_number_normalized, 
    O_number_normalized_config, 
    O_prop
}