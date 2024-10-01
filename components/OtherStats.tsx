import { Image, Text, View } from 'react-native';

interface Stats {
  icon: string;
  amount: string;
}

export default function Status({ icon, amount }: Stats) {
  return (
    <View className="flex-row justify-between mx-4">
      <View className="flex-row space-x-2 items-center">
        <Image source={{ uri: icon }} className="w-6 h-6" />
        <Text className="text-white font-semibold text-base">{amount}</Text>
      </View>
    </View>
  );
}
