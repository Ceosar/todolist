import React, { useState, useEffect } from 'react'
import "./CreateTexCart.scss"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';
import dataJson from './data.json'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import EditorToolbar, { modules, formats } from "./Editortoobar.jsx";
import { BsTrash3 } from 'react-icons/Bs';
import { GiSettingsKnobs } from 'react-icons/gi'

export default function CreateTexCart() {

    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    const [texCart, setTexCart] = useState(dataJson);
    const [activFaz, setActivFaz] = useState(-1);
    const [nameFaza, setNameFaza] = useState('');
    const [textDisc, setTextDisc] = useState('');
    const [selektComponent, setSelektComponent] = useState({});
    const [temp, setTemp] = useState("");
    const [otherParms, setOtherParms] = useState({});


    const saveActivFaze = (id, flag = true) => {
        if (flag) {
            setActivFaz(-1)
        }
        let newtexCart = { ...texCart };
        newtexCart[id].name = nameFaza;
        newtexCart[id].podFaz[0].description = textDisc;
        let newComponents = []
        for (let value in selektComponent) {
            newComponents.push({ "name": selektComponent[value].name, "colvo": selektComponent[value].colvo })
        }
        newtexCart[id].components = newComponents
        if (temp != '') {
            newtexCart[id].parms.temp = temp
        }

        let newParms = []
        for (let value in otherParms) {
            newParms.push(otherParms[value])
        }
        newtexCart[id].parms.other = newParms


        setTexCart(newtexCart);
    };

    const sellectActivFaze = (id) => {
        if (activFaz !== -1) {
            saveActivFaze(activFaz, false);
        }
        setActivFaz(id);
        setNameFaza(texCart[id].name);
        setTextDisc(texCart[id].podFaz[0].description);
        let newComponents = {}
        texCart[id].components.map((value, index) => {
            newComponents[index] = value
        })
        if (Object.keys(newComponents).length == 0) {
            newComponents = {
                0: {
                    "name": "",
                    "colvo": ""
                }
            }
        }

        let newParms = {}

        texCart[id].parms.other.map((value, index) => {
            newParms[index] = value
        })

        if (Object.keys(newParms).length == 0) {
            newParms = {
                0: ""
            }
        }

        setTemp(texCart[id].parms.temp)

        setSelektComponent(newComponents)

        setOtherParms(newParms)
    };

    const addFaze = () => {
        let newtexCart = { ...texCart };
        newtexCart[Object.keys(newtexCart).length] = {
            "name": "Новая фаза",
            "podFaz": [
                {
                    "description": ""
                }
            ],
            "components": [],
            "parms": {
                "temp": "",
                "other": [
                ]
            }
        };
        setTexCart(newtexCart);
    };

    const addComp = () => {
        let newComponent = { ...selektComponent };
        newComponent[Object.keys(newComponent).length] = {
            "name": "",
            "colvo": ""
        };
        setSelektComponent(newComponent);
    };

    const addParm = () => {

        let newParm = { ...otherParms };
        newParm[Object.keys(newParm).length] = "";
        setOtherParms(newParm);
    };


    const dellFaze = (id) => {
        let newtexCart = {};
        setActivFaz(-1);
        for (let key in texCart) {
            if (texCart.hasOwnProperty(key)) {
                const index = Object.keys(texCart).indexOf(key);
                if (index !== id) {
                    newtexCart[Object.keys(newtexCart).length] = texCart[key];
                }
            }
        }
        setTexCart(newtexCart);
    };

    const dellComp = (id) => {
        let newselektComponent = {};
        for (let key in selektComponent) {
            if (selektComponent.hasOwnProperty(key)) {
                const index = Object.keys(selektComponent).indexOf(key);
                if (index !== id) {
                    newselektComponent[Object.keys(newselektComponent).length] = selektComponent[key];
                }
            }
        }
        setSelektComponent(newselektComponent);
    };

    const dellParm = (id) => {
        let newParm = {};
        for (let key in otherParms) {
            if (otherParms.hasOwnProperty(key)) {
                const index = Object.keys(otherParms).indexOf(key);
                if (index !== id) {
                    newParm[Object.keys(newParm).length] = otherParms[key];
                }
            }
        }
        setOtherParms(newParm);
    };

    const handleDragStart = (event, index) => {
        event.dataTransfer.setData('text/plain', index.toString());
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event, newIndex) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        const draggedIndex = parseInt(data);
        if (draggedIndex !== newIndex) {
            const newTexCart = Object.values(texCart).map((item, index) => {
                if (index === draggedIndex) return texCart[newIndex];
                if (index === newIndex) return texCart[draggedIndex];
                return item;
            });
            setTexCart(Object.fromEntries(newTexCart.map((item, index) => [index, item])));
        }
    };


    const selektComp = (id, item) => {
        let oldCOmp = { ...selektComponent }
        oldCOmp[id].name = item
        setSelektComponent(oldCOmp)
    }

    const selektVes = (id, ves) => {
        let oldCOmp = { ...selektComponent }
        oldCOmp[id].colvo = ves
        setSelektComponent(oldCOmp)
    }

    const selektParm = (id, parm) => {
        let oldParm = { ...otherParms }
        oldParm[id] = parm
        setOtherParms(oldParm)
    }

    return (
        <>
            <div className='add-contaner'>
                {Object.keys(texCart).map((id, index) => (

                    <div
                        className={'faza ' + (activFaz == index ? "active" : "")}
                        key={index}
                        draggable={activFaz == index ? "false" : "true"}
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={(e) => handleDragOver(e)}
                        onDrop={(e) => handleDrop(e, index)}
                    >
                        {activFaz == index && (
                            <>
                                <input type="text" value={nameFaza} onChange={(e) => setNameFaza(e.target.value)} placeholder="Название фазы" ></input>
                                <p>Этапы фазы</p>
                                <div className="textdisc">
                                    <EditorToolbar />
                                    <ReactQuill value={textDisc}
                                        onChange={(value) => setTextDisc(value)}
                                        theme="snow"
                                        placeholder={"Опишите этапы фазы"}
                                        modules={modules}
                                        formats={formats}
                                    />
                                </div>
                                <p>Компоненты</p>
                                <div className="selectKomponents">
                                    {Object.keys(selektComponent).map((component, index) => (
                                        <div className="selektComp" key={index}>
                                            <div className="comp">
                                                <BsTrash3 className='DellComp' onClick={() => dellComp(index)} />
                                                <Select
                                                    options={options}
                                                    isSearchable={true}
                                                    onChange={(selectedOption) => selektComp(index, selectedOption.value)}
                                                    className="custom-select"
                                                    classNamePrefix="custom-select"
                                                    placeholder="Компонент"
                                                    defaultValue={selektComponent[index].name != "" ? { value: selektComponent[index].name, label: selektComponent[index].name } : false}
                                                />
                                                <input className='ves' type="text" value={selektComponent[index].colvo} onChange={(e) => selektVes(index, e.target.value)} placeholder="Вес" ></input>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <AiOutlinePlusCircle className='AddComp' onClick={addComp} />
                                <p>Температура</p>
                                <input className='ves' type="text" value={temp} onChange={(e) => setTemp(e.target.value)} placeholder="Температура" ></input>
                                <p>Остальные параметры</p>
                                <div className="otherParms">
                                    {Object.keys(otherParms).map((component, index) => (
                                        <div className="otherParm" key={index}>
                                            <div className="parm">
                                                <BsTrash3 className='DellParm' onClick={() => dellParm(index)} />
                                                <input className='ves' type="text" value={otherParms[index]} onChange={(e) => selektParm(index, e.target.value)} placeholder="Параметр" ></input>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <AiOutlinePlusCircle className='AddComp' onClick={addParm} />
                                <div className="butns">
                                    <button className='save-btn' onClick={() => saveActivFaze(index)}>Сохранить</button>
                                    <button className='del-btn  ' onClick={() => dellFaze(index)}>Удалить</button>
                                </div>

                            </>
                        )}
                        {activFaz != index && (
                            <>
                                <div className="stats">
                                    <div className="name" >{texCart[id].name}</div>
                                    <div className="cplvoComp">Всего компонентов - {texCart[id].components.length}</div>
                                </div>
                                <GiSettingsKnobs className='SettingsFaz' onClick={() => sellectActivFaze(id)} />
                            </>
                        )}
                    </div>
                ))}
                <AiOutlinePlusCircle className='AddFaz' onClick={addFaze} />
            </div>
        </>
    )
}
