import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SpecialLoadingButton from './SpecialLoadingButton'
import { clearAllUserErrors, getUser, resetProfile, updateProfile } from '../../store/slices/userSlice'
import { toast } from 'react-toastify'

const UpdateProfile = () => {
  const {user, loading, error, isUpdated, message} = useSelector((state) => state.user);
  const [fullName, setFullName] = useState(user && user.fullName);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [aboutMe, setAboutMe] = useState(user && user.aboutMe);
  const [portfolioURL, setPortfolioURL] = useState(user && user.portfolioURL);

  const [githubURL, setGithubURL] = useState(user && (user.githubURL === "undefined" ? "" : user.githubURL));
  const [facebookURL, setFacebookURL] = useState(user && (user.facebookURL === "undefined" ? "" : user.facebookURL));
  const [linkedInURL, setLinkedInURL] = useState(user && (user.linkedInURL === "undefined" ? "" : user.linkedInURL));
  const [instagramURL, setInstagramURL] = useState(user && (user.instagramURL === "undefined" ? "" : user.instagramURL));

  const [avatar, setAvatar] = useState(user && user.avatar && user.avatar.url);
  const [avatarPreview, setAvatarPreview] = useState(user && user.avatar && user.avatar.url);
  const [resume, setResume] = useState(user && user.resume && user.resume.url);
  const [resumePreview, setResumePreview] = useState(user && user.resume && user.resume.url);

  const dispatch = useDispatch();

  const avatarHandler = (e) =>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>{
      setAvatarPreview(reader.result);
      setAvatar(file);
    }
  }

  const resumeHandler = (e) =>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>{
      setResumePreview(reader.result);
      setResume(file);
    }
  }

  const handleUpdateProfile = () =>{
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("aboutMe", aboutMe);
    formData.append("portfolioURL", portfolioURL);
    formData.append("githubURL", githubURL);
    formData.append("linkedInURL", linkedInURL);
    formData.append("instagramURL", instagramURL);
    formData.append("facebookURL", facebookURL);
    formData.append("avatar", avatar);
    formData.append("resume", resume);

    dispatch(updateProfile(formData))

  }

  useEffect(() =>{
    if(error){
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if(isUpdated){
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if(message){
      toast.success(message)
    }
  }, [dispatch, loading, error, isUpdated])

  return (
    <>
      <div className='w-full h-full'>
        <div>
          <div className='grid w-[100%] gap-6'>
            <div className='grid gap-2'>
              <h1 className='text-3xl font-bold'>UpdateProfile</h1>
              <p className='mb-5'>Update your Profile</p>
            </div>
          </div>
          <div className='grid gap-6'>
            <div className='flex items-center lg:justify-between lg:items-center flex-col lg:flex-row gap-5'>
              <div className='grid gap-2 w-full sm:w-72'>
                <Label>Profile Image</Label>
                <img src={avatarPreview ? `${avatarPreview}` : `./vite.svg`} alt="avatar" className='w-full h-auto ms:h-72 rounded-2xl' />
                <div className='relative'>
                  <Input type="file" className="avatar-update-bt" onChange = {avatarHandler} />
                </div>
              </div>
              <div className='grid gap-2 w-full sm:w-72'>
                <Label>Resume</Label>
                <Link to={user && user.resume && user.resume.url}>
                  <img src={resumePreview ? `${resumePreview}` : `./vite.svg`} alt="resume" className='w-full h-auto ms:h-72 rounded-2xl' />
                </Link>
                <div className='relative'>
                  <Input type="file" className="avatar-update-bt" onChange = {resumeHandler} />
                </div>
              </div>
            </div>
            <div className='grid gap-2'>
              <Label>Full Name</Label>
              <Input type="text" value = {fullName} onChange={(e) => setFullName(e.target.value)} placeholder = "Your full name" />
            </div>
            <div className='grid gap-2'>
              <Label>Email</Label>
              <Input type="email" value = {email} onChange={(e) => setEmail(e.target.value)} placeholder = "Your email" />
            </div>
            <div className='grid gap-2'>
              <Label>Phone</Label>
              <Input type="text" value = {phone} onChange={(e) => setPhone(e.target.value)} placeholder = "Your phone number" />
            </div>
            <div className='grid gap-2'>
              <Label>About Me</Label>
              <Textarea value = {aboutMe} onChange={(e) => setAboutMe(e.target.value)} placeholder = "About Me"  />
            </div>
            <div className='grid gap-2'>
              <Label>Portfolio URL</Label>
              <Input  value = {portfolioURL} onChange={(e) => setPortfolioURL(e.target.value)} placeholder = "Your portfolio URL"  />
            </div>
            <div className='grid gap-2'>
              <Label>Github URL</Label>
              <Input  value = {githubURL} onChange={(e) => setGithubURL(e.target.value)} placeholder = "Your Github URL"  />
            </div>
            <div className='grid gap-2'>
              <Label>Facebook URL</Label>
              <Input value = {facebookURL} onChange={(e) => setFacebookURL(e.target.value)} placeholder = "Your Facebook URL" />
            </div>
            <div className='grid gap-2'>
              <Label>LinkedIn URL</Label>
              <Input value = {linkedInURL} onChange={(e) => setLinkedInURL(e.target.value)} placeholder = "Your LinkedIn  URL"  />
            </div>
            <div className='grid gap-2'>
              <Label>Instagram URL</Label>
              <Input value = {instagramURL} onChange={(e) => setInstagramURL(e.target.value)} placeholder = "Your Instagram URL"  />
            </div>
            <div className='grid gap-2'>
              {
                !loading ? (<Button onClick = {handleUpdateProfile} className = "w-full">Update profile</Button>) : (<SpecialLoadingButton content = {"Updating"} />)
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateProfile