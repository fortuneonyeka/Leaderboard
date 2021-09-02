export default 'Sporty';
const gameId = '4b99cfe2-0bd3-11ec-9a03-0242ac130003';
const rootUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
const requestUrl = `${rootUrl}/games/${gameId}/scores`;

const requestHeader = {
  'Content-type': 'application/json; charset=UTF-8',
};

export const getScores = () => fetch(requestUrl, {
  method: 'GET',
})
  .then((response) => response.json())
  .then((data) => data.result.sort(
    (score1, score2) => score2.score - score1.score,
  ));

export const submitScore = async (user, score) => fetch(requestUrl, {
  method: 'POST',
  body: JSON.stringify({ user, score }),
  headers: requestHeader,
}).then((response) => response.json());