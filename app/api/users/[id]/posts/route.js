import { connectToDatabase } from "@/utils/db"
import Prompt from "@/models/prompt"

export const GET = async (req, { params }) => {
    try {
        await connectToDatabase();

        const prompts = await Prompt.find({
            creator: params.id
        }).populate("creator");

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failure to get prompts", { status: 500 })
    }
}