import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {Typewriter} from 'react-simple-typewriter'
import {Link} from 'react-router-dom'
import {Button} from "@/components/ui/button"
import { ExternalLink, Youtube } from 'lucide-react';
import { Instagram } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { Github } from 'lucide-react';
import { Linkedin } from 'lucide-react';


const Hero = () => {
  const [user, setUser] = useState({});
  useEffect(() =>{
    const getMyProfile = async () =>{
      const { data } = await axios.get("http://localhost:4000/api/v1/user/getUser/portfolio",
        {withCredentials: true}
      );
      setUser(data.user);
    }
    getMyProfile();
  }, [])
  return <div className="w-full">
      <div className="flex items-center gap-4 mb-2">
        <span className="bg-green-400 rounded-full h-2 w-2"></span>
        <p>Online</p>
      </div>
      <h1 className="overflow-x-hidden text-[1.3rem] sm:text-[1.7rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-4">
        Hey, I&apos;m {user.fullName}
      </h1>
      <h1 className="text-tubeLight-effect overflow-x-hidden text-[1.3rem] sm:text-[1.7rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px]">
        <Typewriter words = {["FULL-STACK DEVELOPER", "REACT.JS DEVELOPER", "YOUTUBER", "FREELANCER"]}
          loop={50} cursor typeSpeed = {70} deleteSpeed = {70} delaySpeed = {100} />
      </h1>
      <div className="w-fit px-5 py-2 bg-slate-50 rounded-[20px] flex gap-5 items-center mt-4 md:mt-8 lg:mt-10">
        <Link to ={"/www.youtube.com/@MainuddinKhan-177"} target="_blank">
          <Youtube className = "text-red-500 w-7 h-7" />
        </Link>
        <Link to ={user.instagramURL}>
          <Instagram className = "text-pink-500 w-7 h-7" />
        </Link>
        <Link to ={user.facebookURL}>
          <Facebook className = "text-blue-800 w-7 h-7" />
        </Link>
        <Link to ={user.linkedInURL}>
          <Linkedin  className="text-sky-500 w-7 h-7" />
        </Link>
      </div>
      <div className="mt-4 md:mt-8 lg:mt-10 flex gap-3">
        <Link to={user.githubURL} target="_blank">
          <Button className = "rounded-[30px] flex items-center gap-2 flex-row">
            <span>
              <Github />
              <span>Github</span>
            </span>
          </Button>
        </Link>
        <Link to={user.resume && user.resume.url} target="_blank">
          <Button className = "rounded-[30px] flex items-center gap-2 flex-row">
            <span >
              <ExternalLink />
              <span>Resume</span>
            </span>
          </Button>
        </Link>
      </div>
      <p className="mt-8 text-xl tracking-[2px]">{user.aboutMe}</p>
      <hr className="my-8 md:my-10" />
    </div>
  
}

export default Hero