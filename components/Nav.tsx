"use client"

import Image from "next/image"
import Link from "next/link"
import { signOut, signIn, getProviders, useSession } from "next-auth/react"
import { useEffect, useState } from "react"

const Nav = () => {

    const { data: session } = useSession()

    const [ providers, setProviders ] = useState<any>(null)
    const [toggleDropDown, setToggleDropDown] = useState(false)

    useEffect(() => {
        const setProvidersList = async () => {
            const response = await getProviders()

            setProviders(response)
        }

        setProvidersList()
    }, [])

    console.log(providers)
    

  return (
    <nav className="flex-between w-full mb-16 pt-3" >
        <Link href={"/"} className="flex gap-2 flex-center" >
            <Image 
            src="/assets/images/logo.svg" alt="logo"
            width={30} height={30}
            className="object-contain"
            />
            <p className="logo_text" >Promptopia</p>
        </Link>

        {/* Desktop Navigation */}
        <div className="sm:flex hidden" >
            {
                session?.user ? (
                    <div className="flex gap-3 md:gap-5 " >
                        <Link href={"/create-prompt"} className="black_btn" >
                            Create Post
                        </Link>

                        <button type="button" onClick={() => signOut()} className="outline_btn" >
                            Sign Out
                        </button>

                        <Link href={"/profile"} >
                            <Image
                            src={session?.user.image || ""} 
                            alt="user"
                            width={37} height={37}
                            className="rounded-full"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {
                            providers &&
                            Object.values(providers).map((provider: any) => (
                                    <button key={provider.name} type="button" className="black_btn" onClick={() => signIn(provider.id)} >
                                        Sign In
                                    </button>
                            ))
                        }
                    </>
                )
            }
        </div>


        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative" >
            { session?.user ? (
                <div className="flex" >
                    <Image 
                    src={session?.user.image || ""} 
                    alt="user"
                    width={37} height={37}
                    className="rounded-full"
                    onClick={() => setToggleDropDown(prev => !prev)}
                    />

                    {
                        toggleDropDown && (
                            <div className="dropdown" >
                                <Link href={"/profile"} className="dropdown_link" onClick={() => setToggleDropDown(false)} >
                                    My Profile
                                </Link>
                                <Link href={"/create-prompt"} className="dropdown_link" onClick={() => setToggleDropDown(false)} >
                                    Create Prompt
                                </Link>
                                
                                <button type="button" onClick={() => {
                                    setToggleDropDown(false)
                                    signOut()
                                }}  
                                    className="mt-5 w-full black_btn"
                                >
                                    Sign Out
                                </button>

                            </div>
                        )
                    }
                </div>
            ) : (
                <>
                {
                    providers &&
                    
                    Object.values(providers).map((provider: any) => (
                            <button key={provider.name} type="button" className="black_btn" onClick={() => signIn(provider.id)} >
                                Sign In
                            </button>
                    ))
                }
            </>
            )}
        </div>

    </nav>
  )
}

export default Nav