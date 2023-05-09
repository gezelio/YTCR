using System;
using Newtonsoft.Json.Linq;

public class CPHInline
{
    public bool Execute()
    {
        string Channel_id = "CHANGE ME TO YOUR CHANNEL ID";
        string jsonFilePath = @"data/settings.json";
        JObject data = JObject.Parse(System.IO.File.ReadAllText(jsonFilePath));
        JObject test = data;
        CPH.LogInfo(test["channelPoints"]["rewards"].ToString());
        var send = "Channel_id:" + Channel_id + ";" + (test["channelPoints"]["rewards"].ToString());
        CPH.WebsocketSend(send);
        return true;
    }
}