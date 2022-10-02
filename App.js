import React, { useState } from 'react';
import {
  Animated,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

const App = () => {
  const moveAnim = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0];
  // get phone width
  const [phoneDim, setPhoneDim] = useState({ width: 0 });
  // get button width
  const [buttonDim, setBtnDim] = useState({ width: 0 });

  const getDeviceWidth = (event) => {
    const layout = event.nativeEvent.layout;
    const { width } = layout;
    setPhoneDim({ width: width });
  };

  const getBtnWidth = (event) => {
    const layout = event.nativeEvent.layout;
    const { width } = layout;
    setBtnDim({ width: width });
  };

  const moveBtn = () => {
    // move right to left
    // reset & restart animation each time you press the button
    Animated.timing(moveAnim, {
      toValue: { x: -(phoneDim.width - buttonDim.width), y: 0 },
      duration: 1000,
      useNativeDriver: false,
    }).start(moveAnim.resetAnimation());
  };

  return (
    <View style={styles.parent}>
      <View
        style={styles.alignRight}
        onLayout={(e) => {
          getDeviceWidth(e);
        }}
      >
        <Animated.View style={moveAnim.getLayout()}>
          <View>
            <TouchableOpacity
              onLayout={(e) => {
                getBtnWidth(e);
              }}
              style={styles.button}
              onPress={moveBtn}
            >
              <Text style={styles.buttonText}>Click Me</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: 'gray',
    padding: 20,
    borderRadius: 10,
  },
  alignRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  buttonText: {
    color: 'white',
  },
});

export default App;
