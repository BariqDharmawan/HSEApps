import { Button, IconButton, TextInput } from 'react-native-paper';
import BoxDivider from '../BoxDivider';
import RenderCondition from '../RenderCondition';
import { StyleProp, View, ViewStyle } from 'react-native';
import { PropsWithChildren, SetStateAction } from 'react';
import CloseButton from '../CloseButton';
import { inputTypes, TInputValue } from '@/constants/select-options';
import RadioLabel from '../RadioLabel';
import { IFormCategoryValues, IInitInputSection } from '@/utils/data';
import { FormikErrors, FormikProps } from 'formik';
import { isCheckedOrUnchecked } from '@/utils/strNumber';

const FormCategoryInputs = ({
    onDelete,
    style,
    formik,
    currentDropdown,
    indexSection,
    indexInput,
    indexContainer,
}: PropsWithChildren<{
    indexContainer: number;
    currentDropdown: string[];
    onDelete: () => void;
    style?: StyleProp<ViewStyle>;
    formik: {
        initialValues: IFormCategoryValues[];
        setFieldValue: (
            field: string,
            value: any,
            shouldValidate?: boolean
        ) => Promise<void> | Promise<(FormikErrors<IFormCategoryValues> | undefined)[]>;
        setValues: (
            values: SetStateAction<IFormCategoryValues[]>,
            shouldValidate?: boolean
        ) => Promise<void> | Promise<(FormikErrors<IFormCategoryValues> | undefined)[]>;
        values: IFormCategoryValues[];
    };
    indexSection: number;
    indexInput: number;
}>) => {
    const currentField = formik.values[indexContainer].section[indexSection].inputs[indexInput];
    return (
        <BoxDivider
            style={{
                position: 'relative',
                ...(style as object),
            }}
        >
            <RenderCondition firstCondition={indexInput !== 0} renderWhenTrue={<CloseButton onPress={onDelete} />} />

            <TextInput
                label="Label input"
                mode="flat"
                style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#C1C1C1',
                }}
                value={currentField.input_label}
                onChangeText={(value) => {
                    currentField.input_label = value;
                    formik.setValues([...formik.values]);
                }}
                blurOnSubmit
            />

            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    flexWrap: 'wrap',
                }}
            >
                {inputTypes.map((type, indexType) => (
                    <View
                        key={`each-type-${indexType}`}
                        style={{
                            width: '50%',
                        }}
                    >
                        <RadioLabel
                            label={type.value}
                            onPress={() => {
                                currentField.input_type = type.value;

                                formik.setValues([...formik.values]);
                            }}
                            value={type.value}
                            status={isCheckedOrUnchecked(currentField.input_type === type.value)}
                        />
                    </View>
                ))}
            </View>
            <RenderCondition
                firstCondition={currentField.input_type === 'dropdown'}
                renderWhenTrue={
                    <>
                        {currentDropdown.map((dropdown, indexDropdown) => (
                            <View key={`each-dropdown-${indexSection}-${indexInput}-${indexDropdown}`}>
                                <TextInput
                                    label={`Option ${indexDropdown + 1}`}
                                    mode="outlined"
                                    style={{
                                        borderBottomWidth: 1,
                                        borderBottomColor: '#C1C1C1',
                                        flex: 1,
                                    }}
                                    value={dropdown}
                                    onChangeText={(value) => {
                                        currentField.input_dropdown[indexDropdown] = value;
                                        formik.setValues([...formik.values]);
                                    }}
                                    blurOnSubmit
                                />
                                <RenderCondition
                                    firstCondition={currentDropdown.length > 1}
                                    renderWhenTrue={
                                        <IconButton
                                            icon="close"
                                            mode="contained-tonal"
                                            size={20}
                                            style={{
                                                position: 'absolute',
                                                right: 0,
                                                top: '50%',
                                                transform: [
                                                    {
                                                        translateY: -20,
                                                    },
                                                ],
                                            }}
                                            onPress={() => {
                                                const restDropdown = currentField.input_dropdown.filter(
                                                    (_, indexInputDropdown) => indexInputDropdown !== indexDropdown
                                                );

                                                currentField.input_dropdown = restDropdown;

                                                formik.setValues([...formik.values]);
                                            }}
                                        />
                                    }
                                />
                            </View>
                        ))}
                        <Button
                            mode="text"
                            style={{
                                alignSelf: 'flex-start',
                            }}
                            onPress={() => {
                                currentField.input_dropdown = [...currentDropdown, ''];

                                formik.setValues([...formik.values]);
                            }}
                        >
                            Tambah option
                        </Button>
                    </>
                }
            />
        </BoxDivider>
    );
};

export default FormCategoryInputs;
