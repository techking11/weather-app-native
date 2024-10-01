import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MapPinIcon } from 'react-native-heroicons/outline';

export default function Locations() {
  const [locations, setLocations] = useState([1, 2, 3]);
  const handleLocation = (loc: number): void => {
    console.log(loc);
  };
  return (
    <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
      {locations.map((loc, index) => {
        let showBorder = index + 1 != locations.length;
        let borderClass = showBorder ? 'border-b-2 border-b-gray-400' : '';
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleLocation(loc)}
            className={'flex-row items-center p-3 px-6 ' + borderClass}
          >
            <MapPinIcon size="20" color="gray" />
            <Text className="text-black text-lg ml-2">
              Singapore, Singapore
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
