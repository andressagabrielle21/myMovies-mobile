import { icons } from '@/constants/icons'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const FilmCard = (movie: IMovie) => {
  return (
    <Link href={`/movies/${movie.id}`} asChild>
        <TouchableOpacity className="w-[30%]">
          <View key={movie.id}>
              <Image 
                source={{
                  uri: movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
                }}
                className="w-full h-52 rounded-lg"  
                resizeMode='cover'
              />
              <Text 
                numberOfLines={1}
                className="text-lg font-bold mt-2 text-white"
              >{movie.title}</Text>

              <View className='flex-row justify-between items-center'>
                <View className='flex-row items-center justify-start gap-x-1'>
                  <Image source={icons.star} className='size-4'/>

                  <Text className='text-sm text-white'>{movie.vote_average.toFixed(1)}</Text>
                </View>
                <Text 
                    className='text-xs text-light-300'
                  >
                    {movie.release_date?.substring(0, 4) ?? "----"}
                </Text>

              </View>

          </View>
        </ TouchableOpacity>
    </Link>
  )
}

export default FilmCard