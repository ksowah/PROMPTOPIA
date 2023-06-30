import Feed from "@/components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col " >
      <h1 className="head_text text-center " >
        Discover & Share

        <br className="max-md:hidden"/>

        <span className="orange_gradient text-center" >User-Powered Prompts</span>
      </h1>

      <p className="desc text-center" >
          Promptopia enables users to create and publish tech-related prompts for others to read and engage with. Users can express their creativity by crafting prompts covering various technology topics.
      </p>

      {/* FEED */}
      <Feed />
    </section>
  )
}

export default Home