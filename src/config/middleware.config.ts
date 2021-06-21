export default (): Record<string, any> => ({
    middleware: {
        rateLimit: {
            resetTime: 1 * 60 * 1000, // 1 minutes
            maxRequestPerIp: 10 // limit each IP to 100 requests per windowMs
        }
    }
});
