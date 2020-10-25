import React, { useState } from 'react';
import moment from 'moment';

import './FormBody.scss';

import FormCard from '../FormCard/FormCard';
import Button from '../Button/Button';
import Input from '../Inputs/Input/Input';
import Textarea from '../Inputs/Textarea/Textarea';
import Select from '../Inputs/Select/Select';
import InputDOB from '../Inputs/InputDOB/InputDOB';

const FormBody = () => {
    const [cards, setCards] = useState({
        card1: { id: 1, show: true },
        card2: { id: 2, show: false },
        card3: { id: 3, show: false }
    });

    const [step1, setStep1] = useState({
        fName: {
            value: '', 
            label: 'First Name',
            valid: true, 
            err: ''
        },
        sName: {
            value: '', 
            label: 'Surname',
            valid: true, 
            err: ''
        },        
        email: {
            value: '', 
            label: 'Email Address',
            valid: true, 
            err: ''
        },
    })

    const [step2, setStep2] = useState({
        tel: {
            value: '', 
            label: 'Telephone number',
            valid: true, 
            err: ''
        },
        gender: {
            value: 'Select Gender', 
            label: 'Gender',
            valid: true, 
            err: ''
        },
        dob: {
            value: '',
            label: 'Date of birth',
            valid: true, 
            err: ''
        },
    })
    const [step3, setStep3] = useState({
        comment: {
            value: '', 
            label: 'Comments',
            valid: true, 
            err: ''
        },
    })

    const sendData = () => {
        axios({
            method: 'post',
            url: 'http://localhost/react-laravel/public/save',
            data: {
                fname:  step1.fName.value,
                sname:  step1.sName.value,
                email:  step1.email.value,
                mobile:  step2.tel.value,
                gender:  step2.gender.value,
                dob:  step2.dob.value,
                comments:  step3.comment.value,
            }
        }).then(res => {
            window.alert(
                "Saved!" + JSON.stringify(res.data)
                )
            console.log(res.data)
        }
            )
    }

    const handleButton = (id, form) => {

        let validetedForm

        switch (form) {
            case 'step1' :
                validetedForm = validateStep1()
                break
            case 'step2' :
                validetedForm = validateStep2()
                break
            case 'step3' :
                validateStep3()
                validetedForm = validateStep1()
                validetedForm = validateStep2()
                break
            default:
                validetedForm = true
        }
        
        if (validetedForm) handleCollapse(id)

    }

    const handleCollapse = (id) => {

        id = 'card' + id;

        let copy = {...cards}

        for(let x in copy) {

            x===id ? copy[x] = {...copy[x], show: true} : copy[x] = {...copy[x], show: false}

        }
        setCards(copy)
    }

    const handleChange = (event, key, form, formName) => {
        switch ( formName ) {
            case 'step1' : 
                setStep1({...form, [key]: {...form[key], value: event.target.value}})
                break
            case 'step2' :
                setStep2({...form, [key]: {...form[key], value: event.target.value}})
                break
            case 'step3' :
                setStep3({...form, [key]: {...form[key], value: event.target.value}})
                break
            default :
        }
    }

    const checkFormIsValid = (form) => {
        let valid = true;
        for ( const key in form) {
            if (!form[key].valid) {
                valid = form[key].valid
            }
        }
        return valid
    }

    const validateStep1 = () => {
        let copy = {...step1};

        for(const key in copy) {
            if(key === 'email') {

                if (step1[key].value.trim() === '' ) {
                    copy = {...copy,  [key]: {...copy[key], valid: false, err: "This field is required!"}}
                }
                else if(!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(step1[key].value)) {
                    copy = {...copy,  [key]: {...copy[key], valid: false, err: "Please enter a valid email"}}
                }
                else {
                    copy = {...copy,  [key]: {...copy[key], valid: true, err: ""}}
                }
            }else{
                if ( step1[key].value.trim() === '' ) {
                    copy = {...copy,  [key]: {...copy[key], valid: false, err: "This field is required!"}}
                }
                else {
                    copy = {...copy,  [key]: {...copy[key], valid: true, err: ""}}
                }
            }
        }
        setStep1(copy)
        return checkFormIsValid(copy)
    }

    const validateStep2 = () => {
        let copy = {...step2};   

        for(const key in copy) {
            if (key === 'tel') {
                if ( step2[key].value.trim() === ''  ) {
                    copy = {...copy,  [key]: {...copy[key], valid: false, err: "This field is required!"}}
                }
                else if(!/(((\+44)? ?(\(0\))? ?)|(0))( ?[0-9]{3,4}){3}/.test(step2[key].value)) {
                    console.log('Phone number must be valid UK number')
                    copy = {...copy,  [key]: {...copy[key], valid: false, err: "Phone number must be valid UK number!"}}
                }
                else {
                    copy = {...copy,  [key]: {...copy[key], valid: true, err: ""}}
                }
            }

            else if (key === 'gender') {
                if ( step2[key].value === 'Select Gender'  ) {
                    copy = {...copy,  [key]: {...copy[key], valid: false, err: "This field is required!"}}
                }
                else {
                    copy = {...copy,  [key]: {...copy[key], valid: true, err: ""}}
                }

            }
            else if (key === 'dob') {

                const now = moment(Date());

                if ( step2[key].value.trim() === ''  ) {
                    copy = {...copy,  [key]: {...copy[key], valid: false, err: "This field is required!"}}
                }
                else if ( now < moment(step2.dob.value) ) {
                    copy = {...copy,  [key]: {...copy[key], valid: false, err: "Hi, time traveler! I'm sure you are older than this!"}}
                }
                else if ( !moment(step2.dob.value).isValid() ) {
                    copy = {...copy,  [key]: {...copy[key], valid: false, err: "Please provide valid date ('yyyy-mm-dd')"}}
                }
                else {
                    copy = {...copy,  [key]: {...copy[key], valid: true, err: ""}}
                }
            }
        }
        setStep2(copy)

        return checkFormIsValid(copy)
    }

    const validateStep3 = () => {

        let validetedForm

        validetedForm = validateStep1()
        validetedForm = validateStep2()
                
        if (validetedForm) {
            sendData();
        }
        else {
            window.alert('Pleas fill up all fields!')
        }
    }

    const handleDOBInput = (date) => {
        setStep2({...step2, dob: {...step2.dob, value: date}})
    }

    return (
        <div className="formBody">
            <form>
                <FormCard title="Step 1: Your details" clicked={handleCollapse} cards={cards.card1} >
                    <Input 
                        label={step1.fName.label} 
                        value={step1.fName.value}
                        errMess={!step1.fName.valid && step1.fName.err}
                        changed={(event) => handleChange(event, 'fName', step1, 'step1')} />
                    <Input 
                        label={step1.sName.label} 
                        value={step1.sName.value}
                        errMess={!step1.sName.valid && step1.sName.err}
                        changed={(event) => handleChange(event, 'sName', step1, 'step1')} />
                    <Input 
                        label={step1.email.label} 
                        value={step1.email.value}
                        errMess={!step1.email.valid && step1.email.err}
                        changed={(event) => handleChange(event, 'email', step1, 'step1')} />
                    <Button clicked={() => handleButton(2, 'step1')} />
                </FormCard>
                <FormCard title="Step 2: More comments" clicked={handleCollapse} cards={cards.card2}>
                    <Input 
                        label={step2.tel.label} 
                        value={step2.tel.value}
                        errMess={!step2.tel.valid && step2.tel.err}
                        changed={(event) => handleChange(event, 'tel', step2, 'step2')} />
                    <Select 
                        label={step2.gender.label} 
                        value={step2.gender.value}
                        errMess={!step2.gender.valid && step2.gender.err}
                        changed={(event) => handleChange(event, 'gender', step2, 'step2')} />
                    <InputDOB 
                        label={step2.dob.label} 
                        value={step2.dob.value}
                        errMess={!step2.dob.valid && step2.dob.err}
                        changed={(date) => handleDOBInput(date)} />
                    <Button clicked={() => handleButton(3, 'step2')} />
                </FormCard>
                <FormCard title="Step 3: Final comments" clicked={handleCollapse} cards={cards.card3}>
                    <Textarea 
                        label={step3.comment.label} 
                        value={step3.comment.value}
                        errMess={!step3.comment.valid && step3.comment.err}
                        changed={(event) => handleChange(event, 'comment', step3, 'step3')} />
                    <Button clicked={() => handleButton(1, 'step3')} />
                </FormCard>
            </form>
        </div>
    )
}

export default FormBody;