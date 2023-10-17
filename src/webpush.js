const webpush = require('web-push');

webpush.setVapidDetails('mailto:info@sunshine.uy', process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY);

module.export = webpush;