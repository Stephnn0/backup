import { v4 as uuidv4 } from 'uuid';

export const createTemplate2 = async({ title , html, keywords}: any) => {

    try {
        const temp =  await prisma.template2.create({
            data: {
              id: uuidv4(), // Generate UUID for the template
              title,
              html,
              keywords
            } as any,
          });
          return temp

    } catch(err){
        console.log(err, 'prisma err')
        throw new Error('Failed to create template');

    }
  }

export const getAllTemplates = async () => {
    try {
        const templates = await prisma.template2.findMany();
        return templates;
    } catch (err) {
        console.error(err, 'prisma err');
        throw new Error('Failed to fetch templates');
    } finally {
        await prisma.$disconnect(); // Ensure that the Prisma client disconnects after the operation
    }
};

export const getTemplateByTitle = async (title: string) => {
    try {
        const template = await prisma.template2.findUnique({
            where: {
                title: title
            }
        });
        return template;
    } catch (err) {
        console.error(err, 'prisma err');
        throw new Error('Failed to fetch template by title');
    } finally {
        await prisma.$disconnect(); // Ensure that the Prisma client disconnects after the operation
    }
};