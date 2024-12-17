import axios from "axios";
import { useEffect, useState } from "react";

import {
  Card,
} from "@/components/ui/card"


const Skill = () => {
  const [skills, setSkills] = useState([]);
  useEffect(() =>{
    const getMySkills = async () =>{
      const { data }  = await axios.get("http://localhost:4000/api/v1/skill/getAll",
        {withCredentials: true}
      );
      setSkills(data.skills)
    }
    getMySkills()
  }, [])
  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto justify-center w-fit">
        SKILLS
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {
          skills && skills.map((element) =>{
            return (
                <Card key = {element._id} className = "h-fit p-7 flex flex-col justify-center items-center gap-3">
                  <img src={element.svg && element.svg.url} alt={element.title} className="h-12 sm:h-24 w-auto" />
                  <p className="text-muted-foreground text-center">{element.title}</p>
                </Card>
            )
          })
        }
      </div>
    </div>
  )
}

export default Skill