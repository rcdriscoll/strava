import express from 'express';
import fetch from 'node-fetch';
import 'dotenv/config';
import {saveToken, getToken} from './token.js';
import cors from 'cors';

const app = express();

const port = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.FRONTEND_URL, 
}));


app.get('/api/strava-stats', async (req, res) => {
    const accessToken = getToken();
    if (accessToken == null) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Fetch Strava athlete for athlete id
    const athleteRes = await fetch('https://www.strava.com/api/v3/athlete/', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    if (!athleteRes.ok) {
        console.error('Failed to fetch Strava athlete:', athleteRes.statusText);
        return res.status(500).json({ error: 'Failed to fetch Strava athlete' });
    }

    const athlete = await athleteRes.json();

    const athleteID = athlete.id;

    // Fetch Strava stats for athlete id
    const statsRes = await fetch(`https://www.strava.com/api/v3/athletes/${athleteID}/stats`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    if (!statsRes.ok) {
        console.error('Failed to fetch Strava stats:', statsRes.statusText);
        return res.status(500).json({ error: 'Failed to fetch Strava stats' });
    }

    const stats = await statsRes.json();

    return res.json(stats);
});

app.get('/api/token-status', (req, res) => {
    const accessToken = getToken();
    if (accessToken) {
        return res.json({ status: 'valid' });
    }
    return res.json({ status: 'invalid' });
});

app.get('/api/exchange_token', async (req, res) => {
    const code = req.query.code;
    if (!code) {
        return res.status(400).json({ error: 'Missing code parameter' });
    }

    const token = await exchangeCodeForToken(code);
    if (!token) {
        return res.status(500).json({ error: 'Failed to exchange code for token' });
    }

    saveToken(token);
    
    return res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})


async function exchangeCodeForToken(code) {
    const CLIENT_ID = process.env.STRAVA_CLIENT_ID;
    const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
    const REDIRECT_URI = process.env.STRAVA_REDIRECT_URI;

    const response = await fetch('https://www.strava.com/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: REDIRECT_URI
        })
    });
    if (!response.ok) {
        console.error('Failed to exchange code for token:', response.statusText);
        return null;
    }

    const data = await response.json();
    return data.access_token;
}