import { connectToDatabase } from "@/utils/db"
import Prompt from "@/models/prompt"

// get the prompt with the given id
export const GET = async (req, { params }) => {
    try {
        await connectToDatabase();

        const prompt = await Prompt.findById(params.id).populate("creator");

        if(!prompt) return new Response("Prompt not found", { status: 404 })

        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response("Failure to get prompt", { status: 500 })
    }
}

// update the prompt with the given id
export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json()
    console.log("params",params);

    try {
       await connectToDatabase();

       const existingPrompt = await Prompt.findById(params.id);

       if(!existingPrompt) return new Response("Prompt not found", { status: 404 })

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 })

    } catch (error) {
        return new Response("Failure to update prompt", { status: 500 })
    }
}


// delete the prompt with the given id
export const DELETE = async (req, { params }) => {
    try {
        await connectToDatabase();

        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 })
    } catch (error) {
        return new Response("Failure to delete prompt", { status: 500 })
    }
}
