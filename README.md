<h3><img width="48" src="icons/internet_blocked/48.png" /> master-internet-switch</h3>

a tiny web-extension that tries to act as a firewall,  
by default internet is blocked when the browser starts-up.  
you have to click the web-extension button on the toolbar, to enable it.  

<img src="screenshot1.png" />

it won't tabs load, nor to background request to execute until you are ready.  
this includes when the browser restores from a crash or restoring previous session,  
or undo a window with tabs.  
all the tabs would be opened ..URL and all,  
but won't load until you click to allow it, and manually refresh the tab(s).  

it may also saves up some 100% CPU and RAM when starting up the browser with a lot of tabs.

<hr/>

built around `declarativeNetRequest` a private respecting,  
non-invasive, unaware, no bottleneck, static ruleset. that is toggled enabled/disabled  
(when the ruleset is enabled the internet is disabled).

recent Firefox would support blocking up those resource types: `beacon, csp_report, font, image, imageset, json, main_frame, media, object_subrequest, object, other, ping, script, stylesheet, sub_frame, web_manifest, websocket, xml_dtd, xmlhttprequest, xslt`,  
while edge and chromium based browsers would support those resource types: `csp_report, font, image, main_frame, media, object, other, ping, script, stylesheet, sub_frame, webbundle, websocket, webtransport, xmlhttprequest`.  

note that the web-extension "raise up" as soon as possible, still, requests initiated by the browser itself especially at very early startup, would probably slip through. if you want privacy, set a proxy (even local one), without starting it then launce the browser, after that launch the proxy, or use something like tor.

note:  
this web-extension used to also run a client-side javascript, with host permission `<all_urls>`,  
it stopped the document loading, and cleared up any existing (cached) DOM items. I've removed it,  
once I've noticed it isn't really needed in chromium based browsers, as the browser itself shows  
"this website was blocked by a web-extension" (custom error page), which technically is a "chrome page"  
(similar to `chrome://` or `edge://` pages) in which the javascript wouldn't be able to run anyway.  
now this web-extension is super fast, without any host permissions (not even `activeTab`!),  
and all is handled by the browser, and the ruleset global state enabled/disabled.

<hr/>

firefox and chrome have slight difference which needs to keep two sets of ruleset and manifest json files. those need to be copied and renamed. there is no code modification.

build - automate.  
from the repository you need to run `zip.cmd` which assumes `7z.exe` exists in the system's `PATH`.  
it will create a `chrome.zip` and `firefox.zip` as well as keep their pre-zip folders `./firefox/` and `./chrome/` .  

build - manual.  
1. create folders `chrome` and `firefox` .
2. copy `block_all.chrome.json` to `chrome` and rename it `block_all.json` .
3. copy `block_all.firefox.json` to `firefox` and rename it `block_all.json` .
4. copy `manifest.chrome.json` to `chrome` and rename it `manifest.json` .
5. copy `manifest.firefox.json` to `firefox` and rename it `manifest.json` .
6. copy `_locales`, `icons`, and `sw.js` to both `chrome` and `firefox` as is.
7. optionally copy `LICENSE`, `version.txt`, `changelog.txt` to `chrome` and `firefox`.

to distribute the zip, zip up the content of each folder so in the root will be `manifest.json` (and not `/chrome/manifest.json`).

copy 

<hr/>

- zero configuration.
- requests are not modified in any way.
- no data collection. not even analytics.
- no ads.
- open source. MIT.


feel free to open a bug, or ask a question.  


<a href="https://paypal.me/31adkarak0" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Sponsor-Donate-blue?logo=paypal&style=flat" alt="PayPal Donation"><br/><img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" alt="PayPal Donation"></a>

<hr/>
<br/> 

