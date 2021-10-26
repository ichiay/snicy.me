import { format, toDate } from 'date-fns';
import { isArray, isString, round } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
import TwitterApi from 'twitter-api-v2';

type WithingsParams = {
  publish: boolean;
  date: Date;
  weight: number;
  unit: string;
  fatmass: number;
  fatmasspercent: number;
  leanmass: number;
};

function sendErrorResponse(res: NextApiResponse, message: string): void {
  res.status(400).send(message);
}

const getHttpParams = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<WithingsParams | undefined> => {
  const method = req.method;
  switch (method) {
    case 'GET': {
      const { publish, date, weight, unit, fatmass, fatmasspercent, leanmass } =
        req.query;

      const scaleDate = toDate(parseInt(date as string) * 1000);

      return {
        publish: publish === '1',
        date: scaleDate,
        weight: parseFloat(weight as string),
        unit: 'kg',
        fatmass: parseFloat(fatmass as string),
        fatmasspercent: parseFloat(fatmasspercent as string),
        leanmass: parseFloat(leanmass as string),
      };
      break;
    }
    case 'POST': {
      const { publish, date, weight, unit, fatmass, fatmasspercent, leanmass } =
        req.body;

      const scaleDate = toDate(
        isString(date) ? parseInt(date as string) * 1000 : date * 1000,
      );

      return {
        publish: publish === '1' || publish === 1,
        date: scaleDate,
        weight: isString(weight) ? parseFloat(weight as string) : weight,
        unit: 'kg',
        fatmass: isString(fatmass) ? parseFloat(fatmass as string) : fatmass,
        fatmasspercent: isString(fatmasspercent)
          ? parseFloat(fatmasspercent as string)
          : fatmasspercent,
        leanmass: isString(leanmass)
          ? parseFloat(leanmass as string)
          : leanmass,
      };
      break;
    }
    default: {
      res.status(403).end();
    }
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { publish, date, weight, unit, fatmass, fatmasspercent, leanmass } =
    await getHttpParams(req, res);

  const scaleDate = format(date, 'yyyy-MM-dd HH:mm:ss');

  const height = parseFloat(process.env.HEIGHT || '176.5');
  const anchor = process.env.ANCHOR || '2021年8月';
  const anchorWeight = parseFloat(process.env.ANCHOR_WEIGHT || '74.0');
  const targetWeight = parseFloat(process.env.TARGET_WEIGHT || '64.0');

  const BMI = round(weight / (height / 100) / (height / 100), 2);
  const weightUpDown = round(weight - anchorWeight, 2);
  const targetTo = round(targetWeight - weight, 2);

  const message = `計測結果\n${scaleDate}\n\n身長: ${height}cm\n体重: ${weight}${unit}\n体脂肪率: ${fatmasspercent}%\nBMI: ${BMI}\n\n${anchor}からの体重増減: ${weightUpDown}${unit}\n\n目標体重: ${targetWeight}${unit}\n目標体重まであと ${targetTo}${unit}\n\n🏃‍♂️💨`;

  // tweet
  if (publish) {
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
