import mongoose from "mongoose";


const SkillSchem = new mongoose.Schema({
    title: String,
    proficiency: Number,
    svg: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
});

export const Skill = mongoose.model("Skill", SkillSchem);

