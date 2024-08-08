import { Colors } from '@/constants/Colors';
import BoxDivider from '../BoxDivider';
import { PropsWithChildren, SetStateAction } from 'react';
import { Button, Card, IconButton, Text, TextInput } from 'react-native-paper';
import { FormikErrors, FormikProps } from 'formik';
import { IFormCategoryValues } from '@/utils/data';
import RenderCondition from '../RenderCondition';
import { resetKeys } from '@/utils/arrObj';
import { generateRandomString } from '@/utils/strNumber';

const FormCategoryContainer = ({
    children,
    formik,
    index,
}: PropsWithChildren<{
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
    index: number;
}>) => {
    return (
        <BoxDivider
            style={{
                marginBottom: 30,
            }}
        >
            <TextInput
                label="Container Title"
                mode="flat"
                style={{
                    flexGrow: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: '#C1C1C1',
                }}
                value={formik.values[index].container_title}
                onChangeText={(value) => {
                    formik.values[index].container_title = value;
                    formik.setValues([...formik.values]);
                }}
                blurOnSubmit
            />

            {children}

            <RenderCondition
                firstCondition={Object.keys(formik.values).length > 1}
                renderWhenTrue={
                    <IconButton
                        icon="close"
                        mode="contained"
                        iconColor='white'
                        style={{
                            marginTop: 20,
                            position: 'absolute',
                            left: '50%',
                            top: 0,
                            transform: [
                                {
                                    translateY: -40
                                }
                            ],
                            borderWidth: 1,
                            backgroundColor: Colors.red.material,
                            borderColor: Colors.red.material
                        }}
                        onPress={() => {
                            formik.setValues([
                                ...formik.values.filter((_, indexContainer) => indexContainer !== index),
                            ]);
                        }}
                    />
                }
            />
        </BoxDivider>
    );
};

export default FormCategoryContainer;
