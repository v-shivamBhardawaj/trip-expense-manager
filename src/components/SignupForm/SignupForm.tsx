import { Button, Checkbox, FormControlLabel, InputLabel, Stack, TextField } from '@mui/material';
import FormImg from '../../assets/images/icons/form-girl.png';
import GoogleLogo from '../../assets/images/svgs/google.svg';
import {useForm} from 'react-hook-form';
import './signupform.scss';

const inputStyles= {
        ".MuiInputBase-root":{
            borderRadius:"40px",
            borderColor: "#333"
        },
        ".MuiInputBase-input":{
            padding: '14px 18px'
        }
    }
const SignupForm = () => {
    const {register,handleSubmit} = useForm()
    
  return (
    <Stack className='d-flex p-50' flexDirection={'row'} justifyContent="space-around">
        <div className='w-40'>
            <img src={FormImg} />
        </div>
        <div className='w-35'>
            <Stack gap={2}>
                <p className='fs-52 fw-600'>Sign Up &#128075;</p>
                <p className='fs-18' style={{color:'#94A3B8'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>

                <Button variant="contained"
                    className='google-sign-in'
                    startIcon={<GoogleLogo/>}
                >
                    Sign up with Google
                </Button>
            </Stack>
            <div className='my-15'>
                <form onSubmit={handleSubmit((data)=>console.log(data))}>
                    <div className='input-wrapper'>
                        <InputLabel className='fs-14 gray-light' htmlFor="name">First & Last Name</InputLabel>
                        <TextField 
                        {...register("name")}
                        fullWidth name="name" id="name" type="text" placeholder="i.e. Davon Lean" 
                        sx={inputStyles}
                        />
                    </div>
                     <div className='input-wrapper'>
                        <InputLabel className='fs-14 gray-light' htmlFor="email">Email</InputLabel>
                        <TextField
                        {...register("email")}
                        fullWidth type='email' id="email" placeholder="i.e. devon@mail.com"
                        sx={inputStyles} />
                       
                    </div>
                     <div className='input-wrapper'>
                        <InputLabel className='fs-14 gray-light' htmlFor="password">Password</InputLabel>
                        <TextField 
                        {...register("password")}
                        fullWidth type='password' id="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" 
                        sx={inputStyles}/>
                        
                    </div>
                    <div className='input-wrapper'>
                        <FormControlLabel control={<Checkbox />} label="Remember me" />
                    </div>
                    <div >
                        <Button variant="contained" size='large' type='submit' className='sign-up-btn'>Create Account</Button>
                    </div>
                </form>
            </div>
            <div></div>
        </div>
    </Stack>
  )
}

export default SignupForm