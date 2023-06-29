import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
    if (isConnected) {
        console.log('=> using existing database connection');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI || '', {
            dbName: "share_prompts",
        });

        isConnected = true;
        console.log('=> using new database connection');
    } catch (error) {
        console.log(error);
    }
}
