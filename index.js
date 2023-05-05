const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
const app = express();
const port = 5000;

app.get('/access-token/:channelName/:role', (req, res) => {
  const appID = '7c7a727006224c1ca74bd5539b45c298';
  const appCertificate = '76efe86c8b3641f3b372016ae90761b8';
  const channelName = req.params.channelName;
  const uid = 0;
  const role = req.params.role === 'publisher' ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;

  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);

  res.json({ "token": token });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});