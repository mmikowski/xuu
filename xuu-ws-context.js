/*
 * xhi-ws-context.js
 * @author Michael S. Mikowski - mike.mikowski@gmail.com
 *
 * This file is used by WebStorm to resolve properties
 * key received from external sources such as AJAX.
 * It is also useful as a reference.
 * It should *NOT* be included in production code.
 *
*/
(function () {
  'use strict';
  var
    bool = true,
    fn   = Function,
    int  = 1,
    list = [],
    map  = {},
    num  = 1 / 2,
    obj  = {},
    rx   = new RegExp(''),
    str  = ''
    ;

  return {
    // xuu
    getYear          : fn,
    _attr_list_      : list,
    _char_limit_int_ : num,
    _config_map_     : map,
    _do_encode_html_ : bool,
    _do_warn_        : bool,
    _example_obj_    : obj,
    _example_str_    : str,
    _filter_regex_   : rx,
    _input_map_      : map,
    _is_empty_ok_    : bool,
    _max_ms_         : num,
    _min_length_     : int,
    _max_length_     : int,
    _settable_map_   : map,
    _target_map_     : map,
    _tgt_count_      : num,

    // default assignments
    _bool_  : bool,
    _fn_    : fn,
    _int_   : int,
    _list_  : list,
    _map_   : map,
    _num_   : num,
    _obj_   : obj,
    _rx_    : rx,
    _str_   : str
  };
}());
