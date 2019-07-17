const cosmosdb = require("./cosmosdb");
const http = require('http')
const port = 3000

const requestHandler = async (request, response) => {
    console.log(request.url)
    let results = {};
    switch(request.url)
    {
        case "/":
            results = await getAll();
            break;
        case "/one":
            results = {test: "working"};
            break;
    }
    response.write(JSON.stringify(results));
    response.end()
    // this is the thing that happens when we go to our site
}

const getAll = async () => {
    const query = {
        query: "SELECT r.match FROM root AS r WHERE r.match.map.name=@mapname",
        parameters: [
            {
                name: "@mapname",
                value: "Morpheus"
            }
        ]
    };
    const results = await cosmosdb.queryItems(query);
    return results;
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

cosmosdb.init()
.catch((err) => {
    console.log("Init failed!", err);
    // close everything somehow
});


// const go = async () => {
//     await cosmosdb.init();
//     const query = {
//         query: "SELECT r.match FROM root AS r WHERE r.match.map.name=@mapname",
//         parameters: [
//             {
//                 name: "@mapname",
//                 value: "Morpheus"
//             }
//         ]
//     };
//     const results = await cosmosdb.queryItems(query);
//     console.log(results);
// }

// go();