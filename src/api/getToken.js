const getToken = (email) => {
  fetch(` https://sel-nft.vercel.app/jwt?email=${email}`)
    .then((res) => res.json())
    .then((tokenData) => {
      if (tokenData.accessToken) {
        return tokenData.accessToken;
      }
    });
};

export default getToken;
