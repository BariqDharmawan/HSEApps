import { TInputValue } from "@/constants/select-options";
import { useState } from "react";
import { List, Modal, Portal, TextInput } from "react-native-paper";
import SwitcherLabel from "../SwitcherLabel";
import { TouchableOpacity, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

const FormControl = ({type, label, onChangeText, value, options}: {options?: {label: string; value?: string | number | boolean}[], value: string; onChangeText: (((text: string) => void) & Function); label: string; type: TInputValue}) => {
    const [openDialog, setOpenDialog] = useState(false)

    if (type === 'dropdown') {
        if (options === undefined) {
            throw new Error('"options" is not set')
        }

        return (
            <>
                <TouchableOpacity onPress={() => {
                        setOpenDialog(true)
                    }}>
                <TextInput
                    mode="outlined"
                    label={label}
                    value={value}
                    placeholder={`Choose ${label}`}
                    
                    outlineColor="#C5C6CC"
                    readOnly
                />

<AntDesign name="down" size={24} color="black" />
                </TouchableOpacity>

                <Portal>
                    
                    <Modal visible={openDialog} dismissableBackButton onDismiss={() => setOpenDialog(false)}
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    }}
                    contentContainerStyle={{
                        padding: 20,
                        
                    }}>
                        <View style={{
                            backgroundColor: 'white',
                            borderRadius: 12,
                            borderWidth: 1,
                            borderColor: '#E4E4E4'
                        }}>
                        {options.map(option => (
                            <List.Item title={option.label} />
                        ))}
                        </View>
                    </Modal>
                </Portal>
            </>
        )
    }

    if (type === 'textarea') {
        return (
            <TextInput outlineColor="#C5C6CC" mode="outlined" label={label} onChangeText={onChangeText} value={value} placeholder={`Please fill ${label}`} multiline/>
        )
    }

    if (type === 'switcher') {
        return <SwitcherLabel label={label} onValueChange={(isChecked) => onChangeText('')}/>
    }

    return (
        <TextInput outlineColor="#C5C6CC" mode="outlined" label={label} onChangeText={onChangeText} value={value} placeholder={`Please fill ${label}`} />
    )
}
 
export default FormControl;