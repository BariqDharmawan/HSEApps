import { Colors } from '@/constants/Colors';
import { EvilIcons } from '@expo/vector-icons';
import { GestureResponderEvent } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

const CloseButton = ({
    onPress,
}: {
    onPress: (((event: GestureResponderEvent) => void) & ((e: GestureResponderEvent) => void)) | undefined;
}) => {
    return (
        <TouchableRipple
            onPress={onPress}
            rippleColor="rgba(0, 0, 0, .32)"
            style={{
                position: 'absolute',
                backgroundColor: Colors.white,
                borderRadius: 20,
                right: 0,
                top: 0,
                transform: [
                    {
                        translateX: 18,
                    },
                    {
                        translateY: -15,
                    },
                ],
            }}
        >
            <EvilIcons name="close-o" size={40} color="black" />
        </TouchableRipple>
    );
};

export default CloseButton;
