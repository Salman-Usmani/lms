import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';
import {Button, FloatingTitleTextInputField} from '../../../../components';
import {dataServer} from '../../../../services/axiosConfig';
import {UserData} from '../../../../types';
import {widthInDp} from '../../../../utils';

interface IDetailsBox {
  name: string;
  phoneNo: string;
  state: string;
  country: string;
  email: string;
  id: string;
}
interface IProps {
  name: string;
  email: string;
  phoneNo: string;
  state: string;
  country: string;
  id: string;
  setUpdatedUser: (data: UserData) => void;
}

export const DetailsBox = (props: IProps) => {
  const [isLoading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IDetailsBox>({
    defaultValues: {
      name: props.name,
      country: props.country,
      phoneNo: props.phoneNo,
      state: props.state,
      id: props.id,
      email: props.email,
    },
  });

  async function updateUserDetails(data: IDetailsBox) {
    try {
      setLoading(true);
      const updateUserApi = await dataServer.put('user', data);
      setLoading(false);
      if (updateUserApi.status === 200) {
        props.setUpdatedUser(updateUserApi.data.data.user);
        await AsyncStorage.setItem(
          'userData',
          JSON.stringify(updateUserApi.data.data.user),
        );
        Toast.show({
          type: 'success',
          text1: updateUserApi.data.message,
        });
      }
    } catch (error: any) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: Array.isArray(error?.response?.data?.errors)
          ? error?.response?.data?.errors[0]
          : error?.response?.data?.message
            ? error?.response?.data?.message
            : error.response.data || 'Login to update user',
      });
    }
  }
  return (
    <>
      <FloatingTitleTextInputField
        title="Full Name"
        keyboardType={'default'}
        errorMsg={errors?.name?.message}
        control={control}
        name={'name'}
      />

      <FloatingTitleTextInputField
        title="Email"
        control={control}
        name={'email'}
        disabled={true}
      />

      <FloatingTitleTextInputField
        title="Phone Number"
        keyboardType={'numeric'}
        errorMsg={errors?.phoneNo?.message}
        control={control}
        name={'phoneNo'}
      />

      <FloatingTitleTextInputField
        title="State"
        keyboardType={'default'}
        errorMsg={errors?.state?.message}
        control={control}
        name={'state'}
      />
      <FloatingTitleTextInputField
        title="Country"
        keyboardType={'default'}
        errorMsg={errors?.country?.message}
        control={control}
        name={'country'}
      />

      <Button
        title={'Save Details'}
        background={true}
        handlePress={handleSubmit(updateUserDetails)}
        loading={isLoading}
      />
    </>
  );
};
