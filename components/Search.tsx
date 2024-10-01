import { TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from '../themes';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { useState } from 'react';

export default function Search() {
  const [showSearch, toggleSearch] = useState(false);
  return (
    <View
      className="flex-row justify-end items-center rounded-full"
      style={{
        backgroundColor: showSearch ? theme.bgWhite('0.2') : 'transparent',
      }}
    >
      {showSearch && (
        <TextInput
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
  );
}
