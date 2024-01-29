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
    setValue,
    formState: {errors},
  } = useForm<IDetailsBox>();
  useEffect(() => {
    try {
      setValue('name', props.name);
      setValue('country', props.country);
      setValue('phoneNo', props.phoneNo);
      setValue('state', props.state);
      setValue('id', props.id);
      //   setValue('email', undefined);
    } catch (error) {
      console.log(error);
    }
  }, [props]);

  async function updateUserDetails(data: IDetailsBox) {
    try {
      setLoading(true);
      const userUpdateApi = await dataServer.put('user', data);
      setLoading(false);
      if (userUpdateApi.status === 200) {
        props.setUpdatedUser(userUpdateApi.data.data.user);
        await AsyncStorage.setItem(
          'userData',
          JSON.stringify(userUpdateApi.data.data.user),
        );
        Toast.show({
          type: 'success',
          text1: userUpdateApi.data.message,
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
      <Controller
        control={control}
        rules={{
          required: 'Full name is required',
        }}
        render={({field: {onChange, value}}) => (
          <FloatingTitleTextInputField
            title="Full Name"
            value={value}
            keyboardType={'default'}
            onChange={onChange}
            errorMsg={errors?.name?.message}
          />
        )}
        name={'name'}
      />

      <FloatingTitleTextInputField title="Email" value={props.email || ''} />

      <Controller
        control={control}
        rules={{
          required: 'phone number is required',
        }}
        render={({field: {onChange, value}}) => (
          <FloatingTitleTextInputField
            title="Phone Number"
            value={value}
            keyboardType={'numeric'}
            onChange={onChange}
            errorMsg={errors?.phoneNo?.message}
          />
        )}
        name={'phoneNo'}
      />
      <Controller
        control={control}
        rules={{
          required: 'State is required',
        }}
        render={({field: {onChange, value}}) => (
          <FloatingTitleTextInputField
            title="State"
            value={value}
            keyboardType={'default'}
            onChange={onChange}
            errorMsg={errors?.state?.message}
          />
        )}
        name={'state'}
      />
      <Controller
        control={control}
        rules={{
          required: 'Country is required',
        }}
        render={({field: {onChange, value}}) => (
          <FloatingTitleTextInputField
            title="Country"
            value={value}
            keyboardType={'default'}
            onChange={onChange}
            errorMsg={errors?.country?.message}
          />
        )}
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
