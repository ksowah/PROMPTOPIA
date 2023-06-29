"use client"

import Profile from "@/components/Profile"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"



const MyProfile = () => {

    const { data: session }: any = useSession()
    const [posts, setPosts] = useState([])
    const router = useRouter()

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${session?.user?.id}/posts`)
          const data = await response.json()
          setPosts(data)
        }
    
        if (session?.user?.id) fetchPosts()
      }, [])

    const handleEdit = (post:any) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post:any) => {
      const hasConfirmed= confirm("Are you sure you want to delete this prompt?")

      if(hasConfirmed) {
        try {
          await fetch(`/api/prompt/${post._id.toString()}`, {
            method: "DELETE",
          })

          const filteredPosts = posts.filter((p:any) => p._id !== post._id)
          setPosts(filteredPosts)

        } catch (error) {
          console.log("error",error);
        }
      }

    }

  return (
   
    <Profile  
        name="My"
        desc="Welcome to your personalized profile page. Here you can view your posts, edit your profile, and more!"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile