import Hapi from '@hapi/hapi';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    //  server.route({
    //     method: 'GET',
    //     path: '/users',
    //     handler: async (_request, h) => { 
    //         const users = await prisma.user.findUniqueOrThrow({
    //         where: { email: "shaz"}
    //         });

    //         return users
    //     }
    // });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();