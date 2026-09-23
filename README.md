<h3><img width="48" src="icons/internet_blocked/48.png" /> master-internet-switch</h3>

A tiny browser extension that acts like a firewall.

By default, internet access is blocked when the browser starts. To enable internet access, click the extension button in the toolbar.

<img src="screenshot1.png" />

Tabs will not load, and background requests will not be allowed to execute until you enable internet access.

This also applies when the browser restores tabs after a crash, restores a previous session, or reopens a closed window. All tabs will be restored with their URLs, but they will not load until you click the extension button to allow internet access and manually refresh the tab or tabs.

This may also significantly reduce CPU and RAM usage when starting the browser with many tabs open.

<hr />

The extension is built around <code>declarativeNetRequest</code>: a privacy-respecting, non-invasive, stateless ruleset with minimal overhead. The ruleset can be enabled or disabled. When it is enabled, internet access is blocked.

Recent versions of Firefox support blocking the following resource types:

<code>beacon, csp_report, font, image, imageset, json, main_frame, media, object_subrequest, object, other, ping, script, stylesheet, sub_frame, web_manifest, websocket, xml_dtd, xmlhttprequest, xslt</code>

Edge and Chromium-based browsers support the following resource types:

<code>csp_report, font, image, main_frame, media, object, other, ping, script, stylesheet, sub_frame, webbundle, websocket, webtransport, xmlhttprequest</code>

Please note that the extension starts as early as possible, but requests initiated by the browser itself—especially during the earliest stages of startup—may still slip through. If you require stronger privacy protection, configure a proxy, even a local one. Start the browser while the proxy is stopped, then start the proxy afterward. Alternatively, use a solution such as Tor.

<strong>Note:</strong>

This extension previously used client-side JavaScript with the <code>&lt;all_urls&gt;</code> host permission. That script stopped document loading and cleared any existing cached DOM content.

It was removed after I discovered that it was not necessary in Chromium-based browsers. The browser itself displays the message “This website was blocked by a browser extension” on a custom error page. Technically, this is a browser page—similar to <code>chrome://</code> or <code>edge://</code> pages—where extension JavaScript cannot run anyway.

The extension is now extremely fast and requires no host permissions—not even <code>activeTab</code>. Everything is handled by the browser through the global enabled/disabled state of the ruleset.

<hr />

Firefox and Chromium-based browsers have slight differences that require separate ruleset and manifest JSON files. These files must be copied and renamed during the build process. No code modifications are required.

<strong>Automated build</strong>

From the repository directory, run <code>zip.cmd</code>. The script assumes that <code>7z.exe</code> is available in the system <code>PATH</code>.

It will create:

<ul>
  <li><code>chrome.zip</code></li>
  <li><code>firefox.zip</code></li>
  <li>The uncompressed build directories <code>./chrome/</code> and <code>./firefox/</code></li>
</ul>

<strong>Manual build</strong>

<ol>
  <li>Create the <code>chrome</code> and <code>firefox</code> directories.</li>
  <li>Copy <code>block_all.chrome.json</code> to <code>chrome/</code> and rename it to <code>block_all.json</code>.</li>
  <li>Copy <code>block_all.firefox.json</code> to <code>firefox/</code> and rename it to <code>block_all.json</code>.</li>
  <li>Copy <code>manifest.chrome.json</code> to <code>chrome/</code> and rename it to <code>manifest.json</code>.</li>
  <li>Copy <code>manifest.firefox.json</code> to <code>firefox/</code> and rename it to <code>manifest.json</code>.</li>
  <li>Copy <code>_locales</code>, <code>icons</code>, and <code>sw.js</code> to both directories without modification.</li>
  <li>Optionally copy <code>LICENSE</code>, <code>version.txt</code>, and <code>changelog.txt</code> to both directories.</li>
  <li>For distribution, create a ZIP archive containing the contents of each directory. The archive root must contain <code>manifest.json</code>; it must not contain a top-level <code>chrome/</code> or <code>firefox/</code> directory.</li>
</ol>

<hr />

<ul>
  <li>Zero configuration.</li>
  <li>Requests are not modified in any way.</li>
  <li>No data collection—not even analytics.</li>
  <li>No advertisements.</li>
  <li>Open source and licensed under the MIT License.</li>
</ul>

Feel free to open an issue or ask a question.

<a href="https://paypal.me/31adkarak0" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/Sponsor-Donate-blue?logo=paypal&style=flat" alt="Donate via PayPal">
  <br />
  <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" alt="PayPal Donation">
</a>

<hr />
<br />
