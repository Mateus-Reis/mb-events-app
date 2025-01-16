import React from "react";
import { Text } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

interface GradientTextProps {
  text: string;
  textClassName?: string;
}

export function GradientText({ text, textClassName = "" }: GradientTextProps) {
  return (
    <MaskedView maskElement={<Text className={textClassName}>{text}</Text>}>
      <LinearGradient
        colors={["#cc0062", "#e33392", "#ef25d6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text className={`${textClassName} opacity-0`}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
}
