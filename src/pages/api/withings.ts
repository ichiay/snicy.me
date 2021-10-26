import { format, toDate } from 'date-fns';
import { isArray, isString, round } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
import TwitterApi from 'twitter-api-v2';

function sendErrorResponse(res: NextApiResponse, message: string): void {
  res.status(400).send(message);
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { publish, date, weight, unit, fatmass, fatmasspercent, leanmass } =
    req.query;

  const publishToTwitter = publish === '1';

  if (isArray(date) || !isString(date)) {
    sendErrorResponse(res, `wrong date -> ${JSON.stringify(date)}`);
  }

  if (!isString(weight)) {
    sendErrorResponse(res, `wrong weight -> ${JSON.stringify(weight)}`);
  }

  const weightNum = parseFloat(weight as string);
  const dateNum = parseInt(date as string);

  const scaleDateObj = toDate(dateNum * 1000);
  const scaleDate = format(scaleDateObj, 'yyyy-MM-dd HH:mm:ss');

  const myHeight = parseFloat(process.env.HEIGHT || '176.5');
  const anchor = process.env.ANCHOR || '2021年8月';
  const anchorWeight = parseFloat(process.env.ANCHOR_WEIGHT || '74.0');
  const targetWeight = parseFloat(process.env.TARGET_WEIGHT || '64.0');

  const BMI = round(weightNum / (myHeight / 100) / (myHeight / 100), 2);
  const weightUpDown = round(weightNum - anchorWeight, 2);
  const targetTo = round(targetWeight - weightNum, 2);

  const message = `計測結果\n${scaleDate}\n\n身長: ${myHeight}cm\n体重: ${weightNum}kg\n体脂肪率: ${fatmasspercent}%\nBMI: ${BMI}\n\n${anchor}からの体重増減: ${weightUpDown}kg\n\n目標体重: ${targetWeight}kg\n目標体重まであと ${targetTo}kg\n\n🏃‍♂️💨`;

  // tweet
  if (publishToTwitter) {
    const twitterClient = new TwitterApi({
      appKey: process.env.TWITTER_APIKEY,
      appSecret: process.env.TWITTER_APISECRET,
      accessToken: process.env.TWITTER_ACCESSTOKEN,
      accessSecret: process.env.TWITTER_SECRET,
    });

    await twitterClient.v1.tweet(message);
  }

  res.statusCode = 200;
  res.json({ message });
};
