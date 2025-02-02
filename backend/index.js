import express from "express"
import cors from "cors"
import axios from "axios"


const app = express()


app.use(cors())
app.use(express.json())


app.get("/" , (req,res)=>{
    res.send("lode kahin ke")
})

app.post("/api/chat", async (req, res) => {
    try {
        const { prompt } = req.body;
        console.log(prompt)
        const response = await axios.post("http://localhost:11434/api/generate", {
            model: "defi-chatbot",
            prompt: prompt,
            stream: false, // Make sure to disable streaming for a simple response
        });
        res.json({ response: response.data.response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});



app.listen(3000 , ()=>{
    console.log("server is running on port 3000")
})