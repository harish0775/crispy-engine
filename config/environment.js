
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogstream = rfs.createStream('access.log',{
    interval : '1d',
    path : logDirectory
});


const development = {
    name : 'development',
    asset_path : './assets',
    session_cookie_key : 'blahsomething',
    db: 'node_express_development',
    smtp : {
        service : 'gmail',
        host : 'smpt.gmail.com',
        port: 587,
        secure: false,
        auth : {
            user : 'harish0775',
            pass : 'Abhi@8800web'//hidden for sometime
        }
    },
    google_client_id : "777736857759-70nufre95bc28mi8dnm5g39iaj82123n.apps.googleusercontent.com",
    google_client_secret : "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",
    google_call_back_url : "http://localhost:8000/users/auth/google/callback",
    github_cal_back_url : "http://localhost:8000/users/auth/github/callback",
    jwt_secret : 'codeial',
    morgan : {
        mode : 'dev',
        options : {stream : accessLogstream}
    }
}

const production = {
    name : 'production',
    asset_path : process.env.NODEEXPRESS_ASSET_PATH,
    session_cookie_key : process.env.NODEEXPRESS_SESSION_COOKIE_KEY,
    db: process.env.NODEEXPRESS_DB,
    smtp : {
        service : 'gmail',
        host : 'smpt.gmail.com',
        port: 587,
        secure: false,
        auth : {
            user : process.env.NODEEXPRESS_GMAIL_USERNAME,
            pass : 'Abhi@8800web'//hidden for sometime
        }
    },
    google_client_id : process.env.NODEEXPRESS_GOOGLE_CLIENT_ID,
    google_client_secret : process.env.NODEEXPRESS_GOOGLE_CLIENT_SECRET,
    google_call_back_url : "http://node-express.com/users/auth/google/callback",
    github_cal_back_url : "http://node-express.com/users/auth/github/callback",
    jwt_secret : process.env.NODEEXPRESS_JWT_SECRET,
    morgan : {
        mode : 'combined',
        options : {stream : accessLogstream}
    }
}

module.exports = eval(process.env.NODEEXPRESS_ENVIRONMENT) == undefined ? development : eval(process.env.NODEEXPRESS_ENVIRONMENT);