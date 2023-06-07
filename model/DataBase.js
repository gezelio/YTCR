const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();
const conn = mongoose.createConnection(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// const conn = mongoose.createConnection(`mongodb://ytcr_mongo:27017/yt_extension`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
const yt_extensionSchema = mongoose.Schema({
    channel_link: {
        type: String,
        required: false,
        default: "default"
    },
    account: {
        type: {
            type: String,
            default: "user"
        },
        badges: {
            type: Array,
            default: []
        },
        role: {
            type: String,
            default: "none"
        }
    },
    ban: {
        banned: {
            type: String,
            default: "false"
        },
        reason: {
            type: String,
            default: ""
        },
        timestamp: {
            type: String,
            default: ""
        }
    },
    discord: {
        id: {
            type: String
        },
        access_token: {
            type: String
        },
        username: {
            type: String
        },
        discriminator: {
            type: String
        },
        avatar: {
            type: String
        },
        email: {
            type: String
        },
        connections: {
            type: Array
        }
    },
    channel_id: {
        type: String,
        unique: false,
        required: false
    },
    mystlink: {
        type: String,
        default: undefined
    },
    setup: {
        initial_setup: {
            type: Boolean,
            default: true
        },
        discord_setup: {
            type: Boolean,
            default: true
        }
    },
    users: {
        type: Array,
        required: false
    },
    rewards: {
        type: Object,
        required: false,
        default: []
    },
    user_rewards: {
        type: Object,
        required: false,
        default: []
    },
    channel_options: {
        channel_amount: {
            type: String,
            default: 100
        }
    },
    user: {
        id: {
            type: String,
            unique: true
        },
        discord_user_id: {
            type: String,
            unique: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true
        },
        profile_pic: {
            type: String,
            required: true,
            default: "https://p.kindpng.com/picc/s/451-4517876_default-profile-hd-png-download.png"
        }
    },
    verified: {
        type: Boolean,
        default: true
    },
    last_login: {
        type: String,
        default: ""
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    ext: {
        user_input: {
            type: Boolean,
            default: false
        },
        clip_button: {
            type: Boolean,
            default: false
        }
    }
});

yt_extensionSchema.pre("save", function (next) {
    next();
});
const yt_extensionModel = conn.model("users", yt_extensionSchema);

module.exports = yt_extensionModel;
