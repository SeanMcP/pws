import React from 'react'
import { navigate } from '@reach/router'
import { Formik } from 'formik'
import ROUTES from 'constants/routes'
import { useItems } from 'store/useItems'
import ViewContainer from 'components/ViewContainer/ViewContainer'
import { Form, FormFooter } from 'components/Form/Form'
import Button from 'components/Button/Button'
import ITEMS from 'constants/items'
import * as ItemFields from 'components/Form/ItemFields'
import { initialValues, validationSchema } from 'schemas/item'

function AddItemView({ type }) {
    const [, { add }] = useItems()

    function onSubmit(values) {
        const { date, dateType, name, notes } = values

        add({
            date,
            dateType: date ? dateType : null,
            name,
            notes,
            type
        })

        navigate(ROUTES.list)
    }

    return (
        <ViewContainer
            backTo={ROUTES.add}
            title={`Add ${ITEMS.types[type].display}`}
        >
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <ItemFields.Name autoFocus />
                        <ItemFields.Date />
                        <ItemFields.DateType />
                        <ItemFields.Notes />
                        <FormFooter>
                            <Button type="submit" primary>Add</Button>
                            <Button type="reset">Reset</Button>
                        </FormFooter>
                    </Form>
                )}
            </Formik>
        </ViewContainer>
    )
}

export default AddItemView
