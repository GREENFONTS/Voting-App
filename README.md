# Voting App

This full stack project is a voting app platform enables its 

Leveraging the art of web scrapping using [Puppetter](https://www.npmjs.com/package/puppeteer) a Nodejs npm library , the timestamp of the searched word can be extracted and using a great frontend framework [React](https://reactjs.org/) is rendered and the timestamp used to seek to the point of the seeked word or sentence.

The caveat of using puppetter is due to it creates an instance of chromium at every run job requests which reduces processing speed, consumes memeory and leads to sometimes timeout during multiple requests. With the leevrageing of job-queueing, the timeout issue is resolved but still with little delay in processing. Although, it can run faster when used with high performance dynos or processors.

Thanks to [Samson Amugo] & Cryil Chukwuebuka for their assistance during the project development phase

[![Netlify Status](https://api.netlify.com/api/v1/badges/8b060497-e65b-4310-8f72-02297434af6e/deploy-status)](https://app.netlify.com/sites/wordsea/deploys)

##TECHNOLOGIES USED
- [React](https://reactjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [React-Reveal](https://wwww.react-reveal.com/)
- [ExpressJs](https://expressjs.com/)
- [Puppeter](https://www.npmjs.com/package/puppeteer)
- [Redis](https://redis.io/)
- [Bull](https://www.npmjs.com/package/bull)
- [Netlify](https://www.netlify.com/)

Live Link(https://wordsea.netlify.app/) to the Project