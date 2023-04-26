const get_ytcr_image = () => {
    return localStorage.getItem('ytcr_image');

}
const get_ytcr_viewerName = () => {
    return localStorage.getItem('ytcr_viewerName');
}
const get_ytcr_user_channel_id = () => {
    return localStorage.getItem('ytcr_user_channel_id');
}
const get_ytcr_broadcater_channel_id = () => {
    return localStorage.getItem('ytcr_broadcater_channel_id');
}
const get_ytcr_channel_points = () => {
    return localStorage.getItem('channel_points');
}
export {
    get_ytcr_image,
    get_ytcr_viewerName,
    get_ytcr_user_channel_id,
    get_ytcr_broadcater_channel_id,
    get_ytcr_channel_points
}



