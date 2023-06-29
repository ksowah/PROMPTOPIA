"use client"

import Profile from "@/components/Profile"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"



const UserProfile = () => {

    const [posts, setPosts] = useState<any>([])
    const router = useRouter()
    const params = useSearchParams()
    const userId = params.get("id")
    const [userName, setUserName] = useState("")


    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${userId}/posts`)
          const data = await response.json()
          setPosts(data)
          setUserName(`${data[0]?.creator && `${data[0]?.creator.userName}'s`}`)
        }
    
        if (userId) fetchPosts()

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
        name={userName.length > 0 ? userName : "..."}
        desc={`Welcome to ${userName.length > 0 ? userName : "..."} personalized profile page. Here you can view all posts owned by this user.`}
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default UserProfile