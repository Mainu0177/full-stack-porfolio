
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton"
import { clearAllForgotPasswordErrors, resetPassword } from "../store/slices/forgotResetPasswordSlice"
import { getUser } from "../store/slices/userSlice"



const ResetPassword = () => {
  const {token} = useParams()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { loading, message , error } = useSelector(
    (state) => state.user
  )

  const {isAuthenticated} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleResetPassword = () =>{
    dispatch(resetPassword(token, password, confirmPassword));
  }

  useEffect(() =>{
    if(error){
      toast.error(error);
      dispatch(clearAllForgotPasswordErrors())
    }
    if(isAuthenticated){
      navigateTo("/");
    }
    if(message !== null){
      toast.success(message);
      dispatch(getUser())
    }
  }, [dispatch, isAuthenticated, error, loading])

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
        <CardDescription>
          Set a new password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Password</Label>
            <Input
              type="password"
              value = {password}
              onChange = {(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label>Confirm Password</Label>
            <Input
              type="confirm password"
              value = {confirmPassword}
              onChange = {(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {/* <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link to="/login" className="ml-auto inline-block text-sm underline">
                Remember your password?
              </Link>
            </div>
            <Input type="password" value = {password} onChange = {(e) => setPassword(e.target.value)} required />
          </div> */}
          {loading ? (<SpecialLoadingButton content={"Reseting Password"} />)
          : (<Button type="submit" className="w-full" onClick = {handleResetPassword}>
            Reset password
          </Button>)
          }
          {/* <Button variant="outline" className="w-full">
            Login with Google
          </Button> */}
        </div>
        {/* <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div> */}
      </CardContent>
    </Card>
    </div>
  )
}

export default ResetPassword;