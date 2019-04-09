let redisConfig;

if (process.env.NODE_ENV === 'development') {
  redisConfig = {}
}

export default redisConfig;