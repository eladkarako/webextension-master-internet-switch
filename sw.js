"use strict";
const api                = chrome || browser || {runtime:{lastError:true}}
     ,manifest           = api.runtime.getManifest()
     ,RULESET_ID         = manifest.declarative_net_request.rule_resources[0].id  //"block_all"
     ,description_states = {
        internet_blocked : {
          color : [255, 0, 0, 255] //red
         ,title : api.i18n.getMessage("title_internet_blocked") //✖
         ,icon  : manifest.action.default_icon
        }
       ,internet_allowed : {
          color : [255, 0, 0, 255] //green
         ,title : api.i18n.getMessage("title_internet_allowed") //✔
         ,icon  :  {"16"  : "icons/internet_allowed/16.png"
                   ,"32"  : "icons/internet_allowed/32.png"
                   ,"48"  : "icons/internet_allowed/48.png"
                   ,"128" : "icons/internet_allowed/128.png"
                   }
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
   ,api.action.setBadgeBackgroundColor({ color : description_states[is_to_internet_allowed ? "internet_allowed" : "internet_blocked"].color })
   ,api.action.setTitle({                title : description_states[is_to_internet_allowed ? "internet_allowed" : "internet_blocked"].title })
   ,api.action.setIcon({                 path  : description_states[is_to_internet_allowed ? "internet_allowed" : "internet_blocked"].icon  })
  ]);
};


const toggle_internet = async ()=>{
  const is_internet_allowed = await get_is_internet_allowed();
  return set_internet(!is_internet_allowed);
};


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
};

api.runtime.onMessage.addListener(message_handler);

