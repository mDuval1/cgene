import { Button, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiEyeLine } from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthentication } from '../services/authentication/AuthenticationProvider';

interface RegisterData {
  email: string;
  password: string;
}

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signin } = useAuthentication();

  const from = location.state?.from?.pathname || '/';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>();

  const onSubmit = (data: RegisterData) => {
    const { email, password } = data;
    const callback = () => {
      navigate(from, { replace: true });
    };
    signin(email, password, callback);
  };

  return (
    <div className="flex w-full flex-col items-center p-4">
      <p className="text-xl">Login</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-64 flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            placeholder="user@gmail.com"
            type="email"
            {...register('email', { required: true })}
          />
        </div>
        <Label htmlFor="password" value="Password" />
        <div className="relative mb-2 w-full">
          <div className="absolute inset-y-0 right-0 z-10 flex items-center px-2">
            <Button
              size="xs"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              color={showPassword ? 'gray' : undefined}
            >
              <RiEyeLine size={20} />
            </Button>
          </div>
          <TextInput
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              minLength: {
                message: 'Password must have at least 8 characters',
                value: 8,
              },
              required: true,
            })}
          />
        </div>
        {errors.password && <p>{errors.password.message}</p>}
        <Button size="sm" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Login;
