<!-- Improved compatibility of back to top link: See: https://github.com/gezelio/ytcr/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Downloads][downloads-shield]][downloads-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/gezelio/ytcr">
    <img src="https://s6.imgcdn.dev/vj9Qa.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">YouTube Channel Rewards</h3>

  <p align="center">
    Enhance your YouTube livestreams with channel points from your Twitch profile!
    <br />
    <a href="https://ytcr.gezel.io"><strong>Go to the website »</strong></a>
    <br />
    <br />
    <a href="https://gezel.io">Gezel.io</a>
    ·
    <a href="https://github.com/gezelio/YTCR/issues/new/choose">Report Bug</a>
    ·
    <a href="https://github.com/gezelio/ytcr/issues/new/choose">Request Feature</a>
    ·
    <a href="https://github.com/orgs/gezelio/projects/5">RoadMap</a>
  </p>
</div>

#### Note to contributors:

Please ensure you are forking the `staging` branch, as this is where the most up to date code will live. The `main` branch is used for releases only.

<!-- Download -->

# [Download the latest release for StreamerBot](https://github.com/gezelio/YTCR/releases)

<!-- ABOUT THE PROJECT -->

## About The Project

YouTube Channel Rewards takes the most valuable Twitch feature and puts it on YouTube streams, and it's easy to set up! We host it, all you have to do is configure your <a href="https://streamer.bot">Streamer.Bot</a> software to connect to our websocket (which is very simple), and you're good to go!

Why we built this:

-   <a href="https://github.com/tommerty">@tommerty</a> wanted to stream on YouTube but most of his stream is channel reward orientated, and we wanted a solution
-   No one had really built a good solution yet
-   We wanted to build something for all YouTube streamers

<!-- GETTING STARTED -->

# How to set up YouTube Channel Rewards as a streamer
#### Prerequisites

