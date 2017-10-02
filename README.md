Lyq: Leak Your Query - version 2.0

GENERAL INFORMATION
===================
Lyq (Leak Your Query, pronounced as leak) is a micro "unintentional" blogging
tool that tweets (leaks) what you've searched automatically. It is a Google
Chrome Extension, and after you've installed Lyq, it discloses your search
query every your search at various services such as Google or Bing. Everyone
can know what information you needed, where you wanted to go, or what you
thought, that previously only your search services could know.

Do NOT use this extension unless you know what you are doing with it. You will
face serious security risks.

Supported Search Services
-------------------------
Lyq extracts a search query from the following search services:

* Google web, images, videos, news, maps (experimental)
* Bing web, images,videos, news, maps (experimental)
* YouTube
* Nico Nico Douga
* Twitter


USAGE
=====
The Lyq icon next to the address bar works as a toggle switch and you can turn
on/off Lyq by clicking it. When it is turned on, it tweets your search query.

Optionally you can add a hashtag and/or a shorten URL to the search result.
Go Options page to enable them. To open the options page, right click on
the Lyq's icon or select Extensions from Tools menu.

WARNINGS
========
Lyq may leak any hidden URLs. Some web services achieve privacy protection by
hiding URLs and it is expected that you do not disclose them (e.g. Google
Calendar and Google Maps).


INSTALL
=======
To install a pre-packaged extension, visit:
https://chrome.google.com/extensions/detail/cgiflojkgbimjdbfgfammdbiafknddem

After the first installing of Lyq, it is required to sign in Twitter to
authenticate Lyq. Please follow the instructions displayed in newly opened tab
and sign in to a Twitter account that you want to post your queries.

When it is authenticated, no more signing is needed until you sign out
explicitly (click "sign out" at the option page).

Dependency
----------
Lyq is developed for Google Chrome version 18 or later.

Git repository
--------------
https://github.com/fukuchi/lyq


TODO
====
* Other search services.
* Other URI shortener services.


ACKNOWLEDGEMENTS
================
Lyq uses the following softwares:
- jQuery
- OAuth for Javascript (by Netflix, Inc.)
- SHA1 for Javascript (by Paul Johnston)

I heavily referred the source code of Chromed Bird. Many code snippets are
taken from it.


LICENSE
=======
Lyq is released under the BSD-style license. Check the LICENSE file.


AUTHOR
======
Kentaro Fukuchi <kentaro@fukuchi.org>
Visit https://fukuchi.org/works/lyq/ for further information.
