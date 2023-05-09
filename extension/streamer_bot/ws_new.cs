using System;
using Newtonsoft.Json.Linq;

public class CPHInline
{
    public bool Execute()
    {
        string Channel_id = CPH.GetGlobalVar<string>("youtube_channel_id");
        CPH.LogInfo($"Channel_id: {Channel_id}");
        string jsonFilePath = @"data/settings.json";
        JObject data = JObject.Parse(System.IO.File.ReadAllText(jsonFilePath));
        JObject test = data;
        CPH.LogInfo(test["channelPoints"]["rewards"].ToString());
        var send =
            "Channel_id:" +
            Channel_id +
            ";" +
            (test["channelPoints"]["rewards"].ToString());
        CPH.WebsocketSend (send);
        return true;
    }
}
