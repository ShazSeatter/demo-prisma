import { PrismaClient } from "@prisma/client";

// have access to altering and executing commands to the table 
const prisma = new PrismaClient();

const seed = async () => {
   await prisma.user.createMany({
    data: [
        {name: 'Carol', email: 'carol@example.com', role: 'OWNER'},
        {name: 'Karen', email: 'karen@example.com', role: "VIEWER"},
    ]
   })
}

// Disconnect connection between our project with prisma client 
seed().then(() => prisma.$disconnect);

// Fails to execute - @unquie values 
// {name: 'Shaz', email: 'shaz@example.com'},
// {name: 'Pam', email: 'shaz@example.com'},


// Demo

// Show creating a user, then show constraints, then when hitting endpoint, will show the created entry