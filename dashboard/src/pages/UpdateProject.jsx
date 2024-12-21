import axios from "axios";
import { useEffect, useState } from "react"
import {Link, useParams} from 'react-router-dom'
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import { toast } from "react-toastify"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import SpecialLoadingButton from "../pages/sub-components/SpecialLoadingButton"

import { useDispatch, useSelector } from 'react-redux'

import { clearAllProjectSliceErrors, getAllProjects, resetProjectSlice } from "../store/slices/projectSlice";



const UpdateProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("")

  const {error, message, loading} = useSelector((state) => state.project)
  const dispatch = useDispatch();

  const {id} = useParams();

  const handleProjectBanner = (e) =>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>{
      setProjectBanner(file);
      setProjectBannerPreview(reader.result)
    }
  }

  useEffect(() =>{
    const getProject = async () =>{
      await axios.get(`http://localhost:4000/api/v1/project/getsingleProject/${id}`,
        {withCredentials: true}
      )
      .then((res) =>{
        console.log(res)
        setTitle(res.data.project.title);
        setDescription(res.data.project.description);
        setDeployed(res.data.project.deployed);
        setProjectLink(res.data.project.projectLink);
        setTechnologies(res.data.project.technologies);
        setGitRepoLink(res.data.project.gitRepoLink);
        setProjectBanner(res.data.project.projectBanner && res.data.project.projectBanner.url);
        setProjectBannerPreview(res.data.project.projectBanner && res.data.project.projectBanner.url);
        setStack(res.data.project.stack)
      })
      .catch((error) =>{
        toast.error(error.response.data.message);
      })
    };
    getProject();

    if(error){
      toast.error(error)
      dispatch(clearAllProjectSliceErrors())
    }
    if(message){
      toast.success(message)
      dispatch(resetProjectSlice());
      dispatch(getAllProjects())
    }

  }, [dispatch, id, loading, message, error])

  const handleUpdateProject = (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);
    formData.append("technologies", technologies);
    formData.append("stack", stack);
    formData.append("deployed", deployed);
    formData.append("projectBanner", projectBanner)
    dispatch(UpdateProject(id, formData))
  }

  return (
    <>  
      <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
        <form
          className="w-[100%] px-5 md:w-[1000px]"
          onSubmit={handleUpdateProject}
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center">
                  UPDATE PORJECT
                </h2>
                <Link to = {"/"}>
                  <Button>Return to Dashboard</Button>
                </Link>
              </div>
      
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <img src={projectBannerPreview ? projectBannerPreview : "/"} alt="projectBanner" className="w-full h-auto" />
                  <div className="relative">
                    <Input type = "file" onChange = {handleProjectBanner} className = "avatar-update-btn mt-4 w-full" /> 
                  </div>
                </div>

                <div className="w-full sm:col-span-4">
                  <Label className="block text-sm font-medium leading-6 text-gray-900">
                    Title
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Input
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Project title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full sm:col-span-4">
                  <Label className="block text-sm font-medium leading-6 text-gray-900">
                    Description
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Textarea
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Feature 1. Feature 2. Feature 3."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full sm:col-span-4">
                  <Label className="block text-sm font-medium leading-6 text-gray-900">
                    Technologies Used this project
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Textarea
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="HTML, CSS, JavaScript, ..."
                        value={technologies}
                        onChange={(e) => setTechnologies(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full sm:col-span-4">
                  <Label className="block text-sm font-medium leading-6 text-gray-900">
                    Stack
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Select value = {stack} onValueChange={(selectedValue) => setStack(selectedValue)}>
                        <SelectTrigger>
                          <SelectValue placeholder = "Select project stack" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value = "Full Stack">Full Stack</SelectItem>
                          <SelectItem value = "MERN">MERN</SelectItem>
                          <SelectItem value = "MEAN">MEAN</SelectItem>
                          <SelectItem value = "PERN">PERN</SelectItem>
                          <SelectItem value = "MEVN">MEVN</SelectItem>
                          <SelectItem value = "REACT.JS">REACT.JS</SelectItem>
                          <SelectItem value = "NEXT.JS">NEXT.JS</SelectItem>
                          <SelectItem value = "REST FULL API">REST FULL API</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="w-full sm:col-span-4">
                  <Label className="block text-sm font-medium leading-6 text-gray-900">
                    Deployed
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Select value = {deployed} onValueChange={(selectValue) => setDeployed(selectValue)}>
                        <SelectTrigger>
                          <SelectValue placeholder = "Is this project deployed?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value = "YES">YES</SelectItem>
                          <SelectItem value = "NO">NO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="w-full sm:col-span-4">
                  <Label className="block text-sm font-medium leading-6 text-gray-900">
                    Github Repository Link
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Input
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Please your github repository link here"
                        value={gitRepoLink}
                        onChange={(e) => setGitRepoLink(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full sm:col-span-4">
                  <Label className="block text-sm font-medium leading-6 text-gray-900">
                    Project Link
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Input
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Please your project link here"
                        value={projectLink}
                        onChange={(e) => setProjectLink(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
            <div className="mt-6 gap-x-6 flex justify-end items-center">
              {
                loading ? (<SpecialLoadingButton content={"Updating"} width = {"w-52"} />)
                : (<Button type = "button" onClick = { handleUpdateProject} className = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-52" >
                  Update
                </Button>)
              }
            </div>
        </form>
      </div>
    </>
  )
}

export default UpdateProject