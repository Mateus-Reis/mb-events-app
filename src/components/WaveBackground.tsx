import React from "react";
import { View, Image, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";

const { width } = Dimensions.get("window");

export function WaveBackground() {
  const imageSize = width < 380 ? width * 0.5 : width * 2;
  const baseHeight = width < 380 ? "h-15" : "h-60";

  return (
    <View className="w-full">
      <View
        className={`bg-black ${baseHeight} md:h-96 items-center justify-center`}
      >
        <Image
          source={require("../../assets/mb.events-logo.png")}
          style={{
            width: imageSize,
            height: imageSize,
            maxHeight: 500,
            maxWidth: 500,
          }}
          resizeMode="contain"
        />
      </View>
      <Svg height="100" width={width} viewBox={`0 0 ${width} 100`}>
        <Path
          d={`
            M0,0 
            L${width},0 
            L${width},50
            C${width * 0.65},90 ${width * 0.35},20 0,70
            L0,0 Z
          `}
          fill="black"
        />
      </Svg>
    </View>
  );
}
