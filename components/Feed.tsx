"use client"
import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"




const PromptCardList = ({data, handleTagClick}: any) => {
  return (
    <div className="mt-16 prompt_layout" >
        {
          data.map((prompt: any) => (
            <PromptCard
              key={prompt._id}
              post={prompt}
              handleTagClick={() => handleTagClick(prompt.tag)}
            />
          ))
        }
    </div>
  )
}





const Feed = () => {
  
  const [searchText, setSearchText] = useState("")
  const [posts, setPosts] = useState([])
  const [postsCopy, setPostsCopy] = useState([])


  console.log("posts",posts)

  const handleSearchChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase(); // Convert the search term to lowercase
   
    setSearchText(searchTerm);
  
    if(searchTerm.length >= 3) {
    
      setPosts(
        posts.filter((post: any) => {
          const userName = post.creator.userName.toLowerCase();
          const promptValue = post.prompt.toLowerCase();
    
          return userName.includes(searchTerm) || promptValue.includes(searchTerm);
        })
      );
    } 
  };

  const handleTagClick = (tag:string) => {
    setSearchText(tag)
    setPosts(posts.filter((post: any) => post.tag === tag))
  }

  const endSearch = () => {
    setSearchText("")
    setPosts(postsCopy)
  }

  useEffect(() => {
   if(searchText.length === 0 && postsCopy > posts) endSearch()
  }, [searchText])
  

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt")
      const data = await response.json()
      setPosts(data)
      setPostsCopy(data)
    }

    fetchPosts()
  }, [])


  return (
    <section className="feed" >
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="search for a tag or username"
          value={searchText}
          onChange={handleSearchChanges}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
      />
      
    </section>
  )
}

export default Feed