import { Image, ScrollView, Text, View } from 'react-native';
import { CalendarDaysIcon } from 'react-native-heroicons/outline';
import { theme } from '../themes';

interface Forecast {
  image: string;
  eachday: string;
  degree: number;
}

export default function DailyForecast({ image, eachday, degree }: Forecast) {
  return (
    <View className="mb-2 space-y-3">
      <View className="flex-row items-start mx-5 space-x-2">
        <CalendarDaysIcon size="20" color="white" />
        <Text className="text-white text-base"> Daily forecast</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        <View
          className="flex justify-center items-center w-24 rounded-3xl py-3"
          style={{ backgroundColor: theme.bgWhite('0.15') }}
        >
          <Image className="w-11 h-11" source={{ uri: image }} />
          <Text className="text-white">{eachday}</Text>
          <Text className="text-white text-xl font-semibold">
            {degree}&#176;
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
