import {faker} from '@faker-js/faker';
import prisma from "./prismaClient/prismaClient";

async function main() {
    console.log('Начинаем заполнение базы данных случайными данными...');

    const numberOfRecords = 50;

    for (let i = 0; i < numberOfRecords; i++) {
        const name = faker.person.fullName();
        const age = faker.number.int({min: 18, max: 80});
        const email = faker.internet.email();

        await prisma.customerData.create({
            data: {
                name,
                age,
                email,
            },
        });
    }

    console.log(`Успешно добавлено ${numberOfRecords} записей в базу данных!`);
}

main()
    .catch((e) => {
        console.error('Ошибка при заполнении базы данных:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
