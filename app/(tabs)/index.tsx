import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { 
  ActivityIndicator, 
  FlatList, 
  Image, 
  Text, 
  View 
} from "react-native";

export default function Index() {
  const router = useRouter();

  const { 
    data: movies, 
    loading: moviesLoading, 
    error: moviesError 
  } = useFetch(() => fetchMovies({ query: ''}))

  if (moviesLoading) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (moviesError) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <Text className="text-red-500">
          Error: {moviesError?.message}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      {/* Background image */}
      <Image source={images.bg} className="absolute w-full z-0" />

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 20 }}
        columnWrapperStyle = {{
          justifyContent: 'flex-start',
          gap: 20,
          paddingRight: 5,
          marginBottom: 10
        }}
        className="mt-2 pb-32"
        // scrollEnabled = {false}
        
        // Everything below the movie grid
        ListHeaderComponent={
          <>
            <Image 
              source={icons.logo} 
              className="w-12 h-10 mt-20 mb-5 mx-auto" 
            />
            
            <View className="mt-5">
              <SearchBar 
                onPress={() => router.push('/search')}
                placeholder="Search for a movie"
              />
            </View>

            <Text className="text-lg text-white font-bold mt-5 mb-3">
              Latest Movies
            </Text>
          </>
        }

        // Render each movie
        renderItem={({ item }) => (
          <View className="flex-1 m-1 items-center">
            <MovieCard 
              { ...item}
            />
          </View>
        )}

      />
    </View>
  );
}
