import { connectToDatabase } from "@/utils/db"
import Prompt from "@/models/prompt"

export const POST = async (req, res) => {
    const { userId, prompt, tag } = await req.json()

    try {
        await connectToDatabase();
        const newPrompt = new Prompt({
            creator: userId,
            tag,
            prompt
        })

        await newPrompt.save()

        return new Response(JSON.stringify(newPrompt), { status: 201 })

    } catch (error) {
        console.log(error);
        return new Response("Failure to create a new prompt", { status: 500 })
    }

}