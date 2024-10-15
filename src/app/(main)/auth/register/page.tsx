'use client';
import LoadingView from '@/components/shared/LoadingView';
import { useUser } from '@/contexts/UserProvider';
import { Box, Button, Input, InputWrapper, PasswordInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { getCookie, setCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const SignupPage = () => {
  const [loading, setLoading] = React.useState(false);
  // const [rcaLoading, setRcaLoading] = React.useState(false);
  const [loginData, setLoginData] = React.useState({
    name: '',
    email: '',
    password: '',
  });
  const { user } = useUser();
  const router = useRouter();
  // const searchParams = useSearchParams();

  // React.useEffect(() => {
  //   const getOauthToken = async () => {
  //     const token = searchParams?.get('token');
  //     if (!token) return;
  //     const decoded = decodeToken(token);
  //     console.log('decoded token', decoded);
  //     if (token) {
  //       setLoading(true);
  //       setRcaLoading(true);
  //       setCookie('mis_token', token, { maxAge: 60 * 60 * 24 });
  //       await createUserFromToken(token);
  //       console.log('user created if not exists');
  //       window.location.href = '/gaming';
  //     }
  //   };
  //   getOauthToken();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const loginWithRCA = () => {
  //   window.location.href = `http://rcaproj.com:9099/auth/login?redirect=${window.location.href}&oauth=true`;
  // };

  const onLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log('loginData', loginData);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle specific server-side errors
        throw new Error(data.error || 'Register failed');
      }
      console.log('data', data);
      if (data.token) {
        setCookie('token', data.token, { maxAge: 60 * 60 * 24 * 7 });
        window.location.href = '/gaming';
      }
    } catch (error: any) {
      console.log('error', error);
      notifications.show({
        title: 'Error',
        message: error.message || 'Invalid email or password',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  if (user && getCookie('token')) {
    router.push('/gaming');
    return <LoadingView />;
  }

  return (
    <div className="flex h-screen w-full flex-col gap-2 justify-center items-center">
      <Box className=" w-full max-w-[450px] sm:px-5 flex items-center flex-col border py-5 rounded-md border-gray">
        <form onSubmit={onLoginSubmit} className=" w-full  flex flex-col gap-y-3 p-3">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">Register</h1>
            <span className=" text-sm opacity-70">Enter your credentials</span>
          </div>
          <InputWrapper label="Full name" required>
            <Input
              size="md"
              type="text"
              value={loginData.name}
              onChange={(e) => setLoginData({ ...loginData, name: e.target.value })}
              placeholder="Full name"
            />
          </InputWrapper>
          <InputWrapper label="Email" required>
            <Input
              size="md"
              type="email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              placeholder="Email"
            />
          </InputWrapper>
          <InputWrapper label="Password" required>
            <PasswordInput
              size="md"
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              placeholder="Password"
            />
          </InputWrapper>
          <Button size="md" mt={'sm'} type="submit" loading={loading} disabled={loading}>
            Register
          </Button>
        </form>
        {/* <button
          disabled={rcaLoading}
          onClick={loginWithRCA}
          className="w-fit mt-3 flex items-center gap-3 text-lg h-12 font-medium border-2 px-4 border-[#19234a] hover:bg-slate-200 rounded-md"
        >
          {rcaLoading ? (
            <LuLoader2 className=" animate-spin" size={40} />
          ) : (
            <Image src="/images/rca.png" alt="google" width={40} height={40} />
          )}
          Login With RCA MIS
        </button> */}
      </Box>
      <span>Or</span>
      <Link
        href="/auth/login"
        className=" border-blue border rounded-3xl px-4 py-2 hover:bg-blue hover:text-white duration-200"
      >
        Login
      </Link>
    </div>
  );
};

export default SignupPage;
