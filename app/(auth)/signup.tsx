import { icons } from '@/constants/icons';
import { useForm } from '@/context/useUsername';
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function Signup() {
    const [loading, setLoading] = useState<boolean>(false);
    const {name, setName, email, setEmail, password, setPassword} = useForm();

    const handleSignup = async () => {
        setLoading(true);

        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name
                }
            }
        })

        if (error) {
            Alert.alert(error.message);
            setLoading(false);
        }

        setLoading(false);
        router.replace('/');
    }

  return (
    <View className='flex-1 bg-primary'>
        <ScrollView contentContainerStyle={{
            flex: 1,
            minHeight: "110%",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <View className='w-full flex-1 bg-primary justify-center items-center gap-7'>

                <TouchableOpacity onPress={router.back} className='bg-accent p-3 rounded-3xl absolute top-10 left-5'>
                    <Ionicons name='arrow-back' size={24} color="fff"/>
                </TouchableOpacity>

                <View className='flex-row justify-center items-center'>
                    <Image source={icons.logo} className="w-12 h-10"/>
                </View>
                    
                <Text className='text-3xl text-white font-bold'>Create your account</Text>

                <View className='flex justify-center gap-5 w-3/4'>
                <View className='flex flex-col gap-2'>
                    <Text className='text-white'>Name</Text>
                    <TextInput
                        placeholder={"Type your name "}
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor="#a8b5db"
                        className='py-5 px-3 rounded-xl text-white border-[1px] border-gray-500 focus:border-white'
                    />
                </View>

                <View className='flex flex-col gap-2'>
                    <Text className='text-white'>E-mail</Text>
                    <TextInput
                        placeholder={"Type your email address "}
                        value={email}
                        onChangeText={setEmail}
                        placeholderTextColor="#a8b5db"
                        className='py-5 px-3 rounded-xl text-white border-[1px] border-gray-500 focus:border-white'
                    />
                </View>

                <View className='flex flex-col gap-2'>
                    <Text className='text-white'>Password</Text>
                    <TextInput
                        placeholder={"Type your password"}
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor="#a8b5db"
                        secureTextEntry
                        className='py-5 px-3 rounded-xl text-white border-[1px] border-gray-500 focus:border-white'
                    />
                </View>

                <Pressable className='rounded-lg bg-accent py-3.5 flex flex-row items-center justify-center' 
                    onPress={handleSignup}
                >
                    <Image source={icons.arrow} className='size-5 mr-1 mt-0.5' tintColor="#fff"/>
                    {loading ? <ActivityIndicator size={26} color="#fff" className='bg-accent'/>
                        :  
                        <Text className='font-semibold text-white '>Sign Up</Text>
                    }
                    
                </Pressable>

                </View>

            </View>
        </ScrollView>
    </View>
  )
}