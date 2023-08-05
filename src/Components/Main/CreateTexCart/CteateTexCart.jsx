import React, { useState, useEffect } from 'react'
import "./CreaTask.scss"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import EditorToolbar, { modules, formats } from "./Editortoobar.jsx";
import { BsTrash3 } from 'react-icons/Bs';
import { GiSettingsKnobs } from 'react-icons/gi'

export default function Createtask() {


    // console.clear()

    const [task, settask] = useState({});
    const [activTask, setActivTask] = useState(-1);
    const [nameTask, setnameTask] = useState('');
    const [textDisc, setTextDisc] = useState('');
    const [selektEtaps, setSelektEtaps] = useState([]);
    const [otherParms, setOtherParms] = useState([]);

    const sellectActivTaske = (id) => {

        // if (activTask !== -1) {
        //     saveActivTaske(activTask, false);
        // }
        setActivTask(id);

        setnameTask(task[id].name);
        setTextDisc(task[id].description);

        let newEtaps = []

        task[id].etaps.map((value) => {
            newEtaps.push = value
        })
        if (newEtaps.length == 0) {
            newEtaps = [{ "name": "", "status": false }]
        }

        let newParms = []

        task[id].parms.map((value, index) => {
            newParms.push(value)
        })

        if (newParms.length == 0) {
            newParms.push({ "name": "", "status": false })
        }

        setSelektEtaps(newEtaps)

        setOtherParms(newParms)
    };

    const saveActivTaske = (id, flag = true) => {
        if (flag) {
            setactivTask(-1)
        }
        let newtask = { ...task };

        newtask[id].name = nameTask;

        newtask[id].podFaz[0].description = textDisc;

        let newEtaps = []

        for (let value in selektEtaps) {
            newEtaps.push({ "discriptions": selektEtaps[value].discriptions })
        }
        newtask[id].etaps = newEtaps

        let newParms = []

        for (let value in otherParms) {
            newParms.push(otherParms[value])
        }
        newtask[id].parms = newParms

        settask(newtask);
    };



    const addFaze = () => {
        let newtask = { ...task };
        newtask[Object.keys(newtask).length] = {
            "name": "Новая задача",
            "etaps": [
                { "name": "Создать дизайн", "status": false }
            ],
            "parms": [
                { "name": "Пушить все в ветку dev", "status": false }
            ]
        }
        settask(newtask);
    };

    const addParm = () => {

        let newParm = { ...otherParms };
        newParm[Object.keys(newParm).length] = "";
        setOtherParms(newParm);
    };

    const addEtaps = () => {

        let newEtaps = [...selektEtaps];


        newEtaps.push({ "name": "Пушить все в ветку dev", "status": false })

        setSelektEtaps(newEtaps)

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

    const changeSelektEtap = (id, parm) => {
        let oldEtap = { ...selektEtaps }
        oldEtap[id].name = parm
        setselektEtaps(oldEtap)
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
                                <p>Этапы</p>
                                <div className="selectKomponents">
                                    {selektEtaps.map((component, index) => (
                                        <div className="selektComp" key={index}>
                                            <div className="comp">
                                                <BsTrash3 className='DellComp' onClick={() => dellComp(index)} />
                                                <input className='ves' type="text" value={selektEtaps[index].name} onChange={(e) => changeSelektEtap(index, e.target.value)} placeholder="Этап задачи" ></input>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <AiOutlinePlusCircle className='AddComp' onClick={addEtaps} />
                                {/* 
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
                                    <button className='save-btn' onClick={() => saveActivTaske(index)}>Сохранить</button>
                                    <button className='del-btn  ' onClick={() => dellFaze(index)}>Удалить</button>
                                </div> */}

                            </>
                        )}
                        {activTask != index && (
                            <>
                                <div className="stats">
                                    <div className="name" >{task[id].name}</div>
                                    <div className="cplvoComp">Всего шагов - {task[id].etaps.length}</div>
                                </div>
                                <GiSettingsKnobs className='SettingsFaz' onClick={() => sellectActivTaske(id)} />
                            </>
                        )}
                    </div>
                ))}
                <AiOutlinePlusCircle className='AddFaz' onClick={addFaze} />
            </div>
        </>
    )
}
