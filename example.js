#!/usr/bin/env node
const 
  xuu      = require( './xuu' ),
  logObj   = xuu.getLogObj(),
  logMsgFn = logObj.logMsg
  ;

//   '[_emerg_|_alert_|_crit_|_error_|_warn_|_notice_|_info_|_debug_]'
logObj.setLogLevel( '_warn_' );

function main () {
  logMsgFn( '_emerg_',  'Level 0 Emergency' );
  logMsgFn( '_alert_',  'Level 1 Alert'     );
  logMsgFn( '_crit_',   'Level 2 Critical'  );
  logMsgFn( '_error_',  'Level 3 Error'     );
  logMsgFn( '_warn_',   'Level 4 Warn'      );
  logMsgFn( '_notice_', 'Level 5 Notice'    );
  logMsgFn( '_info_',   'Level 6 Info'      );
  logMsgFn( '_debug_',  'Level 7 Debug'     );
}

main();
