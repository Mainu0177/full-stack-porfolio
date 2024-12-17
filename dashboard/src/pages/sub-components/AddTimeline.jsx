import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import SpecialLoadingButton from './SpecialLoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTimeline, clearAllTimelineErrors, getAllTimeline, resetTimelineSlice } from '../../store/slices/timelineSlice';
import { toast } from 'react-toastify';


const AddTimeline = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("")

  const {loading, message, error} = useSelector((state) => state.timeline)

  const dispatch = useDispatch();

  const handleAddNewTimeline = (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("from", from);
    formData.append("to", to);
    dispatch(addNewTimeline(formData))

  }

  useEffect(() =>{
    if(error){
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }
    if(message){
      toast.success(message);
      dispatch(resetTimelineSlice());
      dispatch(getAllTimeline())
    }

  }, [dispatch, error, message, loading])

  return (
    <>
      <div className='flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14'>
        <form onSubmit={handleAddNewTimeline} className='w-[100%] px-5 md:w-[650px]'>
          <div className='space-y-12'>
            <div className='border-b border-gray900/10 pb-12'>
              <h2 className='font-semibold leading-7 text-gray-900 text-3xl  text-center'>ADD A NEW TIMELINE</h2>
              <div className='mt-10 flex flex-col gap-5'>
                <div className='w-full sm:col-span-4'>
                  <Label className = "block text-sm font-medium leading-6 text-gray-900">Title</Label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                      <Input type="text"
                        placeholder='Matriculation'
                        value={title} onChange={(e) =>setTitle(e.target.value)}
                        className='flex flex-1 border-0 bg-transparent py-1.5 lo-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6' />
                    </div>
                  </div>
                </div>
                <div className='w-full sm:col-span-4'>
                  <Label className = "block text-sm font-medium leading-6 text-gray-900">Description</Label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                      <Textarea type="text"
                        placeholder='Description'
                        value={description} onChange={(e) =>setDescription(e.target.value)}
                        className='flex flex-1 border-0 bg-transparent py-1.5 lo-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6' />
                    </div>
                  </div>
                </div>
                <div className='w-full sm:col-span-4'>
                  <Label className = "block text-sm font-medium leading-6 text-gray-900">From</Label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                      <Input type="number"
                        placeholder='Starting Period'
                        value={from} onChange={(e) =>setFrom(e.target.value)}
                        className='flex flex-1 border-0 bg-transparent py-1.5 lo-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6' />
                    </div>
                  </div>
                </div>
                <div className='w-full sm:col-span-4'>
                  <Label className = "block text-sm font-medium leading-6 text-gray-900">To</Label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                      <Input type="number"
                        placeholder='Ending Period'
                        value={to} onChange={(e) =>setTo(e.target.value)}
                        className='flex flex-1 border-0 bg-transparent py-1.5 lo-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
              {
                loading ? <SpecialLoadingButton content={"Adding"} /> : <Button type="submit" className = "w-full">Add Timeline</Button>
              }
          </div>
        </form>
      </div>
    </>
  )
}

export default AddTimeline