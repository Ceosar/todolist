import React, { useState, useEffect } from 'react'
import "./Createtask.scss"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import EditorToolbar, { modules, formats } from "./Editortoobar.jsx";
import { BsTrash3 } from 'react-icons/Bs';
import { GiSettingsKnobs } from 'react-icons/gi'

export default function Createtask() {

    const [task, settask] = useState({});
    const [activTask, setactivTask] = useState(-1);
    const [nameTask, setnameTask] = useState('');
    const [textDisc, setTextDisc] = useState('');
    const [selektEtaps, setselektEtaps] = useState({});
    const [otherParms, setOtherParms] = useState({});


    const saveactivTaske = (id, flag = true) => {
        if (flag) {
            setactivTask(-1)
        }
        let newtask = { ...task };
        newtask[id].name = nameTask;
        newtask[id].podFaz[0].description = textDisc;
        let newComponents = []
        for (let value in selektEtaps) {
            newComponents.push({ "name": selektEtaps[value].name, "colvo": selektEtaps[value].colvo })
        }
        newtask[id].components = newComponents
        if (temp != '') {
            newtask[id].parms.temp = temp
        }

        let newParms = []
        for (let value in otherParms) {
            newParms.push(otherParms[value])
        }
        newtask[id].parms.other = newParms


        settask(newtask);
    };

    const sellectactivTaske = (id) => {
        if (activTask !== -1) {
            saveactivTaske(activTask, false);
        }
        setactivTask(id);
        setnameTask(task[id].name);
        setTextDisc(task[id].podFaz[0].description);
        let newComponents = {}
        task[id].components.map((value, index) => {
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

        task[id].parms.other.map((value, index) => {
            newParms[index] = value
        })

        if (Object.keys(newParms).length == 0) {
            newParms = {
                0: ""
            }
        }

        setTemp(task[id].parms.temp)

        setselektEtaps(newComponents)

        setOtherParms(newParms)
    };

    const addFaze = () => {
        let newtask = { ...task };
        newtask[Object.keys(newtask).length] = {
            "name": "Новая задача",
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
        settask(newtask);
    };

    const addComp = () => {
        let newComponent = { ...selektEtaps };
        newComponent[Object.keys(newComponent).length] = {
            "name": "",
            "colvo": ""
        };
        setselektEtaps(newComponent);
    };

    const addParm = () => {

        let newParm = { ...otherParms };
        newParm[Object.keys(newParm).length] = "";
        setOtherParms(newParm);
    };


    const dellFaze = (id) => {
        let newtask = {};
        setactivTask(-1);
        for (let key in task) {
            if (task.hasOwnProperty(key)) {
                const index = Object.keys(task).indexOf(key);
                if (index !== id) {
                    newtask[Object.keys(newtask).length] = task[key];
                }
            }
        }
        settask(newtask);
    };

    const dellComp = (id) => {
        let newselektEtaps = {};
        for (let key in selektEtaps) {
            if (selektEtaps.hasOwnProperty(key)) {
                const index = Object.keys(selektEtaps).indexOf(key);
                if (index !== id) {
                    newselektEtaps[Object.keys(newselektEtaps).length] = selektEtaps[key];
                }
            }
        }
        setselektEtaps(newselektEtaps);
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
            const newtask = Object.values(task).map((item, index) => {
                if (index === draggedIndex) return task[newIndex];
                if (index === newIndex) return task[draggedIndex];
                return item;
            });
            settask(Object.fromEntries(newtask.map((item, index) => [index, item])));
        }
    };


    const selektComp = (id, item) => {
        let oldCOmp = { ...selektEtaps }
        oldCOmp[id].name = item
        setselektEtaps(oldCOmp)
    }

    const selektVes = (id, ves) => {
        let oldCOmp = { ...selektEtaps }
        oldCOmp[id].colvo = ves
        setselektEtaps(oldCOmp)
    }

    const selektParm = (id, parm) => {
        let oldParm = { ...otherParms }
        oldParm[id] = parm
        setOtherParms(oldParm)
    }

    return (
        <>
            <div className='add-contaner'>
                {Object.keys(task).map((id, index) => (

                    <div
                        className={'faza ' + (activTask == index ? "active" : "")}
                        key={index}
                        draggable={activTask == index ? "false" : "true"}
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={(e) => handleDragOver(e)}
                        onDrop={(e) => handleDrop(e, index)}
                    >
                        {activTask == index && (
                            <>
                                <input type="text" value={nameTask} onChange={(e) => setnameTask(e.target.value)} placeholder="Название фазы" ></input>
                                <p>Описание задачи</p>
                                <div className="textdisc">
                                    <EditorToolbar />
                                    <ReactQuill value={textDisc}
                                        onChange={(value) => setTextDisc(value)}
                                        theme="snow"
                                        placeholder={"Опишите задачу"}
                                        modules={modules}
                                        formats={formats}
                                    />
                                </div>
                                <p>Шаги выполнения</p>
                                <div className="selectKomponents">
                                    {Object.keys(selektEtaps).map((component, index) => (
                                        <div className="selektComp" key={index}>
                                            <div className="comp">
                                                <BsTrash3 className='DellComp' onClick={() => dellComp(index)} />
                                                <input className='ves' type="text" value={selektEtaps[index].colvo} onChange={(e) => selektVes(index, e.target.value)} placeholder="Этап задачи" ></input>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <AiOutlinePlusCircle className='AddComp' onClick={addComp} />
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
                                    <button className='save-btn' onClick={() => saveactivTaske(index)}>Сохранить</button>
                                    <button className='del-btn  ' onClick={() => dellFaze(index)}>Удалить</button>
                                </div>

                            </>
                        )}
                        {activTask != index && (
                            <>
                                <div className="stats">
                                    <div className="name" >{task[id].name}</div>
                                    <div className="cplvoComp">Всего шагов - {task[id].components.length}</div>
                                </div>
                                <GiSettingsKnobs className='SettingsFaz' onClick={() => sellectactivTaske(id)} />
                            </>
                        )}
                    </div>
                ))}
                <AiOutlinePlusCircle className='AddFaz' onClick={addFaze} />
            </div>
        </>
    )
}
