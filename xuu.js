/*
 * xuu.js
 * @author Michael S. Mikowski - mike.mikowski@gmail.com
 *
 * Use      : xuu.castBool(...)
 * Synopsis : Stand-alone ES5.1 port of hi_score utilities
 * Provides : Utilities which do not require jQuery or a browser
 * Requires : No dependencies.
 *
*/
/*global xuu:true */
// == BEGIN MODULE xuu ================================================
var xuu = (function () {
  // == BEGIN MODULE SCOPE VARIABLES ==================================
  'use strict';
  var
    __data2strFn  = JSON.stringify,
    __str2DataFn  = JSON.parse,

    __Array   = Array,
    __Date    = Date,
    __Num     = Number,
    __Str     = String,

    __apply           = 'apply',
    __bind            = 'bind',
    __blank           = '',
    __clearTimeoutFn  = clearTimeout,
    __false           = false,
    __hasOwnProperty  = 'hasOwnProperty',
    __indexOf         = 'indexOf',
    __join            = 'join',
    __length          = 'length',
    __makeAbsNumFn    = Math.abs,
    __makeFloorNumFn  = Math.floor,
    __makeKeyListFn   = Object.keys,
    __makeRandomNumFn = Math.random,
    __makeRoundNumFn  = Math.round,
    __match           = 'match',
    __null            = null,
    __push            = 'push',
    __replace         = 'replace',
    __setTimeoutFn    = setTimeout,
    __split           = 'split',
    __toString        = 'toString',
    __true            = true,
    __typeofFn        = function (data) { return typeof data; },
    __undef           = void(0),

    __0   = 0,
    __1   = 1,
    __2   = 2,
    __3   = 3,
    __4   = 4,
    __10  = 10,
    __100 = 100,
    __n1  = -1,

    typeofMap = {
      'boolean'   : '_Boolean_',
      'number'    : '_Number_',
      'string'    : '_String_',
      'function'  : '_Function_',
      'object'    : '_Object_',
      'undefined' : '_Undefined_',

      'Array'     : '_Array_',
      'Boolean'   : '_Boolean_',
      'Function'  : '_Function_',
      'Null'      : '_Null_',
      'Number'    : '_Number_',
      'Object'    : '_Object_',
      'String'    : '_String_',
      'Undefined' : '_Undefined_'
    },

      configMap, stateMap,
      logObj,    getBasename, getDirname,
      instanceMap, optionMap
    ;
  // == . END MODULE SCOPE VARIABLES ==================================

  // == BEGIN PREREQ METHODS ==========================================
  // BEGIN Public prereq method /getVarType/
  // Summary   : getVarType( <data> )
  // Purpose   : Determine the type of data provided.
  // Example   : getVarType( [] ); // '_Array_'
  // Arguments : (positional)
  //   <data> - value to examine
  // Returns   : '_Function_', '_Object_', '_Array_', '_String_',
  //             '_Number_', '_Null_', '_Boolean_', or '_Undefined_'
  // Throws    : none
  //
  function getVarType ( data ) {
    var type_key, type_str;

    if ( data === __null ) {  return '_Null_'; }
    if ( data === __undef ) { return '_Undefined_'; }
    if ( __Array.isArray( data ) ) { return '_Array_'; }

    type_key = __typeofFn( data );
    type_str = typeofMap[ type_key ];

    if ( type_str && type_str !== '_Object_' ) { return type_str; }

    type_key = {}[ __toString ].call( data ).slice( 8, __n1 );

    return typeofMap[ type_key ] || type_key;
  }
  // . END Public prereq method /getVarType/

  // BEGIN Public prereq method /castBool/
  // Summary   : castBool( <data>, <alt_data> )
  // Purpose   : Cast a boolean value
  // Example   : castBool( true ); // returns true
  // Arguments : (positional)
  //   <data>     - data to cast as boolean
  //   <alt_data> - alternate value to return
  // Returns   :
  //   <data> if it is a boolean, <alt_data> otherwise
  // Throws    : none
  //
  function castBool ( data, alt_data ) {
      if ( data === __true || data === __false ) { return data; }
      return alt_data;
  }
  // . END Public prereq method /castBool/

  // BEGIN Public prereq method /castFn/
  // Summary   : castFn( <data>, <alt_data> )
  // Purpose   : Cast a function
  // Example   : castFn( function() {} ); // returns function
  // Arguments : (positional)
  //   <data>     - data to cast as function
  //   <alt_data> - alternate value to return
  // Returns   :
  //   <data> if it is a function, <alt_data> otherwise
  // Throws    : none
  //
  function castFn ( data, alt_data ) {
    var var_type = getVarType( data );
    return ( var_type === '_Function_' ) ? data : alt_data;
  }
  // . END Public prereq method /castFn/

  // BEGIN Private prereq method /checkNumFn/
  function checkNumFn( num, alt_data, option_map ) {
    var log_list = [], solve_data;

    if ( option_map[ __hasOwnProperty ]( '_max_num_' )
      && num > option_map._max_num_
    ) {
      if ( option_map._do_autobound_ ) {
        num = option_map._max_num_;
      }
      else {
        log_list[ __push ](
          'Value exceeds allowed maximum. '
          + __Str( num ) + ' > '
          + __Str( option_map._max_num_ )
        );
      }
    }

    if ( option_map[ __hasOwnProperty ]( '_min_num_' )
      && num < option_map._min_num_
    ) {
      if ( option_map._do_autobound_ ) {
        num = option_map._min_num_;
      }
      else {
        log_list[ __push ](
          'Number below allowed minimum of ' + option_map._min_num_
        );
      }
    }

    if ( log_list[ __length ] === __0 ) {
      solve_data = num;
    }
    else {
      if ( option_map._do_warn_ ) {
        logObj.logMsg( '_warn_', 'Int fails constraints', log_list );
      }
      solve_data = alt_data;
    }
    return solve_data;
  }
  // . END Private prereq method /checkNumFn/

  // BEGIN Public prereq method /castInt/
  // Summary   : castInt( <data>, <alt_data>, <option_map> )
  // Purpose   : Cast an integer
  // Example   : castInt( '25.425' ); // returns 25
  // Arguments : (positional)
  //   <data>       - data to cast as int
  //   <alt_data>   - alternate value to return
  //   <option_map> - Optional constraint map
  //     + _do_autobound_ - auto bound input to min/max as appropriate
  //     + _do_warn_      - Log warnings
  //     + _max_num_      - max allowed value
  //     + _min_num_      - min allowed value
  // Returns   :
  //   If a number, returns the number rounded to nearest int.
  //   If a string, returns the number rep rounded to nearest int.
  //   Otherwise <alt_data>.
  // Throws    : none
  //
  function castInt ( data, alt_data, option_map ) {
    var
      var_type = getVarType( data ),
      solve_num  = var_type === '_Number_'
        ? data : var_type === '_String_'
          ? parseFloat( data ) : __undef,
      solve_int
    ;

    if ( isNaN( solve_num ) ) { return alt_data; }
    solve_int = __makeRoundNumFn( solve_num );

    // Begin process optional constraints
    if ( __typeofFn( option_map ) === 'object' ) {
      return checkNumFn( solve_int, alt_data, option_map );
    }
    // . End process optional constraints
    return solve_int;
  }
  // . END Public prereq method /castInt/

  // BEGIN Public prereq method /castJQ/
  // Summary   : castJQ( <data>, <alt_data> )
  // Purpose   : Cast a jQuery object
  // Example   : castJQ( $top_box ); // returns $top_box
  // Arguments : (positional)
  //   <data>     - data to cast as jQuery object
  //   <alt_data> - alternate value to return
  // Returns   :
  //   <data> if it is a jQuery object, <alt_data> otherwise
  // Throws    : none
  //
  function castJQ ( data, alt_data ) {
    if ( stateMap._has_jq_ ) {
      return ( data && data instanceof jQuery ) ? data : alt_data;
    }
    /* istanbul ignore next */
    return alt_data;
  }
  // . END Public preq method /castJQ/

  // BEGIN Public prereq method /castList/
  // Summary   : castList( <data>, <alt_data>, <option_map> )
  // Purpose   : Cast a list
  // Example   : castList( [] ); // returns the array
  // Arguments : (positional)
  //   <data>       - Data to cast as list
  //   <alt_data>   - Optional alternate value to return (default __undef)
  //   <option_map> - Optional constraint map
  //       + _do_warn_      - Log warnings
  //       + _is_empty_ok_  - Allow empty list (default is true)
  //       + _max_length_   - Max allowed length
  //       + _min_length_   - Min allowed length
  // Returns   :
  //   <data> if it is an array and passes optional constraints,
  //   <alt_data> otherwise
  // Throws    : none
  //
  function castList ( data, alt_data, option_map ) {
    var
      var_type = getVarType( data ),
      log_list, item_count;

    // Return alt_data if not array
    if ( var_type !== '_Array_' ) { return alt_data; }

    // Begin process optional constraints
    if ( __typeofFn( option_map ) === 'object' ) {
      log_list = [];
      item_count = data[ __length ];
      if ( item_count === 0 && option_map._is_empty_ok_ === __false ) {
        log_list[ __push ]( 'List is empty' );
      }

      if ( option_map._max_length_
        && item_count > option_map._max_length_
      ) {
        log_list[ __push ](
          'List exceeds maxiumum length: ' + __Str( item_count )
          + ' > ' + __Str( option_map._max_length_ )
        );
      }

      if ( option_map._min_length_
        && item_count < option_map._min_length_
      ) {
        log_list.push(
          'List is below minimum length: ' + __Str( item_count )
          + ' < ' + __Str( log_list._min_length_ )
        );
      }

      if ( log_list[ __length ] > __0 ) {
        if ( option_map._do_warn_ ) {
          logObj.logMsg( '_warn_', 'List fails constraints', log_list );
        }
        return alt_data;
      }
    }
    // . End process optional constraints

    return data;
  }
  // . END Public prereq method /castList/

  // BEGIN Public prereq method /castMap/
  // Summary   : castMap( <data>, <alt_data> )
  // Purpose   : Cast a map
  // Example   : castMap( {} ); // returns the object
  // Arguments : (positional)
  //   <data>     - data to cast as map
  //   <alt_data> - alternate value to return
  // Returns   :
  //   <data> if it is a map, <alt_data> otherwise
  // Throws    : none
  //
  function castMap ( data, alt_data ) {
    var var_type = getVarType( data );
    return ( var_type === '_Object_' ) ? data : alt_data;
  }
  // . END Public prereq method /castMap/

  // BEGIN Public prereq method /castNum/
  // Summary   : castNum( <data>, <alt_data>, <option_map> )
  // Purpose   : Cast an integer
  // Example   : castNum( '25.425' ); // returns 25
  // Arguments : (positional)
  //   <data>       - data to cast as int
  //   <alt_data>   - alternate value to return
  //   <option_map> - Optional constraint map
  //     + _do_autobound_ - Auto bound input to min/max as appropriate
  //     + _do_warn_      - Log warnings
  //     + _max_num_      - Max allowed value
  //     + _min_num_      - Min allowed value
  // Returns   :
  //   If a number, returns the number rounded to nearest int.
  //   If a string, returns the number rep rounded to nearest int.
  //   Otherwise <alt_data>.
  // Throws    : none
  //
  function castNum ( data, alt_data, option_map ) {
    var
      var_type = getVarType( data ),
      solve_num  = var_type === '_Number_'
        ? data : var_type === '_String_'
          ? parseFloat( data ) : __undef
    ;

    if ( isNaN( solve_num ) ) { return alt_data; }

    // Begin process optional constraints
    if ( __typeofFn( option_map ) === 'object' ) {
      return checkNumFn( solve_num, alt_data, option_map );
    }
    // . End process optional constraints
    return solve_num;
  }
  // . END Public prereq method /castNum/

  // BEGIN Public prereq method /castObj/
  // Summary   : castObj( <obj_type>, <data>, <alt_data> )
  // Purpose   : Cast an object
  // Example   : castObj( 'styleSheetList',document.styleSheets  );
  // Arguments : (positional)
  //   <obj_type> - string of object type (see Example)
  //   <data>     - data to cast as <obj_type> object
  //   <alt_data> - alternate value to return
  // Returns   :
  //   <data> if an <obj_type> object, <alt_data> otherwise
  // Throws    : none
  //
  function castObj ( obj_type, data, alt_data ) {
    var var_type = getVarType( data );
    return var_type === obj_type ? data : alt_data;
  }
  // . END Public prereq method /castObj/

  // BEGIN Public prereq method /castStr/
  // Summary   : castStr( <data>, <alt_data> )
  // Purpose   : Cast a string
  // Example   : castStr( 25.425 ); // returns '25.425'
  // Arguments : (positional)
  //   <data>       - Data to cast as string
  //   <alt_data>   - Alternate value to return
  //   <option_map> - Optional constraints
  //     + _do_warn_     - Log warnings
  //     + is_empty_ok  - Allow blank string (default is true)
  //     + filter_regex - A regex filter that must be passed
  //     + min_length   - Min allowed length
  //     + max_length   - Max allowed length
  // Returns   :
  //   <data> if a string, or a number converted to a string,
  //   <alt_data> otherwise
  // Throws    : none
  //
  function castStr ( data, alt_data, option_map ) {
    var
      var_type  = getVarType( data ),
      solve_str = ( var_type === '_String_' )
        ? data : var_type === '_Number_'
          ? __Str( data ) : __undef,
      log_list, char_count
    ;

    if ( solve_str === __undef ) { return alt_data; }

    // Begin process optional constraints
    if ( __typeofFn( option_map ) === 'object' ) {
      log_list = [];
      char_count = solve_str[ __length ];
      if ( option_map._is_empty_ok_ === __false
        && solve_str === __blank
      ) {
        log_list[ __push ]( 'String is empty' );
      }

      if ( option_map._max_length_
        && char_count > option_map._max_length_
      ) {
        log_list[ __push ](
          'String exceeds maxiumum length: ' + __Str( char_count )
          + ' > ' + __Str( option_map._max_length_ )
        );
      }

      if ( option_map._min_length_
        && char_count < option_map._min_length_
      ) {
        log_list[ __push ](
          'String is below minimum length: ' + __Str( char_count )
          + ' < ' + __Str( log_list._min_length_ )
        );
      }

      if ( option_map._filter_regex_
        && ! option_map._filter_regex_.test( solve_str )
      ) {
        log_list.push(
          'String does not pass regex filter: '
          + option_map._filter_regex_[ __toString ]()
        );
      }

      if ( log_list[ __length ] > __0 ) {
        if ( option_map._do_warn_ ) {
          logObj.logMsg( '_warn_', 'List fails constraints', log_list );
        }
        return alt_data;
      }
    }
    // . End process optional constraints
    return solve_str;
  }
  // . END Public prereq method /castStr/

  // BEGIN Public prereq method /safeJsonParse/
  // Summary   : safeJsonParse( json_str, alt_data )
  // Purpose   : Parses JSON safely, using alt_data if it cannot
  // Example   : my map = safeJsonParse( '{}', {} );
  // Arguments : (positional)
  //   <json_str> - JSON string to parse
  //   <alt_data> - Alternate return if parsing failse
  // Returns   : Parsed JSON or alt_data
  // Throws    : none
  //
  function safeJsonParse ( json_str, alt_data ) {
    var solve_data;
    try {
        solve_data = __str2DataFn( json_str );
    }
      catch ( e ) {
        solve_data = alt_data;
  }
      return solve_data;
    }
    // . END Public prereq method /safeJsonParse/

    // BEGIN Public prereq method /safeJsonStringify/
    // Summary   : safeJsonStringify( data, alt_data )
    // Purpose   : Stringifies JSON safely
    // Example   : my str = safeJsonStringify( {}, '{}' );
    // Arguments : (positional)
    //   <data>     - Data structure to stringify
    //   <alt_data> - Alternate return if parsing failse
    // Returns   : JSON string on success, alt_data on failure
    // Throws    : none
    //
    function safeJsonStringify ( arg_data, alt_data ) {
      var solve_str;
      try {
        solve_str = __data2strFn( arg_data );
      }
      catch (e) {
        solve_str = alt_data;
      }
      return solve_str;
    }
    // . END Public prereq method /safeJsonStringify/

  // BEGIN Public prereq method /cloneData/
  // Summary   : cloneData( <data> )
  // Purpose   : Deep clones non-recursive data structures fastest
  // Example   : cloneData( [] ); // return copy of list
  // Arguments : (positional)
  //   <data> - data to clone
  // Returns   : undefined if data is recursive; otherwise a deep
  //   copy is returned.
  // Throws    : none
  //
  function cloneData ( data ) {
    if ( data === __undef ) { return data; }
      return safeJsonParse( safeJsonStringify( data ) );
  }
  // . END Public prereq method /cloneData/

  // BEGIN Public prereq method /extendList/
  // Summary   : extendList( base_list, extend_list )
  // Purpose   : Extends base_list with contents of extend_list
  // Example   : extendList( [0], [1,2,3] ); // returns [0,1,2,3]
  // Arguments : (positional)
  //   <base_list>   - list to extend
  //   <extend_list> - list to append to base_list
  // Returns   : base_list after change
  // Throws    : none
  //
  function extendList ( arg_base_list, arg_extend_list ) {
    var
      base_list   = castList( arg_base_list,   [] ),
      extend_list = castList( arg_extend_list, [] )
    ;

    __Array.prototype.push[ __apply ]( base_list, extend_list );
    return base_list;
  }
  // . END Public prereq method /extendList/

  // BEGIN Public prereq method /getNowMs/
  // Purpose   : Get timestamp
  // Example   : getNowMs(); // returns 1486283077968
    // Arguments : do_local_time when true will subtract the TZ offset
  // Returns   : The current timestamp in milliseconds
  // Throws    : none
  //
  // The Date.now() method is 3x faster than the +new Date()
  //   in NodeJS, and I have confirmed this provides almost the
  //   the same performance in that env as a raw Date.now() call.
  //
    function getNowMs ( do_local_time ) {
      var date_obj;
      if ( do_local_time ) {
        date_obj = new Date();
        return date_obj.getTime() - ( date_obj.getTimezoneOffset() * 60000);
      }

      return configMap._get_now_fn_
        ? configMap._get_now_fn_() : +new __Date();
  }
  // . END Public prereq method /getNowMs/

  // BEGIN Public prereq method /getNumSign/
  // Summary   : getNumSign( <data> )
  // Purpose   : Convert number into -1 or 1
  // Example   : getNumSign( '-25' ); // returns -1
  // Arguments :
  //   <data> - number or string to convert to -1 or 1
  // Returns   : -1 if the processed number is less than 0,
  //   otherwise 1.
  // Throws    : none
  //
  function getNumSign ( n ) {
    var num = __Num( n );
    return ( ! isNaN( num ) && num < __0 ) ? __n1 : __1;
  }
  // . END Public prereq method /getNumSign/

  // BEGIN Private method /getTzDateObj/
  // Returns   : A date object singleton for use by Tz methods
  //
  function getTzDateObj () {
    if ( ! stateMap._date_obj_ ) {
      stateMap._date_obj_ = new __Date();
    }
    return stateMap._date_obj_;
  }
  // . END Private method /getTzDateObj/

  // TODO 2017-09-28 mmikowski info: Create checkArgMap from argc.js
  // This should wrap around castXX utilities.
  // nameCheckMap = {
  //   any_regex     : /^_data_?$/,
  //   array_regex   : /_list_?$/,
  //   boolean_regex : /^(allow|is|do|has|have|be|if|dont)_/,
  //   map_regex     : /_map_?$/,
  //   integer_regex : /_(count|idx|idto|idint|ms|px)_?$/,
  //   jquery_regex  : /^\$/,
  //   number_regex  : /_(num|ratio)_?$/,
  //   object_regex  : /^_obj_?$/,
  //   regex_regex   : /^_(regex|rx)_?$/,
  //   string_regex  : /_(name|key|type|text|html)_?$/,
  //   svgelem_regex : /^_svg_?$/
  // }
  // BEGIN public method /checkArgMap/
  // Purpose   : Provide an easy and efficient means to check named arguments
  // Example   :
  //   <script src="" />
  //   <script>
  //   argc.setMode( 'strict' );
  //   foo = function ( arg_map ) {
  //     try {
  //       argc.checkArgMap(
  //         { item_id          : { var_type : 'string' },
  //           left_px          : {
  //             var_type       : 'number',
  //             data_default   : 1280,
  //             min_num        : 0,
  //             max_num        : 2560
  //           },
  //           top_px           : {
  //             var_type       : 'number',
  //             data_default   : 400,
  //             min_num        : 0,
  //             max_num        : 2560
  //           },
  //           height_px        : {
  //             var_type       : 'integer',
  //             data_default   : 50,
  //             min_int        : 1,
  //             max_int        : 50,
  //             is_optional    : true
  //           },
  //           width_px         : {
  //             var_type       : 'integer',
  //             data_default   : 50,
  //             min_int        : 1,
  //             max_int        : 50,
  //             is_optional    : true
  //           },
  //           color_map   : { var_type : 'map',     is_empty_ok : false },
  //           element_map : { var_type : 'map',     is_empty_ok : true,
  //             data_default : {}   },
  //           is_pinned   : { var_type : 'boolean', data_default : false },
  //           is_seen     : { var_type : 'boolean', data_default : false },
  //           mode_type   : { var_type : 'string',  data_default : 'view',
  //             filter_regex  : /^view$|^edit$/ },
  //           form_map    : { var_type : 'map',     data_default : null  }
  //         }, arg_map
  //       );
  //     }
  //     catch ( error_obj ) {
  //       console.trace( error_obj );
  //       throw error_obj;
  //     }
  //     ...
  //   };
  //   </script>
  //
  // Required Arguments :
  //   * rule_map - a map of rules used to check arguments
  //   * arg_map  - a map of arguments to check
  //
  //   The rule_map is used to test the arg_map.
  //   Each key in the rule_map corresponds to an argument name
  //   except for special keys noted below.  Therefore, the format is:
  //     rule_map = {
  //       <name_1> : { var_type : <var_type>, <optional constraints> },
  //       <name_2> : { var_type : <var_type>, <optional constraints> },
  //       ...
  //     };
  //
  //   Optional constraints for all <var_type>'s include:
  //      is_optional  - is an optional argument
  //      default_data - default value if key is omitted
  //
  //   Optional constraints by data type include:
  //     * array:
  //       + is_empty_ok  - allow empty array
  //       + min_length   - min allowed length
  //       + max_length   - max allowed length
  //     * boolean:
  //     * function:
  //     * integer:
  //       + min_int      - min allowed value
  //       + max_int      - max allowed value
  //       + do_autobound - auto bound input to min/max as appropriate
  //     * map/object:
  //       + is_empty_ok  - allow an empty object
  //     * number:
  //       + min_num      - min allowed value
  //       + max_num      - max allowed value
  //       + do_autobound - auto bound input to min/max as appropriate
  //     * string:
  //       + is_empty_ok  - allow empty string
  //       + filter_regex - a regex filter that must be passed
  //       + min_length   - min allowed length
  //       + max_length   - max allowed length
  //     * svgelem:
  //
  //   Special directive keys
  //     * _do_check_names : When true, will
  //       compare key names against a naming convention
  //       (see nameCheckMap for configuration)
  //       WARNING: checkArgMap in 'strict' mode always sets this to true.
  //     * _allow_more_keys : When true, check ignores keys not defined
  //       in the check map.  Normal behavior is to throw an error.
  //       WARNING: checkArgMap in 'strict' mode ignores this flag.
  //     * _skip_key_list   : A list of key names to skip consideration.
  //       WARNING: checkArgMap in 'strict' mode ignores this list.
  //     * _allow_falsey_value : When true, skips validation for an
  //       if its value isNaN, Null, or other falsey value other than
  //       0 or undefined.
  //
  // Optional Argument : none
  // Settings  : checkArgMap.configModule.setMode( '[strict|normal|off]' )
  //   affects the behavior of checkArgMap.
  //   IN 'strict' MODE, the special directive keys are processed as follows:
  //     * _do_check_names  : true
  //     * _allow_more_keys : false
  //     * _skip_key_list   : []
  //   IN 'normal' MODE the utility works as above.
  //   IN 'off' MODE , the utility is a no-op and simply returns.
  // Returns   : none
  // Throws    : an error object if validation fails

  // BEGIN Public prereq method /makeArgList/
  // Summary   : makeArgList( <arg_obj> )
  // Purpose   : Make a real array from data in argument object
  // Example   : makeArgList( arguments ); // returns [ ... ]
  // Arguments :
  //   <arg_obj> - an argument object ('arguments' in functions)
  // Returns   : An array of argument values
  // Throws    : none
  //
  // The technique used is around 3x faster than
  //   return Array.prototype.slice.call( arg_obj );
  // See https://github.com/petkaantonov/bluebird/wiki/\
  //   Optimization-killers#3-managing-arguments
  //
  function makeArgList ( arg_obj ) {
    var
      src_obj    = castObj( 'Arguments', arg_obj, {} ),
      arg_count  = src_obj[ __length ],
      solve_list = [],
      idx;

    for ( idx = __0; idx < arg_count; idx++ ) {
      solve_list[ idx ] = arg_obj[ idx ];
    }
    return solve_list;
  }
  // . END Public prereq method /makeArgList/

  // BEGIN Public prereq method /makePadNumStr/
  // Summary   : makePadNumStr( <number>, <count> )
  // Purpose   : Pad an int with 0s for <count> digits
  // Example   : makePadNumStr( 25, 3 ) return '025';
  // Arguments :
  //   <number> - the number to pad
  //   <count>  - the number of digits to fill
  // Returns   : A trimmed and padded string
  // Throws    : none
  //
  function makePadNumStr( arg_num, arg_count ) {
    var
      num   = castNum( arg_num,   __undef ),
      count = castInt( arg_count, __undef ),
      list  = [],

      sign_int, num_str, zero_count;

    if ( num === __undef ) { return __blank; }
    if ( ! ( count && count >= __0 ) ) {
      return __Str( num ).trim();
    }

    sign_int = getNumSign( num );
    num_str  = __Str( __makeAbsNumFn( num ) );
    zero_count = count - num_str[ __length ]
      - ( sign_int === __n1 ? __1 : __0 );

    // See repeat funciton in ES6
    list[ __length ] = zero_count > __0 ? zero_count + __1 : __0;
    num_str = list[ __join ]( '0' ) + num_str;

    if ( sign_int === __n1 ) {
      num_str = '-' + num_str;
    }
    return num_str;
  }
  // . END Public prereq method /makePadNumStr/

  // BEGIN public prereq method /makeEscRxStr/
  // Summary   : makeEscRxStr( <string> )
  // Purpose   : Escapes a regular expression string
  // Example   : makeEscRxStr( '[]' ) // returns '\[\]\'
  // Arguments : <string> to escape
  // Returns   : Escaped regular expression string
  // Throws    : none
  //
  // JSLint capable str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  // See http://stackoverflow.com/questions/3115150
  //
  function makeEscRxStr( arg_str ) {
    var str = castStr( arg_str, __blank );
      return str[ __replace ]( /[-[\]{}()*+?.,\\^$|#]/gm, "\\$&");
  }
  // . END Public prereq method /makeEscRxStr/

  // BEGIN Public prereq method /makeExtractMap/
  // Summary   : makeExtractMap( base_map, key_list )
  // Purpose   : Makes and returns a new map using key_list
  // Example   : makeExtractMap( { a:1, b:2 }, ['a'] ); // returns { a:1 }
  // Arguments : (positional)
  //   <base_map> - Map to extract values from
  //   <key_list> - List of keys to copy (shallow)
  //                Default: all keys
  // Returns   : Newly created map
  // Throws    : none
  //
  function makeExtractMap ( arg_base_map, arg_key_list ) {
    var
      base_map  = castMap(  arg_base_map, {} ),
      key_list  = castList( arg_key_list, __makeKeyListFn( base_map ) ),
      key_count = key_list[ __length ],
      solve_map = {},
      idx, key
    ;

    for ( idx = __0; idx < key_count; idx++ ) {
      key = key_list[ idx ];
      solve_map[ key ] = base_map[ key ];
    }

    return solve_map;
  }
  // . END Public prereq method /makeExtractMap/

  // BEGIN Public prereq method /makeRxObj/
  // Summary   : makeRxObj( <pattern>, <options> )
  // Purpose   : Create a regular expression object
  // Example   : makeRxObj( '\s*hello\s*', 'i' );
  // Arguments :
  //   <pattern> - a string to convert into a regexp
  //   <options> - an option string
  // Returns   : A regular expression object
  // Throws    : none
  //
  function makeRxObj ( arg_pattern_str, arg_option_str ) {
    var
      pattern_str = castStr( arg_pattern_str, __blank ),
      option_str  = castStr( arg_option_str )
    ;

    if ( option_str ) {
      return new RegExp( pattern_str, option_str );
    }
    return new RegExp( pattern_str );
  }
  // . END Public prereq method /makeRxObj/

  // BEGIN Public prereq method /makeScrubStr/
  function makeScrubStr ( arg_str, arg_do_space ) {
    var
      raw_str    = castStr(  arg_str, __blank ),
      do_space   = castBool( arg_do_space ),
      interm_str = do_space
        ? raw_str[ __replace ]( configMap._tag_end_rx_, ' ' )
        : raw_str;

    interm_str = interm_str.trim();
    return interm_str[ __replace ]( configMap._tag_rx_, __blank );
  }
  // . END Public prereq method /makeScrubStr/

  // BEGIN Public prereq method /makeUcFirstStr/
  function makeUcFirstStr ( arg_str ) {
    var
      str    = castStr( arg_str, __blank ),
      uc_str = str.charAt( __0 ).toUpperCase()
    ;
    return uc_str + str.substr( __1 );
  }
  // . END Public prereq method /makeUcFirstStr/
  // == . END PREREQ METHODS ==========================================

  // == BEGIN UTILITY OBJECTS =========================================
  // BEGIN define logObj singleton
  // Summary   :
  //   logObj._setLogLevel_('_warn_');
  //   logObj._logMsg_('_warn_', 'This will show');
  //   logObj._logMsg_('_info_', 'This will not');
  //   logObj._getLogLevel_(); // '_warn_'
  // Purpose   : Provide a log4j-style logging singleton
  // Example   : See summary
  // Arguments :
  //   Log level is based on syslog values and is one of
  //   '[_emerg_|_alert_|_crit_|_error_|_warn_|_notice_|_info_|_debug_]'
  //
  //   * setLoglLevel(<log_level>) - Set threshold urgency.
  //   * logMsg( <log_level>, <message_str> ) - Log message string with
  //     <log_level> urgency. Messages with urgency below the threshold are
  //     not presented to the log.
  //   * getLogLevel() - Return log level, e.g. '_warn_'.
  // Returns   : void
  // Throws    : none
  //
  logObj = (function () {
    var
      levelXCmdMap = {
        _emerg_  : 'error',
        _alert_  : 'error',
        _crit_   : 'error',
        _error_  : 'error',
        _warn_   : 'warn',
        _notice_ : 'log',
        _info_   : 'info',
        _debug_  : 'info'
      },
      levelXIdxMap = {
        _emerg_  : __0,
        _alert_  : __1,
        _crit_   : __2,
        _error_  : __3,
        _warn_   : __4,
        _notice_ : 5,
        _info_   : 6,
        _debug_  : 7
      },

      levelKey = '_warn_',
      levelIdx   = levelXIdxMap[ levelKey ],

      consoleRef
    ;

    // favor node console if available
    /* istanbul ignore next */
    try { consoleRef = global.console; }
    catch ( ignore_error ) {
      if ( window ) {
        consoleRef = window.console;
      }
      else {
        throw '_cannot_find_console_function_';
      }
    }

    function setLogLevel ( arg_key ) {
      var level_key = castStr( arg_key, __blank );
      if ( ! levelXCmdMap[ level_key ] ) { return levelKey; }
      levelKey = level_key;
      levelIdx = levelXIdxMap[ level_key ];
      return levelKey;
    }

    function getLogLevel () { return levelKey; }

    // This follows syslog level conventions
    function logMsg () {
      var
        arg_list  = makeArgList( arguments ),
        level_key = castStr( arg_list[ __0 ], __blank ),
        level_idx = levelXIdxMap[ level_key ],
        arg_count = arg_list[ __length ],

        level_cmd
      ;

      if ( arg_count < __2 ) { return __false; }
      if ( level_idx === __undef ) {
        arg_list.unshift(
          '_log_level_not_supported_:|' + level_key + '|'
        );

        arg_list.shift();
        level_key = '_error_';
        level_idx = levelXIdxMap[ level_key ];
        arg_list.unshift( level_key );
      }

      if ( level_idx > levelIdx ) { return __false; }
      level_cmd = levelXCmdMap[ level_key ];

      // Try to log the best we know how
      //noinspection UnusedCatchParameterJS
      /* istanbul ignore next */
      try {
        consoleRef[ level_cmd ][ __apply ]( consoleRef, arg_list );
      }
        // The only problem that may cause a failure is if the log
        // command can not handle more than a single argument or will not
        // allow the apply method (think: IE). We try our best...
        //
        catch ( ignore_error0 ) {
        try  {
          consoleRef[ level_cmd ]( arg_list[ __1 ] );
        }
          // Everything failed. We give up.
        catch ( e1 ) { return __false; }
      }
      return __true;
    }

    return {
      setLogLevel : setLogLevel,
      getLogLevel : getLogLevel,
      logMsg      : logMsg
    };
  }());
  // . END define logObj singleton
  // == . END UTILITY METHODS =========================================

  // == BEGIN PUBLIC METHODS ==========================================
  // BEGIN Public method /checkDateStr/
  // Purpose   : Check validity of a date string
  // Example   : checkDateStr( '2017-02-29' ); // false
  //             checkDateStr( '2016-02-29' ); // true  (leap year)
  // Returns   : boolean
  // Throws    : none
  //
  // This method works only of strings in the formats
  // yyyy-mm-dd or yyyy/mm/dd and does not validate the time.
  //
  //

  function checkDateStr ( arg_map ) {
    var
      map         = castMap( arg_map, {} ),
      date_str    = castStr( map._date_str_,  __blank ),
      order_str   = castStr( map._order_str_, __blank ),
      date_us_rx  = configMap._date_us_rx_,
      date_utc_rx = configMap._date_utc_rx_,
      match_list, yy_int, mm_int, dd_int, date_obj, check_int
    ;

    if ( order_str === '_us_' ) {
      match_list = date_str[ __match ]( date_us_rx );
      if ( ! match_list ) { return __false; }
      yy_int = +match_list[ 3 ] - 1900;
      mm_int = +match_list[ 1 ] - 1;
      dd_int = +match_list[ 2 ];
    }
    else {
      match_list = date_str[ __match ]( date_utc_rx );
      if ( ! match_list ) { return __false; }
      yy_int = +match_list[ 1 ] - 1900;
      mm_int = +match_list[ 2 ] - 1;
      dd_int = +match_list[ 3 ];
    }

    // Check that utc timestamps match
    date_obj = new __Date( __Date.UTC( yy_int, mm_int, dd_int ) );
    check_int = date_obj.getUTCDate();

    // Invalid dates will not match
    return check_int === dd_int;
  }
  // . END Public method /checkDateStr/

  // BEGIN public method /makeMetricStr/
  function makeMetricStr( arg_num ) {
    var
      num     = castNum( arg_num, __0 ),
      abs_num = __makeAbsNumFn( num ),
      root_num, suffix
    ;

    if ( abs_num >= 1e+9 ) {
      root_num = num / 1e+9;
      suffix   = 'G';
    }
    else if ( abs_num >= 1e+6 ) {
      root_num = num / 1e+6;
      suffix   = 'M';
    }
    else if ( abs_num >= 1e+3 ) {
      root_num = num / 1e+3;
      suffix   = 'K';
    }
    else {
      root_num = num;
      suffix  = __blank;
    }
    return root_num.toPrecision( __3 ) + suffix;
  }
  // . END public method /makeMetricStr/

  // BEGIN Public method /clearMap/
  // Purpose: Empty a map by deleting all keys
  //   OR delete key provided by list
  function clearMap ( arg_map, arg_key_list ) {
    var
      map       = castMap( arg_map ),
      key_list, key_count, idx, key;

    if ( ! map ) { return; }

    key_list  = castList( arg_key_list, __makeKeyListFn( map ) );
    key_count = key_list[ __length ];

    for ( idx = __0; idx < key_count; idx++ ) {
      key = key_list[ idx ];
      if ( map[ __hasOwnProperty ]( key ) ) {
        delete map[ key ];
      }
    }
    return map;
  }
  // . END Public method /clearMap/

  // BEGIN Public method /encodeHtml/
  // Purpose : This is single pass encoder for html entities and handles
  //   an arbitrary number of characters to encode.
  // Examples:
  //   | str = encodeHtml( "<h1>'Help me!'</h1> she said" );
  //   | __logMsg( 'info', str );
  //   > &lt;h1&ht;&quot;Help me!&quot;&lt;/h1&gt; she said.'
  //
  //   | str = encodeHtml( "<h1>'Help me!'</h1> & fast!", false );
  //   | __logMsg( 'info', str );
  //   > &lt;h1&ht;&quot;Help me!&quot;&lt;/h1&gt; &amp; fast!'
  //
  //   | str = encodeHtml( "<h1>'Help me!'</h1> & fast!", true );
  //   | __logMsg( 'info', str );
  //   > &lt;h1&ht;&quot;Help me!&quot;&lt;/h1&gt; & fast!'
  //
  // Arguments ( positional )
  //   0 : arg_str (req) - The HTML string to encode
  //   1 : arg_do_exclude_amp (opt, default = false ) : Exclude ampersands
  //       from encoding.
  //
  function encodeHtml ( arg_str, arg_do_exclude_amp ) {
    var
      source_str     = castStr(  arg_str, __blank   ),
      do_exclude_amp = castBool( arg_do_exclude_amp ),

      match_fn, match_rx, lookup_map
    ;

    match_fn = function ( key ) {
      return lookup_map[ key ] /* istanbul ignore next */ || __blank;
    };

    lookup_map = configMap._encode_html_map_;
    match_rx   = do_exclude_amp
      ? configMap._encode_noamp_rx_ : configMap._encode_html_rx_;

    return source_str[ __replace ]( match_rx, match_fn );
  }
  // . END Public method /encodeHtml/

  // BEGIN utility /getBaseDirname/
  // Purpose   : Returns the last filename of a path or the dirname.
  // Examples  : getBaseDirname.call( '_base_', /var/log/demo.log')
  //           :   returns 'demo.log'
  //           : getBaseDirname.call( null, '/var/log/demo.log' )
  //           :   returns '/var/log'
  //
  // Arguments : ( positional )
  //   this - if '_base_' returns basename, otherwise dirname
  //   0 - (required) Path string
  //   1 - (optional) Delimeter string (default is /)
  //
  function getBaseDirname( arg_path_str, arg_delim_str ) {
    var
      context_str = this,
      path_str    = castStr( arg_path_str, __blank ),
      delim_str   = castStr( arg_delim_str, '/'    ),
      rx_obj      = context_str === '_base_'
        ? makeRxObj( '([^'  + delim_str + ']*)$' )
        : makeRxObj( '^(.*' + delim_str + ')[^' + delim_str + ']*$' ),
      match_list
    ;

    if ( path_str === __blank ) { return path_str; }

    match_list = path_str[ __match ]( rx_obj );
    return ( match_list && match_list[ __1 ] ) || __blank;
  }
    getBasename = getBaseDirname[ __bind ]( '_base_' );
    getDirname  = getBaseDirname[ __bind ]( '_dir_'  );
  // . END utilities /getBasename/ and /getDirname/

  // BEGIN Public method /getListAttrIdx/
  function getListAttrIdx ( arg_map_list, arg_key, data ) {
    var
      map_list = castList( arg_map_list, [] ),
      key      = castStr(  arg_key, __blank ),
      map_count = map_list[ __length ],
      found_idx  = __n1,

      idx, row_map, row_key_list
    ;

    for ( idx = __0; idx < map_count; idx++ ) {
      row_map = map_list[ idx ];
      if ( __typeofFn( row_map ) !== 'object' ) { continue; }

      // This is similar to but not the same as hasOwnProperty.
      // This prevents false positives when sparse maps do not have
      // the requested key.
      row_key_list = __makeKeyListFn( row_map );
      if ( row_key_list[ __indexOf ]( key ) === __n1 ) { continue; }

      if ( row_map[ key ] === data ) {
        found_idx = idx;
        break;
      }
    }
    return found_idx;
  }
  // . END Public method /getListAttrIdx/

  // BEGIN Public methd /getListAttrMap/
  function getListAttrMap ( arg_list, key_name, key_val ) {
    var
      list     = castList( arg_list, [] ),
      list_idx = getListAttrIdx( list, key_name, key_val );
    return list_idx > __n1 ? list[ list_idx ] : __undef;
  }
  // . END Public method /getListAttrMap/

  // BEGIN Public method /getListDiff/
  // Purpose : Find all elements common between two lists.
  //   Do _not_ do a deep comparison; two similar lists or maps
  //   will be reported as different unless they point the the same
  //   data structure.
  //
  // Returns: A list of elements in the order of unique
  //   elements found in the first list followed by unique
  //   elements found in the second.
  //
  function getListDiff ( arg0_list, arg1_list ) {
    var
      first_list  = castList( arg0_list, [] ),
      second_list = castList( arg1_list, [] ),
      list_1, list_2
    ;

    list_1 = first_list.filter(
      function ( data ) {
        return second_list[ __indexOf ]( data ) === __n1;
      }
    );
    list_2 = second_list.filter(
      function ( data ) {
        return first_list[ __indexOf ]( data ) === __n1;
      }
    );
    return list_1.concat( list_2 );
  }
  // . END Public method /getListDiff/

  // BEGIN Public method /getListValCount/
  function getListValCount ( arg_list, arg_data ) {
    var
      input_list  = castList( arg_list, [] ),
      input_count = input_list[ __length ],
      match_count = __0,
      idx;

    for ( idx = input_count; idx; __0 ) {
      //noinspection IncrementDecrementResultUsedJS
      if ( input_list[ --idx ] === arg_data ) { match_count++; }
    }
    return match_count;
  }
  // . END Public method /getListValCount/

  // BEGIN Public method /getLogObj/
  function getLogObj () { return logObj; }
  // . END Public method /getlogObj/

  // BEGIN Public method /getStructData/
  // Purpose   : Get a deep structure attribute value
  // Example   : _getStructData_({ foo : { bar : 'hi!' }}, ['foo','bar']);
  //   Returns 'hi!'
  // Arguments :
  //   * base_struct - An array or map to add a value
  //   * path_list   - A list of map or array keys in order of depth
  // Returns   :
  //   * Success - Requested value
  //   * Failure - undefined
  // Cautions  : The key list limit is set to __100. If this
  //   is met, a warning is logged and __undef returned.
  //
  function getStructData ( base_struct, arg_path_list ) {
    var
      walk_struct = base_struct,
      path_list   = castList( arg_path_list, [] ),
      is_good     = __true,
      key_count   = path_list[ __length ],

      idx, raw_key, struct_type, key
    ;

    if ( key_count > __100 ) {
      logObj.logMsg( '_warn_', '_maximum_recursion_limit_' );
      return __undef;
    }

    _GET_KEY_: for ( idx = __0; idx < key_count; idx++ ) {
      raw_key = path_list[ idx ];
      struct_type = getVarType( walk_struct );
      switch ( struct_type ) {
        case '_Array_' :
          key = castInt( raw_key );
          break;
        case '_Object_' :
          key = castStr( raw_key );
          break;
        default :
          key = __undef;
          break;
      }
      if ( key === __undef ) {
        is_good = __false;
        break _GET_KEY_;
      }
      walk_struct = walk_struct[ key ];
    }
    if ( is_good ) { return walk_struct; }
    return __undef;
  }
  // . END Public method /getStructData/

  // BEGIN Public method /getTzCode/
  function getTzCode () {
    var
      date_obj = getTzDateObj(),
      date_str = date_obj[ __toString ](),
      match_list = date_str[ __match ]( configMap._tzcode_rx_ )
    ;
    return ( match_list && match_list[ __1 ] )
      ? match_list[ __1 ] : __blank;
  }
  // . END Public method /getTzCode/

  // BEGIN Public method /makeClockStr/
  // Purpose   : Create HH:MM:SS time string from UTC time integer in ms
  // Example   : clock_str = makeClockStr( 1465621376000 ); // '05:02:56'
  // Arguments : ( positional )
  //   0 - int (required) time_ms UTC time in milliseconds
  //   1 - int (default 3) time_idx Precision
  //     -3 === [DDd:]HHh:MMm:SSs
  //     -3 === [DDd:]HHh:MMm
  //     -1 === [DDd:]HHh
  //      0 === ''
  //      1 === HH
  //      2 === HH:MM
  //      3 === HH:MM:SS
    //   2 - do am/pm flag (default: false)
    //   3 - use local time (default: false)
  // Returns   : String
  // Cautions  :
  //   Remember to use your local timezone offset if you want to
  //   show local time. Example:
    //     local_ms = getNowMs( true )
  //
    function makeClockStr ( arg_time_ms, arg_time_idx, arg_do_ampm, arg_do_local ) {
    var
      do_local  = castBool( arg_do_local, __false ),
      time_ms   = castInt( arg_time_ms, getNowMs( do_local ) ),
      time_idx  = castInt( arg_time_idx, __3 ),
      do_ampm   = castBool( arg_do_ampm, __false ),
      abs_idx   = __makeAbsNumFn( time_idx  ),

      sec_ms    = configMap._sec_ms_,
      min_sec   = configMap._min_sec_,
      hrs_min   = configMap._hrs_min_,
      day_hrs   = configMap._day_hrs_,

      raw_sec_int = __makeRoundNumFn( time_ms / sec_ms ),
      sec_int     = raw_sec_int % min_sec,

      raw_min_int = __makeFloorNumFn( raw_sec_int / min_sec ),
      min_int     = raw_min_int % hrs_min,

      raw_hrs_int = __makeFloorNumFn( raw_min_int / hrs_min ),
      hrs_int     = raw_hrs_int % day_hrs,

      day_int     = __makeFloorNumFn( raw_hrs_int / day_hrs ),
      mns         = makePadNumStr,

      time_list   = [],
      suffix_str  = __blank,

      scratch_str
    ;

    if ( abs_idx === 0 || abs_idx > 3 ) { return __blank; }

    if ( time_idx < __0 && day_int > __0 ) {
      scratch_str = day_int + 'd';
      time_list[ __push ]( scratch_str );
    }

    scratch_str = mns( hrs_int, __2 );
    if ( time_idx < __0 ) { scratch_str += 'h'; }
    time_list[ __push ]( scratch_str );

    if ( abs_idx > __1 ) {
      scratch_str = mns( min_int, __2 );
      if ( time_idx < __0 ) { scratch_str += 'm'; }
      time_list[ __push ]( scratch_str );
    }

    if ( abs_idx > __2 ) {
      scratch_str = mns( sec_int, __2 );
      if ( time_idx < __0 ) { scratch_str += 's'; }
      time_list[ __push ]( scratch_str );
    }

      if ( do_ampm ) {
        if ( time_list[__0] >= 12 ) {
          suffix_str = ' PM';
          if ( time_list[__0] > 12 ) {
            time_list[__0] -= 12;
          }
        }
        else {
          suffix_str = ' AM';
        }
      }

      return time_list[ __join ]( ':' ) + suffix_str;
  }
  // . END Public method /makeClockStr/

  // BEGIN Public method /makeCommaNumStr/
  // Purpose   : Convert a number into a string optimized for readability
  // Example   : makeCommaNumStr({ _input_num_ : 1999 })
  //             Returns '2.0k'
  // Arguments :
  //   * _input_num_       - (req) The number to format, e.g. 123598
  //   * _round_limit_exp_ - (opt) The size (10^exp) of number after which
  //                         a rounded unit value will be returned.
  //                         DEFAULT = 3 (1000's)
  //   * _round_unit_exp_  - (opt) The size (10^exp) of number to group as
  //                         a unit. DEFAULT = 3 (1000's)
  //   * _round_unit_str_  - (opt) The unit name. DEFAULT = k
  //   * _round_dec_count_ - (opt) Number of decimal places to keep
  //                         in the mantisa when rounding to units.
  //                         DEFAULT = 1.
  // Returns   :
  //   * Success - Returns formated string
  //   * Failure - Blank string
  //
  function makeCommaNumStr ( arg_map ) {
    var
      map             = castMap( arg_map, {} ),
      input_num       = castNum( map._input_num_,       __0 ),
      round_limit_exp = castInt( map._round_limit_exp_, __3 ),
      round_unit_exp  = castInt( map._round_unit_exp_,  __3 ),
      round_unit_str  = castStr( map._round_unit_str_,  'k' ),
      round_dec_count = castInt( map._round_dec_count_, __1 ),

      round_limit_num = Math.pow( __10, round_limit_exp  ),
      round_unit_num  = Math.pow( __10, round_unit_exp   ),

      solve_suffix = __blank,

      solve_num, solve_str, solve_list, list_count, idx
    ;

    if ( __makeAbsNumFn( input_num ) >= round_limit_num ) {
      solve_num    = input_num / round_unit_num;
      solve_suffix = round_unit_str;
      solve_str    = solve_num.toFixed( round_dec_count );
    }
    else {
      solve_str = __Str( input_num );
    }

    solve_list = solve_str[ __split ]( '.' );
    list_count = solve_list[ __length ];
    for ( idx = __0; idx < list_count; idx++ ) {
      solve_list[ idx ] = solve_list[ idx ][
        __replace ]( configMap._comma_rx_, "$1," );
    }
    return solve_list[ __join]( '.' ) + solve_suffix;
  }
  // . END Public method /makeCommaNumStr/

  // BEGIN Public method /makeDateStr/
  // Purpose   : Create a string from a date object
  //   or a UTC time number (in milliseconds).
  // Examples:
  // 1. makeDateStr({ _date_obj_ : new Date() });
  //    Returns a string like '2016-09-18'
  // 2. makeDateStr({ _date_obj_ : new Date(), _time_idx_ : 3 });
  //    Returns a string like '2016-09-18 12:45:52'
  // 3. makeDateStr({ _date_ms_ : 1474311626050 })
  //    Returns '2016-09-19'
  // Arguments :
  //   * _date_obj_ : A valid date object.
  //   * _date_ms_  : A date time in ms.
  //     If neither date_obj or date_ms is provided, will use the
  //       current date.
  //     If BOTH are provided, _date_ms_ will be used in
  //       preference to date_obj.
  //   * _time_idx_ (default 0): See _makeClockStr_ to determine
  //       the clock string format
  //   * _order_str_ (default ''):
  //       Request '_us_' results in stupid-format: mm/dd/yyyy hh:mm:ss.
  // Cautions  :
  //   Remember to use your local timezone offset if you want to
  //   show local time. Example:
  //       tz_offset_ms = date_obj.geteTimezoneOffset() * 60000;
  //       local_ms     = raw_utc_ms - tz_offset_ms;
  //
  function makeDateStr ( arg_map ) {
    var
      map       = castMap(  arg_map,           {} ),
      date_ms   = castInt(  map._date_ms_         ),
      date_obj  = castObj( 'Date', map._date_obj_ ),
      time_idx  = castInt(  map._time_idx_, __0   ),
      order_str = castStr(  map._order_str_, __blank ),

      mns       = makePadNumStr,

      yrs_int,   mon_int,   day_int,
      date_list, date_str,  time_ms,
      time_str
    ;

      if ( ! date_obj ) {
        date_obj = new __Date();
      }

    if ( date_ms ) {
      date_obj.setTime( date_ms );
    }

    yrs_int = __Num( date_obj.getYear()  ) + configMap._offset_yr_;
    mon_int = __Num( date_obj.getMonth() ) + __1;
    day_int = __Num( date_obj.getDate()  );

    if ( order_str === '_us_' ) {
      date_list = [
        mns( mon_int, __2 ),
        mns( day_int, __2 ),
        mns( yrs_int, __4 )
      ];
      date_str = date_list[ __join ]( '/' );
    }
    else {
      date_list = [
        mns( yrs_int, __4 ),
        mns( mon_int, __2 ),
        mns( day_int, __2 )
      ];
      date_str = date_list[ __join ]( '-' );
    }

    // no time requested
    if ( time_idx === __0 ) { return date_str; }

    // time requested
    time_ms = __Num( date_obj.getHours()   ) * configMap._hrs_ms_
      + __Num( date_obj.getMinutes() ) * configMap._min_ms_
      + __Num( date_obj.getSeconds() ) * configMap._sec_ms_
    ;

    time_str = makeClockStr( time_ms, time_idx );

    return time_str ?  date_str + ' ' + time_str : date_str;
  }
  // . END Public method /makeDateStr/

  // BEGIN Public method /makeDebounceFn/
  // Purpose : Return a function that will fire after
  //   delay_ms milliseconds of inactivity.
  //
  function makeDebounceFn ( arg_map ) {
    var
      map      = castMap(  arg_map, {} ),
      fn       = castFn(   map._fn_ ),
      delay_ms = castInt(  map._delay_ms_ ),
      do_asap  = castBool( map._do_asap_, __false ),
      ctx_data = map._ctx_data_ || this,
      delay_toid
    ;

    if ( ! ( fn && delay_ms ) ) { return; }

    return function () {
      var arg_list = makeArgList( arguments );
      if ( do_asap && ! delay_toid ) {
        fn[ __apply ]( ctx_data, arg_list );
      }
      __clearTimeoutFn( delay_toid );
      delay_toid = __setTimeoutFn( function() {
        if ( ! do_asap ) {
          fn[ __apply]( ctx_data, arg_list );
        }
        delay_toid = __undef;
      }, delay_ms );
    };
  }
  // . END Public method /makeDebounceFn/

  // BEGIN Public method /makeThrottleFn/
  // Purpose : Return a function that will fire once per
  //   delay_ms milliseconds. It fires immediately on first
  //   call.
  //
  function makeThrottleFn ( arg_map ) {
    var
      map      = castMap(  arg_map, {} ),
      fn       = castFn(   map._fn_ ),
      delay_ms = castInt(  map._delay_ms_, __0 ),
      ctx_data = map._ctx_data_,
      last_ms  = __0,
      delay_toid;

    if ( ! ( fn && delay_ms ) ) { return; }

    return function () {
      var
        arg_list = makeArgList( arguments ),
        now_ms   = getNowMs(),
        delta_ms = delay_ms - ( now_ms - last_ms )
      ;

      if ( delta_ms <= __0 ) {
        // A timeout id should never be defined except in race conditions
        /* istanbul ignore next */
        if ( delay_toid ) { __clearTimeoutFn( delay_toid ); }
        fn[ __apply ]( ctx_data, arg_list );
        delay_toid = __undef;
        last_ms    = now_ms;
        return;
      }

      if ( delay_toid ) { return; }
      delay_toid = __setTimeoutFn(
        function () {
          fn[ __apply ]( ctx_data, arg_list );
          delay_toid = __undef;
          last_ms    = now_ms;
        },
        delta_ms
      );
    };
  }
  // . END Public method /makeThrottleFn/

  // BEGIN Public method /makeEllipsisStr/
  // Purpose : Shorten a string to a maximum length and append ellipsis
  //   if it is exceeded.
  // Example   :
  //   makeEllipsisStr({
  //     _input_str_      : 'hee haw and the boys',
  //     _char_limit_int_ : 10,
  //     _do_word_break_  : true
  //   });
  //   // returns 'hee haw ...'
  //
  // Arguments:
  // _input_str_      : (req) The string to shorten if required
  // _char_limit_int_ : (opt, default 0) the maxiumum allowed chars
  // _do_word_break_  : (opt, default true) break at word boundries
  //
  // Returns: A string
  //
  function makeEllipsisStr( arg_map ) {
    var
      map           = castMap( arg_map, {} ),
      scrub_str     = makeScrubStr( map._input_str_,  __false ),
      limit_int     = castInt(  map._char_limit_int_,     __0 ),
      do_word_break = castBool( map._do_word_break_,   __true ),
      scrub_count   = scrub_str[ __length ],

      word_list,   word_count,
      solve_count, solve_list,
      idx,         solve_word
    ;

    if ( ! ( limit_int && limit_int > __3 ) ) { return __blank; }

    if ( scrub_count <= limit_int ) { return scrub_str; }

    if ( do_word_break ) {
      word_list   = scrub_str[ __split ]( ' ' );
      word_count  = word_list[ __length ];
      solve_count = __0;
      solve_list  = [];

      _WORD_: for ( idx = __0; idx < word_count; idx++ ) {
        solve_word  = word_list[ idx ];
        solve_count += solve_word[ __length ] + __1;
        if ( solve_count >= limit_int - __3 ) {
          solve_list[ __push ]( '...' );
          break _WORD_;
        }
        solve_list[ __push ]( solve_word );
      }
      return __blank + solve_list[ __join ]( ' ' );
    }

    return scrub_str.substr(__0, limit_int - __3 ) + '...';
  }
  // . END Public method /makeEllipsisStr/

  // BEGIN Public method /makeErrorObj/
  // Purpose   : A convenient method to create an error object
  // Arguments :
  //   * name_text - the error name
  //   * msg_text  - long error message
  //   * data      - optional data attached to error object
  // Returns   : newly constructed error object
  // Throws    : none
  //
  function makeErrorObj ( arg_name, arg_msg, arg_data ) {
    var
      name = ( arg_name && __Str( arg_name ) ) || 'error',
      msg  = ( arg_msg  && __Str( arg_msg  ) ) || __blank,
      data = arg_data || __undef,
      error_obj = new Error();

    error_obj.name    = name;
    error_obj.message = msg;
    error_obj.data    = data;
    return error_obj;
  }
  // . END Public method /makeErrorObj/

  // BEGIN Public method /makeGuidStr/
  function makeGuidStr () {
    /*jslint bitwise: true*/
    function makePart () {
      //noinspection NonShortCircuitBooleanExpressionJS,MagicNumberJS
      return ((( __1+__makeRandomNumFn() ) * 0x10000 )|__0
      )[ __toString ](16).substr( __1 );
    }
    /*jslint bitwise: false*/

    return makePart() + makePart()
      + '-' + makePart()
      + '-' + makePart()
      + '-' + makePart()
      + '-' + makePart() + makePart() + makePart()
      ;
  }
  // . END Public method /makeGuidStr/

  // BEGIN Public method /makeMapUtilObj/
  // Purpose  : Creates a thread-safe map utility object
  //   useful to streamlining list.map() functions and
  //   avoiding nesting.
  // Example  :
  // 1. Create a map_util object:
  //    | var map_util_obj = makeMapUtilObj();
  // 2. (optional) Set any data your map function will use.
  //    | map_util_obj.setArgList = [ name_list ];
  // 3. Create a function that for element of the array.
  //    The arg_list provided is set in step 2:
  //    | function mapUtil_renameFn ( field_data, idx, list, arg_list ) {
  //    |   var
  //    |     name_list  = arg_list[ __0 ],
  //    |     field_key  = name_list[ idx ],
  //    |     field_str  = __Str( field_data )
  //    |     ;
  //    |
  //    |   // Return [ key, value ] to add to map.
  //    |   // Return undef to not add anything.
  //    |   return [ field_key, field_str ];
  //    | }
  // 4. Set the function in the utility
  //    | map_util_obj.setMapFn( mapUtil_renameFn );
  // 5. Initialize the result map. You need this pointer.
  //    | result_map = {};
  //    | map_util_obj.setResultMap( result_map );
  // 6. Invoke the map function:
  //    | my_list.map( map_util_obj.invokeFn );
  // 7. result_map will now contain the key value pairs return by
  //    mapUtil_renameFn for the provided list.
  //
  // This is an excellent example of how a closure creates
  // unique private variables in each instance returned, such
  // as the stored argList, resultMap, and mapFn.
  //
  //
  function makeMapUtilObj () {
    var resultMap, argList, mapFn;

    function getArgList   (          ) { return argList;                  }
    function getMapFn     (          ) { return mapFn;                    }
    function getResultMap (          ) { return resultMap;                }
    function setArgList   ( arg_list ) { argList   = castList( arg_list ); }
    function setMapFn     ( map_fn   ) { mapFn     = castFn(   map_fn   ); }
    function setResultMap ( rmap     ) { resultMap = castMap(  rmap     ); }

    function invokeFn ( field_data, idx, list ) {
      var ret_list, ret_key, ret_data;

      ret_list = mapFn && mapFn( field_data, idx, list, argList );
      if ( ! ret_list ) { return; }

      //noinspection JSUnusedAssignment
      ret_key  = ret_list[ __0 ];
      ret_data = ret_list[ __1 ];
      resultMap[ ret_key ] = ret_data;
    }

    return {
      getArgList   : getArgList,
      getMapFn     : getMapFn,
      getResultMap : getResultMap,
      invokeFn     : invokeFn,
      setArgList   : setArgList,
      setMapFn     : setMapFn,
      setResultMap : setResultMap
    };
  }
  // . END Public method /makeMapUtilObj/

  // BEGIN Public method /makeOptionHtml/
  // Arguments : ( named )
  //    * _select_list_ : (opt) List of values to be of selected
  //      This is useful for multi-select fields.
  //    * _title_map_   : (opt) val_x_title map
  //    * _val_list_    : (opt) List of values to process
  // Output    :
  //    * List of options as used in a select statement
  function makeOptionHtml ( arg_map ) {
    var
      map         = castMap(  arg_map, {} ),
      label_map   = castMap(  map._label_map_,   {} ),
      select_list = castList( map._select_list_, [] ),
      val_list    = castList( map._val_list_,    [] ),
      val_count   = val_list[ __length ],
      html_str    = __blank,

      idx, val_data, val_str, label_str
    ;

    _OPTION_: for ( idx = __0; idx < val_count; idx++ ) {
      val_data = val_list[ idx ];
      val_str  = castStr( val_data, __blank );
      if ( val_str === __blank ) { continue _OPTION_; }
      label_str = label_map[ val_str ] || makeUcFirstStr( val_str );

      html_str += '<option value="' + val_str + '"';
      if ( select_list[ __indexOf ]( val_data ) !== __n1 ) {
        html_str += ' selected="selected"';
      }
      html_str += '>' + label_str + '</option>';
    }
    return html_str;
  }
  // . END Public method /makeOptionHtml/

  // BEGIN Public method /makePctStr/
  // Purpose   : Convert a decimal ratio into a readable % string
  // Example   :
  //   my_pct = makePctStr( 0.529863, 1 );
  // Arguments : ( positional )
  //   0 : (required) ratio - Ratio to convert. 1 = 100%.
  //   1 : (optional) count - Number of digits after decimal.
  //       Default value is 0.
  //
  function makePctStr ( arg_ratio, arg_count ) {
    var
      ratio = castNum( arg_ratio, __0 ),
      count = castNum( arg_count, __0 )
    ;

    count = count < __0 ? __0 : __makeFloorNumFn( count );
    return ( ratio * __100 ).toFixed( count ) + '%';
  }
  // . END Public method /makePctStr/

  // BEGIN Public method /makeRadioHtml/
  // Purpose : Make an array of checkboxes from a list
  //
  function makeRadioHtml ( arg_map ) {
    var
      map        = castMap(  arg_map, {} ),
      group_name = castStr(  map._group_name_ ),    // name=...
      match_str  = castStr(  map._match_str_  ),    // Selected val
      val_list   = castList( map._val_list_,  [] ), // Vals in order
      label_map  = castMap(  map._label_map_, {} ), // Labels

      val_count  = val_list[ __length ],
      html_str   = __blank,

      idx, val_str, label_str
    ;

    _RADIO_: for ( idx = __0; idx < val_count; idx++ ) {
      val_str   = castStr( val_list[ idx ], __blank );
      if ( val_str === __blank ) { continue _RADIO_; }

      label_str = label_map[ val_str ] || makeUcFirstStr( val_str );

      html_str
        += '<label>'
        + '<input type="radio" name="' + group_name
        + '" value="' + val_str + '"'
      ;
      if ( val_str === match_str ) { html_str += ' checked="checked"'; }
      html_str += '/>' + label_str + '</label>';
    }
    return html_str;
  }
  // . END Public method /makeRadioHtml/

    // BEGIN Public method /makeReplaceFn/
    // Purpose   : Return a high-performance function that
    //   replaces a single symbol with a predefined value.
    // Example   :
    //   fn = makeReplaceFn( 'x', 'fred' );
    //   __logMsg( 'info', fn('you do not know {x}.') );
    //   // Prints 'you do not know fred.'
    // Arguments : ( positional )
    //  0 - search_str : A string to use to search. It is wrapped
    //    in '{_<search_str>_}'
    //  1 - value_str : Replacement value
    //
    function makeReplaceFn ( arg_search_str, arg_value_str ) {
      var
        search_str = castStr( arg_search_str, __blank ),
        value_str  = castStr( arg_value_str,  __blank ),
        escape_str = makeEscRxStr( '{' + search_str + '}' ),
        search_rx  = makeRxObj( escape_str, 'g' )
      ;

      return function ( arg_tmplt ) {
        var tmplt = castStr( arg_tmplt, __blank );
        return tmplt[ __replace ]( search_rx, value_str );
      };
    }
    // . END Public method /makeReplaceFn/

  // BEGIN Public method /makeRekeyMap/
  // Purpose : Change all key names in a map to the new keys provided
  //   in the key_map
  // Example :
  //   makeRekeyMap( { a:1, b:2, c:[] }, { a:'_x_', b: '_y_', c:'_z_' } )
  //   returns { _x_:1, _y_:2, _z_:[] }
  // A hard limit of 100 000 iterations are supported.
  //   Executes deep renaming through arrays and objects.
  //
  function makeContextObj ( arg_struct ) {
    var
      key_list  = __makeKeyListFn( arg_struct ),
      key_count = key_list.length,
      solve_struct = __Array.isArray( arg_struct ) ? [] : {}
      ;
 
    return key_count > 0 ? {
        source_struct : arg_struct,
        solve_struct  : solve_struct,
        key_list      : key_list,
        key_count     : key_list.length,
        key_idx       : 0
      } : null;
  }
  function makeRekeyMap( arg_struct, arg_key_map ) {
    var
      context_obj = makeContextObj( arg_struct ),
      stack_list  = [],
 
      key_count, key_list, key_idx,
      source_struct, solve_struct,
      key, data, replace_key,
      check_obj, pop_solve_struct, i
      ;
 
    CONTEXT: for ( i = __0; i < 100000; i++ ) {
      key_count  = context_obj.key_count;
      key_idx    = context_obj.key_idx;
      key_list   = context_obj.key_list;
      source_struct = context_obj.source_struct;
      solve_struct  = context_obj.solve_struct;
 
      key         = key_list[ key_idx ];
      data        = source_struct[ key ];
      replace_key = arg_key_map[ key ];
 
        if ( ! replace_key ) { replace_key = key; }
 
      if ( pop_solve_struct ) {
        data = pop_solve_struct;
        pop_solve_struct = null;
      }
      else if ( typeof data === 'object' ) {
        check_obj = makeContextObj( data );
        if ( check_obj ) {
          stack_list.push( context_obj );
          context_obj = check_obj;
          continue CONTEXT;
        }
      }
 
      solve_struct[ replace_key ] = data;
      key_idx++;
      context_obj.key_idx = key_idx;
      if ( key_idx >= key_count ) {
        if ( stack_list.length > 0 ) {
          pop_solve_struct = context_obj.solve_struct;
          context_obj = stack_list.pop();
        }
        else {
          break CONTEXT;
        }
      }
      solve_struct[ replace_key ] = data;
    }
    return context_obj.solve_struct;
  }
  // . END Public method /makeRekeyMap/

  // BEGIN Public method /makeSeenMap/
  // Purpose : Convert arg_key_list into a map with each key assigned
  // the value of arg_seen_data. If not provided, arg_seen_data === true
  //
  function makeSeenMap ( arg_key_list, arg_seen_data ) {
    var
      key_list  = castList( arg_key_list, [] ),
      key_count = key_list[ __length ],

      solve_data = arg_seen_data === __undef ? __true : arg_seen_data,
      solve_map = {},
      key, idx
    ;

    for ( idx = __0; idx < key_count; idx++ ) {
      key = key_list[ idx ];
      solve_map[ key ] = solve_data;
    }
    return solve_map;
  }
  // . END Public method /makeSeenMap/

  // BEGIN Public method /makeStrFromMap/
  // Purpose : Concatenate a number of key-values
  // into a single string
  function makeStrFromMap ( arg_map ) {
    var
      map       = castMap(  arg_map, {} ),
      prop_map  = castMap(  map._prop_map_, {} ),
      key_list  = castList( map._key_list_, [] ),
      delim_str = castStr( map._delim_str_, ' ' ),
      label_delim_str = castStr( map._label_delim_str_, ': ' ),
      label_map = castMap( map._label_map_, __undef ),

      do_label   = !! ( label_map || map._do_label_ ),
      key_count  = key_list[ __length ],
      solve_list = [],

      idx, prop_key, prop_str, label_str
    ;

    for ( idx = __0; idx < key_count; idx++ ) {
      prop_key  = key_list[ idx ];
      prop_str  = castStr( prop_map[ prop_key ], __blank );
      if ( prop_str !== __blank ) {
        if ( do_label ) {
          if ( label_map ) {
            label_str = castStr( label_map[ prop_key ], __blank );
            prop_str  = label_str + label_delim_str + prop_str;
          }
          else {
            prop_str = prop_key + label_delim_str + prop_str;
          }
        }
        solve_list[ __push ]( prop_str );
      }
    }
    return solve_list[ __join ]( delim_str ) + __blank;
  }
  // . END Public method /makeStrFromMap/

  // BEGIN Public method /makeSeriesMap/
  // Purpose   : Create a list of time labels quantitized to match
  //   standard time intervals
  // Example   :
  //   series_map = makeSeriesMap({
  //     _max_ms_       : 1465459980000,
  //     _min_ms_       : 1465452840000,
  //     _tgt_count_    : 12
  //   });
  // Arguments :
  //   _max_ms_       : (req) int start local-time milliseconds
  //   _min_ms_       : (req) int end local-time in milliseconds
  //   _tgt_count_    : (req) int desired number of divisions (+/- 50%)
  //
  //  Returns
  //   A map useful for plotting a quantized time series like so:
  //   -+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
  //    |     |     |     |     |     |     |     |     |     |     |     |
  //  23:20 23:30 23:40 23:50 00:00 00:10 00:20 00:30 00:40 00:50 01:00 01:10
  //           2016-06-07       |                    2016-06-08
  //  xxxxxxxxxxxxxxxxxxxxxxxxxx+
  //    { _date_list_  : [
  //        { _date_str_ : '2016-06-07', _width_ratio_ : 0.38655462184873 },
  //        { _date_str_ : '2016-06-08', _width_ratio_ : 0.61344537815126 }
  //      ],
  //      _left_ratio_ : 0.050420168067226,
  //      _time_list_ : [
  //        '23:20', '23:30', '23:40', '23:50', '00:00', '00:10',
  //        '00:20', '00:30', '00:40', '00:50', '01:00', '01:10'
  //      ]
  //      _time_idx_   : 1,
  //      _unit_count_ : 12,
  //      _unit_ms_    : 600000,
  //      _unit_name_  : '10m',
  //      _unit_ratio_ : 0.084033613445378,
  //    }
  //
  //    _date_list_  = list of dates and position of date labels
  //    _left_ratio_ = starting postion of time stamps
  //    _time_idx_   = precision of time to show 0 = '', 1=HH, 2=HH:MM, 3=HH:MM:SS
  //    _time_list_  = list of time labels
  //    _unit_count_ = number of time labels units returned
  //    _unit_ms_    = number of ms in
  //    _unit_ratio_ = ratio per time unit for plotting center of time
  //
  // Throws    :
  // Cautions  :
  //   Remember to use your local timezone offset if you want to
  //   show local time. See example on makeClockStr, above.
  //
  function makeSeriesMap( arg_map ) {
    var
      map       = castMap( arg_map, {}       ),
      max_ms    = castInt( map._max_ms_, __0 ),
      min_ms    = castInt( map._min_ms_, __0 ),
      tgt_count = castInt( map._tgt_count_   ),

      date_obj  = new __Date(),

      span_ms,         unit_ms_list, unit_count,
      btm_idx,         top_idx,      last_btm_idx,
      last_top_idx,    btm_count,    top_count,
      expand_ratio,

      jdx, idx,        check_idx,    check_map,
      check_count,     mod_unit_ms,  offset_ms,
      width_ratio,     left_ratio,   accum_ratio,
      date_ms,         date_offset,

      solve_map,       solve_ms,        time_ms,
      solve_str,       solve_time_list, solve_date_list
    ;

    // Get the time span and a list of available units
    span_ms      = max_ms - min_ms;
    unit_ms_list = configMap._unit_ms_list_;
    unit_count   = unit_ms_list[ __length ];

    // Init for solve loop
    btm_count  = tgt_count;
    top_count  = tgt_count;

    // Back off limits to resolve as close to target as possible
    _BACKOFF_: for ( jdx = __0; jdx < __10; jdx ++ ) {
      // Solve for unit size through interpolation
      btm_idx    = __0;
      top_idx    = unit_count - __1;
      last_btm_idx = __undef;
      last_top_idx = __undef;
      _INTERPOLATE_: for ( idx = __0; idx < unit_count; idx++ ) {
        // Calculate ranges
        check_idx   = btm_idx
          + __makeRoundNumFn( ( ( top_idx - btm_idx ) / __2 ) );
        check_map   = unit_ms_list[ check_idx ];
        check_count = __makeRoundNumFn( ( span_ms / check_map._ms_ ) );
        if ( ( top_idx - btm_idx ) === __1 && last_btm_idx !== __undef ) {
          if ( btm_idx === last_btm_idx && top_idx === last_top_idx ) {
            break _INTERPOLATE_;
          }
        }
        last_btm_idx = btm_idx;
        last_top_idx = top_idx;

        // Continue loop if out of range
        if ( check_count < btm_count ) {
          top_idx = check_idx;
          continue _INTERPOLATE_;
        }
        if ( check_count > top_count ) {
          btm_idx = check_idx;
          continue _INTERPOLATE_;
        }
        solve_map = {
          _time_idx_   : check_map._time_idx_,
          _unit_count_ : check_count,
          _unit_ms_    : check_map._ms_,
          _unit_name_  : check_map._str_
        };
        idx = unit_count;
      }

      if ( solve_map ) { break _BACKOFF_; }

      // No solution found; Increase range and try again
      expand_ratio = __1 + ( ( jdx + __1 ) / __10 );
      top_count = tgt_count * expand_ratio;
      btm_count = tgt_count / expand_ratio;
    }
    if ( ! solve_map ) { return; }

    // Store values to solve_map
    mod_unit_ms  = min_ms % solve_map._unit_ms_;
    offset_ms    = solve_map._unit_ms_ - mod_unit_ms;
    left_ratio = ( offset_ms / span_ms );

    solve_map._left_ratio_ = left_ratio;
    solve_map._unit_ratio_ = solve_map._unit_ms_ / span_ms;

    // Create date list
    date_obj.setTime( min_ms   );
    date_obj.setHours( 0, 0, 0 );
    date_ms     = date_obj.getTime();
    date_offset = min_ms - date_ms;

    solve_date_list = [];
    accum_ratio     = __0;
    while ( date_ms < max_ms ) {
      width_ratio = ( configMap._day_ms_ - date_offset ) / span_ms;
      accum_ratio += width_ratio;
      if ( accum_ratio >= __1 ) {
        width_ratio = width_ratio + ( __1 - accum_ratio );
      }
      solve_date_list[ __push ]({
        _date_str_    : makeDateStr({ _date_ms_ : date_ms, _order_str_ : '_us_' }),
        _width_ratio_ : width_ratio
      });
      date_offset = __0;
      date_ms += configMap._day_ms_;
    }
    solve_map._date_list_ = solve_date_list;

    solve_time_list = [];
    while ( left_ratio < __1 ) {
      solve_ms  = __makeFloorNumFn( left_ratio * span_ms ) + min_ms;
      date_obj.setTime( solve_ms );
      time_ms = __Num( date_obj.getHours()   ) * configMap._hrs_ms_
        +       __Num( date_obj.getMinutes() ) * configMap._min_ms_
        +       __Num( date_obj.getSeconds() ) * configMap._sec_ms_
      ;

      solve_str = makeClockStr( time_ms, solve_map._time_idx_ );
      solve_time_list[ __push ]( solve_str );
      left_ratio += solve_map._unit_ratio_;
    }
    solve_map._time_list_ = solve_time_list;

    return solve_map;
  }
  // . END Public function /makeSeriesMap/

  // BEGIN Public method /makeTmpltStr/
  // Purpose   : Replace symbols in a template surrounded by braces
  //   '{}' with the symbol provided in the lookup map.
  // Example   :
  //  out_str = makeTmpltStr({
  //    _input_str_  : '{_name_} says "{_saying_}"',
  //    _lookup_map_ : { _name_ : 'Fred', _saying_ : 'hello!' }
  //  });
  //  // out_str is 'Fred says hello!'
  //
  // Arguments : ( named )
  //   _input_str_  : A string template like so:
  //      'This person name {_p1_} said to the other person {_p2_}'
  //   _lookup_map_ : A map of values to replace, like so:
  //      { _p1_ : 'fred', _p2_ : 'barney' }
  // Throws    : none
  // Returns
  //   The filled-out template string
  //
  function makeTmpltStr ( arg_map ) {
    var
      map        = castMap( arg_map, {} ),
      input_str  = castStr( map._input_str_, __blank  ),
      lookup_map = castMap( map._lookup_map_,      {} ),
      tmplt_rx   = map._tmplt_rx_ || configMap._tmplt_rx_,
      bound_fn;


    function lookupFn ( ignore_match_str, lookup_name ) {
      var
        return_data  = this,
        lookup_list  = lookup_name[ __split ]( '.' ),
        lookup_count = lookup_list[ __length ],
        idx, key_name
      ;

      for ( idx = 0; idx < lookup_count; idx++ ) {
        key_name = lookup_list[ idx ];
        return_data = ( return_data && return_data[ key_name ] );
      }
      return castStr( return_data, __blank );
    }

    bound_fn   = lookupFn[ __bind ]( lookup_map );
    return input_str[ __replace ]( tmplt_rx, bound_fn );
  }
  // . END Public method /makeTmpltStr/

  // BEGIN Public method /mergeMaps/
  // Purpose : Merge properties of extend_map into base_map
  //
    // Warning : This does not deep copy the extend map.
    // This often provides the desired results.
    //   deep_map  = cloneData( extend_map );
    //   merge_map = mergeMaps( base_map, deep_map );
  //
  function mergeMaps( arg_base_map, arg_extend_map, arg_attr_list ) {
    var
      base_map   = castMap(  arg_base_map,   {} ),
      extend_map = castMap(  arg_extend_map, {} ),
      attr_list  = castList( arg_attr_list ),

      key_list   = __makeKeyListFn( extend_map ),
      key_count  = key_list[ __length ],

      idx, key
    ;

    _KEY_: for ( idx = __0; idx < key_count; idx++ ) {
      key = key_list[ idx ];
      if ( attr_list && attr_list[ __indexOf ]( key ) === __n1 ) {
        logObj.logMsg(
          '_warn_', '_key_not_supported_:|' + __Str( key ) + '|'
        );
        continue _KEY_;
      }
      base_map[ key ] = extend_map[ key ];
    }
    return base_map;
  }
  // . END Public method /mergeMaps/

  // BEGIN Public method /pollFunction/
  // Purpose : Run the <arg_fn> function every <arg_ms> milliseconds
  //   either <arg_count> number of times or until the function
  //   returns __false, whichever comes first.
  // Arguments ( positional )
  //   0 : fn        : function to poll, return false to stop polling
  //   1 : ms        : time between function invocation
  //   2 : count     : (optional) Maximum number of times to run the function.
  //   3 : finish_fn : (optional) function to invoke at completion
  // Returns
  //   __true  : polling started
  //   __false : polling declined
  //
  function pollFunction ( arg_fn, arg_ms, arg_count, arg_finish_fn ) {
    var
      poll_fn   = castFn(  arg_fn ),
      ms        = castInt( arg_ms,           __0 ),
      count     = castInt( arg_count,     __null ),
      finish_fn = castFn(  arg_finish_fn, __null ),
      idx     = __0,
      main_fn
    ;

    if ( ! poll_fn ) { return __false; }

    main_fn = function () {
      __setTimeoutFn( function() {
        var do_next;
        if ( count && idx >= count ) {
          return finish_fn && finish_fn();
        }
        do_next = poll_fn( idx );
        idx++;
        if ( do_next !== __false ) { main_fn(); }
      }, ms );
    };

    main_fn();
    return __true;
  }
  // . END Public method /pollFunction/

  // BEGIN Public method /pushUniqListVal/
  function pushUniqListVal ( arg_list, data ) {
    var input_list = castList( arg_list, [] );
    if ( input_list[ __indexOf ]( data ) === __n1 ) {
      input_list[ __push ]( data );
    }
  }
  // . END Public method /pushUniqListVal/

  // BEGIN Public method /rmListVal/
  function rmListVal ( arg_list, arg_data ) {
    var
      input_list   = castList( arg_list, [] ),
      input_count  = input_list[ __length ],
      rm_count     = __0,
      idx;

    for ( idx = input_count; idx; __0 ) {
      if ( input_list[ --idx ] === arg_data ) {
        input_list.splice( idx, __1 );
        rm_count++;
        idx++;
      }
    }
    return rm_count;
  }
  // . END Public method /rmListVal/

  // BEGIN Public method /setConfigMap/
  // Summary    : setConfigMap( <input_map>, <settable_map>, <config_map> );
  // Purpose    : Set configMap in consistent way across modules
  // Example    : Used in modules as below:
  //   function setConfigMap ( arg_input_map ) {
  //     setConfigMap( input_map, settableMap, configMap );
  //   }
  //   Where  settableMap shows allowable keys and types
  // Arguments  : (named)
  //   _input_map_    - Map of key-values to set in config
  //   _settable_map_ - Map of allowable keys with future plans to support
  //      types and ranges (see agrc)
  //   _config_map_   - Resulting config map
  // Returns    : Modified config_map
  // Throws     : None
  //
  function setConfigMap ( arg_map ) {
    var
      input_map    = castMap( arg_map._input_map_ ),
      settable_map = castMap( arg_map._settable_map_ ),
      config_map   = castMap( arg_map._config_map_ ),
      key_list, key_count, idx, key_name;

    if ( ! (  input_map && settable_map && config_map ) ) {
      return logObj.logMsg( '_error_', '_bad_input_' );
    }
    key_list  = __makeKeyListFn( input_map );
    key_count = key_list.length;

    for ( idx = __0; idx < key_count; idx++ ) {
      key_name = key_list[ idx ];
      if ( settable_map[ __hasOwnProperty ]( key_name ) ) {
        config_map[ key_name ] = input_map[ key_name ];
      }
      else {
        logObj.logMsg( '_warn_', '_key_not_supported_', key_name )
      }
    }
    return config_map;
  }
  // . END Public method /setConfigMap/

  // BEGIN Public method /setStructData/
  // Purpose   : Set a deep structure attribute value
  // Example   : _setStructData_({ foo:{ bar:1 }}, [ 'foo','bar' ], 99 );
  //             Returns __true and set the and adjusts the structure:
  //             { foo : { bar : 99 } }
  // Example   : _setStructData_( [ { car : [ 'seats', 'tyres' ] } ],
  //             [ 0, 'car', 1 ], 'Meyers!' ] );
  //             Returns __true and set the and adjusts the structure:
  //             [ { car : [ 'seats', 'Meyers!' ] } ]
  // Example   : _setStructData_( [],  [ null, 'car', null ], 'Meyers!' );
  //             Returns __true and adjust the structure:
  //             [ { car : [ 'Meyers!' ] } ]
  // Example   : _setStructData_( [], [ 'car', null ], 'Meyers!'  );
  //             Returns __false, as 'car' cannot be a property of the
  //             base structure. It must be null which means "next
  //             available array item" or an integer.
  //
  // Arguments : ( positional )
  //   0 : base_struct - An array or map to add a value
  //   1 : path_list   - A list of map or array keys in order of depth
  //   2 : val_data    - A data value to set
  // Returns   :
  //   * Success - __true
  //   * Failure - __false
  // Cautions  : The key list limit is set to __100. If this
  //   is met, a warning is logged and __undef returned
  //a
  function setStructData ( arg_base_struct, arg_path_list, val_data ) {
    var
      base_struct = arg_base_struct,
      path_list   = castList( arg_path_list, [] ),
      path_count  = path_list[ __length ],
      last_idx    = path_count - __1,
      walk_struct = base_struct,
      is_good     = __true,

      struct_type, idx,          raw_key,
      solve_key,   raw_next_key, int_key,
      int_next_key
    ;

    _SET_KEY_: for ( idx = __0; idx < path_count; idx++ ) {
      raw_key      = path_list[ idx ];
      raw_next_key = path_list[ idx + __1 ];
      struct_type  = getVarType( walk_struct );
      int_key      = castInt( raw_key );

      if ( raw_key === __null ) {
        if ( struct_type !== '_Array_' ) {
          is_good = __false;
          break _SET_KEY_;
        }
        solve_key = walk_struct[ __length ];
      }
      else if ( int_key !== __undef && struct_type === '_Array_' ) {
        solve_key = int_key;
      }
      else {
        solve_key = castStr( raw_key );
        if ( ! solve_key ) {
          is_good = __false;
          break _SET_KEY_;
        }
      }

      if ( idx === last_idx ) {
        walk_struct[ solve_key ] = val_data;
        break _SET_KEY_;
      }

      if ( ! walk_struct[ __hasOwnProperty ]( solve_key ) ) {
        int_next_key = castInt( raw_next_key );
        if ( raw_next_key === __null || int_next_key !== __undef ) {
          walk_struct[ solve_key ] = [];
        }
        else {
          walk_struct[ solve_key ] = {};
        }
      }

      walk_struct = walk_struct[ solve_key ];
    }
    return is_good;
  }
  // . END Public method /setStructData/

  // BEGIN public method /shuffleList/
  // Purpose   : Shuffle elements in a list
  // Example   : shuffleList( [1,2,3,4] ) returns [ 3,1,4,2 ]
  // Arguments : ( positional )
  //   0. arg_list - The list to shuffle
  // Returns   : boolean true on success
  // Throws    : none
  // Technique :
  //   1. Count down from end of array with last_idx
  //   2. Randomly pick element from between 0 and last_idx
  //   3. Swap pick element with last_idx element
  //
  function shuffleList ( arg_list ) {
    var
      list  = castList( arg_list ),
      count, idj, last_idx, pick_idx, swap_data;

    if ( ! list ) { return __false; }

    count = list[ __length ];
    for ( idj = count; idj > __0; idj-- ) {
      last_idx         = idj - __1;
      pick_idx         = __makeFloorNumFn( __makeRandomNumFn() * idj );
      swap_data        = list[ last_idx ];
      list[ last_idx ] = list[ pick_idx ];
      list[ pick_idx ] = swap_data;
    }
    return __true;
  }
  // . END public method /shuffleList/

  // BEGIN public method /trimStrList/
  function trimStrList ( arg_list ) {
    var list = castList( arg_list );

    function mapFn ( data ) {
      return getVarType( data ) === '_String_'
        ? data.trim() : data;
    }

    if ( ! list ) { return arg_list; }
    return list.map( mapFn );
  }
  // . END utility /trimStrList/

  // == . END PUBLIC METHODS ==========================================

  // BEGIN initialize module
  function initModuleFn ()  {
    stateMap = {
      _date_obj_     : __undef,
      _tz_offset_ms_ : __undef
    };

    configMap = {
      _sec_ms_    : 1000,
      _min_sec_   : 60,
      _hrs_min_   : 60,
      _day_hrs_   : 24,

      _min_ms_    : 60000,
      _hrs_ms_    : 3600000,
      _day_ms_    : 86400000,
      _offset_yr_ : 1900,

      _encode_html_map_ : {
        '&' : '&#38;',
        '"' : '&#34;',
        "'" : '&#39;',
        '>' : '&#62;',
        '<' : '&#60;'
      },

      _get_now_fn_  : __Date.now,
      _date_us_rx_  :
      // eslint-disable-next-line no-useless-escape
        /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]([0-9]{4})\b/,
      _date_utc_rx_ :
      // eslint-disable-next-line no-useless-escape
        /^([0-9]{4})[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\b/,

      _comma_rx_        : makeRxObj( '(\\d)(?=(\\d\\d\\d)+(?!\\d))', 'g' ),
      _encode_html_rx_  : /[&"'><]/g,
      _encode_noamp_rx_ : /["'><]/g,

      _tag_end_rx_: makeRxObj( '(</[^>]+>)+', 'g' ),
      _tag_rx_    : makeRxObj( '</?[^>]+>', 'g' ),
      _tmplt_rx_  : makeRxObj( '{([^{}]+[^\\\\])}','g' ),
      _tzcode_rx_ : makeRxObj( '\\((.*)\\)$' ),

      _unit_ms_list_ : [
        { _str_ : '0.1s',  _ms_ :        100, _time_idx_ : __3 },
        { _str_ : '0.25s', _ms_ :        250, _time_idx_ : __3 },
        { _str_ : '0.5s',  _ms_ :        500, _time_idx_ : __3 },
        { _str_ : '1s',    _ms_ :       1000, _time_idx_ : __3 },
        { _str_ : '2.5s',  _ms_ :       2500, _time_idx_ : __3 },
        { _str_ : '5s',    _ms_ :       5000, _time_idx_ : __3 },
        { _str_ : '10s',   _ms_ :      10000, _time_idx_ : __3 },
        { _str_ : '15s',   _ms_ :      15000, _time_idx_ : __3 },
        { _str_ : '30s',   _ms_ :      30000, _time_idx_ : __3 },
        { _str_ : '1m',    _ms_ :      60000, _time_idx_ : __2 },
        { _str_ : '2.5m',  _ms_ :     150000, _time_idx_ : __3 },
        { _str_ : '5m',    _ms_ :     300000, _time_idx_ : __2 },
        { _str_ : '10m',   _ms_ :     600000, _time_idx_ : __2 },
        { _str_ : '15m',   _ms_ :     900000, _time_idx_ : __2 },
        { _str_ : '30m',   _ms_ :    1800000, _time_idx_ : __2 },
        { _str_ : '1hr',   _ms_ :    3600000, _time_idx_ : __2 },
        { _str_ : '2hr',   _ms_ :    7200000, _time_idx_ : __2 },
        { _str_ : '4hr',   _ms_ :   14400000, _time_idx_ : __2 },
        { _str_ : '6hr',   _ms_ :   21600000, _time_idx_ : __2 },
        { _str_ : '8hr',   _ms_ :   28800000, _time_idx_ : __2 },
        { _str_ : '12hr',  _ms_ :   43200000, _time_idx_ : __1 },
        { _str_ : '1d',    _ms_ :   86400000, _time_idx_ : __1 },
        { _str_ : '2d',    _ms_ : 86400000*2, _time_idx_ : __1 },
        { _str_ : '4d',    _ms_ : 86400000*4, _time_idx_ : __1 },
        { _str_ : '1wk',   _ms_ : 86400000*7, _time_idx_ : __1 }
      ]

    };
    /* istanbul ignore next */
    try {
      stateMap._has_jq_ = !! jQuery;
    }
    catch ( error ) {
      stateMap._has_jq_ = __false;
    }
  }
  initModuleFn();
  // . END initialize module


  return {
    getVarType      : getVarType,

    castBool        : castBool,
    castFn          : castFn,
    castInt         : castInt,
    castJQ          : castJQ,
    castList        : castList,
    castMap         : castMap,
    castNum         : castNum,
    castObj         : castObj,
    castStr         : castStr,

    safeJsonParse     : safeJsonParse,
    safeJsonStringify : safeJsonStringify,

    cloneData       : cloneData,
    extendList      : extendList,
    getNowMs        : getNowMs,
    getNumSign      : getNumSign,
    makeArgList     : makeArgList,
    makePadNumStr   : makePadNumStr,
    makeEscRxStr    : makeEscRxStr,
    makeRxObj       : makeRxObj,
    makeScrubStr    : makeScrubStr,
    makeUcFirstStr  : makeUcFirstStr,

    checkDateStr    : checkDateStr,
    clearMap        : clearMap,
    encodeHtml      : encodeHtml,
    getBasename     : getBasename,
    getDirname      : getDirname,
    getListAttrIdx  : getListAttrIdx,
    getListAttrMap  : getListAttrMap,
    getListDiff     : getListDiff,
    getListValCount : getListValCount,
    getLogObj       : getLogObj,
    getStructData   : getStructData,
    getTzCode       : getTzCode,
    makeClockStr    : makeClockStr,
    makeCommaNumStr : makeCommaNumStr,
    makeDateStr     : makeDateStr,
    makeDebounceFn  : makeDebounceFn,
    makeEllipsisStr : makeEllipsisStr,
    makeErrorObj    : makeErrorObj,
    makeExtractMap  : makeExtractMap,
    makeGuidStr     : makeGuidStr,
    makeKeyList     : __makeKeyListFn,
    makeMapUtilObj  : makeMapUtilObj,
    makeMetricStr   : makeMetricStr,
    makeOptionHtml  : makeOptionHtml,
    makePctStr      : makePctStr,
    makeRadioHtml   : makeRadioHtml,
    makeRekeyMap    : makeRekeyMap,
    makeReplaceFn   : makeReplaceFn,
    makeSeenMap     : makeSeenMap,
    makeSeriesMap   : makeSeriesMap,
    makeStrFromMap  : makeStrFromMap,
    makeThrottleFn  : makeThrottleFn,
    makeTmpltStr    : makeTmpltStr,
    mergeMaps       : mergeMaps,
    pollFunction    : pollFunction,
    pushUniqListVal : pushUniqListVal,
    rmListVal       : rmListVal,
    setStructData   : setStructData,
    setConfigMap    : setConfigMap,
    shuffleList     : shuffleList,
    trimStrList     : trimStrList
  };
}());
// == . END MODULE xuu ================================================
try { module.exports = xuu }
catch (e) { console.trace(e) }
