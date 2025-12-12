import { PrismaClient } from "@prisma/client";

// have access to altering and executing commands to the table 
const prisma = new PrismaClient();

const seed = async () => {
   await prisma.user.createMany({
    data: [
        {name: 'Jacob', email: 'jacob@example.com', role: 'VIEWER', age: 23},
        {name: 'Edward', email: 'edward@example.com', role: "EDITOR", age: 30},
        {name: 'Carol', email: 'Carol@example.com', role: "ADMIN", age: 17},
        {name: 'Karen', email: 'Karen@example.com', role: "ADMIN", age: 35},
        {name: 'Susan', email: 'Susan@example.com', role: "ADMIN", age: 20},
        {name: 'Jane', email: 'Jane@example.com', role: "VIEWER", age: 30},
        {name: 'John', email: 'John@example.com', role: "OWNER", age: 25},
        {name: 'Jack', email: 'Jack@example.com', role: "OWNER", age: 35},
        {name: 'Shaz', email: 'Shaz@example.com', role: "EDITOR", age: 29},
        {name: 'James', email: 'James@example.com', role: "ADMIN", age: 30},
        {name: 'Paul', email: 'Paul@example.com', role: 'VIEWER', age: 34},
        {name: 'Jill', email: 'Jill@example.com', role: "OWNER", age: 40},
        {name: 'Jared', email: 'Jared@example.com', role: "EDITOR", age: 45},
        {name: 'Lisa', email: 'Lisa@example.com', role: "VIEWER", age: 50},
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