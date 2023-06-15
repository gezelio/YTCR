## If you're updating from a previous version, please follow the below steps.
If you're setting up YTCR for the first time, you can ignore these and follow the main tutorial
1. Scroll down and download the latest `YTCR_v*.gezel` under "Assets"
2. Launch StreamerBot and remove the following Actions:
  - `Clipping Tool`
  - `Error Helper`
  - `Execute Channel Reward Redeem`
  - `Set Channel Rewards`
  - `YTCR Error`
3. Go to `Import` and import the latest file, giving you the newest versions
4. Click the `Set Channel Rewards` action and you should see two Sub-Actions. Double click `Set global "youtube_channel_id"`.
   Where it says `CHANGEME` beside `value`, update this to your YouTube channel ID. You can get that [here](https://www.youtube.com/account_advanced) if you aren't aware of it.
5. Head over to the Websocket and ensure the following settings:

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

6. Restart StreamerBot
7. Enjoy! 🎉