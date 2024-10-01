import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
} from 'react-native-heroicons/outline';
import { theme } from '../themes';
import { useEffect, useState } from 'react';
import {
  fetchCurrentWeather,
  fetchDailyForecast,
  fetchSearchLocations,
} from '../api/WeatherDb';
import { weatherImages } from '../constants';

interface Location {
  name: string;
  country: string;
}

interface ConditionData {
  text: string;
}

interface WeatherData {
  name: string;
  country: string;
  temp_c: number;
  condition: ConditionData;
  wind_kph: number;
  humidity: number;
  last_updated: string;
}

interface Weather {
  location: WeatherData;
  current: WeatherData;
}

interface Forecast {
  date: string;
  day: DayData;
}

interface DayData {
  avgtemp_c: number;
  condition: SituationData;
}

interface SituationData {
  text: string;
}

export default function HomeScreen<FC>() {
  const [showSearch, toggleSearch] = useState<boolean>(false);
  const [locations, setLocations] = useState<[]>([]);
  const [search, setSearch] = useState<string>('London');
  const [currentWeather, setCurrentWeather] = useState<Weather | null>(null);
  const [forecasts, setForecasts] = useState<[]>([]);
  const dayName: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const handleLocation = (loc: string): void => {
    getCurrentWeather(loc);
    getDailyForecast(loc);
    toggleSearch(false);
  };
  useEffect(() => {
    if (search.length > 0) {
      getSearchLocation();
    }
  }, [search]);
  useEffect(() => {
    getCurrentWeather(search);
    getDailyForecast(search);
  }, []);
  const getSearchLocation = async (): Promise<void> => {
    const data = await fetchSearchLocations(search);
    data && setLocations(data);
  };
  const getCurrentWeather = async (city: string): Promise<void> => {
    const data = await fetchCurrentWeather(city || 'singapore');
    data && setCurrentWeather(data);
  };
  const getDailyForecast = async (city: string): Promise<void> => {
    const data = await fetchDailyForecast(city || 'singapore');
    data.forecast.forecastday && setForecasts(data.forecast.forecastday);
  };
  return (
    <View className="flex-1 relative w-full h-full overflow-hidden">
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require('../assets/images/bg.png')}
        className="absolute w-full h-full"
      />
      <SafeAreaView className="flex flex-1 pb-5">
        <View
          style={{
            backgroundColor: `${showSearch ? theme.bgBlack('0.9') : ''}`,
          }}
          className={showSearch ? `absolute w-full h-full z-40` : ''}
        />
        {/* Search sections */}
        <View style={{ height: '7%' }} className="mx-4 relative z-50">
          <View
            className="flex-row justify-end items-center rounded-full"
            style={{
              backgroundColor: showSearch
                ? theme.bgWhite('0.2')
                : 'transparent',
            }}
          >
            {showSearch && (
              <TextInput
                onChangeText={(val) => setSearch(val)}
                placeholder="Search city"
                placeholderTextColor="lightgray"
                className="pl-6 h-10 pb-1 flex-1 text-base text-white"
              />
            )}
            <TouchableOpacity
              onPress={() => toggleSearch(!showSearch)}
              style={{ backgroundColor: theme.bgWhite('0.3') }}
              className="rounded-full p-3 m-1"
            >
              <MagnifyingGlassIcon size="25" color="white" />
            </TouchableOpacity>
          </View>
          {locations.length > 0 && showSearch ? (
            <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
              {locations.map((loc: Location, index: number) => {
                let showBorder = index + 1 != locations.length;
                let borderClass = showBorder
                  ? 'border-b-2 border-b-gray-400'
                  : '';
                return (
                  search.length > 0 && (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        handleLocation(loc.name);
                        Keyboard.dismiss();
                      }}
                      className={
                        'flex-row items-center p-3 px-6 ' + borderClass
                      }
                    >
                      <MapPinIcon size="20" color="gray" />
                      <Text className="text-black text-lg ml-2">
                        {loc?.name},{' '}
                        {loc?.country?.length > 14
                          ? loc?.country?.slice(0, 14)
                          : loc?.country}
                      </Text>
                    </TouchableOpacity>
                  )
                );
              })}
            </View>
          ) : (
            ''
          )}
        </View>
        {/* Forecast section */}
        <View className="mx-4 flex justify-around flex-1 mb-2 z-30">
          {/* locations */}
          <Text className="text-white text-center text-2xl font-bold">
            {currentWeather?.location?.name}
            <Text className="text-lg font-semibold text-gray-300">
              , {currentWeather?.location?.country.slice(0, 14)}
            </Text>
          </Text>
          {/* Weather image */}
          <View className="flex-row justify-center items-center">
            <Image
              source={
                (currentWeather?.current?.condition?.text &&
                  weatherImages[currentWeather.current.condition.text]) ||
                require('../assets/images/sun.png')
              }
              className="w-28 h-28"
            />
          </View>
          {/* Degree celcius */}
          <View className="space-y-0">
            <Text className="text-white text-center font-bold text-6xl ml-5">
              {currentWeather?.current?.temp_c}&#176;
            </Text>
            <Text className="text-white text-center text-xl tracking-widest">
              {currentWeather?.current?.condition?.text}
            </Text>
          </View>
          {/* Other stats */}
          <View className="flex-row justify-between mx-4">
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require('../assets/icons/wind.png')}
                className="w-6 h-6"
              />
              <Text className="text-white font-semibold text-base">
                {currentWeather?.current?.wind_kph}km
              </Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require('../assets/icons/drop.png')}
                className="w-6 h-6"
              />
              <Text className="text-white font-semibold text-base">
                {currentWeather?.current?.humidity}%
              </Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require('../assets/icons/sun.png')}
                className="w-6 h-6"
              />
              <Text className="text-white font-semibold text-base">
                6:30 AM
              </Text>
            </View>
          </View>
        </View>
        {/* Daily forecast */}
        <View className="mb-2 space-y-3 z-30">
          <View className="flex-row items-start mx-5 space-x-2">
            <CalendarDaysIcon size="20" color="white" />
            <Text className="text-white text-base"> Daily forecast</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          >
            {forecasts.map(({ day, date }: Forecast, index: number) => {
              return (
                <View
                  key={index}
                  className="flex justify-center items-center w-24 rounded-3xl py-3 mr-3"
                  style={{ backgroundColor: theme.bgWhite('0.15') }}
                >
                  <Image
                    className="w-11 h-11"
                    source={
                      (day?.condition?.text &&
                        weatherImages[day.condition.text]) ||
                      require('../assets/images/sun.png')
                    }
                  />
                  <Text className="text-white">
                    {dayName[new Date(date).getDay()]}
                  </Text>
                  <Text className="text-white text-xl font-semibold">
                    {day?.avgtemp_c}&#176;
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
