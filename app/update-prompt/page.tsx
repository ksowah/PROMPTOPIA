"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Form from "@/components/Form"


const EditPrompt = () => {

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    })
    const router = useRouter()
    const params = useSearchParams()
    const promptId = params.get("id")


    useEffect(() => {
     const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${promptId}`)
        const data = await response.json()
        setPost({
            prompt: data.prompt,
            tag: data.tag,
        })
     }

     if(promptId) getPromptDetails()
    }, [promptId])
    

    const updatePrompt = async (e: any) => {
        e.preventDefault()

        setSubmitting(true)
        
        if(!promptId) return alert("Prompt ID not found")

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            })

            if(response.ok) {
                router.push("/")
            }
        } catch (error) {
            console.log("error",error);
        } finally {
            setSubmitting(false)
        }
    }
    

  return (
   <Form 
    type="Edit"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={updatePrompt}
   />
  )
} 

export default EditPrompt