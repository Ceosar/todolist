import React, { useState, useEffect } from 'react'
import "./CreateTexCart.scss"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';
import dataJson from './data.json'
import { AiOutlinePlusCircle } from 'react-icons/ai'

export default function CreateTexCart() {

    const [texCart, setTexCart] = useState({});
    const [activFaz, setActivFaz] = useState(-1);

    const [nameFaza, setNameFaza] = useState('');
    const [textDisc, setTextDisc] = useState('');
    const [quillText, setQuillText] = useState('');

    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    const handleChange = (selectedOption) => {
        console.log('Выбранное значение:', selectedOption);
    };

    const saveActivFaze = (id, flag = true) => {
        if (flag) {
            setActivFaz(-1)
        }

        let newtexCart = texCart
        newtexCart[id].name = nameFaza
        newtexCart[id].podFaz[0].description = textDisc
        setTexCart(newtexCart)
    }

    const sellectActivFaze = (id) => {
        if (activFaz != -1) {
            saveActivFaze(activFaz, false)
        }
        setActivFaz(id)
        setNameFaza(texCart[id].name)
        setTextDisc(texCart[id].podFaz[0].description)

    }


    const addFaze = () => {

        let newtexCart = { ...texCart };
        newtexCart[Object.keys(newtexCart).length] = {
            "name": "Новая фаза",
            "podFaz": [
                {
                    "description": ""
                }
            ],
            "components": []
        };
        setTexCart(newtexCart);

    }

    const dellFaze = (id) => {

        let newtexCart = {};
        setActivFaz(-1)
        for (let key in texCart) {
            if (texCart.hasOwnProperty(key)) {
                const index = Object.keys(texCart).indexOf(key);
                if (index != id) {
                    newtexCart[Object.keys(newtexCart).length] = texCart[key];
                }
            }
        }

        console.log(newtexCart)

        setTexCart(newtexCart);

    }

    return (
        <>
            <div className='add-contaner'>
                {Object.keys(texCart).map((id, index) => (
                    <div className={'faza ' + (activFaz == index ? "active" : "")} key={index}  draggable="true">
                        {activFaz == index && (
                            <>
                                <input type="text" value={nameFaza} onChange={(e) => setNameFaza(e.target.value)} placeholder="Название фазы" ></input>
                                <p>Этапы фазы</p>
                                <div className="textdisc">
                                    <ReactQuill value={textDisc} onChange={(value) => setTextDisc(value)} />
                                </div>
                                <p>Компоненты</p>
                                <div className="selectKomponents">
                                    <div className="selektComp">
                                        <Select
                                            options={options}
                                            isSearchable={true} // Включает поддержку поиска
                                            onChange={handleChange}
                                            className="custom-select"
                                            classNamePrefix="custom-select"
                                            placeholder="Компонент"

                                        />
                                    </div>
                                    <div className="selektComp">
                                        <Select
                                            options={options}
                                            isSearchable={true} // Включает поддержку поиска
                                            onChange={handleChange}
                                            placeholder="Компонент"

                                        />
                                    </div>
                                    <div className="selektComp">
                                        <Select
                                            options={options}
                                            isSearchable={true} // Включает поддержку поиска
                                            onChange={handleChange}
                                            placeholder="Компонент"
                                        />
                                    </div>
                                </div>
                                <div className="butns">
                                    <button className='save-btn' onClick={() => saveActivFaze(index)}>Сохранить</button>
                                    <button className='del-btn  ' onClick={() => dellFaze(index)}>Удалить</button>
                                </div>
                            </>
                        )}
                        {activFaz != index && (
                            <div className="name" onClick={() => sellectActivFaze(id)}>{texCart[id].name}</div>
                        )}
                    </div>
                ))}
                <AiOutlinePlusCircle className='AddFaz' onClick={addFaze} />
            </div>
        </>
    )
}