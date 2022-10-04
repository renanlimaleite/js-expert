const https = require("https");

const Service = () => {
  const makeRequest = async (url) => {
    return new Promise((resolve, reject) => {
      https.get(url, (response) => {
        response.on("data", (data) => resolve(JSON.parse(data)));
        response.on("error", reject);
      });
    });
  };

  const getPlanets = async (url) => {
    const result = await makeRequest(url);
    return {
      name: result.name,
      surfaceWater: result.surface_water,
      appearedIn: result.films.length,
    };
  };

  return {
    makeRequest,
    getPlanets,
  };
};

// class Service {
//   async makeRequest(url) {
//     return new Promise((resolve, reject) => {
//       https.get(url, (response) => {
//         response.on("data", (data) => resolve(JSON.parse(data)));
//         response.on("error", reject);
//       });
//     });
//   }
//   async getPlanets(url) {
//     const result = await this.makeRequest(url);
//     return {
//       name: result.name,
//       surfaceWater: result.surface_water,
//       appearedIn: result.films.length,
//     };
//   }
// }

module.exports = Service;
