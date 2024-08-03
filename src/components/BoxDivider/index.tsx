import { PropsWithChildren } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

const BoxDivider = ({ style, children }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) => {
    return (
        <View
            style={{
                padding: 16,
                borderRadius: 8,
                borderTopWidth: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderBottomWidth: 1,
                borderColor: '#e3e3e3',
                ...(style as object),
            }}
        >
            {children}
        </View>
    );
};

export default BoxDivider;
