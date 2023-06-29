import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema ({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [true, 'Please enter a prompt'],
    },
    tag: {
        type: String,
        required: [true, 'Please enter a tag'],
    }
})

export default models.Prompt || model('Prompt', PromptSchema);