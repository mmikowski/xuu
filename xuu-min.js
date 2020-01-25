var xuu=function(){"use strict";var vMap={_concat_:"concat",_filter_:"filter",_map_:"map",_object_:"object",_slice_:"slice",_splice_:"splice",_substr_:"substr",_toFixed_:"toFixed",_trim_:"trim"},__Array=Array,__Date=Date,__Math=Math,__Num=Number,__Object=Object,__Str=String,clearToFn=clearTimeout,data2strFn=JSON.stringify,makeAbsNumFn=__Math.abs,makeFloorNumFn=__Math.floor,makeKeyListFn=__Object.keys,makeRandomNumFn=Math.random,makeRoundNumFn=Math.round,setToFn=setTimeout,str2dataFn=JSON.parse,typeofFn=function(d){return typeof d},__n1=-1,__0=0,__1=1,__2=2,__3=3,__4=4,__5=5,__6=6,__7=7,__8=8,__10=10,__100=100,__apply="apply",__blank="",__bind="bind",__false=false,__hasProp="hasOwnProperty",__indexOf="indexOf",__join="join",__length="length",__match="match",__null=null,__pop="pop",__push="push",__replace="replace",__shift="shift",__slice="slice",__space=" ",__split="split",__substr="substr",__toString="toString",__true=true,__undef=void __0,__unshift="unshift",typeofMap={boolean:"_Boolean_",number:"_Number_",string:"_String_",function:"_Function_",object:"_Object_",undefined:"_Undefined_",Array:"_Array_",Boolean:"_Boolean_",Function:"_Function_",Null:"_Null_",Number:"_Number_",Object:"_Object_",String:"_String_",Undefined:"_Undefined_"},configMap={_sec_ms_:1e3,_min_sec_:60,_hrs_min_:60,_day_hrs_:24,_min_ms_:6e4,_hrs_ms_:36e5,_day_ms_:864e5,_offset_yr_:1900,_noon_hr_:12,_get_now_fn_:vMap._getNowMs_,_date_us_rx_:makeRxObj("^(0?[1-9]|1[012])[\\/-](0?[1-9]|[12][0-9]|3[01])[\\/-]([0-9]{4})\\b"),_date_utc_rx_:makeRxObj("^([0-9]{4})[\\/-](0?[1-9]|1[012])[\\/-](0?[1-9]|[12][0-9]|3[01])\\b"),_encode_html_map_:{"&":"&#38;",'"':"&#34;","'":"&#39;",">":"&#62;","<":"&#60;"},_encode_html_rx_:/[&"'><]/g,_encode_noamp_rx_:/["'><]/g,_comma_rx_:makeRxObj("(\\d)(?=(\\d\\d\\d)+(?!\\d))","g"),_tag_end_rx_:makeRxObj("(</[^>]+>)+","g"),_tag_rx_:makeRxObj("</?[^>]+>","g"),_tmplt_rx_:makeRxObj("{([^{}]+[^\\\\])}","g"),_tzcode_rx_:makeRxObj("\\((.*)\\)$"),_rekey_max_count_:1e4,_metric_table_:[{_min_int_:1e9,_suffix_:"G"},{_min_int_:1e6,_suffix_:"M"},{_min_int_:1e3,_suffix_:"K"}],_unit_ms_list_:[{_str_:"0.1s",_ms_:100,_time_idx_:__3},{_str_:"0.25s",_ms_:250,_time_idx_:__3},{_str_:"0.5s",_ms_:500,_time_idx_:__3},{_str_:"1s",_ms_:1e3,_time_idx_:__3},{_str_:"2.5s",_ms_:2500,_time_idx_:__3},{_str_:"5s",_ms_:5e3,_time_idx_:__3},{_str_:"10s",_ms_:1e4,_time_idx_:__3},{_str_:"15s",_ms_:15e3,_time_idx_:__3},{_str_:"30s",_ms_:3e4,_time_idx_:__3},{_str_:"1m",_ms_:6e4,_time_idx_:__2},{_str_:"2.5m",_ms_:15e4,_time_idx_:__3},{_str_:"5m",_ms_:3e5,_time_idx_:__2},{_str_:"10m",_ms_:6e5,_time_idx_:__2},{_str_:"15m",_ms_:9e5,_time_idx_:__2},{_str_:"30m",_ms_:18e5,_time_idx_:__2},{_str_:"1hr",_ms_:36e5,_time_idx_:__2},{_str_:"2hr",_ms_:72e5,_time_idx_:__2},{_str_:"4hr",_ms_:144e5,_time_idx_:__2},{_str_:"6hr",_ms_:216e5,_time_idx_:__2},{_str_:"8hr",_ms_:288e5,_time_idx_:__2},{_str_:"12hr",_ms_:432e5,_time_idx_:__1},{_str_:"1d",_ms_:864e5,_time_idx_:__1},{_str_:"2d",_ms_:864e5*2,_time_idx_:__1},{_str_:"4d",_ms_:864e5*4,_time_idx_:__1},{_str_:"1wk",_ms_:864e5*7,_time_idx_:__1}]},stateMap={_date_obj_:__undef,_tz_offset_ms_:__undef},getBasename,getDirname,logObj,logFn;try{stateMap._has_jq_=!!jQuery}catch(ignore){stateMap._has_jq_=__false}function getVarType(data){var type_key,type_str;if(data===__null){return"_Null_"}if(data===__undef){return"_Undefined_"}if(__Array.isArray(data)){return"_Array_"}type_key=typeofFn(data);type_str=typeofMap[type_key];if(type_str&&type_str!=="_Object_"){return type_str}type_key={}[__toString].call(data)[__slice](__8,__n1);return typeofMap[type_key]||type_key}function castBool(data,alt_data){if(data===__true||data===__false){return data}return alt_data}function castFn(data,alt_data){var var_type=getVarType(data);return var_type==="_Function_"?data:alt_data}function checkNumFn(arg_num,alt_data,option_map){var num=arg_num,log_list=[],solve_data;if(option_map[__hasProp]("_max_num_")&&num>option_map._max_num_){if(option_map._do_autobound_){num=option_map._max_num_}else{log_list[__push]("_num_exceeds_max_ "+__Str(num)+" > "+__Str(option_map._max_num_))}}if(option_map[__hasProp]("_min_num_")&&num<option_map._min_num_){if(option_map._do_autobound_){num=option_map._min_num_}else{log_list[__push]("_num_below_min_ "+option_map._min_num_)}}if(log_list[__length]===__0){solve_data=num}else{if(option_map._do_warn_){logFn("_warn_","_num_fails_constraints_",log_list)}solve_data=alt_data}return solve_data}function castInt(data,alt_data,option_map){var var_type=getVarType(data),solve_num=var_type==="_Number_"?data:var_type==="_String_"?parseFloat(data):__undef,solve_int;if(isNaN(solve_num)){return alt_data}solve_int=makeRoundNumFn(solve_num);if(typeofFn(option_map)===vMap._object_){return checkNumFn(solve_int,alt_data,option_map)}return solve_int}function castJQ(data,alt_data){if(stateMap._has_jq_){return data&&data instanceof jQuery?data:alt_data}return alt_data}function castList(data,alt_data,option_map){var var_type=getVarType(data),log_list,item_count;if(var_type!=="_Array_"){return alt_data}if(typeofFn(option_map)===vMap._object_){log_list=[];item_count=data[__length];if(item_count===__0&&option_map._is_empty_ok_===__false){log_list[__push]("_list_is_empty_")}if(option_map._max_length_&&item_count>option_map._max_length_){log_list[__push]("_list_exceed_max_length_ "+__Str(item_count)+" > "+__Str(option_map._max_length_))}if(option_map._min_length_&&item_count<option_map._min_length_){log_list[__push]("_list_is_below_min_length_  "+__Str(item_count)+" < "+__Str(log_list._min_length_))}if(log_list[__length]>__0){if(option_map._do_warn_){logFn("_warn_","_list_fails_constraints_",log_list)}return alt_data}}return data}function castMap(data,alt_data){var var_type=getVarType(data);return var_type==="_Object_"?data:alt_data}function castNum(data,alt_data,option_map){var var_type=getVarType(data),solve_num=var_type==="_Number_"?data:var_type==="_String_"?parseFloat(data):__undef;if(isNaN(solve_num)){return alt_data}if(typeofFn(option_map)===vMap._object_){return checkNumFn(solve_num,alt_data,option_map)}return solve_num}function castObj(obj_type,data,alt_data){var var_type=getVarType(data);return var_type===obj_type?data:alt_data}function castRx(data,alt_data){return castObj("RegExp",data,alt_data)}function castStr(data,alt_data,option_map){var var_type=getVarType(data),solve_str=var_type==="_String_"?data:var_type==="_Number_"?__Str(data):__undef,log_list,char_count;if(solve_str===__undef){return alt_data}if(typeofFn(option_map)===vMap._object_){log_list=[];char_count=solve_str[__length];if(option_map._is_empty_ok_===__false&&solve_str===__blank){log_list[__push]("_str_is_empty_")}if(option_map._max_length_&&char_count>option_map._max_length_){log_list[__push]("_str_exceeds_max_length_ "+__Str(char_count)+" > "+__Str(option_map._max_length_))}if(option_map._min_length_&&char_count<option_map._min_length_){log_list[__push]("_str_is_below_min_length_ "+__Str(char_count)+" < "+__Str(log_list._min_length_))}if(option_map._filter_rx_&&!option_map._filter_rx_.test(solve_str)){log_list[__push]("_str_fails_filter_rx_ "+option_map._filter_rx_[__toString]())}if(log_list[__length]>__0){if(option_map._do_warn_){logFn("_warn_","_str_fails_constraints_",log_list)}return alt_data}}return solve_str}function safeJsonParse(json_str,alt_data){var solve_data;try{solve_data=str2dataFn(json_str)}catch(ignore){solve_data=alt_data}return solve_data}function safeJsonStringify(arg_data,alt_data){var solve_str;try{solve_str=data2strFn(arg_data)}catch(ignore){solve_str=alt_data}return solve_str}function cloneData(arg_data,alt_data){var solve_data;if(arg_data===__undef){return arg_data}try{solve_data=JSON.parse(JSON.stringify(arg_data))}catch(ignore){solve_data=alt_data}return solve_data}function extendList(arg_base_list,arg_extend_list){var base_list=castList(arg_base_list,[]),extend_list=castList(arg_extend_list,[]);__Array.prototype.push[__apply](base_list,extend_list);return base_list}function getNowMs(do_local){var date_obj;if(do_local){date_obj=new __Date;return date_obj.getTime()-date_obj.getTimezoneOffset()*configMap._min_ms_}return configMap._get_now_fn_?configMap._get_now_fn_():+new __Date}function getNumSign(n){var num=__Num(n);return!isNaN(num)&&num<__0?__n1:__1}function getTzDateObj(){if(!stateMap._date_obj_){stateMap._date_obj_=new __Date}return stateMap._date_obj_}function makeArgList(arg_obj){var src_obj=castObj("Arguments",arg_obj,{}),arg_count=src_obj[__length],solve_list=[],idx;for(idx=__0;idx<arg_count;idx++){solve_list[idx]=arg_obj[idx]}return solve_list}function makePadStr(arg_str,arg_count,arg_char,arg_do_left){var str=castStr(arg_str),count=castInt(arg_count),char_str=castStr(arg_char,__space),do_left=castBool(arg_do_left,__true),list=[],pad_str,pad_count;if(str===__undef){return __blank}str=str[vMap._trim_]();if(!(count&&count>=__0)){return str}pad_count=count-str[__length];if(pad_count<__0){return str}list[__length]=pad_count>__0?pad_count+__1:__0;pad_str=list[__join](char_str);return do_left?pad_str+str:str+pad_str}function makeEscRxStr(arg_str){var str=castStr(arg_str,__blank);return str[__replace](/[-[\]{}()*+?.,\\^$|#]/gm,"\\$&")}function makeExtractMap(arg_base_map,arg_key_list){var base_map=castMap(arg_base_map,{}),key_list=castList(arg_key_list,makeKeyListFn(base_map)),key_count=key_list[__length],solve_map={},idx,key;for(idx=__0;idx<key_count;idx++){key=key_list[idx];solve_map[key]=base_map[key]}return solve_map}function makeRxObj(arg_pattern_str,arg_option_str){var pattern_str=castStr(arg_pattern_str,__blank),option_str=castStr(arg_option_str);if(option_str){return new RegExp(pattern_str,option_str)}return new RegExp(pattern_str)}function makeScrubStr(arg_str,arg_do_space){var raw_str=castStr(arg_str,__blank),do_space=castBool(arg_do_space),interm_str=do_space?raw_str[__replace](configMap._tag_end_rx_,__space):raw_str;interm_str=interm_str[vMap._trim_]();return interm_str[__replace](configMap._tag_rx_,__blank)}function makeUcFirstStr(arg_str){var str=castStr(arg_str,__blank),uc_str=str.charAt(__0).toUpperCase();return uc_str+str[__substr](__1)}logObj=function(){var levelXCmdMap={_emerg_:"trace",_alert_:"error",_crit_:"error",_error_:"error",_warn_:"warn",_notice_:"log",_info_:"info",_debug_:"info"},levelXIdxMap={_emerg_:__0,_alert_:__1,_crit_:__2,_error_:__3,_warn_:__4,_notice_:__5,_info_:__6,_debug_:__7},levelKey="_warn_",levelIdx=levelXIdxMap[levelKey],consoleRef;try{consoleRef=global.console}catch(ignore){if(window){consoleRef=window.console}else{throw"_cannot_find_console_function_"}}function setLogLevel(arg_key){var level_key=castStr(arg_key,__blank);if(!levelXCmdMap[level_key]){return levelKey}levelKey=level_key;levelIdx=levelXIdxMap[level_key];return levelKey}function getLevelName(){return levelKey}function getLevelIdx(){return levelIdx}function getIdxByName(arg_name){var key=castStr(arg_name,"");return levelXIdxMap[key]}function logMsg(){var arg_list=makeArgList(arguments),level_key=castStr(arg_list[__shift](),__blank),caller_str=__blank,command_str=levelXCmdMap[level_key],level_idx=levelXIdxMap[level_key],caller_list,date_str,prefix_str,pad_key;if(!command_str){arg_list[__unshift]("_log_level_key_not_found_ ("+level_key+").");level_key="_crit_";level_idx=levelXIdxMap[level_key];command_str=levelXCmdMap[level_key]}if(level_idx>levelIdx){return __false}try{caller_list=(new Error).stack[__split](/ *\n/);caller_str+=(caller_list[__2]||__blank)[__replace](/^ */g,__blank)}catch(ignore){caller_str="_no_stack_found_"}date_str=makeDateStr({_date_ms_:getNowMs(),_time_idx_:__3});pad_key=makePadStr(level_key,__8," ",__false);prefix_str=[pad_key,date_str,caller_str][__join](" | ");arg_list[__unshift](prefix_str+"\n");try{consoleRef[command_str][__apply](consoleRef,arg_list)}catch(ignore){try{consoleRef[command_str](arg_list[__1])}catch(ignore){return __false}}return __true}return{_getIdxByName_:getIdxByName,_getLevelIdx_:getLevelIdx,_getLevelName_:getLevelName,_logMsg_:logMsg,_setLogLevel_:setLogLevel}}();logFn=logObj._logMsg_;function checkDateStr(arg_map){var map=castMap(arg_map,{}),date_str=castStr(map._date_str_,__blank),order_str=castStr(map._order_str_,__blank),date_us_rx=configMap._date_us_rx_,date_utc_rx=configMap._date_utc_rx_,match_list,yy_int,mm_int,dd_int,date_obj,check_int;if(order_str==="_us_"){match_list=date_str[__match](date_us_rx);if(!match_list){return __false}yy_int=+match_list[__3]-configMap._offset_yr_;mm_int=+match_list[__1]-__1;dd_int=+match_list[__2]}else{match_list=date_str[__match](date_utc_rx);if(!match_list){return __false}yy_int=+match_list[__1]-configMap._offset_yr_;mm_int=+match_list[__2]-__1;dd_int=+match_list[__3]}date_obj=new __Date(__Date.UTC(yy_int,mm_int,dd_int));check_int=date_obj.getUTCDate();return check_int===dd_int}function makeMetricStr(arg_num){var num=castNum(arg_num,__0),abs_num=makeAbsNumFn(num),metric_table=configMap._metric_table_,metric_count=metric_table[__length],root_num,suffix,idx,row_map;_SUFFIX_:for(idx=__0;idx<metric_count;idx++){row_map=metric_table[idx];if(abs_num>=row_map._min_int_){root_num=num/row_map._min_int_;suffix=row_map._suffix_;break _SUFFIX_}}if(!root_num){root_num=num;suffix=__blank}return root_num.toPrecision(__3)+suffix}function clearMap(arg_map,arg_key_list,do_undef){var map=castMap(arg_map),key_list,key_count,idx,key;if(!map){return}key_list=castList(arg_key_list,makeKeyListFn(map));key_count=key_list[__length];for(idx=__0;idx<key_count;idx++){key=key_list[idx];if(map[__hasProp](key)){if(do_undef){map[key]=__undef}else{delete map[key]}}}return map}function encodeHtml(arg_str,arg_do_exclude_amp){var source_str=castStr(arg_str,__blank),do_exclude_amp=castBool(arg_do_exclude_amp),match_rx,lookup_map;function matchFn(key){return lookup_map[key]||__blank}lookup_map=configMap._encode_html_map_;match_rx=do_exclude_amp?configMap._encode_noamp_rx_:configMap._encode_html_rx_;return source_str[__replace](match_rx,matchFn)}function getBaseDirname(arg_path_str,arg_delim_str){var context_str=this,path_str=castStr(arg_path_str,__blank),delim_str=castStr(arg_delim_str,"/"),rx_obj=context_str==="_base_"?makeRxObj("([^"+delim_str+"]*)$"):makeRxObj("^(.*"+delim_str+")[^"+delim_str+"]*$"),match_list;if(path_str===__blank){return path_str}match_list=path_str[__match](rx_obj);return match_list&&match_list[__1]||__blank}getBasename=getBaseDirname[__bind]("_base_");getDirname=getBaseDirname[__bind]("_dir_");function getListAttrIdx(arg_map_list,arg_key,data){var map_list=castList(arg_map_list,[]),key=castStr(arg_key,__blank),map_count=map_list[__length],found_idx=__n1,idx,row_map,row_key_list;for(idx=__0;idx<map_count;idx++){row_map=map_list[idx];if(typeofFn(row_map)!=="object"){continue}row_key_list=makeKeyListFn(row_map);if(row_key_list[__indexOf](key)===__n1){continue}if(row_map[key]===data){found_idx=idx;break}}return found_idx}function getListAttrMap(arg_list,key_name,key_val){var list=castList(arg_list,[]),list_idx=getListAttrIdx(list,key_name,key_val);return list_idx>__n1?list[list_idx]:__undef}function makeColumnList(arg_list,arg_key,arg_filter_fn){var list=castList(arg_list,[]),col_key=castStr(arg_key,list[__0]&&list[__0][__0]),filter_fn=castFn(arg_filter_fn),list_count=list[__length],solve_list=[],idx,row_data,col_data;for(idx=__0;idx<list_count;idx++){row_data=list[idx];if(typeofFn(row_data)!=="object"){continue}col_data=row_data[col_key];if(filter_fn&&!filter_fn(row_data)){continue}solve_list[__push](col_data)}return solve_list}function getListDiff(arg0_list,arg1_list){var first_list=castList(arg0_list,[]),second_list=castList(arg1_list,[]),list_1,list_2;list_1=first_list[vMap._filter_](function(data){return second_list[__indexOf](data)===__n1});list_2=second_list[vMap._filter_](function(data){return first_list[__indexOf](data)===__n1});return list_1[vMap._concat_](list_2)}function getListValCount(arg_list,arg_data){var input_list=castList(arg_list,[]),end_idx=input_list[__length]-__1,match_count=__0,idx;for(idx=end_idx;idx>__n1;idx--){if(input_list[idx]===arg_data){match_count++}}return match_count}function getLogObj(){return logObj}function getStructData(base_struct,arg_path_list){var walk_struct=base_struct,path_list=castList(arg_path_list,[]),is_good=__true,key_count=path_list[__length],idx,raw_key,struct_type,key;if(key_count>__100){logFn("_error_","_exceeded_max_depth_");return __undef}_GET_KEY_:for(idx=__0;idx<key_count;idx++){raw_key=path_list[idx];struct_type=getVarType(walk_struct);switch(struct_type){case"_Array_":key=castInt(raw_key);break;case"_Object_":key=castStr(raw_key);break;default:if(typeofFn(walk_struct)==="object"&&walk_struct!==__null){key=castStr(raw_key);break}key=__undef;break}if(key===__undef){is_good=__false;break _GET_KEY_}walk_struct=walk_struct[key]}if(is_good){return walk_struct}return __undef}function getTzCode(){var date_obj=getTzDateObj(),date_str=date_obj[__toString](),match_list=date_str[__match](configMap._tzcode_rx_);return match_list&&match_list[__1]?match_list[__1]:__blank}function makeClockStr(arg_time_ms,arg_time_idx,arg_do_ampm,arg_do_local){var do_ampm=castBool(arg_do_ampm,__false),do_local=castBool(arg_do_local,__false),time_idx=castInt(arg_time_idx,__3),time_ms=castInt(arg_time_ms,getNowMs(do_local)),abs_idx=makeAbsNumFn(time_idx),sec_ms=configMap._sec_ms_,min_sec=configMap._min_sec_,hrs_min=configMap._hrs_min_,day_hrs=configMap._day_hrs_,raw_sec_int=makeRoundNumFn(time_ms/sec_ms),sec_int=raw_sec_int%min_sec,raw_min_int=makeFloorNumFn(raw_sec_int/min_sec),min_int=raw_min_int%hrs_min,raw_hrs_int=makeFloorNumFn(raw_min_int/hrs_min),hrs_int=raw_hrs_int%day_hrs,day_int=makeFloorNumFn(raw_hrs_int/day_hrs),time_list=[],suffix_str=__blank,scratch_str;if(abs_idx===__0||abs_idx>__3){return __blank}if(time_idx<__0&&day_int>__0){scratch_str=day_int+"d";time_list[__push](scratch_str)}scratch_str=makePadStr(hrs_int,__2,__0);if(time_idx<__0){scratch_str+="h"}time_list[__push](scratch_str);if(abs_idx>__1){scratch_str=makePadStr(min_int,__2,__0);if(time_idx<__0){scratch_str+="m"}time_list[__push](scratch_str)}if(abs_idx>__2){scratch_str=makePadStr(sec_int,__2,__0);if(time_idx<__0){scratch_str+="s"}time_list[__push](scratch_str)}if(do_ampm){if(time_list[__0]>=configMap._noon_hr_){suffix_str=" PM";if(time_list[__0]>configMap._noon_hr_){time_list[__0]-=configMap._noon_hr_}}else{suffix_str=" AM"}}return time_list[__join](":")+suffix_str}function makeCommaNumStr(arg_map){var map=castMap(arg_map,{}),input_num=castNum(map._input_num_,__0),round_limit_exp=castInt(map._round_limit_exp_,__3),round_unit_exp=castInt(map._round_unit_exp_,__3),round_unit_str=castStr(map._round_unit_str_,"k"),round_dec_count=castInt(map._round_dec_count_,__1),nornd_dec_count=castInt(map._nornd_dec_count_,__0),round_limit_num=__Math.pow(__10,round_limit_exp),round_unit_num=__Math.pow(__10,round_unit_exp),floor_num=makeFloorNumFn(input_num),dec_num=(input_num-floor_num).toFixed(nornd_dec_count),do_units=makeAbsNumFn(floor_num)>=round_limit_num,dec_str=__blank,suffix_str=__blank,iterm_num,iterm_str,join_list,join_str,list_count,idx;if(nornd_dec_count>0){console.warn("WTF?",do_units)}if(do_units){iterm_num=floor_num/round_unit_num;suffix_str=round_unit_str;iterm_str=iterm_num[vMap._toFixed_](round_dec_count)}else{iterm_str=__Str(floor_num);if(nornd_dec_count>0){dec_str=__Str(dec_num)[__split](".")[__1]||"";dec_str="."+dec_str[__substr](__0,nornd_dec_count)}}join_list=iterm_str[__split](".");list_count=join_list[__length];for(idx=__0;idx<list_count;idx++){join_list[idx]=join_list[idx][__replace](configMap._comma_rx_,"$1,")}join_str=join_list[__join](".");return do_units?join_str+suffix_str:join_str+dec_str}function makeDateStr(arg_map){var map=castMap(arg_map,{}),date_ms=castInt(map._date_ms_),date_obj=castObj("Date",map._date_obj_),time_idx=castInt(map._time_idx_,__0),order_str=castStr(map._order_str_,__blank),yrs_int,mon_int,day_int,date_list,date_str,time_ms,time_str;if(!date_obj){date_obj=new __Date}if(date_ms){date_obj.setTime(date_ms)}yrs_int=__Num(date_obj.getYear())+configMap._offset_yr_;mon_int=__Num(date_obj.getMonth())+__1;day_int=__Num(date_obj.getDate());if(order_str==="_us_"){date_list=[makePadStr(mon_int,__2,__0),makePadStr(day_int,__2,__0),makePadStr(yrs_int,__4,__0)];date_str=date_list[__join]("/")}else{date_list=[makePadStr(yrs_int,__4,__0),makePadStr(mon_int,__2,__0),makePadStr(day_int,__2,__0)];date_str=date_list[__join]("-")}if(time_idx===__0){return date_str}time_ms=__Num(date_obj.getHours())*configMap._hrs_ms_+__Num(date_obj.getMinutes())*configMap._min_ms_+__Num(date_obj.getSeconds())*configMap._sec_ms_;time_str=makeClockStr(time_ms,time_idx);return time_str?date_str+__space+time_str:date_str}function makeDebounceFn(arg_map){var map=castMap(arg_map,{}),fn=castFn(map._fn_),delay_ms=castInt(map._delay_ms_,__0),do_asap=castBool(map._do_asap_,__false),ctx_data=map._ctx_data_,delay_toid;if(!fn){logFn("_error_","_debounce_bad_argument_",fn);return __undef}return function(){var arg_list=makeArgList(arguments);if(do_asap&&!delay_toid){fn[__apply](ctx_data,arg_list)}clearToFn(delay_toid);delay_toid=setToFn(function(){if(!do_asap){fn[__apply](ctx_data,arg_list)}delay_toid=__undef},delay_ms)}}function makeThrottleFn(arg_map){var map=castMap(arg_map,{}),fn=castFn(map._fn_),delay_ms=castInt(map._delay_ms_,__0),ctx_data=map._ctx_data_,last_ms=__0,delay_toid;if(!(fn&&delay_ms)){return}function throttleFn(){var arg_list=makeArgList(arguments),now_ms=getNowMs(),delta_ms=delay_ms-(now_ms-last_ms);if(delta_ms<=__0){if(delay_toid){clearToFn(delay_toid)}delay_toid=__undef;last_ms=now_ms;return fn[__apply](ctx_data,arg_list)}if(delay_toid){return}delay_toid=setToFn(function(){fn[__apply](ctx_data,arg_list);delay_toid=__undef;last_ms=now_ms},delta_ms)}return throttleFn}function makeEllipsisStr(arg_map){var map=castMap(arg_map,{}),scrub_str=makeScrubStr(map._input_str_,__false),limit_int=castInt(map._char_limit_int_,__0),do_word_break=castBool(map._do_word_break_,__true),scrub_count=scrub_str[__length],word_list,word_count,solve_count,solve_list,idx,solve_word;if(!(limit_int&&limit_int>__3)){return __blank}if(scrub_count<=limit_int){return scrub_str}if(do_word_break){word_list=scrub_str[__split](__space);word_count=word_list[__length];solve_count=__0;solve_list=[];_WORD_:for(idx=__0;idx<word_count;idx++){solve_word=word_list[idx];solve_count+=solve_word[__length]+__1;if(solve_count>=limit_int-__3){solve_list[__push]("...");break _WORD_}solve_list[__push](solve_word)}return __blank+solve_list[__join](__space)}return scrub_str[__substr](__0,limit_int-__3)+"..."}function makeErrorObj(arg_name,arg_msg){var error_obj=new Error;error_obj.name=arg_name&&__Str(arg_name)||"error";error_obj.message=arg_msg&&__Str(arg_msg)||__blank;return error_obj}function makeGuidStr(){function makePart(){return((__1+makeRandomNumFn())*65536|__0)[__toString](16)[__substr](__1)}return makePart()+makePart()+"-"+makePart()+"-"+makePart()+"-"+makePart()+"-"+makePart()+makePart()+makePart()}function makeMapUtilObj(){var resultMap,argList,mapFn;function getArgList(){return argList}function getMapFn(){return mapFn}function getResultMap(){return resultMap}function setArgList(arg_list){argList=castList(arg_list)}function setMapFn(map_fn){mapFn=castFn(map_fn)}function setResultMap(rmap){resultMap=castMap(rmap)}function invokeFn(field_data,idx,list){var ret_list,ret_key,ret_data;ret_list=mapFn&&mapFn(field_data,idx,list,argList);if(!ret_list){return}ret_key=ret_list[__0];ret_data=ret_list[__1];resultMap[ret_key]=ret_data}return{_getArgList_:getArgList,_getMapFn_:getMapFn,_getResultMap_:getResultMap,_invokeFn_:invokeFn,_setArgList_:setArgList,_setMapFn_:setMapFn,_setResultMap_:setResultMap}}function makeOptionHtml(arg_map){var map=castMap(arg_map,{}),enum_table=castList(map._enum_table_,[]),match_list=castList(map._match_list_,[]),enum_count=enum_table[__length],solve_html=__blank,idx,row_map,val_str,val_html,label_str,label_html;_OPTION_:for(idx=__0;idx<enum_count;idx++){row_map=enum_table[idx];val_str=castStr(row_map._value_);if(val_str===__undef){continue _OPTION_}val_html=encodeHtml(val_str);label_str=row_map._label_||makeUcFirstStr(val_str);label_html=encodeHtml(label_str);solve_html+='<option value="'+val_html+'"';if(match_list[__indexOf](val_str)>__n1){solve_html+=' selected="selected"'}solve_html+=">"+label_html+"</option>"}return solve_html}function makePctStr(arg_ratio,arg_count){var ratio=castNum(arg_ratio,__0),count=castNum(arg_count,__0);count=count<__0?__0:makeFloorNumFn(count);return(ratio*__100)[vMap._toFixed_](count)+"%"}function makeRadioHtml(arg_map){var map=castMap(arg_map,{}),enum_table=castList(map._enum_table_,[]),match_str=castStr(map._match_str_),group_name=castStr(map._group_name_),group_html=encodeHtml(group_name),enum_count=enum_table[__length],solve_html=__blank,idx,row_map,val_str,val_html,label_str,label_html;_RADIO_:for(idx=__0;idx<enum_count;idx++){row_map=castMap(enum_table[idx],{});val_str=castStr(row_map._value_);if(val_str===__undef){continue _RADIO_}val_html=encodeHtml(val_str);label_str=castStr(row_map._label_,makeUcFirstStr(val_html));label_html=encodeHtml(label_str);solve_html+="<label>"+'<input type="radio" name="'+group_html+'" value="'+val_html+'"';if(val_str===match_str){solve_html+=' checked="checked"'}solve_html+=">"+label_html+"</label>"}return solve_html}function makeReplaceFn(arg_search_str,arg_value_str){var search_str=castStr(arg_search_str,__blank),value_str=castStr(arg_value_str,__blank),escape_str=makeEscRxStr("{"+search_str+"}"),search_rx=makeRxObj(escape_str,"g");return function(arg_tmplt){var tmplt=castStr(arg_tmplt,__blank);return tmplt[__replace](search_rx,value_str)}}function makeContextObj(arg_struct){var key_list=makeKeyListFn(arg_struct),key_count=key_list[__length],solve_struct=__Array.isArray(arg_struct)?[]:{};return key_count>__0?{_source_struct_:arg_struct,_solve_struct_:solve_struct,_key_list_:key_list,_key_count_:key_count,_key_idx_:__0}:null}function makeRekeyMap(arg_struct,arg_key_map,arg_mode_str){var context_obj=makeContextObj(arg_struct),mode_str=castStr(arg_mode_str,"_rekey_",{_filter_rx_:/^(_rekey_|_reval_)$/}),stack_list=[],max_count=configMap._rekey_max_count_,key_count,key_list,key_idx,source_struct,solve_struct,key,data,replace_data,check_obj,pop_solve_struct,idx;if(!context_obj){return arg_struct}_CONTEXT_:for(idx=__0;idx<max_count;idx++){key_count=context_obj._key_count_;key_idx=context_obj._key_idx_;key_list=context_obj._key_list_;source_struct=context_obj._source_struct_;solve_struct=context_obj._solve_struct_;key=key_list[key_idx];data=source_struct[key];replace_data=arg_key_map[key];if(pop_solve_struct){data=pop_solve_struct;pop_solve_struct=null}else if(data&&typeofFn(data)===vMap._object_){check_obj=makeContextObj(data);if(check_obj){stack_list[__push](context_obj);context_obj=check_obj;continue _CONTEXT_}}if(mode_str==="_reval_"){if(!replace_data){replace_data=data}solve_struct[key]=replace_data}else{if(!replace_data){replace_data=key}solve_struct[replace_data]=data}key_idx++;context_obj._key_idx_=key_idx;if(key_idx>=key_count){if(stack_list[__length]>__0){pop_solve_struct=context_obj._solve_struct_;context_obj=stack_list[__pop]()}else{break _CONTEXT_}}if(mode_str==="_reval_"){solve_struct[key]=replace_data}else{solve_struct[replace_data]=data}}if(idx===max_count){logFn("_error_","_rekey_incomplete_max_count_exceeded_")}return context_obj._solve_struct_}function makeSeenMap(arg_key_list,arg_seen_data){var key_list=castList(arg_key_list,[]),key_count=key_list[__length],solve_data=arg_seen_data===__undef?__true:arg_seen_data,solve_map={},key,idx;for(idx=__0;idx<key_count;idx++){key=key_list[idx];solve_map[key]=solve_data}return solve_map}function makeStrFromMap(arg_map){var map=castMap(arg_map,{}),prop_map=castMap(map._prop_map_,{}),key_list=castList(map._key_list_,[]),delim_str=castStr(map._delim_str_,__space),label_delim_str=castStr(map._label_delim_str_,": "),label_map=castMap(map._label_map_,__undef),do_label=!!(label_map||map._do_label_),key_count=key_list[__length],solve_list=[],idx,prop_key,prop_str,label_str;for(idx=__0;idx<key_count;idx++){prop_key=key_list[idx];prop_str=castStr(prop_map[prop_key],__blank);if(prop_str!==__blank){if(do_label){if(label_map){label_str=castStr(label_map[prop_key],__blank);prop_str=label_str+label_delim_str+prop_str}else{prop_str=prop_key+label_delim_str+prop_str}}solve_list[__push](prop_str)}}return solve_list[__join](delim_str)+__blank}function makeSeriesMap(arg_map){var map=castMap(arg_map,{}),max_ms=castInt(map._max_ms_,__0),min_ms=castInt(map._min_ms_,__0),tgt_count=castInt(map._tgt_count_),date_obj=new __Date,span_ms,unit_ms_list,unit_count,btm_idx,top_idx,last_btm_idx,last_top_idx,btm_count,top_count,expand_ratio,jdx,idx,check_idx,check_map,check_count,mod_unit_ms,offset_ms,width_ratio,left_ratio,accum_ratio,date_ms,date_offset,solve_map,solve_ms,time_ms,solve_str,solve_time_list,solve_date_list;span_ms=max_ms-min_ms;unit_ms_list=configMap._unit_ms_list_;unit_count=unit_ms_list[__length];btm_count=tgt_count;top_count=tgt_count;_BACKOFF_:for(jdx=__0;jdx<__10;jdx++){btm_idx=__0;top_idx=unit_count-__1;last_btm_idx=__undef;last_top_idx=__undef;_INTERPOLATE_:for(idx=__0;idx<unit_count;idx++){check_idx=btm_idx+makeRoundNumFn((top_idx-btm_idx)/__2);check_map=unit_ms_list[check_idx];check_count=makeRoundNumFn(span_ms/check_map._ms_);if(top_idx-btm_idx===__1&&last_btm_idx!==__undef){if(btm_idx===last_btm_idx&&top_idx===last_top_idx){break _INTERPOLATE_}}last_btm_idx=btm_idx;last_top_idx=top_idx;if(check_count<btm_count){top_idx=check_idx;continue _INTERPOLATE_}if(check_count>top_count){btm_idx=check_idx;continue _INTERPOLATE_}solve_map={_time_idx_:check_map._time_idx_,_unit_count_:check_count,_unit_ms_:check_map._ms_,_unit_name_:check_map._str_};idx=unit_count}if(solve_map){break _BACKOFF_}expand_ratio=__1+(jdx+__1)/__10;top_count=tgt_count*expand_ratio;btm_count=tgt_count/expand_ratio}if(!solve_map){return}mod_unit_ms=min_ms%solve_map._unit_ms_;offset_ms=solve_map._unit_ms_-mod_unit_ms;left_ratio=offset_ms/span_ms;solve_map._left_ratio_=left_ratio;solve_map._unit_ratio_=solve_map._unit_ms_/span_ms;date_obj.setTime(min_ms);date_obj.setHours(__0,__0,__0);date_ms=date_obj.getTime();date_offset=min_ms-date_ms;solve_date_list=[];accum_ratio=__0;while(date_ms<max_ms){width_ratio=(configMap._day_ms_-date_offset)/span_ms;accum_ratio+=width_ratio;if(accum_ratio>=__1){width_ratio+=__1-accum_ratio}solve_date_list[__push]({_date_str_:makeDateStr({_date_ms_:date_ms,_order_str_:"_us_"}),_width_ratio_:width_ratio});date_offset=__0;date_ms+=configMap._day_ms_}solve_map._date_list_=solve_date_list;solve_time_list=[];while(left_ratio<__1){solve_ms=makeFloorNumFn(left_ratio*span_ms)+min_ms;date_obj.setTime(solve_ms);time_ms=__Num(date_obj.getHours())*configMap._hrs_ms_+__Num(date_obj.getMinutes())*configMap._min_ms_+__Num(date_obj.getSeconds())*configMap._sec_ms_;solve_str=makeClockStr(time_ms,solve_map._time_idx_);solve_time_list[__push](solve_str);left_ratio+=solve_map._unit_ratio_}solve_map._time_list_=solve_time_list;return solve_map}function makeTmpltStr(arg_map){var map=castMap(arg_map,{}),do_encode_html=castBool(map._do_encode_html_,__false),input_str=castStr(map._input_str_,__blank),lookup_map=castMap(map._lookup_map_,{}),tmplt_rx=castRx(map._tmplt_rx_,configMap._tmplt_rx_),bound_fn;function lookupFn(ignore_match_str,lookup_name){var solve_data=this,path_list=lookup_name[__split]("."),path_count=path_list[__length],idx,key_name,solve_str;for(idx=__0;idx<path_count;idx++){key_name=path_list[idx];solve_data=solve_data&&solve_data[key_name]}solve_str=castStr(solve_data,__blank);return do_encode_html?encodeHtml(solve_str):solve_str}bound_fn=lookupFn[__bind](lookup_map);return input_str[__replace](tmplt_rx,bound_fn)}function mergeMaps(arg_base_map,arg_extend_map,arg_attr_list){var base_map=castMap(arg_base_map,{}),extend_map=castMap(arg_extend_map,{}),attr_list=castList(arg_attr_list),key_list=makeKeyListFn(extend_map),key_count=key_list[__length],idx,key;_KEY_:for(idx=__0;idx<key_count;idx++){key=key_list[idx];if(attr_list&&attr_list[__indexOf](key)===__n1){logFn("_warn_","_key_not_supported_ |"+__Str(key)+"|");continue _KEY_}base_map[key]=extend_map[key]}return base_map}function pollFunction(arg_fn,arg_ms,arg_count,arg_finish_fn){var poll_fn=castFn(arg_fn),ms=castInt(arg_ms,__0),count=castInt(arg_count,__null),finish_fn=castFn(arg_finish_fn,__null),idx=__0;if(!poll_fn){return __false}function pollFn(){setToFn(function(){var do_next;if(count&&idx>=count){return finish_fn&&finish_fn()}do_next=poll_fn(idx);idx++;if(do_next!==__false){pollFn()}},ms)}pollFn();return __true}function pushUniqListVal(arg_list,data){var input_list=castList(arg_list,[]);if(input_list[__indexOf](data)===__n1){input_list[__push](data)}}function rmListVal(){var arg_list=makeArgList(arguments),item_list=castList(arg_list[__shift](),[]),item_count=item_list[__length],test_list=arg_list,test_count=test_list[__length],rm_count=__0,idx,item_data,jdx,test_data;_LIST_ITEM_:for(idx=item_count-__1;idx>__n1;idx--){item_data=item_list[idx];for(jdx=__0;jdx<test_count;jdx++){test_data=arg_list[jdx];if(item_data===test_data){item_list[vMap._splice_](idx,__1);rm_count++;idx++;continue _LIST_ITEM_}}}return rm_count}function setConfigMap(arg_map){var input_map=castMap(arg_map._input_map_),settable_map=castMap(arg_map._settable_map_),config_map=castMap(arg_map._config_map_),key_list,key_count,idx,key_name;if(!(input_map&&settable_map&&config_map)){return logFn("_error_","_bad_input_")}key_list=makeKeyListFn(input_map);key_count=key_list[__length];for(idx=__0;idx<key_count;idx++){key_name=key_list[idx];if(settable_map[__hasProp](key_name)){config_map[key_name]=input_map[key_name]}else{logFn("_warn_","_key_not_supported_",key_name)}}return config_map}function makeDeepData(arg_base_data,arg_mode_str){var base_data=castList(arg_base_data)||castMap(arg_base_data,{}),mode_str=castStr(arg_mode_str,"_list_",{_filter_rx_:/^(_list_|_map_)$/}),walk_obj=base_data,solve_data=mode_str==="_list_"?[]:{},stack_list=[],key_list=makeKeyListFn(walk_obj),key_count=key_list[__length],idx=__0,loop_key,loop_data,loop_type,ctx_key_list,stack_map;_OUTER_:while(walk_obj){while(idx<key_count){loop_key=key_list[idx];loop_data=walk_obj[loop_key];loop_type=getVarType(loop_data);if(mode_str==="_list_"){if(solve_data[__indexOf](loop_key)===__n1){solve_data[__push](loop_key)}}if(loop_type==="_Object_"||loop_type==="_Array_"){ctx_key_list=makeKeyListFn(loop_data);if(ctx_key_list[__length]>__0){stack_list[__push]({_idx_:idx,_key_count_:key_count,_key_list_:key_list,_walk_obj_:walk_obj});idx=__n1;walk_obj=loop_data;key_list=makeKeyListFn(walk_obj);key_count=key_list[__length]}}else if(mode_str==="_map_"){solve_data[loop_key]=loop_data}idx++}stack_map=stack_list[__pop]();if(!stack_map){break _OUTER_}walk_obj=stack_map._walk_obj_;key_count=stack_map._key_count_;key_list=stack_map._key_list_;idx=stack_map._idx_+__1}return solve_data}function setStructData(arg_base_struct,arg_path_list,val_data){var base_struct=arg_base_struct,path_list=castList(arg_path_list,[]),path_count=path_list[__length],last_idx=path_count-__1,walk_struct=base_struct,is_good=__true,struct_type,idx,raw_key,solve_key,raw_next_key,int_key,int_next_key;_SET_KEY_:for(idx=__0;idx<path_count;idx++){raw_key=path_list[idx];raw_next_key=path_list[idx+__1];struct_type=getVarType(walk_struct);int_key=castInt(raw_key);if(raw_key===__null){if(struct_type!=="_Array_"){is_good=__false;break _SET_KEY_}solve_key=walk_struct[__length]}else if(int_key!==__undef&&struct_type==="_Array_"){solve_key=int_key}else{solve_key=castStr(raw_key);if(!solve_key){is_good=__false;break _SET_KEY_}}if(idx===last_idx){walk_struct[solve_key]=val_data;break _SET_KEY_}if(!walk_struct[__hasProp](solve_key)){int_next_key=castInt(raw_next_key);if(raw_next_key===__null||int_next_key!==__undef){walk_struct[solve_key]=[]}else{walk_struct[solve_key]={}}}walk_struct=walk_struct[solve_key]}return is_good}function shuffleList(arg_list){var list=castList(arg_list),count,idj,last_idx,pick_idx,swap_data;if(!list){return __false}count=list[__length];for(idj=count;idj>__0;idj--){last_idx=idj-__1;pick_idx=makeFloorNumFn(makeRandomNumFn()*idj);swap_data=list[last_idx];list[last_idx]=list[pick_idx];list[pick_idx]=swap_data}return __true}function trimStrList(arg_list){var list=castList(arg_list);function mapFn(data){return getVarType(data)==="_String_"?data[vMap._trim_]():data}if(!list){return arg_list}return list[vMap._map_](mapFn)}return{_getVarType_:getVarType,_castBool_:castBool,_castFn_:castFn,_castInt_:castInt,_castJQ_:castJQ,_castList_:castList,_castMap_:castMap,_castNum_:castNum,_castObj_:castObj,_castRx_:castRx,_castStr_:castStr,_safeJsonParse_:safeJsonParse,_safeJsonStringify_:safeJsonStringify,_cloneData_:cloneData,_extendList_:extendList,_getNowMs_:getNowMs,_getNumSign_:getNumSign,_makeArgList_:makeArgList,_makePadStr_:makePadStr,_makeEscRxStr_:makeEscRxStr,_makeRxObj_:makeRxObj,_makeScrubStr_:makeScrubStr,_makeUcFirstStr_:makeUcFirstStr,_checkDateStr_:checkDateStr,_clearMap_:clearMap,_encodeHtml_:encodeHtml,_getBasename_:getBasename,_getDirname_:getDirname,_getListAttrIdx_:getListAttrIdx,_getListAttrMap_:getListAttrMap,_getListDiff_:getListDiff,_getListValCount_:getListValCount,_getLogObj_:getLogObj,_getStructData_:getStructData,_getTzCode_:getTzCode,_makeClockStr_:makeClockStr,_makeColumnList_:makeColumnList,_makeCommaNumStr_:makeCommaNumStr,_makeDateStr_:makeDateStr,_makeDebounceFn_:makeDebounceFn,_makeDeepData_:makeDeepData,_makeEllipsisStr_:makeEllipsisStr,_makeErrorObj_:makeErrorObj,_makeExtractMap_:makeExtractMap,_makeGuidStr_:makeGuidStr,_makeKeyList_:makeKeyListFn,_makeMapUtilObj_:makeMapUtilObj,_makeMetricStr_:makeMetricStr,_makeOptionHtml_:makeOptionHtml,_makePctStr_:makePctStr,_makeRadioHtml_:makeRadioHtml,_makeRekeyMap_:makeRekeyMap,_makeReplaceFn_:makeReplaceFn,_makeSeenMap_:makeSeenMap,_makeSeriesMap_:makeSeriesMap,_makeStrFromMap_:makeStrFromMap,_makeThrottleFn_:makeThrottleFn,_makeTmpltStr_:makeTmpltStr,_mergeMaps_:mergeMaps,_pollFunction_:pollFunction,_pushUniqListVal_:pushUniqListVal,_rmListVal_:rmListVal,_setConfigMap_:setConfigMap,_setStructData_:setStructData,_shuffleList_:shuffleList,_trimStrList_:trimStrList}}();try{module.exports=xuu}catch(e1){try{window.xuu=xuu}catch(e2){console.trace(e2)}}
