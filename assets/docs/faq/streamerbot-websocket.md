# StreamerBot Not Connecting
## Fixing the websocket connection
We've come across a lot of reasons why the websocket might not be connecting. Here are some of the most common reasons:

### - Multiple Websockets
[Previously reported here](https://discord.com/channels/956414587597631578/1118925646391947398)

If you have more than one websocket, YTCR can have trouble connecting. A way to fix this would be to edit the `"Set Channel Rewards"` action and inside the C# and adjust the `CPH.WebsocketSend` to the following:

```csharp
CPH.WebsocketSend(JsonConvert.SerializeObject(send), 1);
```
By adjusting this to the `1`, this will ensure that other websockets are not conflicting. Ajust this value to the number of websockets you have.

### Reinstalling StreamerBot
Many times, we've seen that reinstalling StreamerBot can fix this issue when we can't find another reason.

Still having problems? [Join our Discord](https://gezel.io/discord) and we'll help you out!