-   [Streamer.Bot](https://streamer.bot) - v0.1.16 or newer
-   A YouTube channel that is connected to your Discord
-   An affitiated Twitch channel is **no longer required** to use this service

## 1. Streamerbot configuration

---

### Initial setup
1. Ensure you're logged in to your YouTube account on StreamerBot under `Platforms` 
2. Download `YTCR_{version}.gezel` from our [Releases Page](https://github.com/gezelio/YTCR/releases).
3. Launch Streamer.Bot and select `Import` and drag the file into the `Import String` box.
    - Confirm you see the following `Actions`:
        - Clipping Tool
        - Execute Channel Reward Redeem
        - Set Channel Rewards
    - Once confirmed, you can click `Import`.
4. Click the `Set Channel Rewards` action and you should see two Sub-Actions. Double click `Set global "youtube_channel_id"`.
   Where it says `CHANGEME` beside `value`, update this to your YouTube channel ID. You can get that [here](https://www.youtube.com/account_advanced) if you aren't aware of it.

---

### 2. Websocket

Inside StreamerBot, head over to:

-   Servers/Clients
    -   Websocket Clients

Right click and select ‘Add’ and insert the following:

| SECTION                        | INPUT                                        |
| ------------------------------ | -------------------------------------------- |
| Name                           | `Gezel's YTCR `                              |
| Endpoint                       | `wss://ytcr.gezel.io/ws`                     |
| Auto Connect on Startup        | ✅                                           |
| Reconnect on Disconnect        | ✅                                           |
| TLS (tick the following boxes) | ✅ `TLS 1.0`<br>✅ `TLS 1.1`<br>✅ `TLS 1.2` |
| Retry Interval                 | `5 seconds`                                  |

| Actions      |                                 |
| ------------ | ------------------------------- |
| Connected    | `Set Channel Rewards`           |
| Disconnected | `NONE`                          |
| Message      | `Execute Channel Reward Redeem` |

**Once you've completed this, press `ok`, right-click on the connection and choose `connect`!**

> **Tip:** Anytime you add/remove/modify channel rewards while connected to the WebSocket, you must go into `Servers/Clients` > `Websocket Clients` and right-click `disconnect` and then `reconnect` to pull the changes. It only pulls the reward data on load at this present time.

---

### 3. The YTCR Dashboard

Before going forward, it's good to confirm that your YouTube channel is linked to your Discord account. If you do not have a YouTube channel linked to your Discord, YTCR won't be able to find your channel as we use Discord as our sign in method. Once you've added your YouTube channel to your Discord's `Connections` (can be found in User Settings):

1.  Sign in to [https://ytcr.gezel.io](http://ytcr.gezel.io/creds/login)
2.  Authenticate with Discord
3.  Choose your YouTube channel
4. Adjust your settings to your liking

---
### 4. Setting up channel rewards

Head over to the [YTCR Dashboard](https://ytcr.gezel.io) and click on `Rewards`.
##### Fields:
| **Reward Name** | **Cost** | **Action ID** |
| --- | --- | --- |
| The name of your reward | The cost of your reward | The ID of the action you want to run. This is only required if you wish to pair it with an action you built on StreamerBot, such as controlling something on your OBS, for example |

This is the new primary way going forward with building actions, as it cuts out the requirement of needing an affiliated Twitch account in previous iterations.

---

### 5. Clipping tool
> **If you don't plan on using Clipping Tool, you can disable it in the YTCR Dashboard and ignore all of this.**

The Clipping Tool is a feature that adds a clipping feature to your stream. This utilizes the OBS `Replay Buffer` feature and would require additional setup.
We made this because YouTube's clipping feature doesn't actually create a downloadable clip to post on other social media platforms, so we hope this will be a good alternative to Twitch's clip feature.

#### How does it work?

It only allows one clip every minute. It does this by renaming the files by 'year-month-day_hour-minute' while also thanking the user who created the clip.

-   Example of a clip name: `"2022-06-24_16-04 (clipped by trent1605)"`

#### OBS settings

-   `Output` > `Replay Buffer` and select `Enable Replay Buffer`
    -   You can also change the length of your clips here. We recommend 30/60 seconds.
-   Head into `settings` - Under `General`, tick the box for `Automatically start replay buffer when streaming`\
    _This will help you ensure it's always running when streaming._
-   Inside the `Recording` tab, these are also your settings for the `Replay Buffer`
    -   Take note of the recording path and format, we'll need these for StreamerBot.

#### StreamerBot settings

-   Select the `Clipping Tool` Action and update the following; - Set global "yourReplayPath" - This is where your `recording path` was from OBS.
    -   Set global "yourOutputPath" - This is where you want the new files to go to.
    -   Set global "yourFileFormat" - This is what format you are using, such as mp4/mkv/etc
        > It's important to note that the paths are written in `C#` and may not appear as you'd expect. For example, my Replay Path on Windows is `D:\rec` but in `C#` it's `D:\\rec\\`. We haven't found a good converter for those who aren't aware, so if you get super stuck on this, please feel free to jump into our [Discord](https://gezel.io/discord) and either us or someone from the community I'm sure will be able to help!

NOTE: This is a "fork" of [HYP3RSTRIKE](https://youtube.com/hyp3rstrike)'s [Advanced OBS Clipper](https://github.com/hyp3rstrike/StreamerBot_CSharp/blob/main/AdvancedOBSClipper.cs) to function with YTCR as a separate icon within the extension. Credits go to him for giving us this idea, so I'd recommend dropping him a [sub on YouTube](https://youtube.com/hyp3rstrike) to say thank you!

---

### And that's it! You're all set up on YTCR!

---

<!-- CONTRIBUTING -->

## Feel like contributing?

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- CONTACT -->

## Contact

<a href="https://gezel.io/discord/">Reach out on Discord</a>

Project Link: [https://github.com/gezelio/ytcr](https://github.com/gezelio/ytcr)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
<!-- ## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/gezelio/ytcr.svg?style=for-the-badge
[contributors-url]: https://github.com/gezelio/ytcr/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/gezelio/ytcr.svg?style=for-the-badge
[forks-url]: https://github.com/gezelio/ytcr/network/members
[stars-shield]: https://img.shields.io/github/stars/gezelio/ytcr.svg?style=for-the-badge
[stars-url]: https://github.com/gezelio/ytcr/stargazers
[issues-shield]: https://img.shields.io/github/issues/gezelio/ytcr.svg?style=for-the-badge
[issues-url]: https://github.com/gezelio/ytcr/issues
[downloads-shield]: https://img.shields.io/github/downloads/gezelio/ytcr/latest/total.svg?style=for-the-badge
[downloads-url]: https://github.com/gezelio/ytcr/releases
[license-shield]: https://img.shields.io/github/license/gezelio/ytcr.svg?style=for-the-badge
[license-url]: https://github.com/gezelio/ytcr/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
