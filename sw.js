"use strict";
const api                = ("undefined" !== typeof chrome ? chrome : ("undefined" !== typeof browser ? browser : {runtime:{lastError:true}}))
     ,manifest           = api.runtime.getManifest()
     ,RULESET_ID         = manifest.declarative_net_request.rule_resources[0].id  //"block_all"
     ,description_states = {
        internet_blocked : {
          icon        : manifest.action.default_icon
         ,title       : api.i18n.getMessage("title_internet_blocked")
       //,badge_color : api.i18n.getMessage("badge_color_internet_blocked") //red
       //,badge_text  : api.i18n.getMessage("badge_text_internet_blocked")  //✖
        }
       ,internet_allowed : {
          icon        :  {"16"  : "icons/internet_allowed/16.png"
                         ,"32"  : "icons/internet_allowed/32.png"
                         ,"48"  : "icons/internet_allowed/48.png"
                         ,"128" : "icons/internet_allowed/128.png"
                         }
         ,title       : api.i18n.getMessage("title_internet_allowed")
       //,badge_color : api.i18n.getMessage("badge_color_internet_allowed") //green
       //,badge_text  : api.i18n.getMessage("badge_text_internet_allowed")  //✔
        }
     }
    ;


const get_is_internet_allowed = async ()=>{
  let enabled_rulesets = [];

  try{
    enabled_rulesets = await api.declarativeNetRequest.getEnabledRulesets();
  }catch(err){}

  const is_ruleset_enabled = enabled_rulesets.indexOf(RULESET_ID) >= 0;
  const is_internet_allowed = !is_ruleset_enabled;

  return is_internet_allowed;
};


const set_internet = async (is_to_internet_allowed)=>{
  const options    = {disableRulesetIds:[], enableRulesetIds:[]};

  options[ is_to_internet_allowed ? "disableRulesetIds" : "enableRulesetIds" ].push(RULESET_ID);

  return Promise.all([
    api.declarativeNetRequest.updateEnabledRulesets(options)
   ,api.action.setIcon({                 path  : description_states[is_to_internet_allowed ? "internet_allowed" : "internet_blocked"].icon        })
   ,api.action.setTitle({                title : description_states[is_to_internet_allowed ? "internet_allowed" : "internet_blocked"].title       })
 //,api.action.setBadgeBackgroundColor({ color : description_states[is_to_internet_allowed ? "internet_allowed" : "internet_blocked"].badge_color })
 //,api.action.setBadgeText({            text  : description_states[is_to_internet_allowed ? "internet_allowed" : "internet_blocked"].badge_text  })
  ]);
};


const toggle_internet = async ()=>{
  const is_internet_allowed = await get_is_internet_allowed();
  return set_internet(!is_internet_allowed);
};


const startup_handler = async ()=>{
  if("undefined" !== typeof api.runtime.lastError && null !== api.runtime.lastError){
    const error = api.runtime.lastError.message;
    throw error;
  }

  const is_to_internet_allowed = false;
  return set_internet(is_to_internet_allowed);
};

api.runtime.onStartup.addListener(startup_handler);
api.runtime.onInstalled.addListener(startup_handler);


const click_handler = async ()=>{
  if("undefined" !== typeof api.runtime.lastError && null !== api.runtime.lastError){
    const error = api.runtime.lastError.message;
    throw error;
  }

  return toggle_internet();
};

api.action.onClicked.addListener(click_handler);


const message_handler = async (message, sender, send_response)=>{
  if("undefined" !== typeof api.runtime.lastError && null !== api.runtime.lastError){
    const error = api.runtime.lastError.message;
    throw error;
  }

  if(api.runtime.id !== sender.id
  && !message.get_is_internet_allowed){
    return;
  }

  const is_internet_allowed = await get_is_internet_allowed();
  send_response(is_internet_allowed);

  return true;
};

api.runtime.onMessage.addListener(message_handler);

