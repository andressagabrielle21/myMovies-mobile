import { icons } from '@/constants/icons'
import { useForm } from '@/context/useUsername'
import { supabase } from '@/lib/supabase'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Image, Pressable, Text, TextInput, View } from 'react-native'

export const Login = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const {email, setEmail, password, setPassword} = useForm();

    const handleLogin = async () => {
        setLoading(true);

        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (error) {
            Alert.alert("Error: ", error.message)
            setLoading(false);
            return;
        }

        setLoading(false);
        router.replace("/(tabs)")
    }

  return (
    <View className='flex-1 bg-primary justify-center items-center gap-7'>
        <View className='w-full flex-row justify-center items-center'>
            <Image source={icons.logo} className="w-12 h-10"/>
        </View>
        
      <Text className='text-3xl text-white font-bold'>MyMovies</Text>

      <View className='flex justify-center gap-5 w-3/4'>
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
                className='py-5 px-3 rounded-lg text-white border-[1px] border-gray-500 focus:border-white'
            />
        </View>


        <Pressable
            onPress={handleLogin}
             className='rounded-lg bg-accent py-3.5 flex flex-row items-center justify-center' 
        >
            <Image source={icons.arrow} className='size-5 mr-1 mt-0.5' tintColor="#fff"/>
            {loading ? <Text className='font-semibold text-white '>Loading...</Text> 
                : <Text className='font-semibold text-white '>Login</Text>
            }
            
        </Pressable>


        <View className='w-full rounded-lg bg-dark-100 py-3.5 flex items-center justify-center'>
            <Link href="/(auth)/signup">
                <Text className='font-semibold text-white '>Not registered yet? Sign Up</Text>
            </Link>
        </View>

      </View>

    </View>
  )
}

export default Login