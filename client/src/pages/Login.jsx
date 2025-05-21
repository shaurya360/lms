
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useLoginUserMutation, useRegisterUserMutation} from "@/features/api/authApi"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "sonner";


const Login =() => {
  const navigate = useNavigate();
    const [logininput, setlogininput] = useState({
        email: "",
        password: "",
    });
    const [signupinput, setsignupinput] = useState({
        name:"",
        email: "",
        password: "",
    });
    const [
      registerUser,
      {
        data: registerData,
        error: registerError,
        isLoading: registerIsLoading,
        isSuccess: registerIsSuccess,
      },
    ] = useRegisterUserMutation();
    const [
      loginUser,
      {
        data: loginData,
        error: loginError,
        isLoading: loginIsLoading,
        isSuccess: loginIsSuccess,
      },
    ] = useLoginUserMutation();

    const changeInputhandler = (e,type) => {
        const{name ,value} = e.target; 
        if(type === "signup"){
            setsignupinput({...signupinput, [name]: value});
        }
        else{
            setlogininput({...logininput, [name]: value});
        }
    };
    const handleregistration = async (type) => {
      const inputdata = type === "signup" ? signupinput : logininput;
      const action = type === "signup" ? registerUser : loginUser; 
      await action(inputdata);

    };
    useEffect(()=>{
      if(registerIsSuccess && registerData){
        toast.success(registerData.message || "Registration Successfull");
      }
      if(registerError){
        toast.error(registerError.message || "Registration Failed");
      }
      if(loginIsSuccess && loginData){
        toast.success(loginData.message || "Login Successfull");
        navigate("/");
      }
      if(loginError){
        toast.error(loginError.message || "Login Failed");
      }
    },[loginIsLoading,registerIsLoading,loginData,registerData,loginError,registerError])
  return (
    <div className="flex w-full items-center justify-center mt-20">
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup">Signup</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>Signup</CardTitle>
            <CardDescription>
            Create a new account and click signup once you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input type="text" name = "name" value ={signupinput.name} onChange={(e) => changeInputhandler(e,"signup")} placeholder="xyz" required ="true"/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Email</Label>
              <Input type="email" name = "email" value ={signupinput.email} onChange={(e) => changeInputhandler(e,"signup")} placeholder="xyz@gmail.com" required ="true"/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">password</Label>
              <Input type="password" name = "password" value ={signupinput.password} onChange={(e) => changeInputhandler(e,"signup")} placeholder="xyz" required ="true"/>
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={registerIsLoading} onClick={() => handleregistration("signup")}>
            {
                registerIsLoading?(
                  <>
                  <Loader2 className="mr-2 h-4 2-4 animate-spin"/>Please wait
                  </>
                ) : "signup"
              }
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>login</CardTitle>
            <CardDescription>
              login with your password here
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <div className="space-y-1">
              <Label htmlFor="username">Email</Label>
              <Input type="email" name = "email" value ={logininput.name}  onChange={(e) => changeInputhandler(e,"login")} placeholder="xyz@gmail.com" required="true"/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">password</Label>
              <Input  type="password" name = "password" value ={logininput.password} onChange={(e) => changeInputhandler(e,"login")} placeholder="xyz" required="true"/>
            </div>
          </CardContent>
          <CardFooter>
            <Button  disabled={loginIsLoading} onClick={() => handleregistration("login")}>
              {
                loginIsLoading?(
                  <>
                  <Loader2 className="mr-2 h-4 2-4 animate-spin"/>Please wait
                  </>
                ) : "login"
              }
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
  )
}
export default Login