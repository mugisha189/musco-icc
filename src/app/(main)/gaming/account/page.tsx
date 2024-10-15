'use client';
import { useUser } from '@/contexts/UserProvider';
import GamingLayout from '@/layouts/GamingLayout';
import { getFile } from '@/utils/funcs/fetch';
import { Input, InputWrapper } from '@mantine/core';
import React from 'react';

const AccountIndex = () => {
  const { profile } = useUser();

  return (
    <GamingLayout title="My Account" isGeneral>
      <div className="w-full h-full flex p-4 flex-col items-center">
        <div className=" border-blue border-2 rounded-lg overflow-hidden mt-11">
          <img
            className=" w-40 object-cover"
            src={
              (getFile(profile?.profilePicture) as string) ??
              `https://ui-avatars.com/api/?name=${profile?.firstName}+${profile?.lastName}&bold=true`
            }
            alt=""
          />
        </div>
        <div className="flex flex-col w-full items-center mt-5 mx-auto max-w-[800px]">
          <div className="grid w-full gap-6 sm:grid-cols-2">
            <InputWrapper label="First Name" description="First Name for the user">
              <Input value={profile?.firstName} disabled type={'text'} />
            </InputWrapper>
            <InputWrapper label="Last Name" description="Last Name for the user">
              <Input value={profile?.lastName} disabled type={'text'} />
            </InputWrapper>
            <InputWrapper label="Email" description="Email">
              <Input value={profile?.email} disabled type={'text'} />
            </InputWrapper>
            {/* <InputWrapper label="Class" description="Class">
              <Input value={profile?.phoneNumber} disabled type={'text'} />
            </InputWrapper>
            <InputWrapper label="Department" description="Department">
              <Input value={user?.department?.name} disabled type={'text'} />
            </InputWrapper> */}
          </div>
        </div>
      </div>
    </GamingLayout>
  );
};

export default AccountIndex;
