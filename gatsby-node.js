const getForecast = require("./forecast");

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  try {
    const forecast = await getForecast(configOptions.api_key);

    return forecast.map(region =>
      actions.createNode(
        Object.assign({}, region, {
          id: createNodeId(`pollenvarsel-${region.id}`),
          parent: null,
          children: [],
          internal: {
            type: "Pollenvarsel",
            content: JSON.stringify(region),
            contentDigest: createContentDigest(region),
          },
        })
      )
    );
  } catch (error) {
    throw error;
  }
};
