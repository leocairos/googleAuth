import { Request, Response } from 'express';
import { google } from 'googleapis';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_URL_REDIRECT } = process.env;

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_URL_REDIRECT
);

const googleLoginUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  scope: ['email', 'profile']
});

let auth = false;

async function getIndex(req: Request, res: Response, next: any) {
  let oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
  if (auth) {
    const getUserInfo = await oauth2.userinfo.v2.me.get();
    let userInfo = getUserInfo.data;
    res.render('index', { user: userInfo, url: 'http://localhost:8080/logout' });
  } else {
    res.render('index', { user: {}, url: googleLoginUrl });
  }
}

async function googleCallback(req: Request, res: Response, next: any) {
  const code = req.query.code as string;
  if (code) {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    //console.log('tokens', tokens)
    auth = true;
  }
  res.redirect('/');
}

async function googleLogout(req: Request, res: Response, next: any) {
  //oauth2Client.revokeCredentials().then(r => console.log('revoke ', r));
  await oauth2Client.revokeCredentials();
  auth = false;
  res.redirect('/');
}

export default { getIndex, googleCallback, googleLogout }