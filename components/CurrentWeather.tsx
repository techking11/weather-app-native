import { Image, Text, View } from 'react-native';

interface Weather {
  city: string;
  country: string;
  image: string;
  degree: number;
  signal: string;
}

export default function CurrentWeather({
  city,
  country,
  image,
  degree,
  signal,
}: Weather) {
  return (
    <View>
      <Text className="text-white text-center text-2xl font-bold">
        {city}
        <Text className="text-lg font-semibold text-gray-300">, {country}</Text>
      </Text>
      <View className="flex-row justify-center">
        <Image source={{ uri: image }} className="w-52 h-52" />
      </View>
      <View className="space-y-2">
        <Text className="text-white text-center font-bold text-6xl ml-5">
          {degree}&#176;
        </Text>
        <Text className="text-white text-center text-xl tracking-widest">
          {signal}
        </Text>
      </View>
    </View>
  );
}
