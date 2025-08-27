import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchMovies } from '@/services/api'
import useFetch from '@/services/useFetch'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'

const Search = () => {

  const [searchQuerry, setSearchQuerry] = useState('')

  const { 
    data: movies, 
    loading: moviesLoading, 
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: searchQuerry}), false)

  useEffect(() => {
    
  }, [searchQuerry])

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 w-full absolute z-0' resizeMode='cover' />

      <FlatList 
        data={movies} 
        renderItem={({ item }) => <MovieCard { ...item } />} 
        keyExtractor={(item) => item.id.toString()}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16
        }}
        contentContainerStyle={{ paddingBottom: 100}}
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-20 items-center'>
                <Image source={icons.logo} className='w-12 h-10' />
            </View>
            <View className='my-5'>
              <SearchBar 
                placeholder='Search movies...' 
                value={searchQuerry}
                onChangeText={(text: string) => setSearchQuerry(text)}
              />
            </View>

            {moviesLoading && (
              <ActivityIndicator size="large" color='#0000ff' className='my-3' />
            )}

            {moviesError && (
              <Text className="text-red-500 px-5 my-3">
                Error: {moviesError.message}
              </Text>
            )}

            {/* Always show search phrase when query is not empty */}
            {searchQuerry.trim() && (
              <Text className='text-xl text-white font-bold'>
                Search Results for <Text className='text-accent'>{searchQuerry}</Text>
              </Text>
            )}

            {/* Show "no results" message if query is not empty and no movies returned */}
            {!moviesLoading && !moviesError && searchQuerry.trim() && movies?.length === 0 && (
              <Text className='text-light-300 mt-2'>No results found.</Text>
            )}

          </>
        }
      />
    </View>
  )
}

export default Search