const config = {
    db: {
        host: process.env.MONGO_HOST,
        port: process.env.MONGO_PORT,
        user: process.env.MONGO_USERNAME,
        password: process.env.MONGO_PASSWORD,
    },
};

export default config;
