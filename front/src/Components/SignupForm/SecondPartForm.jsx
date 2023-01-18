import React,  { useContext } from 'react'; 
import { NavLink } from 'react-router-dom';
import Select from 'react-select'; 
import Button from '../Button/Button';
import { TechnologiesByCategoryContext } from '../../Context/TechnologiesByCategoryContext';

function SecondPartForm() {

    const { groupedOptions, speciality } = useContext(TechnologiesByCategoryContext); 

    const handleChange = ( selectedOption ) => {
        console.log('hanldleChange', selectedOption)
    } 

    const colorStyles = {
        control : (styles) => ({...styles, backgroundColor: '#FFFFFF', opacity : '0.7'}), 
        option : (styles, { data, isFocused }) => {
            return {
                ...styles, 
                color: isFocused ? 'white' : 0, 
                backgroundColor : isFocused ? data.color : 0
            }
        }, 
        multiValue : (styles, { data }) => {
            return{
                ...styles, 
                backgroundColor : data.color, 
                color : '#FFFF'
            }
        }, 
        multiValueLabel: (styles, { data }) => {
            return {
                ...styles, 
                color: '#FFFF'
            }
        }, 
        multiValueRemove: (styles, { data }) => {
            return {
                ...styles, 
                color: '#FFFF', 
                cursor: 'pointer', 
                ':hover' : { 
                    color : '#e32e45'
                }
            }
        }
    }
    return (
        <>

            <div className="required field">
                <label>Spécialité</label>
                <Select  
                    placeholder="Votre spécialité"
                    options={ speciality }
                    onChange={ handleChange }
                    styles = { colorStyles } 
                />
            </div>

            <div className="required field">
                <label>Description</label>
                <textarea rows='5' placeholder="Dites en plus sur vous ! Un profil avec une desciption a plus de visibilité. "></textarea>
            </div>

            <div className="required field SignupForm_technologies">
                <label className='SignupForm_technologies_title'>Quelles sont les technologies que vous maîtrisez ? </label>
                <Select  
                    placeholder="Vos technologies"
                    options={ groupedOptions }
                    isMulti
                    onChange={ handleChange } 
                    styles = { colorStyles } 
                />
            </div>
            
            <div className='SignupForm_checkbox-required'>
                <div className="required inline field">
                    <div className="ui checkbox">
                        <input type="checkbox" name='conditions' className="hidden" />
                        <label>J'accepte les conditions générales</label>
                    </div>
                </div>

                <div className="required inline field">
                    <div className="ui checkbox">
                        <input type="checkbox" name='politic' className="hidden" />
                        <label>J'accepte la politique de confidentialité relative au traitement de mes données personnelles</label>
                    </div>
                </div>
            </div>

            <p className='required_information'> * champs obligatoires</p>

            <div className='SignupForm_buttons-container'>
                <Button
                    text="S'inscrire"
                    type='submit'
                />
                <NavLink className='link'>ou <span>se</span> connecter</NavLink>
            </div>
        </>
    )
}

export default React.memo(SecondPartForm)