exports.handler = async (event, contexts) => {
    return {
        statusCode: 200,
        body: JSON.stringify({ msg: "Hello World" }),
    };
};
