import { icons } from '@/constants/icons'
import { useForm } from '@/context/useUsername'
import { supabase } from '@/lib/supabase'
import React, { useEffect, useState } from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Profile = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");

  const {setAuth} = useForm();

  const handleSignOut = async () => {
    const {error} = await supabase.auth.signOut();

    setAuth(null);

    if (error) {
      Alert.alert("Error while signing out: ", error);
      return;
    }
  }

  const getProfile = async () => {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session.');
 
      const {data, error, status} = await supabase
        .from('users')
        .select('name')
        .eq('id', session.user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setName(data.name);
      }
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    })

    const {data: {subscription}, } = 
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      });
    
    return () => subscription.unsubscribe();
  }, [])

  useEffect(() => {
    if (session) getProfile()
  }, [session]);

  return (
    <View className='bg-primary flex-1 px-10'>

      <View className='flex justify-center items-center flex-1 flex-col gap-5'>
        <View className='border border-spacing-1 rounded-full border-cyan-400'>
          <Image source={icons.person} className='size-10' tintColor="#fff"/>
        </View>
        
        <Text className="text-gray-100 text-2xl font-bold">{name}</Text>
      </View>

      <View className='flex justify-center flex-1 flex-col gap-5'>
        <TouchableOpacity className=' mx-5 rounded-lg bg-red-400 py-3.5 flex flex-row items-center justify-center' onPress={handleSignOut}
        >
          <Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180' tintColor="#fff"/>
          <Text className='font-semibold text-white '>Sign Out</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})