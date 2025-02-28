import { LoginUser } from "@/Api/apiRequest";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/context/ToastContext";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Box, Flex, Grid, Heading, IconButton } from '@radix-ui/themes';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (data) => {
    const user = {
      email: data.email,
      password: data.password
    }
    LoginUser(user, dispatch, navigate, toast, setIsSubmitting)
  };

  return (
    <Flex align='center' justify='center' height='90vh' style={{ padding: '0 20px' }}>
      <Card style={{ width: '100%', maxWidth: '450px' }}>
        <CardHeader>
          <Box style={{ textAlign: 'center' }}>
            <Heading as='h2'>HRDept Company</Heading>
          </Box>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLogin)}>
            <Box style={{ width: '100%' }}>
              <Grid style={{ padding: '10px 0px' }}>
                <Label style={{ padding: '10px 0px' }} htmlFor="email">
                  Email <span style={{ color: 'red' }}>*</span>
                </Label>
                <Input
                  id="email"
                  placeholder="Enter email"
                  {...register("email", { required: 'Email is required' })}
                />
                {errors.email && <span style={{ color: 'red', fontSize: 14 }}>{errors.email.message}</span>}
              </Grid>
              <Grid style={{ padding: '10px 0px' }}>
                <Label style={{ padding: '10px 0px' }} htmlFor="password">
                  Password <span style={{ color: 'red' }}>*</span>
                </Label>
                <Box style={{ position: 'relative' }}>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    style={{ paddingRight: '2.5rem' }}
                    placeholder="Enter password"
                    {...register("password", { required: 'Password is required' })}
                  />
                  {errors.password && <span style={{ color: 'red', fontSize: 14, position: 'absolute', top: '100%' }}>{errors.password.message}</span>}
                  <IconButton
                    color="gray"
                    variant="ghost"
                    highContrast
                    type='button'
                    onClick={togglePasswordVisibility}
                    style={{
                      position: 'absolute',
                      top: '65%',
                      right: '0.5rem',
                      transform: 'translateY(-50%)'
                    }}
                  >
                    {showPassword ? <EyeOpenIcon /> : <EyeNoneIcon />}
                  </IconButton>
                </Box>
              </Grid>
              <CardFooter style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                <Button type="submit" disabled={isSubmitting}>Login</Button>
              </CardFooter>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Flex>
  )
}
