import React from 'react'
import { navigate } from '@reach/router'
import ROUTES from 'constants/routes'
import { useIndividuals } from 'store/useIndividuals'
import ViewContainer from 'components/ViewContainer/ViewContainer'
import { Form, InputField, TextareaField } from 'components/Form/Form'
import Button from 'components/Button/Button'

function AddView() {
    const [, { add }] = useIndividuals()
    function handleSubmit(event) {
        event.preventDefault()
        const form = event.target
        const formData = new FormData(form)
        const name = formData.get('name'),
            birthday = formData.get('birthday'),
            notes = formData.get('notes')
        if (name) {
            add({ name, birthday, notes })
            form.reset()
            navigate(ROUTES.all)
        }
    }
    return (
        <ViewContainer title="Add">
            <Form onSubmit={handleSubmit}>
                <InputField label="Name" name="name" autoFocus />
                <InputField label="Birthday" name="birthday" type="date" />
                <TextareaField label="Notes" name="notes" />
                <Button>Add</Button>
            </Form>
        </ViewContainer>
    )
}

export default AddView
