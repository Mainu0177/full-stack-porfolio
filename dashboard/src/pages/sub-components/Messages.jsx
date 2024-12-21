
import {Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Tabs, TabsContent} from '@/components/ui/tabs';
import {Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter} from '@/components/ui/card';
import {Button} from '@/components/ui/button'
import { toast } from "react-toastify"
import { useEffect, useState } from 'react';
import SpecialLoadingButton from './SpecialLoadingButton';
import { clearAllMessageErrors, deleteMessage, getAllMessages, resetMessagesSlice } from '../../store/slices/messageSlice';


const Messages = () => {
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () =>{
    navigateTo("/");
    alert("hellow")
  };
  const {messages, message, error, loading} = useSelector((state) => state.message);
  
  const [messageId, setMessageId] = useState("");
  const dispatch = useDispatch();

  const handelMessageDeleted = (id) =>{
    setMessageId(id);
    dispatch(deleteMessage(id))
  }


  useEffect(() =>{
    if(error){
      toast.error(error);
      dispatch(clearAllMessageErrors())
    }
    if(message){
      toast.success(message);
      dispatch(resetMessagesSlice());
      dispatch(getAllMessages())
    }
  }, [dispatch, error, message, loading])

  return (
    <>
      <div className='min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-20'>
        <Tabs>
          <TabsContent>
            <Card>
              <CardHeader className = "flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                <CardTitle>Message</CardTitle>
                {/* <Link to = {"/"}> */}
                  <Button className = "w-fit" onClick = {handleReturnToDashboard}>Return to Dashboard</Button>
                  {/* <Button >Return to Dashboard</Button> */}
                {/* </Link> */}
              </CardHeader>
              <CardContent className = "grid sm:grid-cols-2 gap-4">
                {
                  messages && messages.length > 0 ? (
                    messages && messages.map(element =>{
                      return (
                        <Card key={element._id} className = "grid gap-2">
                          <CardDescription className = "text-slate-950">
                            <span className='font-bold mr-2'>Sender Name: </span>
                            {element.senderName}
                          </CardDescription>
                          <CardDescription className = "text-slate-950">
                            <span className='font-bold mr-2'>Subject: </span>
                            {element.subject}
                          </CardDescription>
                          <CardDescription className = "text-slate-950">
                            <span className='font-bold mr-2'>Message: </span>
                            {element.message}
                          </CardDescription>
                          <CardFooter className = "justify-end">
                            {
                              loading && (messageId === element._id) ? (
                                <SpecialLoadingButton width = {"w-32"} content={"Deleting"} />
                              ) : (
                                <Button className="w-32" onClick = {() => handelMessageDeleted(element._id)}>Delete</Button>
                              )
                            }
                          </CardFooter>
                        </Card>
                      )
                    })
                  ) : <CardHeader>No messages found</CardHeader>
                }
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default Messages