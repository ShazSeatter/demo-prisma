import Hapi from '@hapi/hapi';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    //  CREATE
        server.route({
        method: 'POST',
        path: '/create-user',
        handler: async (_request, h) => { 
            const users = await prisma.user.create({
            data: {
                name: "Richard",
                email: 'richard@example.com',
                role: 'ADMIN',
                age: 35
            }
            });

            return users
        }
    });


    // Foreign Key example
        server.route({
        method: 'POST',
        path: '/create-review',
        handler: async (_request, h) => { 
            const review_users = await prisma.jobPerformance.create({
            data: {
                review: "some text review here",
                userId: 1,
            }
            });

            return review_users
        }
    });

    // READ
    // unique, contains
    //  server.route({
    //     method: 'GET',
    //     path: '/users',
    //     handler: async (_request, h) => { 
    //         const users = await prisma.user.findUniqueOrThrow({
    //         where: { email: "Shaz@example.com"}
    //         });

    //         return users
    //     }
    // });

    // Slightly more complex query
    //     server.route({
    //     method: 'GET',
    //     path: '/users',
    //     handler: async (_request, h) => { 
    //         const users = await prisma.user.findMany({
    //         where: { role: "VIEWER", age: {
    //             lte: 30
    //         }}
    //     });

    //     return users;
    //     }
    // });

    // include - foreign key association
    //     server.route({
    //     method: 'GET',
    //     path: '/users',
    //     handler: async (_request, h) => { 
    //         const users = await prisma.user.findMany({
    //         where: { role: "VIEWER", age: {
    //             lte: 30,
    //         }},
    //         include: {
    //             jobPerformance: true
    //         }
    //     });

    //     return users;
    //     }
    // });

    // OR query
    // server.route({
    //     method: 'GET',
    //     path: '/users',
    //     handler: async (_request, h) => { 
    //         const users = await prisma.user.findMany({
    //         where: { 
    //             OR: [
    //                 {
    //                     role: 'EDITOR'
    //                 }, {
    //                     age: { lte: 30}
    //                 }
    //             ]
    //         }
    //     });

    //     return users;
    //     }
    // });

    // Negation
    //     server.route({
    //     method: 'GET',
    //     path: '/users',
    //     handler: async (_request, h) => { 
    //         const users = await prisma.user.findMany({
    //         where: { 
    //            role: { not: 'ADMIN'}
    //         }
    //     });

    //     return users;
    //     }
    // });

    // Query where fields match certain values
        server.route({
        method: 'GET',
        path: '/users',
        handler: async (_request, h) => { 
            const users = await prisma.user.findMany({
            where: { 
               role: { in: ["ADMIN", 'EDITOR', "OWNER"] },
               age: { in: [20, 25, 30]}
            }
        });

        return users;
        }
    });

    // PUT - UPDATE 
    // can only detect users by their unique fields
        server.route({
        method: 'PUT',
        path: '/update-user',
        handler: async (_request, h) => { 
            const updatedUsers = await prisma.user.update({
                where: {
                    id: 19
                },
                data: {
                    age: 35, 
                    role: "ADMIN"
                }
        });

        return updatedUsers;
        }
    });

    
    // DEL - DELETE 
    // can only detect users by their unique fields
    // Realworld - delete based on expiry dates, 
    // delete Many - pass in a condition 
        server.route({
        method: 'DELETE',
        path: '/delete-user',
        handler: async (_request, h) => { 
            const deletedUser = await prisma.user.delete({
                where: {
                    id: 19
                },
        });

        return deletedUser;
        }
    });

        // server.route({
        // method: 'DELETE',
        // path: '/delete-performance',
        // handler: async (_request, h) => { 
        //     const deletedUser = await prisma.jobPerformance.delete({
        //         where: {
        //             userId: 1, 
        //             id: 3
        //         },
        // });

        // return deletedUser;
        // }
    // });

    // doesn't have to be unique field
    // returns a count 
        server.route({
        method: 'DELETE',
        path: '/delete-users',
        handler: async (_request, h) => { 
            const deletedUser = await prisma.user.deleteMany({
                where: {
                    age: {gt: 40}
                },
        });

        return deletedUser;
        }
    });



    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();