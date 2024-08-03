import { useEffect, useState } from 'react';
import { Dimensions, StyleProp, ViewStyle } from 'react-native';
import { FAB } from 'react-native-paper';

const PlusButton = ({
    style,
    onPress,
    inverted = true,
}: {
    inverted?: boolean;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}) => {
    const [color, setColor] = useState({
        background: '#2196F3',
        text: '#fff',
    });

    useEffect(() => {
        if (inverted) {
            setColor({
                background: '#fff',
                text: '#2196F3',
            });
        }
    }, [inverted]);

    return (
        <FAB
            icon="plus"
            color={color.text}
            style={{
                ...(style as object),
                backgroundColor: color.background,
                shadowColor: '#000000',
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.2,
                shadowRadius: 5.62,
                elevation: 20,
                borderRadius: Dimensions.get('window').width * 0.5,
                width: 60,
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onPress={onPress}
        />
    );
};

export default PlusButton;
