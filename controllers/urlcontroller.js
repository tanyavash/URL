const URL = require('../models/urlmodel');

async function GenerateNewShortURL(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({ error: 'URL needed' });

    const { nanoid } = await import('nanoid');
    const shortId = nanoid(8);

    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    });
    
    return res.json({ id: shortId });
}

async function Getclicks(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({ totalclicks: result.visitHistory.length, clicks: result.visitHistory });
}

module.exports = {
    GenerateNewShortURL,
    Getclicks,
};
