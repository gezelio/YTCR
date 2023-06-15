obs = obslua
ws = nil

function script_properties()
    local props = obs.obs_properties_create()
    obs.obs_properties_add_text(props, "url", "URL", obs.OBS_TEXT_DEFAULT)
    return props
end

function script_description()
    return "Create and open a dock to the specified URL"
end

function script_update(settings)
    local url = obs.obs_data_get_string(settings, "url")

    if ws == nil then
        ws = obs.obs_frontend_get_ws()
    end

    local source = obs.obs_get_source_by_name("BrowserDock")

    if source == nil then
        source = obs.obs_source_create_private("browser_source", "BrowserDock", nil)
        obs.obs_source_set_defaults(source)
        obs.obs_source_release(source)

        local source_settings = obs.obs_source_get_settings(source)
        obs.obs_data_set_string(source_settings, "url", url)
        obs.obs_source_update(source, source_settings)
        obs.obs_data_release(source_settings)

        obs.obs_frontend_save_sources()
    end

    obs.obs_source_release(source)
end

function script_load(settings)
    obs.obs_frontend_add_event_callback(function(event)
        if event == obs.OBS_FRONTEND_EVENT_EXIT then
            if ws ~= nil then
                obs.obs_ws_dispose(ws)
                ws = nil
            end
        end
    end)
end
