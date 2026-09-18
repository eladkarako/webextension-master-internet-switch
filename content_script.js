(async ()=>{"use strict";
  const api = ("undefined" !== typeof chrome ? chrome : ("undefined" !== typeof browser ? browser : {runtime:{lastError:true}}));

  const clean = ()=>{
    try{ self.stop();                       }catch(err){}
    try{ document.execCommand("Stop");      }catch(err){}
    for(name in self){
      try{ self[name] = undefined;   }catch(err){}
      try{ delete(self[name], true); }catch(err){}
    }
    try{ document.close();                  }catch(err){}
    try{ document.clear();                  }catch(err){}

    try{ document.open();                   }catch(err){}
    try{ document.write("<!DOCTYPE html>"); }catch(err){}
    try{ document.close();                  }catch(err){}

    try{ console.clear();                   }catch(err){}
  };

  const callback = (is_internet_allowed)=>{
    if("undefined" !== typeof api.runtime.lastError && null !== api.runtime.lastError){
      const error = api.runtime.lastError.message;
      throw error;
    }
    if(is_internet_allowed){return;}
    clean();
  };

  api.runtime.sendMessage(api.runtime.id, {"get_is_internet_allowed":""}, callback);
})();


void 0;