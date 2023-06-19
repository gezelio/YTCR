# StreamerBot Setup

---
**PLEASE NOTE**

Ensure you've followed the [Get Started](/beta/get-started) guide before continuing.

---

1. Remove your existing YTCR actions from StreamerBot (if you have any) and import the beta version [from here]()
2. Once imported, head over to the `Set Channel Rewards` action and double click `Set global "youtube_channel_id"`.
   Where it says `CHANGEME` beside `value`, update this to your YouTube channel ID. You can get that [here](https://www.youtube.com/account_advanced) if you aren't aware of it.
3. Head over to the Websocket and ensure the following settings:

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

4. Ensure you then connect to the websocket 
5. Head over to [YTCR](https://ytcr.gezel.io) and ensure the StreamerBot socket is connected.