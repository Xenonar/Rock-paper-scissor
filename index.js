const Choices = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  }
];

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
async function handleRequest(request) {
  const {searchParams} = new URL(request.url);
  const requestChoice = searchParams.get('choice');
  const userChoice = Choices.find((choice)=> choice.name === requestChoice);

  return new Response(JSON.stringify(getResult([userChoice, getRandom()])), {
    headers: { 'content-type': 'application/json' },
  })
}

//Random AI
function getRandom() {
  const random = Math.floor(Math.random() * Choices.length);
  return Choices[random];
}

//Check result
function getResult(choices){
  const userWins = isWinner(choices);
  const aiWins = isWinner([...choices].reverse());
  const res = userWins ? "You Win" : aiWins ? "You Lose" : "Draw";

  const result = {
    user: choices[0],
    ai: choices[1],
    result: res,
  }
  return result;
}
function isWinner(choices) {
  return choices[0].beats === choices[1].name;
}