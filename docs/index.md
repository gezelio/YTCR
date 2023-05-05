---
layout: default
title: Home
nav_order: 1
description: "The latest changes with YTCR and the Chrome extension"
permalink: /
---

# Updates on YTCR and related releases
{: .fs-9 }

Stay up to date on YTCR and the latest versions of the StreamerBot tool, Chrome Extension, and more.
{: .fs-6 .fw-300 }

[Latest Release](https://github.com/gezelio/YTCR/releases){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[Contribute on GitHub][github]{: .btn .fs-5 .mb-4 .mb-md-0 }

---

{: .note }
> Below you will find all the latet versions of YTCR in terms of the StreamerBot extension as well as Chrome extension.

#### Thank you to the contributors of YTCR!

<ul class="list-style-none">
{% for contributor in site.github.contributors %}
  <li class="d-inline-block mr-1">
     <a href="{{ contributor.html_url }}"><img src="{{ contributor.avatar_url }}" width="32" height="32" alt="{{ contributor.login }}"></a>
  </li>
{% endfor %}
</ul>

## v2.0.0
Releasing: May 20th, 2023
{: .label .label-green }
#### Full breakdown of issues can be found on our GitHub [here](https://github.com/orgs/gezelio/projects/5/views/5).
- Extension
  - Chrome tab opens to this page on install and update
  - added the ability to not include `actions` in rewards
  - Improved stability of Chrome extension
  - Stop the homepage from loading when clicking the extension icon when not on a stream or video page
  - Improvements to the UI of the extension and buttons
- StreamerBot
  - Added a system detection feature to determine if a user is using an older version of the StreamerBot actions
- Website
  - Complete redesign and refresh of the website
- Websocket Server
  - Allow WS to work on either trailing slash or not


[github]: https://github.com/gezelio/ytcr